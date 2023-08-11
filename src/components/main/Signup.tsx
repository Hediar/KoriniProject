import { FormEvent, useState } from 'react';
import supabase from '../../lib/client';
import * as S from '../../styles/StSignInUp';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const checkInput = (email: string, password: string) => {
    if (!email || !password) {
      alert('이메일과 패스워드를 모두 입력해 주세요');
      return false;
    }
    return true;
  };

  const signUpWithEmail = async (e: FormEvent) => {
    e.preventDefault();
    const checkedInput = checkInput(email, password);
    if (!checkedInput) return;

    try {
      const existingUser = await supabase.from('user').select('userid').eq('email', email).single();
      if (existingUser.data) {
        alert('이미 가입된 이메일입니다.');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });

        if (data) {
          alert('회원가입 완료!');
        }

        if (error) {
          alert(error.message);
        }
      }
    } catch (error) {}
  };

  return (
    <div>
      <S.StTitle>코리니 회원가입</S.StTitle>
      <S.StForm onSubmit={signUpWithEmail}>
        <S.StLable>이메일</S.StLable>
        <S.SuInput
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <S.StLable>비밀번호</S.StLable>
        <S.SuInput
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <S.StSignUpButton>회원가입</S.StSignUpButton>
      </S.StForm>
    </div>
  );
};

export default Signup;

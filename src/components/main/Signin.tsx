import { FormEvent, useState } from 'react';
import supabase from '../../lib/client';
import { setCurrentUser } from '../../redux/module/userSlice';
import { useAppDispatch } from '../../hooks';
import { closeModal } from '../../redux/module/modalSlice';
import * as S from '../../styles/StSignInUp';

const Signin = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //이메일 유효성
  const isEmailValid = (email: any) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  //비밀번호 유효성
  const isPasswordValid = (password: any) => {
    return password.length >= 6;
  };

  const checkInput = (email: string, password: string) => {
    if (!isEmailValid(email)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return false;
    }

    if (!isPasswordValid(password)) {
      alert('비밀번호는 6자 이상이어야 합니다.');
      return false;
    }

    return true;
  };

  const loginWithGithub = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'github'
      });
    } catch (error) {}
  };

  const loginWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
    } catch (error) {}
  };

  const signInWithEmail = async (e: FormEvent) => {
    e.preventDefault();
    const checkedInput = checkInput(email, password);
    if (!checkedInput) return;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (data) {
        // 데이터 베이스에서 로그인한 유저의 정보 가져오기
        const id = data.user?.id;
        const response = await supabase.from('user').select().eq('userid', id).single();
        const user = response.data;
        // 전역에 셋팅
        dispatch(setCurrentUser(user));
      }
      if (error) {
        alert('로그인 실패: 아이디가 없거나 비밀번호가 틀렸습니다.');
        return;
      }

      alert('로그인 성공');
      dispatch(closeModal());
    } catch (error) {}
  };

  return (
    <>
      <div>
        <S.StTitle>코리니 아이디로 로그인</S.StTitle>
        <S.StForm onSubmit={signInWithEmail}>
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
          {/* </S.StForm> */}
          <S.StDiv>
            <S.SNSLogoTitle>SNS 로그인</S.SNSLogoTitle>
            <S.StSNSBox>
              <S.LogoNameBox>
                <S.SNSLogoIcon
                  onClick={loginWithGithub}
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlzrSj%2FbtsqRgbR8A9%2FSk1DSxrocwLAtuxl8d1EK1%2Fimg.png"
                  width={40}
                />
                <S.StLable>Github</S.StLable>
              </S.LogoNameBox>
              <S.LogoNameBox>
                <S.SNSLogoIcon
                  onClick={loginWithGoogle}
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbriBHu%2FbtsqM7GLiEI%2Fq4B8ZInIG8ruvLnKHvlbzk%2Fimg.png"
                  width={40}
                />
                <S.StLable>Google</S.StLable>
              </S.LogoNameBox>
            </S.StSNSBox>
          </S.StDiv>
          <S.StButton>로그인</S.StButton>
        </S.StForm>
      </div>
    </>
  );
};

export default Signin;

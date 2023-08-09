import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import supabase from '../../lib/client';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkInput = (email: string, password: string) => {
    if (!email || !password) {
      alert('이메일과 패스워드를 모두 입력해 주세요');
      return false;
    }
    return true;
  };

  const loginWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github'
    });
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
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

      if (error) {
        alert('로그인 실패: 아이디가 없거나 비밀번호가 틀렸습니다.');
        return;
      }

      // 로그인 성공 후 이메일 정보를 localStorage에 저장
      localStorage.setItem('email', email);

      alert('로그인 성공');
      console.log('data', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <StTitle>🐘 로그인 🐘</StTitle>
      <form onSubmit={signInWithEmail}>
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>로그인</button>
      </form>
      <button onClick={loginWithGithub}>Github Login</button>
      <button onClick={loginWithGoogle}>Google Login</button>
      <div></div>
    </div>
  );
};

export default Signin;

const StTitle = styled.div`
  padding: 20px 0 50px 0;
  font-size: 28px;
  text-align: center;
`;

const StForm = styled.form`
  display: flex;
`;

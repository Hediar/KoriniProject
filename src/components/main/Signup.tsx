import React, { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import supabase from '../../lib/client';

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
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      alert('회원가입 완료!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <StTitle>🐘 회원가입 🐘</StTitle>
      <form onSubmit={signUpWithEmail}>
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
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default Signup;

const StTitle = styled.div`
  padding: 20px 0 50px 0;
  font-size: 28px;
  text-align: center;
`;

const StForm = styled.form`
  display: flex;
`;

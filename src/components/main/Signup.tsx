import React, { FormEvent, useEffect, useState } from 'react';
import { UserType } from '../../types/types';
import styled from 'styled-components';
import supabase from '../../lib/client';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const checkInput = (email: string, password: string) => {
    if (!email || !password || !name) {
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
          const user = {
            userid: data.user?.id,
            email,
            name
          };
          await supabase.from('user').insert(user);
          alert('회원가입 완료!');
        }

        if (error) {
          alert(error.message);
        }
      }
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
        <label>닉네임</label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
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

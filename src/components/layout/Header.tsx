import { useState } from 'react';
import supabase from '../../lib/client';
import styled from 'styled-components';
import Signin from '../main/Signin';
import Signup from '../main/Signup';
import { signOut } from '../main/Auth';

const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [switchPage, setSwitchPage] = useState<boolean>(false);

  const loginModalButton = () => {
    setOpenModal(!openModal);
    setSwitchPage(false);
  };

  const switchPageButton = () => {
    setSwitchPage(!switchPage);
  };

  return (
    <StHeader>
      <h2>KORINI 🐘</h2>
      <button onClick={loginModalButton}>Login</button>
      <button onClick={signOut}>Logout</button>
      {openModal && (
        <>
          <StModalBox>
            <StModalContents>
              <button onClick={loginModalButton}>X</button>
              {switchPage === false ? (
                <>
                  <Signin />
                  <StPageButton onClick={switchPageButton}>회원가입 페이지로 이동</StPageButton>
                </>
              ) : (
                <>
                  <Signup />
                  <StPageButton onClick={switchPageButton}>로그인 페이지로 이동</StPageButton>
                </>
              )}
            </StModalContents>
          </StModalBox>
        </>
      )}
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div`
  display: flex;
`;

const StModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StModalContents = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 400px;
  height: 500px;
  border-radius: 12px;
`;

const StPageButton = styled.button`
  height: 30px;
  border-radius: 5px;
  margin-top: 50px;
`;

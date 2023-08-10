import { useState } from 'react';
import styled from 'styled-components';
import Signin from '../main/Signin';
import Signup from '../main/Signup';
import supabase from '../../lib/client';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../redux/config/configStore';
import { setCurrentUser } from '../../redux/module/userSlice';
import { openModal, closeModal } from '../../redux/module/modalSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  // user 정보 가져오기
  const { user } = useAppSelector((state: RootState) => state.user);
  const { isOpen } = useAppSelector((state: RootState) => state.modal);
  const [switchPage, setSwitchPage] = useState<boolean>(false);

  const openModalButton = () => {
    dispatch(openModal());
  };

  const closeModalButton = () => {
    dispatch(closeModal());
  };

  const switchPageButton = () => {
    setSwitchPage(!switchPage);
  };

  // 로그아웃
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      // 전역 상태 유저 null
      dispatch(setCurrentUser(null));
      alert('로그아웃 되었습니다.');
      if (error) {
        console.log(error);
      }
    } catch (error) {
      alert('로그아웃 실패');
    }
  };

  return (
    <StHeader>
      <h2>KORINI 🐘</h2>
      {user ? (
        <>
          <button onClick={signOut}>Logout</button>
          <span>{user.name}</span>
        </>
      ) : (
        <button onClick={openModalButton}>Login</button>
      )}
      {isOpen && (
        <>
          <StModalBox>
            <StModalContents>
              <button onClick={closeModalButton}>X</button>
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

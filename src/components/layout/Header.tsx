import { useState } from 'react';
import * as S from '../../styles/StHeader';
import Signin from '../main/Signin';
import Signup from '../main/Signup';
import supabase from '../../lib/client';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../redux/config/configStore';
import { setCurrentUser } from '../../redux/module/userSlice';
import { openModal, closeModal } from '../../redux/module/modalSlice';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useAppDispatch();
  // user 정보 가져오기
  const { user } = useAppSelector((state: RootState) => state.user);
  const { isOpen } = useAppSelector((state: RootState) => state.modal);
  const [switchPage, setSwitchPage] = useState<boolean>(false);
  const navigate = useNavigate();

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
      alert('로그아웃 되었습()니다.');
      if (error) {
        console.log(error);
      }
    } catch (error) {
      alert('로그아웃 실패');
    }
  };

  const mypageButton = () => {
    navigate('/mypage');
  };

  const writeButton = () => {
    navigate('/write');
  };

  return (
    <>
      <S.Header>
        <Link to="/">KORINI 🐘</Link>
        {user ? (
          <>
            <button onClick={writeButton}>글쓰기</button>
            <button onClick={mypageButton}>mypage</button>
            <button onClick={signOut}>Logout</button>
            <span>{user.name}</span>
          </>
        ) : (
          <button onClick={openModalButton}>Login</button>
        )}
        {isOpen && (
          <>
            <S.ModalBox>
              <S.ModalContents>
                <button onClick={closeModalButton}>X</button>
                {switchPage === false ? (
                  <>
                    <Signin />
                    <S.PageButton onClick={switchPageButton}>회원가입 페이지로 이동</S.PageButton>
                  </>
                ) : (
                  <>
                    <Signup />
                    <S.PageButton onClick={switchPageButton}>로그인 페이지로 이동</S.PageButton>
                  </>
                )}
              </S.ModalContents>
            </S.ModalBox>
          </>
        )}
      </S.Header>
      <div>
        <button onClick={() => navigate('/free')}>자유</button>
        <button onClick={() => navigate('/study')}>학습</button>
      </div>
      <div>
        <button onClick={() => navigate('/write')}>글 작성</button>
      </div>
    </>
  );
};

export default Header;

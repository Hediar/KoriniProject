import { useState } from 'react';
import * as S from '../../styles/StHeader';
import Signin from '../main/Signin';
import Signup from '../main/Signup';
import supabase from '../../lib/client';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../redux/config/configStore';
import { openModal, closeModal } from '../../redux/module/modalSlice';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import CloseIcon from 'remixicon-react/CloseFillIcon';

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
        <Link to="/">
          <img
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fnt1kh%2FbtsqLlS0J9n%2FwUm2gWWGSzfD6eswddjDiK%2Fimg.png"
            width={50}
          ></img>
        </Link>
        <S.MenuBox>
          <S.MenuButton onClick={() => navigate('/free')}>자유게시판</S.MenuButton>
          <p>|</p>
          <S.MenuButton onClick={() => navigate('/study')}>학습게시판</S.MenuButton>
        </S.MenuBox>
        {user ? (
          <div>
            <S.HeaderButton onClick={writeButton}>글쓰기</S.HeaderButton>
            {/* <S.HeaderButton onClick={mypageButton}>mypage</S.HeaderButton> */}
            <S.HeaderButton onClick={signOut}>로그아웃</S.HeaderButton>

            <S.HeaderName onClick={() => navigate('/mypage')}>{user.name}</S.HeaderName>
          </div>
        ) : (
          <S.HeaderButton onClick={openModalButton}>로그인</S.HeaderButton>
        )}
        {isOpen && (
          <>
            <S.ModalBox>
              <S.ModalContents>
                <div>
                  <S.CloseButton>
                    <CloseIcon onClick={closeModalButton} />
                  </S.CloseButton>
                </div>
                <Link to="/">
                  <S.LogoImage src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fnt1kh%2FbtsqLlS0J9n%2FwUm2gWWGSzfD6eswddjDiK%2Fimg.png"></S.LogoImage>
                </Link>
                {switchPage === false ? (
                  <>
                    <Signin />
                    <S.SwitchPageLink onClick={switchPageButton}>아직 회원이 아니신가요? 회원가입</S.SwitchPageLink>
                  </>
                ) : (
                  <>
                    <Signup />
                    <S.SwitchPageLink onClick={switchPageButton}>로그인 페이지로 이동</S.SwitchPageLink>
                  </>
                )}
              </S.ModalContents>
            </S.ModalBox>
          </>
        )}
      </S.Header>
    </>
  );
};

export default Header;

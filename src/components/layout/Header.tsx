import * as S from '../../styles/StHeader';
import * as G from '../../styles/StButton';
import Signin from '../main/Signin';
import Signup from '../main/Signup';
import supabase from '../../lib/client';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../redux/config/configStore';
import { openModal, closeModal, openSignupModal, closeSignupModal } from '../../redux/module/modalSlice';
import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import CloseIcon from 'remixicon-react/CloseFillIcon';
import HeaderLogo from '../../assets/headerlogo.png';
import MainLogo from '../../assets/mainlogo.png';

const Header = () => {
  const dispatch = useAppDispatch();
  // user 정보 가져오기
  const { user } = useAppSelector((state: RootState) => state.user);
  const { isOpen } = useAppSelector((state: RootState) => state.modal);
  const { isSignupOpen } = useAppSelector((state: RootState) => state.modal);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const openModalButton = () => {
    dispatch(openModal());
  };

  const closeModalButton = () => {
    dispatch(closeModal());
  };

  const openSignupModalButton = () => {
    dispatch(openSignupModal());
  };

  const closeSignupModalButton = () => {
    dispatch(closeSignupModal());
  };

  // 로그아웃
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      alert('로그아웃 되었습니다.');
      if (error) {
      }
    } catch (error) {
      alert('로그아웃 실패');
    }
  };

  const writeButton = () => {
    navigate('/write');
  };
  const mypageButton = () => {
    navigate('/mypage');
  };

  const handleAllBoardClick = () => {
    navigate('/');
  };

  const handleFreeBoardClick = () => {
    navigate('/free');
  };

  const handleStudyBoardClick = () => {
    navigate('/study');
  };

  return (
    <S.outer>
      <S.Header>
        <Link to="/">
          <S.Imagelogo src={HeaderLogo}></S.Imagelogo>
        </Link>
        <S.MenuBox>
          <S.MenuButton onClick={handleAllBoardClick} style={{ color: pathname === '/' ? '#6708bf' : 'inherit' }}>
            전체
          </S.MenuButton>
          <S.MenuButton onClick={handleFreeBoardClick} style={{ color: pathname === '/free' ? '#6708bf' : 'inherit' }}>
            자유게시판
          </S.MenuButton>
          <S.MenuButton
            onClick={handleStudyBoardClick}
            style={{ color: pathname === '/study' ? '#6708bf' : 'inherit' }}
          >
            학습게시판
          </S.MenuButton>
        </S.MenuBox>
        {user ? (
          <S.ButtonBox>
            <G.Button style={{marginLeft: "10px", marginRight: "5px"}} onClick={writeButton}>글쓰기</G.Button>
            <G.Button style={{marginRight: "5px"}} onClick={mypageButton}>마이 페이지</G.Button>
            <G.Button onClick={signOut}>로그아웃</G.Button>
            <S.HeaderName onClick={() => navigate('/mypage')}>
              {user.name}님
            </S.HeaderName>
          </S.ButtonBox>
        ) : (
          <div>
            <G.Button style={{marginRight: "5px"}} onClick={openModalButton}>로그인</G.Button>
            <G.Button style={{marginRight: "5px"}} onClick={openSignupModalButton}>회원가입</G.Button>
          </div>
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
                  <S.LogoImage src={MainLogo}></S.LogoImage>
                </Link>
                <>
                  <Signin />
                  <S.SwitchPageLink
                    onClick={() => {
                      openSignupModalButton();
                      closeModalButton();
                    }}
                  >
                    아직 회원이 아니신가요? 회원가입
                  </S.SwitchPageLink>
                </>
              </S.ModalContents>
            </S.ModalBox>
          </>
        )}
        {isSignupOpen && (
          <>
            <S.ModalBox>
              <S.ModalContents>
                <div>
                  <S.CloseButton>
                    <CloseIcon onClick={closeSignupModalButton} />
                  </S.CloseButton>
                </div>
                <Link to="/">
                  <S.LogoImage src={MainLogo}></S.LogoImage>
                </Link>
                <>
                  <Signup />
                  <S.SwitchPageLink
                    onClick={() => {
                      openModalButton();
                      closeSignupModalButton();
                    }}
                  >
                    로그인 페이지로 이동
                  </S.SwitchPageLink>
                </>
              </S.ModalContents>
            </S.ModalBox>
          </>
        )}
      </S.Header>
    </S.outer>
  );
};

export default Header;

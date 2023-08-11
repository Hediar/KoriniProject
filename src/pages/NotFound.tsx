import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_homebutton.png'
import { styled } from 'styled-components';

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <NotFoundContainer>
      <LogoImg src={logo} />
      <NotFoundTextBox>
        <NotFoundTitle>페이지를 찾을 수 없어요!</NotFoundTitle>
        <NotFoundText>잠시 후에 메인 페이지로 이동합니다.</NotFoundText>
      </NotFoundTextBox>
    </NotFoundContainer>
  );
}

export default NotFound;

const NotFoundContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 400px;
  height: 400px;
`;

const NotFoundTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
`;

const NotFoundTitle = styled.h1`
  margin: 10px;
  font-size: 36px;
  font-weight: 700;
  color: ${props => props.theme.mainPurpleColor}
`

const NotFoundText = styled.p`
  margin: 10px;
  font-size: 18px;
`;
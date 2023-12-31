import styled from 'styled-components';

export const Header = styled.div`
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.mainNavyColor};
  height: 100px;
  display: flex;
  margin-bottom: 30px;
  padding: 0 30px;
`;

export const HeaderButton = styled.button`
  padding: 5px 20px;
  margin: 0 3px;
  background-color: ${(props) => props.theme.mainPurpleColor};
  color: white;
  border: 0;
  border-radius: 10px;
  font-size: 12px;
  cursor: pointer;
`;

export const HeaderName = styled.span`
  cursor: pointer;
  padding-left: 10px;
`;

export const ModalBox = styled.div`
  z-index: 100;
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

export const CloseButton = styled.div`
  position: fixed;
  margin-left: 300px;
  cursor: pointer;
`;

export const ModalContents = styled.div`
  display: grid;
  background-color: #fff;
  padding: 20px;
  width: 400px;
  height: 550px;
  border-radius: 12px;
  justify-content: center;
  text-align: center;
`;

export const PageButton = styled.button`
  height: 30px;
  border-radius: 5px;
  margin-top: 0px;
`;

export const LogoImage = styled.img`
  justify-content: center;
  width: 80px;
`;

export const SwitchPageLink = styled.p`
  height: 15px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  & :hover {
    color: blue;
  }
`;

export const MenuBox = styled.div`
  display: flex;
  position: absolute;
  left: 35%;
`;

export const ButtonBox = styled.div``;

export const MenuButton = styled.p`
  padding: 0 20px;
  cursor: pointer;
`;

export const Imagelogo = styled.img`
  width: 120px;
`;

export const outer = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  padding: 0 auto;
`;

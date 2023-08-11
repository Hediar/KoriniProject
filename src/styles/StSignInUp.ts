import styled from 'styled-components';

export const StTitle = styled.div`
  padding: 0 0 20px 0;
  font-size: 16px;
  text-align: center;
`;

export const StForm = styled.form`
  display: grid;
  justify-content: center;
  text-align: left;
`;

export const StLable = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
`;

export const SuInput = styled.input`
  width: 250px;
  height: 30px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.mainInputColor};
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.mainPurpleColor};
`;

export const StButton = styled.button`
  height: 35px;
  padding: 0 20px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.mainPurpleColor};
  color: white;
  border: 0;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
`;

export const StSignUpButton = styled.button`
  height: 35px;
  padding: 0 20px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.mainPurpleColor};
  color: white;
  border: 0;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
`;

export const StDiv = styled.div`
  display: grid;
  justify-content: center;
  text-align: center;
`;

export const StSNSBox = styled.div`
  display: flex;
`;

export const LogoNameBox = styled.div`
  display: grid;
  justify-content: center;

  text-align: center;
`;

export const SNSLogoTitle = styled.p`
  font-size: 14px;
  padding: 20px 0 15px 0;
`;

export const SNSLogoIcon = styled.img`
  cursor: pointer;
  padding: 0 15px 10px 15px;
`;

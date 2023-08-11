import styled from 'styled-components';

export const Button = styled.button<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '100px'};
  height: ${({ height }) => height || '30px'};
  margin: 0 5px;
  background-color: ${(props) => props.theme.mainPurpleColor};
  color: white;
  border: 0;
  border-radius: 10px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverColor};
  }
`;

export const TopButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #1f3646;
  box-shadow: 5px 5px 13px rgba(154, 154, 154, 0.4);
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  z-index: 9999;
  right: 30px;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.mainNavyColor};
  }
`;

import styled from "styled-components";

export const Button = styled.button<{ width?: string; height?: string }>`
  width: ${({ width }) => width || "100px"};
  height: ${({ height }) => height || "30px"};
  margin: 0 5px;
  background-color: ${(props) => props.theme.mainPurpleColor};
  color: white;
  border: 0;
  border-radius: 10px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.buttonHoverColor};
  }
`;
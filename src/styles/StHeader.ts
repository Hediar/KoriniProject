import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  `;

  export const ModalBox = styled.div`
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

export const ModalContents = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 400px;
  height: 500px;
  border-radius: 12px;
`;

export const PageButton = styled.button`
  height: 30px;
  border-radius: 5px;
  margin-top: 50px;
`;
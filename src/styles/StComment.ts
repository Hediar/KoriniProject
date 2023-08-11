import styled from 'styled-components';

export const Outer = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  paddung: 0 auto;
`;
export const Title = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 20px;
  font-size: 20px;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  margin-top: 10px;

  height: 500px;
  border-radius: 30px;
`;

export const CommentTop = styled.div`
  display: flex;
  height: 15%;
  width: 700px;
  margin-top: 10px;
`;
export const CommentBot = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  overflow-y: auto;
`;

export const WriteInput = styled.input`
  display: flex;
  border: none;
  width: 90%;
  height: 40px;
  background-color: #d9d9d9;
  margin-top: 10px;
  border-radius: 10px;
`;

export const WriteButton = styled.button`
  background-color: #a593e0;
  border: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  width: 65px;
  height: 38px;
  margin-left: 20px;
  margin-top: 13px;
  font-size: 16px;
  &:hover {
    background-color: rgb(0, 0, 0, 0.5);
    color: rgb(255, 255, 255, 100);
    font-weight: bold;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
`;

export const button = styled.button`
  background-color: #a593e0;
  border: none;
  border-radius: 10px;
  color: white;
  width: 40px;
  height: 20px;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    color: rgba(255, 255, 255, 1);
    font-weight: bold;
  }
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 3px solid #566270;
  border-radius: 10px;
  margin: 15px 0;
  padding: 10px;
  width: 800px;
  background-color: #ffffff;
`;

export const CommentName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

export const CommentDate = styled.div`
  font-size: 12px;
  color: #807b85;
`;

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
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  margin-top: 10px;
  max-height: 500px;
  border-radius: 30px;
`;

export const WritetInputBox = styled.div`
  display: flex;
  width: 700px;
  margin-top: 10px;
  margin-bottom: 5px;
`;
export const WriteInput = styled.input`
  display: flex;
  border: 3px solid #566270;
  width: 90%;
  height: 50px;
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
  width: 30px;
  height: 30px;
  margin-left: 20px;
`;
export const button = styled.button`
  background-color: #a593e0;
  border: none;
  border-radius: 10px;
  color: white;
  width: 50px;
  height: 30px;
  margin-right: 5px;
  margin-top: 15px;
  cursor: pointer;
`;
export const Comment = styled.div`
  border: 3px solid #566270;
  border-radius: 10px;
  margin: 15px 0 15px 0;
  width: 800px;
  height: 50px;
  padding-top: 15px;
`;

export const ButtonBox = styled.div`
  display: flex;
  float: right;
`;

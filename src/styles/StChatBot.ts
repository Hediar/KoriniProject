import styled from "styled-components";

export const ChatBotButton = styled.button`
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

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 600px;
  border: none;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 5px 5px 13px rgba(91, 81, 81, 0.4);

  position: fixed;
  right: 40px;
  bottom: 90px;
  z-index: 9999;

  @media (max-width: 500px) {
    width: 100%;
    max-width: 80%;
  }
`;

export const ChatTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  padding: 20px;
`;

export const ChatArea = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: auto;
`;

export const ChatLogBox = styled.div`
  width: 70%;
  padding: 15px;
  border: 1px solid #cbcbcb;
  border-radius: 10px;
  margin: 10px 10px 5px 10px;
  font-size: 14px;
  background-color: ${props => props.theme.ChatBoxBgColor};
`;

export const UserPromptBox = styled.div`
  width: 70%;
  padding: 15px;
  border: 1px solid #cbcbcb;
  border-radius: 10px;
  margin: 10px 10px 5px 100px;
  font-size: 14px;
`;

export const RoleName = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const BotChatLog = styled.p`
  line-height: 1.4;
`;

export const UserChatLog = styled.p`
  line-height: 1.4;
`;

export const PromptArea = styled.div`
  width: 100%;
  background-color: ${props => props.theme.mainInputColor};
  margin-top: 10px;
`;

export const PromptForm = styled.form`
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: center;
`;

export const PromptInput = styled.textarea`
  width: 400px;
  height: 40px;
  margin: 10px;
  padding: 10px;
  outline: none;
  resize: none;
`;

export const PromptSubmitButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;
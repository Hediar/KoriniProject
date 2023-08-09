import React, { useRef, useState } from "react";
import { openai } from "../../lib/openai";
import LoaderIcon from "remixicon-react/Loader2LineIcon"
import SendPlaneIcon from "remixicon-react/SendPlaneFillIcon"
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BotChatLogsType, addChatLog } from "../../redux/module/chatBotLogSlice";
import shortid from "shortid";

const ChatBot = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const chatBotLogs = useSelector((state: { chatBotLog: BotChatLogsType }) => state.chatBotLog.logs);
  console.log(chatBotLogs);
  const dispatch = useDispatch();
  const submitButtonRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.currentTarget.value);
  }

  // 질문을 전송하는 textarea에서 엔터를 입력하면 줄바꿈이 아닌 submit이 되도록
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (submitButtonRef.current) {
        (submitButtonRef.current as HTMLButtonElement).click();
      }
    }
  }  

  const handlePromptSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await openai.createCompletion(
        {
          model: "text-davinci-003",
          prompt,
          temperature: 0.8,
          max_tokens: 256,
        }
      );
      dispatch(addChatLog({
        id: shortid.generate(),
        role: "user",
        chat: prompt,
      }))
      if (data?.choices[0]?.text) {
        dispatch(addChatLog({
          id: data.id,
          role: "bot",
          chat: data.choices[0]?.text,
        }))
      } else {
        alert("정상적으로 전달되지 않았습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.log(err);
      alert("정상적으로 전달되지 않았습니다. 다시 시도해주세요.")
    }
    setPrompt("");
    setLoading(false);
  }

  return (
    <>
      <ChatContainer>
        <ChatTitle>변수명, 함수명을 물어보세요!</ChatTitle>
        <ChatArea>
          <ChatLogBox>
            <RoleName>코린봇 🐘</RoleName>
            <ChatLog>안녕하세요! <br /> 변수명, 함수명을 고민 중이신가요? 저에게 물어보세요!</ChatLog>
          </ChatLogBox>
          {
            chatBotLogs.map((chat) => {
              if (chat.role === 'bot') {
                return (
                  <ChatLogBox key={chat.id}>
                    <RoleName>코린봇 🐘</RoleName>
                    <ChatLog>{chat.chat}</ChatLog>
                  </ChatLogBox>
                );
              } else if (chat.role === 'user') {
                return (
                  <UserPromptBox key={chat.id}>
                    <RoleName>사용자 👤</RoleName>
                    <ChatLog>{chat.chat}</ChatLog>
                  </UserPromptBox>
                );
              }
              return null;
            })
          }

        </ChatArea>
        <PromptArea>
          <PromptForm onSubmit={handlePromptSubmit}>
            <PromptInput
              typeof="text"
              value={prompt}
              onChange={onChange}
              onKeyDown={onKeyDown}
              maxLength={64}
              placeholder="질문을 입력하세요!"
              required
            />
            <PromptSubmitButton
              type="submit"
              ref={submitButtonRef}
              disabled={!prompt || loading}
            >{loading ? <LoaderIcon /> : <SendPlaneIcon />}
            </PromptSubmitButton>
          </PromptForm>
        </PromptArea>
      </ChatContainer>
    </>
  );
};

export default ChatBot;

const ChatContainer = styled.div`
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
`

const ChatTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  padding: 20px;
`

const ChatArea = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: auto;
`

const ChatLogBox = styled.div`
  width: 70%;
  padding: 15px;
  border: 1px solid #cbcbcb;
  border-radius: 10px;
  margin: 10px 10px 5px 10px;
  font-size: 14px;
  background-color: #d6ede6;
`

const UserPromptBox = styled.div`
  width: 70%;
  padding: 15px;
  border: 1px solid #cbcbcb;
  border-radius: 10px;
  margin: 10px 10px 5px 100px;
  font-size: 14px;
`

const RoleName = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
`

const ChatLog = styled.p`
  line-height: 1.4;
`

const PromptArea = styled.div`
  width: 100%;
  background-color: #badbe8;
`

const PromptForm = styled.form`
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: center;
`

const PromptInput = styled.textarea`
  width: 400px;
  height: 40px;
  margin: 10px;
  padding: 10px;
  outline: none;
  resize: none;
`;

const PromptSubmitButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

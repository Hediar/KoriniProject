import React, { useRef, useState } from 'react';

import { openai } from '../../lib/openai';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addChatLog } from '../../redux/module/chatBotLogSlice';

import shortid from 'shortid';
import LoaderIcon from 'remixicon-react/Loader2LineIcon';
import SendPlaneIcon from 'remixicon-react/SendPlaneFillIcon';
import * as S from '../../styles/StChatBot';

const ChatBot = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBotLogs = useAppSelector((state) => state.chatBotLog.logs);
  console.log(chatBotLogs);
  const dispatch = useAppDispatch();
  const submitButtonRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.currentTarget.value);
  };

  // 질문을 전송하는 textarea에서 엔터를 입력하면 줄바꿈이 아닌 submit이 되도록
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (submitButtonRef.current) {
        (submitButtonRef.current as HTMLButtonElement).click();
      }
    }
  };

  const handlePromptSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.8,
        max_tokens: 256
      });
      dispatch(
        addChatLog({
          id: shortid.generate(),
          role: 'user',
          chat: prompt
        })
      );
      if (data?.choices[0]?.text) {
        dispatch(
          addChatLog({
            id: data.id,
            role: 'bot',
            chat: data.choices[0]?.text
          })
        );
      } else {
        alert('정상적으로 전달되지 않았습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.log(err);
      alert('정상적으로 전달되지 않았습니다. 다시 시도해주세요.');
    }
    setPrompt('');
    setLoading(false);
  };

  return (
    <>
      <S.ChatContainer>
        <S.ChatTitle>변수명, 함수명을 물어보세요!</S.ChatTitle>
        <S.ChatArea>
          <S.ChatLogBox>
            <S.RoleName>코린봇 🐘</S.RoleName>
            <S.ChatLog>
              안녕하세요! <br /> 변수명, 함수명을 고민 중이신가요? 저에게 물어보세요!
            </S.ChatLog>
          </S.ChatLogBox>
          {chatBotLogs.map((chat) => {
            if (chat.role === 'bot') {
              return (
                <S.ChatLogBox key={chat.id}>
                  <S.RoleName>코린봇 🐘</S.RoleName>
                  <S.ChatLog>{chat.chat}</S.ChatLog>
                </S.ChatLogBox>
              );
            } else if (chat.role === 'user') {
              return (
                <S.UserPromptBox key={chat.id}>
                  <S.RoleName>사용자 👤</S.RoleName>
                  <S.ChatLog>{chat.chat}</S.ChatLog>
                </S.UserPromptBox>
              );
            }
            return null;
          })}
        </S.ChatArea>
        <S.PromptArea>
          <S.PromptForm onSubmit={handlePromptSubmit}>
            <S.PromptInput
              typeof="text"
              value={prompt}
              onChange={onChange}
              onKeyDown={onKeyDown}
              maxLength={64}
              placeholder="질문을 입력하세요!"
              required
            />
            <S.PromptSubmitButton type="submit" ref={submitButtonRef} disabled={!prompt || loading}>
              {loading ? <LoaderIcon /> : <SendPlaneIcon />}
            </S.PromptSubmitButton>
          </S.PromptForm>
        </S.PromptArea>
      </S.ChatContainer>
    </>
  );
};

export default ChatBot;

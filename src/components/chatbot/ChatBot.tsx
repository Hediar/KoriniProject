import React, { useRef, useState } from 'react';
import { openai } from '../../lib/openaiapi';
import LoaderIcon from 'remixicon-react/Loader2LineIcon';
import SendPlaneIcon from 'remixicon-react/SendPlaneFillIcon';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addChatLog } from '../../redux/module/chatBotLogSlice';

const ChatBot = () => {
  const [prompt, setPrompt] = useState('');
  const [apiRes, setApiRes] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
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
      console.log('gpt 답변 데이터 : ', data);
      if (data?.choices[0]?.text) {
        // store에서 chat log 가져오면 apiRes, setApiRes 리팩토링 필요
        setApiRes(data.choices[0].text);
        dispatch(
          addChatLog({
            id: data.id,
            chatRes: data.choices[0]?.text
          })
        );
      } else {
        setApiRes('정상적으로 전달되지 않았습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.log(err);
      setApiRes('정상적으로 전달되지 않았습니다. 다시 시도해주세요.');
    }

    setPrompt('');
    setLoading(false);
  };

  return (
    <>
      <ChatContainer>
        <ChatTitle>변수명, 함수명을 물어보세요!</ChatTitle>
        <ChatArea>
          <ResponseContainer>
            <BotName>코린봇 🐘</BotName>
            <BotResponse>
              안녕하세요! <br /> 변수명, 함수명을 고민 중이신가요? 저에게 물어보세요!
            </BotResponse>
          </ResponseContainer>
          {apiRes && (
            <ResponseContainer>
              <BotName>코린봇 🐘</BotName>
              <pre>{apiRes}</pre>
            </ResponseContainer>
          )}
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
            <PromptSubmitButton type="submit" ref={submitButtonRef} disabled={!prompt || loading}>
              {loading ? <LoaderIcon /> : <SendPlaneIcon />}
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
`;

const ChatTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  padding: 20px;
`;

const ChatArea = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: auto;
`;

const ResponseContainer = styled.div`
  width: 70%;
  padding: 15px;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 5px;
  font-size: 14px;
  position: relative;
  left: 10px;
`;

const BotName = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const BotResponse = styled.p`
  line-height: 1.4;
`;

const PromptArea = styled.div`
  width: 100%;
  background-color: #badbe8;
`;

const PromptForm = styled.form`
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: center;
`;

const PromptInput = styled.textarea`
  width: 400px;
  height: 40px;
  margin: 10px;
  padding: 10px;
  outline: none;
`;

const PromptSubmitButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
`;

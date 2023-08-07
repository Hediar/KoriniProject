import { useState } from "react";
import { openAiConfig } from "../../libs/services/openaiapi";
import styled from "styled-components";

const ChatGPT = () => {
  const [prompt, setPrompt] = useState("");
  const [apiRes, setApiRes] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.currentTarget.value);
  }

  const handlePromptSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await openAiConfig.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.8,
        max_tokens: 256,
      })
      console.log(res);
      if (res?.data.choices[0]?.text) {
        setApiRes(res.data.choices[0].text);
      } else {
        setApiRes("정상적으로 전달되지 않았습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.log(err);
      setApiRes("정상적으로 전달되지 않았습니다. 다시 시도해주세요.")
    }
    setLoading(false);
  }

  return (
    <>
      <ChatBotContainer>
        <div>
          <ChatBotTitle>변수명, 함수명을 물어보세요!</ChatBotTitle>
          {apiRes && (
            <ChatBotResContainer>
              <h3>챗봇 🤖</h3>
              <pre>{apiRes}</pre>
            </ChatBotResContainer>
          )}
          <form onSubmit={handlePromptSubmit}>
            <ChatBotPromptInput
              type="text"
              value={prompt}
              onChange={onChange}
              placeholder="질문을 입력하세요!"
            />
            <button
              disabled={loading}
            >{loading ? "답변 생성 중.." : "전송"}
            </button>
          </form>
        </div>
      </ChatBotContainer>
    </>
  );
};

export default ChatGPT;

const ChatBotContainer = styled.div`
  width: 70%;
  margin: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
`

const ChatBotResContainer = styled.div`
  padding: 10px;
  margin: 10px;
  border: 1px solid gray;
  border-radius: 10px;
`

const ChatBotTitle = styled.h1`
  font-size: 18px;
  text-align: center;
  margin: 20px;
`

const ChatBotPromptInput = styled.input`
  width: 80%;
  margin: 10px;
  padding: 10px;
`;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import Mypage from '../pages/Mypage';
import Studyboard from '../pages/Studyboard';
import Freeboard from '../pages/Freeboard';
import Write from '../pages/Write';

import { useSelector, useDispatch } from 'react-redux';
import { ChatBotState, toggleChatBotState } from '../redux/module/chatBotUISlice';
import ChatBot from '../components/chatbot/ChatBot';
import ChatIcon from 'remixicon-react/QuestionAnswerFillIcon';
import { styled } from 'styled-components';

const Router = () => {
  const chatBotIsActive = useSelector((state: { chatBotUI: ChatBotState }) => state.chatBotUI.chatBotIsActive);
  const dispatch = useDispatch();
  const toggleChatBot = () => {
    dispatch(toggleChatBotState());
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/study" element={<Studyboard />} />
        <Route path="/freeboard" element={<Freeboard />} />
        <Route path="/write" element={<Write />} />
      </Routes>
      <Footer />
      <ChatBotButton onClick={toggleChatBot}>
        <ChatIcon color="#fff" size={20} />
      </ChatBotButton>
      {chatBotIsActive ? <ChatBot /> : null}
    </BrowserRouter>
  );
};
export default Router;

const ChatBotButton = styled.button`
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
    background-color: #445e70;
  }
`;

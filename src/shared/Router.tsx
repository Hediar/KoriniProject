import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import Mypage from '../pages/Mypage';
import Studyboard from '../pages/Studyboard';
import Freeboard from '../pages/Freeboard';
import Write from '../pages/Write';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import Layout from './Layout';

import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../redux/config/configStore';
import { toggleChatBotState } from '../redux/module/chatBotUISlice';
import ChatBot from '../components/chatbot/ChatBot';
import ChatIcon from 'remixicon-react/QuestionAnswerFillIcon';

import * as S from "../styles/StChatBot"

const Router = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const chatBotIsActive = useAppSelector((state: RootState) => state.chatBotUI.chatBotIsActive);
  const dispatch = useAppDispatch();
  const toggleChatBot = () => {
    dispatch(toggleChatBotState());
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/study" element={<Studyboard />} />
          <Route path="/free" element={<Freeboard />} />
          
          {/* PrivateRoute : 로그인 유저 없으면 main 페이지로 이동 */}
          <Route element={<PrivateRoute />}>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/write" element={<Write />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* user가 있을 때만 챗봇 버튼이 보이도록 */}
      {user && (
        <>
          <S.ChatBotButton onClick={toggleChatBot}>
            <ChatIcon color="#fff" size={20} />
          </S.ChatBotButton>
          {chatBotIsActive ? <ChatBot /> : null}
        </>
      )}
    </BrowserRouter>
  );
};
export default Router;
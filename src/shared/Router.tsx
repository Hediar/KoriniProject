import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import Mypage from '../pages/Mypage';
import Studyboard from '../pages/Studyboard';
import Freeboard from '../pages/Freeboard';
import Write from '../pages/Write';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Header />
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/study" element={<Studyboard />} />
        <Route path="/freeboard" element={<Freeboard />} />
        <Route path="/write" element={<Write />} />
        <Footer />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;

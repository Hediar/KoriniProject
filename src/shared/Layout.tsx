import Header from '../components/layout/Header';
import { Outlet } from 'react-router-dom';

import TopButton from 'remixicon-react/ArrowUpSLineIcon';
import * as S from '../styles/StButton';

const Layout = () => {
  const handleScrollToTop = () => {
    window.scrollTo({top:0, behavior: 'smooth'});
  };
  return (
    <>
      <Header />
      <Outlet />
      <S.TopButton onClick={handleScrollToTop}>
        <TopButton color='#fff' size={20} />
      </S.TopButton>
    </>
  )
}

export default Layout

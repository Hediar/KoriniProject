import ChangeNickname from '../components/mypage/ChangeNickname';
import ChangePassword from '../components/mypage/ChangePassword';
import { useAppSelector } from '../hooks';
import { RootState } from '../redux/config/configStore';
import pic from '../assets/elephant.png';

import * as S from '../styles/StMyPage';
import styled from 'styled-components';

const Mypage = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  return (
    <>
      <S.MyPageSection>
        <S.MyPageTitleBox>
          <S.MyPageTitle>
            <S.HighlightName>{user?.name}</S.HighlightName>님의 프로필
          </S.MyPageTitle>
        </S.MyPageTitleBox>
        <S.ProfilePic src={pic} />
        <ChangeNickname />
        <ChangePassword />
      </S.MyPageSection>
    </>
  );
};

export default Mypage;

import ChangeNickname from "../components/mypage/ChangeNickname";
import ChangePassword from "../components/mypage/ChangePassword";
import MyPosts from "../components/mypage/MyPosts";

import { useAppSelector } from "../hooks";
import { RootState } from "../redux/config/configStore";

import pic from "../assets/profile_elephant.png";
import * as S from "../styles/StMyPage";

const Mypage = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  return (
    <>
      <S.MyProfileSection>
          <S.MyPageTitleBox>
            <S.MyPageTitle>
              <S.HighlightName>{user?.name}</S.HighlightName>님의 프로필
            </S.MyPageTitle>
          </S.MyPageTitleBox>
          <S.ProfilePic src={pic} />
          <ChangeNickname />
          <ChangePassword />

        <S.MyPageTitleBox>
          <S.MyPageTitle>
            <S.HighlightName>{user?.name}</S.HighlightName>님의 작성 글
          </S.MyPageTitle>
        </S.MyPageTitleBox>
          <MyPosts />
      </S.MyProfileSection>
    </>
  );
};

export default Mypage;
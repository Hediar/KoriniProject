import styled from 'styled-components';

export const MyProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  padding: 0 auto;
`;

export const MyPageTitleBox = styled.div`
  width: 95%;
  border-bottom: 2px solid lightgray;
  margin-top: 20px;
`;

export const MyPageTitle = styled.h1`
  font-size: 32px;
  margin: 20px;
`;

export const HighlightName = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.mainPurpleColor};
`;

export const ProfilePic = styled.img`
  width: 300px;
  height: 300px;
  object-fit: scale-down;
  border-radius: 50%;
  background-color: ${(props) => props.theme.mainNavyColor};
  padding: 10px;
  margin: 70px;
`;

export const MyPageForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

export const LabelInputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;

  label {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const MyPageInput = styled.input`
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.mainInputColor};
  width: 300px;
  height: 15px;
  padding: 10px;
`;

export const MyPageErrorMsg = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.errorMsgColor};
  margin: 10px;
`;

export const MainPostsContainer = styled.div`
  margin: 0px auto;
  padding: 30px;
  border-radius: 5px;
`;

export const PostsBoxContainer = styled.div`
  display: grid;
`;

export const title = styled.div`
  margin-left: 20px;
  font-size: 18px;
`;

export const PostBox = styled.div`
  width: 1100px;
  margin: 13px auto;
  font-size: 18px;
  border: 1px solid ${(props) => props.theme.mainPaletteColor2};
  border-radius: 5px;
  flex-direction: column;
  // 넘치는 text 처리
  overflow: hidden;
  height: 150px;
  transition: all 0.2s ease-in-out;

  border-radius: 10px;
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 13px rgba(154, 154, 154, 0.4);
  }
`;

export const PostBoxNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 13px;
  background-color: ${(props) => props.theme.mainNavyColor};
  color: ${(props) => props.theme.whiteColor};
`;

export const PostContentBox = styled.div`
  margin: 10px;
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 25px;
  padding: 15px;
  max-height: 25%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 표시할 줄 수 설정 */
  -webkit-box-orient: vertical; /* 텍스트의 방향 설정 */
`;

export const Outer = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  padding: 0 auto;
`;

export const Nickname = styled.div`
  font-size: 14px;
`;

export const box = styled.div`
  margin-bottom: 28px;
`;

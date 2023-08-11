import styled from 'styled-components';

export const MyProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MyPageTitleBox = styled.div`
  width: 90%;
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
  justify-content: center;
  align-items: center;

  label {
    display: block;
    padding: 20px;
  }
`;

export const MyPageInput = styled.input`
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.mainInputColor};
  width: 200px;
  height: 15px;
  padding: 10px;
`;

export const MyPageErrorMsg = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.errorMsgColor};
  margin: 10px;
`;

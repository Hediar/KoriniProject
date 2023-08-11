import styled from 'styled-components';

const S = {
  MainPostsContainer: styled.div`
    margin: 0px auto;
    padding: 30px;
    border-radius: 5px;
  `,
  PostsBoxContainer: styled.div`
    display: grid;
  `,
  title: styled.div`
    margin-left: 20px;
    font-size: 18px;
  `,
  PostBox: styled.div`
    margin: 13px;
    font-size: 18px;
    border: 1px solid ${(props) => props.theme.mainPaletteColor2};
    border-radius: 5px;
    flex-direction: column;
    // 넘치는 text 처리
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    border-radius: 10px;
    &:hover {
      cursor: pointer;
    }
  `,
  PostBoxNav: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 13px;
    background-color: ${(props) => props.theme.mainNavyColor};
    color: ${(props) => props.theme.whiteColor};
  `,
  PostContentBox: styled.div`
    margin: 10px;
    font-size: 17px;
    letter-spacing: 1px;
    line-height: 25px;
    padding: 15px;
  `,
  Outer: styled.div`
    max-width: 1200px;
    min-width: 800px;
    margin: 0 auto;
    padding: 0 auto;
  `,
  Nickname: styled.div`
    font-size: 14px;
  `,
  box: styled.div`
    margin-bottom: 28px;
  `
};

export { S };

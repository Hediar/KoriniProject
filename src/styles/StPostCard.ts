import styled from 'styled-components';

const S = {
  MainPostsContainer: styled.div`
    margin: 0px auto;
    padding: 30px;
    border-radius: 5px;
  `,
  PostBox: styled.div`
    font-size: 13px;
    margin: 13px;
    font-size: 20px;
    border: 1px solid ${(props) => props.theme.mainPaletteColor2};
    border-radius: 5px;
    flex-direction: column;
    &:hover {
      cursor: pointer;
    }
  `,
  PostBoxNav: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: ${(props) => props.theme.mainNavyColor};
    color: ${(props) => props.theme.whiteColor};
  `,
  PostContentBox: styled.div`
    margin: 10px;
  `
};

export { S };

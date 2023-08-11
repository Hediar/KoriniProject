import styled from 'styled-components';

const S = {
  Layout: styled.div`
    max-width: 1200px;
    min-width: 800px;
    margin: 0 auto;
    padding: 0 auto;
  `,

  FormContainer: styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
  `,

  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  InputContainer: styled.div`
    max-width: 1200px;
    width: 800px;
    margin: 10px;
  `,

  Label: styled.div`
    font-size: 15px;
    padding: 0 0 10px 5px;
  `,

  Select: styled.select`
    width: 798px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    border: 1px ${(props) => props.theme.mainNavyColor} solid;
  `,

  Input: styled.input`
    max-width: 1200px;
    width: 780px;
    padding: 10px;
    outline: none;
    border-radius: 8px;
    border: 1px ${(props) => props.theme.mainNavyColor} solid;
    &::placeholder {
      color: ${(props) => props.theme.blackColor};
    }
  `,

  Textarea: styled.textarea`
    max-width: 1200px;
    width: 780px;
    height: 400px;
    padding: 10px;
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    border: 1px ${(props) => props.theme.mainNavyColor} solid;
    outline: none;
    border-radius: 8px;
    &::placeholder {
      color: ${(props) => props.theme.blackColor};
    }
  `,

  Tag: styled.span`
    color: ${(props) => props.theme.whiteColor};
    background-color: ${(props) => props.theme.mainNavyColor};
    border-radius: 8px;
    padding: 3px 10px 3px 10px;
  `,

  TagContainer: styled.div`
    display: inline-block;
    flex-wrap: wrap;
    padding: 10px 5px 10px 5px;
  `,

  ButtonContainer: styled.div`
    max-width: 1200px;
    width: 200px;
    margin: 10px;
    display: flex;
    justify-content: center;
  `
};

export { S };

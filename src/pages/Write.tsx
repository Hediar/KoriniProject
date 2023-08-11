import React, { useState } from 'react';
import shortid from 'shortid';
import { PostType } from '../types/types';
import { createPost } from '../api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { RootState } from '../redux/config/configStore';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Write = () => {
  const navigate = useNavigate();
  // 유저 정보 가져오기
  const { user } = useAppSelector((state: RootState) => state.user);
  // 입력값 받기
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [inputTag, setInputTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };
  const onChangeInputTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
  };

  // 뒤로가기
  const backButton = () => {
    navigate(-1);
  };

  // 취소
  const cancellButton = () => {
    navigate('/');
  };

  // 해시태그 추가 및 삭제
  const handleHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.key !== 'Enter' && e.key !== 'Backspace') return;
    // 엔터로 해시태그 추가하기
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputTag.trim() !== '') {
        setTags([...tags, inputTag.split(' ').join('')]);
        setInputTag('');
      }
    }
    // 백스페이스로 해시태그 삭제하기
    if (e.key === 'Backspace' && inputTag === '') {
      if (tags.length > 0) {
        const updateTags = tags.slice(0, tags.length - 1);
        setTags(updateTags);
      }
    }
  };

  // Post 추가
  const queryClient = useQueryClient();
  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    }
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      // 유효성 검사
      if (!category) {
        return alert('카테고리를 선택해주세요.');
      }
      if (!title) {
        return alert('제목을 입력해주세요.');
      }
      if (title.length > 100) {
        return alert('제목은 100글자 미만으로 작성해주세요.');
      }
      if (!body) {
        return alert('내용을 입력해주세요.');
      }
      // 날짜
      const currentTime = new Date();
      const formattedDate = currentTime.toISOString();

      const year = currentTime.getFullYear();
      const month = String(currentTime.getMonth() + 1).padStart(2, '0');
      const day = String(currentTime.getDate()).padStart(2, '0');
      const hours = String(currentTime.getHours()).padStart(2, '0');
      const minutes = String(currentTime.getMinutes()).padStart(2, '0');

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      // newPost 선언
      const newPost: PostType = {
        postid: shortid.generate(),
        userid: user.userid,
        name: user.name,
        date: formattedDateTime,
        category,
        title,
        body,
        tags: [...tags]
      };
      // DB 추가
      createMutation.mutate(newPost);
      // 페이지 이동
      navigate(`/detail/${newPost.postid}`);
    } else alert('로그인이 필요합니다.');
  };

  return (
    <Layout>
      <FontAwesomeIcon onClick={backButton} icon={faArrowLeft} style={{ margin: ' 0 0 20px 200px' }} />
      <Container>
        <FormContainer onSubmit={onSubmitHandler}>
          <InputContainer>
            <Label>카테고리</Label>
            <Select onChange={onChangeCategory}>
              <option value={''}>카테고리를 선택해주세요.</option>
              <option value={'학습'}>학습</option>
              <option value={'자유'}>자유</option>
            </Select>
          </InputContainer>
          <InputContainer>
            <Label>제목</Label>
            <Input value={title} onChange={onChangeTitle} placeholder="제목을 입력해주세요." />
          </InputContainer>
          <InputContainer>
            <Label>본문</Label>
            <Textarea value={body} onChange={onChangeBody} placeholder="내용을 입력해주세요." />
          </InputContainer>
          <InputContainer>
            <Label>해시태그</Label>
            {tags.length > 0 &&
              tags.map((tag, index) => {
                return (
                  <TagContainer>
                    <Tag key={index}>#{tag}</Tag>
                  </TagContainer>
                );
              })}
            <Input
              type="text"
              value={inputTag}
              onChange={onChangeInputTag}
              onKeyDown={handleHashTag}
              placeholder="해시태그를 등록해주세요."
              style={{ marginTop: '5px' }}
            />
          </InputContainer>
          <ButtonContainer>
            <Button onClick={cancellButton}>취소</Button>
            <Button>등록</Button>
          </ButtonContainer>
        </FormContainer>
      </Container>
    </Layout>
  );
};

export default Write;

const Layout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  padding: 0 auto;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  max-width: 1200px;
  width: 800px;
  margin: 10px;
`;

const Label = styled.div`
  font-size: 15px;
  padding: 0 0 10px 5px;
`;

const Select = styled.select`
  width: 798px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  border: 1px ${(props) => props.theme.mainNavyColor} solid;
`;

const Input = styled.input`
  max-width: 1200px;
  width: 780px;
  padding: 10px;
  outline: none;
  border-radius: 8px;
  border: 1px ${(props) => props.theme.mainNavyColor} solid;
  &::placeholder {
    color: ${(props) => props.theme.blackColor};
  }
`;

const Textarea = styled.textarea`
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
`;

const Tag = styled.span`
  color: ${(props) => props.theme.whiteColor};
  background-color: ${(props) => props.theme.mainNavyColor};
  border-radius: 8px;
  padding: 3px 10px 3px 10px;
`;

const TagContainer = styled.div`
  display: inline-block;
  flex-wrap: wrap;
  padding: 10px 5px 10px 5px;
`;

const ButtonContainer = styled.div`
  max-width: 1200px;
  width: 800px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #a593e0;
  border: none;
  border-radius: 12px;
  color: white;
  width: 70px;
  height: 30px;
  margin: 10px;
  cursor: pointer;
`;

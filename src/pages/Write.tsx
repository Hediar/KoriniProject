import React, { useState } from 'react';
import shortid from 'shortid';
import { PostType, UserType } from '../types/types';
import { createPost } from '../api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { RootState } from '../redux/config/configStore';

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
  const onChangeTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags([e.target.value]);
  };

  // 뒤로가기
  const backButton = () => {
    navigate(-1);
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
        if (title.length > 100) {
          return alert('제목은 100글자 미만으로 작성해주세요.');
        }
        return alert('제목을 입력해주세요.');
      }
      if (!body) {
        return alert('내용을 입력해주세요.');
      }
      if (!tags) {
        return alert('해시태그를 등록해주세요.');
      }
      // newPost 선언
      const newPost: Omit<PostType, 'date'> = {
        postid: shortid.generate(),
        userid: user.userid,
        name: user.name,
        category,
        title,
        body,
        tags
      };
      // DB 추가
      createMutation.mutate(newPost);
      // 페이지 이동
      navigate(`/detail/${newPost.postid}`);
    } else alert('로그인이 필요합니다.');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h1 style={{ padding: '10px', margin: '10px' }}>글 작성 페이지</h1>
      <form
        onSubmit={onSubmitHandler}
        style={{
          width: '500px',
          height: '400px',
          border: '1px solid black',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <button onClick={backButton}>뒤로가기</button>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          카테고리 :{' '}
          <select onChange={onChangeCategory}>
            <option value={''}>카테고리</option>
            <option value={'학습'}>학습</option>
            <option value={'자유'}>자유</option>
          </select>
        </div>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          제목 : <input value={title} onChange={onChangeTitle} placeholder="제목을 입력해주세요." />
        </div>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          내용 : <textarea value={body} onChange={onChangeBody} placeholder="내용을 입력해주세요." />
        </div>
        {tags.length > 0 &&
          tags.map((tag) => {
            return <div key={tag}>{tag}</div>;
          })}
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          해시태그 : <input value={inputTag} onChange={onChangeInputTag} placeholder="해시태그를 등록해주세요." />
        </div>
        <button>게시글 작성</button>
      </form>
    </div>
  );
};

export default Write;

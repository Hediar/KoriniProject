import React, { useState } from 'react';
import { PostType } from '../types/types';
import { createPost } from '../api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Write = () => {
  const navigate = useNavigate();
  // 입력값 받기
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [hashtag, setHashtag] = useState<string[]>([]);
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };
  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag([e.target.value]);
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
    // 유효성 검사
    // newPost 선언
    const newPost: Omit<PostType, 'id' | 'date'> = {
      userid: '유저아이디',
      name: '유저닉네임',
      category,
      title,
      body,
      tag: hashtag,
      isDeleted: false
    };
    createMutation.mutate(newPost);
    // 입력값 초기화
    // 페이지 이동
    navigate('detail');
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        style={{
          width: '500px',
          height: '500px',
          border: '1px solid black',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <button>뒤로가기</button>
        <h1 style={{ padding: '10px', margin: '10px' }}>글 작성 페이지</h1>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          카테고리 :{' '}
          <select onChange={onChangeCategory}>
            <option value={'학습'}>학습</option>
            <option value={'자유'}>자유</option>
          </select>
        </div>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          제목 : <input value={title} onChange={onChangeTitle} />
        </div>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          내용 : <textarea value={body} onChange={onChangeBody} />
        </div>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          해시태그 : <input value={hashtag} onChange={onChangeHashtag} />
        </div>
        <button>게시글 작성</button>
      </form>
    </>
  );
};

export default Write;

import React, { useState } from 'react';
import shortid from 'shortid';
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
  const [tag, setTag] = useState<string[]>([]);
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };
  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag([e.target.value]);
  };

  // 뒤로가기
  const backButton = () => {
    navigate(-1);
  };

  // Post 추가
  const queryClient = useQueryClient();
  const createMutation = useMutation(createPost, {
    // 필요 없음
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    }
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성 검사
    // newPost 선언
    const newPost: Omit<PostType, 'date'> = {
      postid: shortid.generate(),
      userid: '유저아이디',
      name: '유저닉네임',
      category,
      title,
      body,
      tag
    };
    // DB 추가
    createMutation.mutate(newPost);
    // 입력값 초기화
    // 페이지 이동
    navigate(`/detail/${newPost.postid}`);
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
          제목 : <input value={title} onChange={onChangeTitle} />
        </div>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          내용 : <textarea value={body} onChange={onChangeBody} />
        </div>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          해시태그 : <input value={tag} onChange={onChangeTag} />
        </div>
        <button>게시글 작성</button>
      </form>
    </div>
  );
};

export default Write;

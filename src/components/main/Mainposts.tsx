import { PostType } from '../../types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getPosts } from '../../api/post';

const Mainposts = () => {
  const { isLoading, isError, data } = useQuery<any>(['posts'], () => getPosts());

  useEffect(() => {
    console.log(data);
  }, []);

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>오류 발생</h1>;
  }
  return (
    <>
      {data.map((post: PostType) => {
        return (
          <>
            -----------------------
            <div>post id: {post.postid}</div>
            <div>user id: {post.userid}</div>
            <div>태그: {post.tag}</div>
            <div>제목: {post.title}</div>
            <div>작성자: {post.name}</div>
            <div>내용: {post.body}</div>
            <div>카테고리: {post.category}</div>
            <div>작성날짜: {post.date}</div>
            -----------------------
          </>
        );
      })}
    </>
  );
};

export default Mainposts;

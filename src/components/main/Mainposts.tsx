import { PostType } from '../../types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getPosts } from '../../api/post';
import { useInView } from 'react-intersection-observer';

const Mainposts = () => {
  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    getNextPageParam: (lastPage) => {
      // console.log('last', lastPage);
      return lastPage.length / 10 ? lastPage.length / 10 : false;
    },
    select: (data: any) => {
      return data.pages.flat();
    }
  });

  const { ref } = useInView({
    threshold: 1, // 맨 아래에 교차가 됐을 때
    onChange: (inView) => {
      // 실행
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  useEffect(() => {
    console.log('posts', posts);
  }, [posts]);

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>오류 발생</h1>;
  }
  return (
    <>
      {/* {posts?.map((post: PostType) => {
        return (
          <>
            -----------------------
            <div key={post.postid}>
              <div>user id: {post.userid}</div>
              <div>태그: {post.tag}</div>
              <div>제목: {post.title}</div>
              <div>작성자: {post.name}</div>
              <div>내용: {post.body}</div>
              <div>카테고리: {post.category}</div>
              <div>작성날짜: {post.date}</div>
            </div>
            -----------------------
          </>
        );
      })} */}
      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'green',
          color: 'white',
          width: '100%',
          height: 50
        }}
        ref={ref}
      >
        Trigger to Fetch Here
      </div>
    </>
  );
};

export default Mainposts;

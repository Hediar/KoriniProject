import { ToTalDataType } from '../../types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useMemo, useEffect } from 'react';
import { getPosts } from '../../api/post';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';

const Mainposts = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryKey = pathname === '/' ? ['posts'] : pathname === '/free' ? ['freeposts'] : ['studyposts'];

  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<ToTalDataType>({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => getPosts(pageParam, pathname),
    getNextPageParam: (lastPage) => {
      // 전체 페이지 개수보다 작을 때 다음 페이지로
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    }
  });

  const { ref } = useInView({
    threshold: 1, // 맨 아래에 교차가 됐을 때
    onChange: (inView) => {
      // 교차가 되면 inView = True
      // 실행
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  // select 역할, posts데이터 가공
  const processedPosts = useMemo(() => {
    return posts?.pages
      .map((data) => {
        return data.posts;
      })
      .flat();
  }, [posts]);

  // useEffect(() => {
  //   console.log('key', queryKey);
  //   console.log('posts', posts);
  // }, [posts]);

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>오류 발생</h1>;
  }
  return (
    <>
      {processedPosts?.map((post) => {
        return (
          <>
            -----------------------
            <div
              key={post.postid}
              onClick={() => {
                // 절대경로
                navigate(`/detail/${post.postid}`);
              }}
            >
              {post.postid}
              <div>user id: {post.userid}</div>
              <div>태그: {post.tags}</div>
              <div>제목: {post.title}</div>
              <div>작성자: {post.name}</div>
              <div>내용: {post.body}</div>
              <div>카테고리: {post.category}</div>
              <div>작성날짜: {post.date}</div>
            </div>
            -----------------------
          </>
        );
      })}
      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'white',
          color: 'white',
          width: '100%',
          height: 50
        }}
        ref={ref}
      ></div>
    </>
  );
};

export default Mainposts;

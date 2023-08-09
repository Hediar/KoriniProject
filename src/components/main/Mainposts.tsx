import { PostType, ToTalDataType } from '../../types/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getDataNumber, getPosts } from '../../api/post';
import { useInView } from 'react-intersection-observer';

const Mainposts = () => {
  // 페이지 정보 만들기
  // const { data: totalCount } = useQuery<any>(['mainCount'], getDataNumber);
  // const [dataState, setDataState] = useState(1);

  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<ToTalDataType>({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    getNextPageParam: (lastPage) => {
      console.log('lastPage', lastPage);
      // console.log('allPages', allPages);

      // 전체 데이터 개수보다 작을 때 다음 페이지로
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    }
  });

  console.log('hasNextPage:', hasNextPage);
  const { ref } = useInView({
    threshold: 1, // 맨 아래에 교차가 됐을 때
    onChange: (inView) => {
      // 교차가 되면 inView = True
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

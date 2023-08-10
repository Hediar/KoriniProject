import { ToTalDataType } from '../../types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useMemo, useEffect } from 'react';
import { getPosts } from '../../api/post';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';
import { S } from '../../styles/StPostCard';
import Loading from '../layout/Loading';

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
    return (
      <>
        <Loading />
      </>
    );
  }
  if (isError) {
    return <h1>오류 발생</h1>;
  }
  return (
    <>
      <S.MainPostsContainer>
        <div>글 목록</div>
        {processedPosts?.map((post) => {
          return (
            <>
              <S.PostBox
                key={post.postid}
                onClick={() => {
                  // 절대경로
                  navigate(`/detail/${post.postid}`);
                }}
              >
                <S.PostBoxNav>
                  <div>{post.title}</div>
                  <div>{post.name}</div>
                </S.PostBoxNav>
                <S.PostContentBox>{post.body}</S.PostContentBox>
              </S.PostBox>
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
      </S.MainPostsContainer>
    </>
  );
};

export default Mainposts;

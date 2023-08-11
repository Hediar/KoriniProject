import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../redux/config/configStore';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { ITEMS_PER_PAGE, getMyPosts, getMyPostsNum } from '../../api/post';
import { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import Loading from '../layout/Loading';
import { PostType } from '../../types/types';

import * as S from '../../styles/StMyPage';
import * as P from '../../styles/StPageButton';

const MyPosts = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const { data: myPostsNum } = useQuery(['myPostsNum'], () => getMyPostsNum(user?.userid ?? ''));

  const maxPostPage = Math.ceil(myPostsNum ? myPostsNum / 5 : 1);

  // 프리페칭
  const queryClient = useQueryClient();
  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(['myPosts', nextPage], () => getMyPosts(user?.userid ?? '', nextPage));
    }
  }, [currentPage, queryClient]);

  // 현재 페이지 데이터 불러오기
  const { isLoading, data: myPosts } = useQuery<PostType[]>(['myPosts', currentPage], () =>
    getMyPosts(user?.userid ?? '', currentPage)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <S.MainPostsContainer>
        {myPosts?.map((myPost) => {
          return (
            <S.box key={myPost.postid}>
              <S.PostBox
                onClick={() => {
                  // 절대경로
                  navigate(`/detail/${myPost.postid}`);
                }}
              >
                <S.PostBoxNav>
                  <div>{myPost.title}</div>
                  <S.Nickname>{myPost.name}</S.Nickname>
                </S.PostBoxNav>
                <S.PostContentBox>{myPost.body}</S.PostContentBox>
              </S.PostBox>
            </S.box>
          );
        })}
      </S.MainPostsContainer>
      <P.PageLists>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={ITEMS_PER_PAGE}
          totalItemsCount={myPostsNum ?? 0}
          pageRangeDisplayed={5}
          prevPageText={`◀`}
          nextPageText={`▶`}
          onChange={setCurrentPage}
        />
      </P.PageLists>
    </>
  );
};

export default MyPosts;

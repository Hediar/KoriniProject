import React, { useState } from 'react';
import * as S from '../../styles/StComment';
import { useQuery } from '@tanstack/react-query';
import { fetchComments } from '../../api/comment';
import { useParams } from 'react-router';
import { Comment } from '../../types/types';
import Pagination from './Pagenation';

const Comments = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(1);
  const {
    isLoading,
    isError,
    data: comments
  } = useQuery<any>(
    ['comment', id, page], // queryKey 수정
    () => fetchComments(id!, page), // queryFn 수정
    { keepPreviousData: true }
  );
  console.log('comments', comments);

  const onClickPage = (selected: number | string) => {
    // 같은 페이지를 그대로 클릭시 함수종료
    if (page === selected) return;
    if (typeof selected === 'number') {
      setPage(selected);
      return;
    }
    if (selected === 'prev' && page > 1) {
      setPage((prev) => prev - 1);
      return;
    }
    if (selected === 'next' && page < comments.total_pages) {
      setPage((prev) => prev + 1);
      return;
    }
  };

  return (
    <div>
      <div>
        {isLoading ? (
          <h2>로딩중...</h2>
        ) : (
          <ul>
            {comments?.data?.map((comment: any) => (
              <li key={comment.commentid}>{comment.text}</li>
            ))}
          </ul>
        )}
        <Pagination currentPage={page} totalPages={comments?.totalPages ?? 1} onClick={onClickPage} />
      </div>
    </div>
  );
};

export default Comments;

import { useState, useEffect } from 'react';
import Post from '../components/detail/Post';
import supabase from '../lib/client';
import { Comment } from '../types/types';
import shortid from 'shortid';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { RootState } from '../redux/config/configStore';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { addComment, deleteComment, updateComment } from '../api/comment';

const Detail = () => {
  // 포스트 아이디 가져오기
  const { id } = useParams();
  // 유저 정보 가져오기
  const { user } = useAppSelector((state: RootState) => state.user);
  // 쿼리 클라이언트
  const queryClient = useQueryClient();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<string>('');
  const [editedCommentText, setEditedCommentText] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);

  //작성
  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] });
    }
  });
  const handleCommentSubmit = () => {
    // 유효성 검사
    //날짜 설정
    const currentTime = new Date();
    const formattedDate = currentTime.toISOString();
    // 새로운 댓글 객체 선언
    const createComment: Comment = {
      commentid: shortid.generate(),
      name: '짱구',
      date: formattedDate,
      text: newComment,
      postid: id as string,
      userid: user?.userid as string
    };
    addMutation.mutate(createComment);
  };

  // 삭제
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] });
    }
  });
  const handleCommentDelete = async (commentId: string) => {
    const shouldDelete = window.confirm('삭제 하시겠습니까?');
    if (shouldDelete) {
      deleteMutation.mutate(commentId);
    }
  };

  //수정
  const editMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] });
    }
  });
  const handleCommentEdit = (comment: Comment) => {
    setIsEdit(!isEdit);
    if (!editingCommentId) {
      setEditedCommentText(newComment);
    } else {
      // 수정 댓글
      const editComment = {
        ...comment,
        text: editedCommentText
      };
      editMutation.mutate(editComment);
    }
  };

  //조회
  const { isLoading, isError, data: post } = useQuery<Comment[]>(['comment']);

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>댓글 오류 발생</h1>;
  }
  return (
    <div>
      <Post />
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleCommentSubmit();
            }
          }}
          placeholder="댓글을 작성해주세요!"
        />
        <button onClick={handleCommentSubmit}>작성하기</button>
      </div>
      {comments.map((comment) => (
        <div key={comment.commentid}>
          {comment.name} : "
          {editingCommentId === comment.commentid ? (
            <input type="text" value={editedCommentText} onChange={(e) => setEditedCommentText(e.target.value)} />
          ) : (
            comment.text
          )}
          " ({new Date(comment.date).toLocaleString()})
          {editingCommentId === comment.commentid ? (
            <>
              <button onClick={() => handleCommentEdit(comment)}>저장</button>
            </>
          ) : (
            <>
              <button onClick={() => handleCommentEdit(comment)}>수정</button>
              <button onClick={() => handleCommentDelete(comment.commentid)}>삭제</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Detail;

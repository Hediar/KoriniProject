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
import { fetchComments, addComment, deleteComment, updateComment } from '../api/comment';
import * as S from '../styles/StComment';

const Detail = () => {
  // 포스트 아이디 가져오기
  const { id } = useParams();
  // 유저 정보 가져오기
  const { user } = useAppSelector((state: RootState) => state.user);
  // 쿼리 클라이언트
  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>('');
  const [editedCommentText, setEditedCommentText] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);

  //작성
  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']); // 쿼리 키 수정
    }
  });
  const handleCommentSubmit = () => {
    if (!user) {
      alert('로그인 후에 댓글을 작성할 수 있습니다! 로그인해주세요.');
      return;
    }

    // 유효성 검사
    // 날짜 설정
    const currentTime = new Date();
    const formattedDate = currentTime.toISOString();
    // 새로운 댓글 객체 선언
    const createComment: Comment = {
      commentid: shortid.generate(),
      name: user.name,
      date: formattedDate,
      text: newComment,
      postid: id as string,
      userid: user?.userid as string
    };
    addMutation.mutate(createComment);
    setNewComment('');
  };

  // 삭제
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']); // 쿼리 키 수정
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
      queryClient.invalidateQueries(['comment']); // 쿼리 키 수정
    }
  });

  const handleCommentEdit = (comment: Comment) => {
    if (editingCommentId === comment.commentid) {
      // 이미 수정 중인 댓글인 경우, 수정된 내용을 저장하고 수정 모드 종료
      const editComment = {
        ...comment,
        text: editedCommentText
      };
      editMutation.mutate(editComment);
      setEditingCommentId(null);
    } else {
      // 수정 모드로 변경
      setEditingCommentId(comment.commentid);
      setEditedCommentText(comment.text);
    }
  };

  //조회
  const { isLoading, isError, data: comments } = useQuery<Comment[]>(['comment'], () => fetchComments(id ?? ''));
  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>댓글 오류 발생</h1>;
  }

  return (
    <S.Outer>
      <Post />
      <S.CommentContainer>
        같이 이야기를 나눠보아요
        <S.WritetInputBox>
          <S.WriteInput
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
          <S.WriteButton onClick={handleCommentSubmit}>작성</S.WriteButton>
        </S.WritetInputBox>
        {comments.map((comment) => (
          <S.Comment key={comment.commentid}>
            {comment.name} :
            {comment.commentid === editingCommentId ? (
              <input type="text" value={editedCommentText} onChange={(e) => setEditedCommentText(e.target.value)} />
            ) : (
              comment.text
            )}
            {' ('}
            {new Date(comment.date).toLocaleString()}
            {')'}
            {user?.userid === comment.userid && (
              <S.ButtonBox>
                <S.button onClick={() => handleCommentEdit(comment)}>
                  {comment.commentid === editingCommentId ? '저장' : '수정'}
                </S.button>
                <S.button onClick={() => handleCommentDelete(comment.commentid)}>삭제</S.button>
              </S.ButtonBox>
            )}
          </S.Comment>
        ))}
      </S.CommentContainer>
    </S.Outer>
  );
};

export default Detail;

import { useState, useEffect } from 'react';
import Post from '../components/detail/Post';
import supabase from '../lib/client';
import { Comment } from '../types/types';

const Detail = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState<string>('');

  useEffect(() => {
    fetchComments();
  }, []);

  //작성
  const handleCommentSubmit = async () => {
    try {
      const currentTime = new Date();
      const formattedDate = currentTime.toISOString();

      const { data, error } = await supabase
        .from('comment')
        .insert([{ nickname: '짱구', date: formattedDate, text: newComment }]);

      if (error) {
        console.error('Error add comment:', error);
      } else {
        console.log('Comment add successfully:', data);
        setNewComment('');
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //삭제
  const handleCommentDelete = async (commentId: number) => {
    try {
      const { error } = await supabase.from('comment').delete().eq('id', commentId);

      if (error) {
        console.error('Error delete comment:', error);
      } else {
        console.log('Comment delete successfully');
        fetchComments();
        alert('삭제 하시겠습니까?');
      }
    } catch (error) {
      console.log(error);
    }
  };
  //수정
  const handleCommentEdit = (commentId: number, commentText: string) => {
    setEditingCommentId(commentId);
    setEditedCommentText(commentText);
  };
  //수정 후 저장
  const handleCommentSave = async (commentId: number) => {
    try {
      const { error } = await supabase.from('comment').update({ text: editedCommentText }).eq('id', commentId);

      if (error) {
        console.error('Error update comment:', error);
      } else {
        console.log('Comment update successfully');
        setEditingCommentId(null);
        setEditedCommentText('');
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //조회
  const fetchComments = async () => {
    try {
      const { data } = await supabase.from('comment').select('*');
      setComments(data as Comment[]);
    } catch (error) {
      console.log(error);
    }
  };

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
        <div key={comment.id}>
          {comment.nickname} : "
          {editingCommentId === comment.id ? (
            <input type="text" value={editedCommentText} onChange={(e) => setEditedCommentText(e.target.value)} />
          ) : (
            comment.text
          )}
          " ({new Date(comment.date).toLocaleString()})
          {editingCommentId === comment.id ? (
            <>
              <button onClick={() => handleCommentSave(comment.id)}>저장</button>
            </>
          ) : (
            <>
              <button onClick={() => handleCommentEdit(comment.id, comment.text)}>수정</button>
              <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
export default Detail;

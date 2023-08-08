import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import { Comment } from '../types/types';

const Mypage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState<string>('');

  useEffect(() => {
    fetchComments();
  }, []);

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

  const handleCommentDelete = async (commentId: number) => {
    try {
      const { error } = await supabase.from('comment').delete().eq('id', commentId);

      if (error) {
        console.error('Error deleting comment:', error);
      } else {
        console.log('Comment deleted successfully');
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentEdit = (commentId: number, commentText: string) => {
    setEditingCommentId(commentId);
    setEditedCommentText(commentText);
  };

  const handleCommentSave = async (commentId: number) => {
    try {
      const { error } = await supabase.from('comment').update({ text: editedCommentText }).eq('id', commentId);

      if (error) {
        console.error('Error updating comment:', error);
      } else {
        console.log('Comment updated successfully');
        setEditingCommentId(null);
        setEditedCommentText('');
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <h1>Detail</h1>
      <div>
        <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="댓글 작성" />
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

export default Mypage;

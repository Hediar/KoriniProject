import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabase';

interface Comment {
  id: number;
  nickname: string;
  date: number;
}

const Mypage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    fetchComments();
  }, []); // Fetch comments on initial render

  const handleCommentSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('comment')
        .insert([{ nickname: 'User', date: Date.now(), text: newComment }]);

      if (error) {
        console.error('Error adding comment:', error);
      } else {
        console.log('Comment added successfully:', data);
        setNewComment(''); // Clear the input field
        fetchComments(); // Fetch comments again to include the new comment
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await supabase.from('comment').select('*');
      console.log('data', data);
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
          {comment.nickname}, {new Date(comment.date).toLocaleString()}
        </div>
      ))}
    </div>
  );
};

export default Mypage;

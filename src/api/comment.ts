import supabase from '../lib/client';
import shortid from 'shortid';
import { Comment } from '../types/types';

// 전체 조회
const fetchComments = async () => {
  const { data } = await supabase.from('comment').select('*');
  return data;
};

// 작성
const addComment = async (createComment: Comment) => {
  await supabase.from('comment').insert(createComment);
};

// 삭제
const deleteComment = async (commentId: string) => {
  await supabase.from('comment').delete().eq('commentid', commentId);
};

// 수정
const updateComment = async (editComment: Comment) => {
  await supabase.from('comment').update(editComment);
};

export { fetchComments, addComment, deleteComment, updateComment };

import supabase from '../lib/client';
import shortid from 'shortid';
import { Comment } from '../types/types';

// 게시글에 맞는 댓글 조회
const fetchComments = async (id: string): Promise<any> => {
  const { data } = await supabase.from('comment').select().eq('postid', id);
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
  await supabase.from('comment').update(editComment).eq('commentid', editComment.commentid);
};

export { fetchComments, addComment, deleteComment, updateComment };

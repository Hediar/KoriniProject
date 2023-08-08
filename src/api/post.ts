import supabase from '../lib/client';
import { PostType } from '../types/types';

// Post 전체조회
const getPosts = async (): Promise<any> => {
  const { data } = await supabase.from('post').select('*');
  return data;
};
// Post 상세조회
const getPost = async (id: string | undefined): Promise<PostType> => {
  const { data } = await supabase.from('post').select().eq('postid', id).single();
  return data;
};

// Post 추가
const createPost = async (newPost: Omit<PostType, 'date'>): Promise<void> => {
  await supabase.from('post').insert(newPost);
};

// Post 삭제
const deletePost = async (id: string): Promise<void> => {
  await supabase.from('post').delete().eq('postid', id);
};

// Post 수정
const updatePost = async (editPost: PostType): Promise<void> => {
  await supabase.from('post').update(editPost).eq('postid', editPost.postid);
};

export { getPosts, getPost, createPost, deletePost, updatePost };

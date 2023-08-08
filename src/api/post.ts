import supabase from '../lib/client';
import { PostType } from '../types/types';

// Post 조회
const getPosts = async () => {
  const { data } = await supabase.from('post').select('*');
  return data;
};

// Post 추가
const createPost = async (newPost: Omit<PostType, 'id' | 'date'>) => {
  await supabase.from('post').insert(newPost);
};

export { getPosts, createPost };

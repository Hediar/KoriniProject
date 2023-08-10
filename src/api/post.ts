import supabase from '../lib/client';
import { PostType, ToTalDataType } from '../types/types';

const getPosts = async (pageParam: number = 1): Promise<ToTalDataType> => {
  const { data } = await supabase
    .from('post')
    .select('*')
    .range(pageParam * 10 - 10, pageParam * 10 - 1);
  const { count } = await supabase.from('post').select('count', { count: 'exact' });

  // 총 페이지 개수 계산
  const total_pages = count ? Math.floor(count / 10) + (count % 10 === 0 ? 0 : 1) : 1;

  return { posts: data as PostType[], page: pageParam, total_pages, total_results: count };
};

// Post 전체조회
// const getPosts = async (pageParam: number): Promise<PostType[]> => {
//   const { data } = await supabase
//     .from('post')
//     .select('*')
//     .range(pageParam * 10 - 10, pageParam * 10 - 1);

//   return data as PostType[];
// };

// 데이터 개수 조회
const getDataNumber = async () => {
  const { count } = await supabase.from('post').select('count', { count: 'exact' });
  return count;
};

// Post 상세조회
const getPost = async (id: string): Promise<PostType> => {
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

export { getPosts, getDataNumber, getPost, createPost, deletePost, updatePost };

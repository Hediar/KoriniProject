import supabase from '../lib/client';
import { PostType, ToTalDataType } from '../types/types';

const getPosts = async (pageParam: number = 1, param?: string): Promise<ToTalDataType> => {
  let data: any = [];
  let count = null;

  if (param === '/free') {
    const freePosts = await supabase
      .from('post')
      .select('*')
      .order('date', { ascending: false })
      .eq('category', '자유')
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = freePosts.data;

    const { count: freeCount } = await supabase.from('post').select('count', { count: 'exact' }).eq('category', '자유');

    count = freeCount;
  } else if (param === '/study') {
    const studyPosts = await supabase
      .from('post')
      .select('*')
      .order('date', { ascending: false })
      .eq('category', '학습')
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = studyPosts.data;

    const { count: studyCount } = await supabase
      .from('post')
      .select('count', { count: 'exact' })
      .eq('category', '학습');

    count = studyCount;
  } else {
    const allPosts = await supabase
      .from('post')
      .select('*')
      .order('date', { ascending: false })
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = allPosts.data;

    const { count: allCount } = await supabase.from('post').select('count', { count: 'exact' });
    count = allCount;
  }

  // 총 페이지 개수 계산
  const total_pages = count ? Math.floor(count / 10) + (count % 10 === 0 ? 0 : 1) : 1;

  return { posts: data as PostType[], page: pageParam, total_pages, total_results: count };
};

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
const createPost = async (newPost: PostType): Promise<void> => {
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

// 내가 쓴 글 조회
export const ITEMS_PER_PAGE = 5;
const getMyPosts = async (userid: string, pageNum: number): Promise<PostType[]> => {
  const startIndex = (pageNum - 1) * ITEMS_PER_PAGE;
  const { data } = await supabase
    .from('post')
    .select('*')
    .eq('userid', userid)
    .range(startIndex, startIndex + ITEMS_PER_PAGE - 1)
    .order('date', { ascending: false });
  return data as PostType[];
};

// 내가 쓴 글 전체 개수
const getMyPostsNum = async (userid: string) => {
  if (!userid) return null;
  const { count } = await supabase.from('post').select('*', { count: 'exact' }).eq('userid', userid);
  return count ?? 0;
};

export { getPosts, getDataNumber, getPost, createPost, deletePost, updatePost, getMyPosts, getMyPostsNum };

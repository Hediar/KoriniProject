import { useQuery } from 'react-query';
import { getPosts } from '../../api/post';

const Post = () => {
  // Post 조회
  const { isLoading, isError, data: posts } = useQuery('post', getPosts);

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>오류 발생</h1>;
  }
  return (
    <>
      <h1 style={{ padding: '10px', margin: '10px' }}>상세페이지</h1>
      {posts?.map((post) => {
        return (
          <div
            key={post.postid}
            style={{
              width: '500px',
              height: '400px',
              border: '1px solid black',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
              {post.category}
            </div>
            <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
              {post.title}
            </div>
            <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
              {post.date}
            </div>
            <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
              {post.name}
            </div>
            <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
              {post.body}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Post;

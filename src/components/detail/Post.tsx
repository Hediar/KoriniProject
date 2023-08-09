import { PostType } from '../../types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, getPost, updatePost } from '../../api/post';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../redux/config/configStore';

const Post = () => {
  const navigate = useNavigate();
  // 유저 정보 가져오기
  const { user } = useAppSelector((state: RootState) => state.user);
  // Post id 가져오기
  const { id } = useParams<{ id: string }>();

  // Post 상세조회
  const { isLoading, isError, data: post } = useQuery<PostType>(['post', id], () => getPost(id as string));

  // 수정 여부 및 수정 입력값 받기
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [inputTag, setInputTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };
  const onChangeInputTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
  };
  const onChangeTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags([e.target.value]);
  };

  // 뒤로가기
  const backButton = () => {
    navigate(-1);
  };

  // 해시태그 추가 및 삭제
  const handleHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터로 해시태그 추가하기
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputTag.trim() !== '') {
        setTags([...tags, inputTag.trim()]);
        setInputTag('');
      }
    }
    // 백스페이스로 해시태그 삭제하기
    if (e.key === 'Backspace' && inputTag === '') {
      if (tags.length > 0) {
        const updateTags = tags.slice(0, tags.length - 1);
        setTags(updateTags);
      }
    }
  };

  // Post 삭제
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    }
  });
  const deleteButton = (id: string) => {
    // 삭제 확인
    const confirm = window.confirm('게시물을 삭제하시겠습니까?');
    if (confirm) {
      // DB 삭제
      deleteMutation.mutate(id);
      // 페이지 이동 (어디로? 게시판 혹은 메인)
      navigate('/');
    }
  };

  // Post 수정
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    }
  });
  const editButton = (post: PostType) => {
    setIsEdit(!isEdit);
    // 수정된 Post 선언
    if (!isEdit) {
      setTitle(post.title);
      setBody(post.body);
    } else {
      const editPost = {
        ...post,
        title,
        body,
        tags: [...tags]
      };
      updateMutation.mutate(editPost);
      setIsEdit(!isEdit);
    }
  };

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>오류 발생</h1>;
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h1 style={{ padding: '10px', margin: '10px' }}>상세페이지</h1>
      <div
        key={post.postid}
        style={{
          width: '500px',
          height: '500px',
          border: '1px solid black',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <button onClick={backButton}>뒤로가기</button>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          카테고리 : {post.category}
        </div>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          닉네임 : {post.name}
        </div>
        <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
          작성일 : {post.date}
        </div>
        {isEdit ? (
          <>
            <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
              제목 : <input value={title} onChange={onChangeTitle} />
            </div>
            <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
              내용 : <textarea value={body} onChange={onChangeBody} />
            </div>
            {tags.length > 0 &&
              tags.map((tag, index) => {
                return (
                  <>
                    <span key={index} style={{ backgroundColor: 'green', color: 'white' }}>
                      #{tag}
                    </span>
                  </>
                );
              })}
            <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
              해시태그 :{' '}
              <input
                type="text"
                value={inputTag}
                onChange={onChangeInputTag}
                onKeyDown={handleHashTag}
                placeholder="해시태그를 등록해주세요."
              />
            </div>
          </>
        ) : (
          <>
            <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
              제목 : {post.title}
            </div>
            <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
              내용 : {post.body}
            </div>
            <div style={{ width: '400px', border: '1px solid black', padding: '20px', margin: '10px' }}>
              해시태그 :{' '}
              {post.tags.length > 0 &&
                post.tags.map((tag, index) => {
                  return (
                    <>
                      <span key={index} style={{ backgroundColor: 'green', color: 'white' }}>
                        #{tag}
                      </span>{' '}
                      &nbsp;
                    </>
                  );
                })}
            </div>
          </>
        )}
      </div>
      {user?.userid === post.userid && (
        <div style={{ padding: '10px', margin: '10px' }}>
          <button onClick={() => deleteButton(post.postid)}>삭제</button>
          <button onClick={() => editButton(post)}>{isEdit ? '저장' : '수정'}</button>
        </div>
      )}
    </div>
  );
};

export default Post;

import { PostType } from '../../types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, getPost, updatePost } from '../../api/post';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../redux/config/configStore';
import { S } from '../../styles/StPost';
import * as G from '../../styles/StButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Post = () => {
  const navigate = useNavigate();
  // 유저 정보 가져오기
  const { user } = useAppSelector((state: RootState) => state.user);
  // Post id 가져오기
  const { id } = useParams<{ id: string }>();

  // Post 상세조회
  const { isLoading, isError, data: post } = useQuery<PostType>(['post', id], () => getPost(id ?? ''));

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

  // 뒤로가기
  const backButton = () => {
    navigate(-1);
  };

  // 해시태그 추가 및 삭제
  const handleHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.key !== 'Enter' && e.key !== 'Backspace') return;
    // 엔터로 해시태그 추가하기
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputTag.trim() !== '') {
        setTags([...tags, inputTag.split(' ').join('')]);
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
      queryClient.invalidateQueries({ queryKey: ['post', id] });
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
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    }
  });
  const editButton = (post: PostType) => {
    setIsEdit(!isEdit);
    // 수정된 Post 선언
    if (!isEdit) {
      setTitle(post.title);
      setBody(post.body);
      setTags(post.tags);
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
    <S.Layout>
      <FontAwesomeIcon onClick={backButton} icon={faArrowLeft} style={{ marginLeft: '20px' }} />
      {user?.userid === post.userid && (
        <S.ButtonContainer>
          <div>
            <G.Button onClick={() => deleteButton(post.postid)} width="70px">
              삭제
            </G.Button>
            <G.Button onClick={() => editButton(post)} width="70px" style={{ marginRight: '20px' }}>
              {isEdit ? '저장' : '수정'}
            </G.Button>
          </div>
        </S.ButtonContainer>
      )}
      <S.PostContainer key={post.postid}>
        <S.Category>{post.category}</S.Category>
        {isEdit ? (
          <S.Box>
            <S.Info>(수정중)&nbsp;{post.date}</S.Info>
            <S.EditTitle value={title} onChange={onChangeTitle} style={{ fontSize: '28px', fontWeight: '500' }} />
          </S.Box>
        ) : (
          <S.Box>
            <S.Info>{post.date}</S.Info>
            <S.Title>{post.title}</S.Title>
          </S.Box>
        )}
        <S.Name>{post.name}</S.Name>
        {isEdit ? (
          <>
            <S.Box>
              <S.Textarea value={body} onChange={onChangeBody} />
            </S.Box>
            <S.Box>
              {tags.length > 0 &&
                tags.map((tag, index) => {
                  return (
                    <S.TagContainer>
                      <S.Tag key={index}>#{tag}</S.Tag>
                    </S.TagContainer>
                  );
                })}

              <S.Input
                type="text"
                value={inputTag}
                onChange={onChangeInputTag}
                onKeyDown={handleHashTag}
                placeholder="해시태그를 수정할 수 있습니다."
              />
            </S.Box>
          </>
        ) : (
          <>
            <S.Content>{post.body}</S.Content>
            <S.Box>
              {post.tags.length > 0 &&
                post.tags.map((tag, index) => {
                  return (
                    <S.TagContainer>
                      <S.Tag key={index}>#{tag}</S.Tag>
                    </S.TagContainer>
                  );
                })}
            </S.Box>
          </>
        )}
      </S.PostContainer>
    </S.Layout>
  );
};

export default Post;

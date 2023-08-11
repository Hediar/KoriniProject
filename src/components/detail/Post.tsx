import { PostType } from '../../types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, getPost, updatePost } from '../../api/post';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../redux/config/configStore';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Post = () => {
  const navigate = useNavigate();
  // 유저 정보 가져오기
  const { user } = useAppSelector((state: RootState) => state.user);
  // Post id 가져오기
  const { id } = useParams<{ id: string }>();

  // Post 상세조회
  const { isLoading, isError, data: post } = useQuery<PostType>(['post'], () => getPost(id ?? ''));

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
    <Layout>
      <FontAwesomeIcon onClick={backButton} icon={faArrowLeft} style={{ marginLeft: '20px' }} />
      {user?.userid === post.userid && (
        <ButtonContainer>
          <div>
            <Button onClick={() => deleteButton(post.postid)}>삭제</Button>
            <Button onClick={() => editButton(post)} style={{ marginRight: '20px' }}>
              {isEdit ? '저장' : '수정'}
            </Button>
          </div>
        </ButtonContainer>
      )}
      <PostContainer key={post.postid}>
        <Category>{post.category}</Category>
        {isEdit ? (
          <Box>
            <Info>(수정중)&nbsp;{post.date}</Info>
            <Input value={title} onChange={onChangeTitle} style={{ fontSize: '28px', fontWeight: '500' }} />
          </Box>
        ) : (
          <Box>
            <Info>{post.date}</Info>
            <Title>{post.title}</Title>
          </Box>
        )}
        <Name>{post.name}</Name>
        {isEdit ? (
          <>
            <Box>
              <Textarea value={body} onChange={onChangeBody} />
            </Box>
            <Box>
              {tags.length > 0 &&
                tags.map((tag, index) => {
                  return (
                    <TagContainer>
                      <Tag key={index}>#{tag}</Tag>
                    </TagContainer>
                  );
                })}

              <Input
                type="text"
                value={inputTag}
                onChange={onChangeInputTag}
                onKeyDown={handleHashTag}
                placeholder="해시태그를 수정할 수 있습니다."
              />
            </Box>
          </>
        ) : (
          <>
            <Content>{post.body}</Content>
            <Box>
              {post.tags.length > 0 &&
                post.tags.map((tag, index) => {
                  return (
                    <TagContainer>
                      <Tag key={index}>#{tag}</Tag>
                    </TagContainer>
                  );
                })}
            </Box>
          </>
        )}
      </PostContainer>
    </Layout>
  );
};

export default Post;

const Layout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  padding: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;

const PostContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-top: 2px ${(props) => props.theme.mainNavyColor} solid;
  border-bottom: 2px ${(props) => props.theme.mainNavyColor} solid;
  margin: 20px;
  padding: 40px;
`;

const Category = styled.div`
  font-size: 20px;
  max-width: 1200px;
  width: 800px;
  margin-left: 5px;
  padding: 0 auto;
`;

const Name = styled.div`
  font-size: 16px;
  max-width: 1200px;
  width: 800px;
  margin: 10px;
  padding: 0 auto;
`;

const Info = styled.div`
  font-size: 16px;
  max-width: 1200px;
  width: 800px;
  text-align: right;
  padding: 0 auto;
`;

const Box = styled.div`
  max-width: 1200px;
  width: 800px;
  margin: 20px;
  padding: 0 auto;
`;

const Title = styled.div`
  max-width: 1200px;
  width: 800px;
  margin: 20px 0 20px 0;
  padding: 0 auto;
  font-size: 28px;
  font-weight: bold;
`;

const Content = styled.div`
  font-size: 18px;
  line-height: 1.5;
  max-width: 1200px;
  width: 800px;
  margin: 20px;
  padding: 0 auto;
`;

const Tag = styled.span`
  color: ${(props) => props.theme.whiteColor};
  background-color: ${(props) => props.theme.mainNavyColor};
  border-radius: 8px;
  padding: 3px 10px 3px 10px;
  margin-right: 5px;
`;

const TagContainer = styled.div`
  display: inline-block;
  flex-wrap: wrap;
  padding: 10px 5px 10px 5px;
`;

const Input = styled.input`
  max-width: 1200px;
  width: 780px;
  margin-top: 20px;
  padding: 10px;
  outline: none;
  border-radius: 8px;
  border: 1px ${(props) => props.theme.mainNavyColor} solid;
  &::placeholder {
    color: ${(props) => props.theme.blackColor};
  }
`;

const Textarea = styled.textarea`
  max-width: 1200px;
  width: 800px;
  height: 200px;
  font-family: 'Pretendard-Regular';
  line-height: 1.5;
  font-size: 14px;
  border: 1px ${(props) => props.theme.mainNavyColor} solid;
  outline: none;
  border-radius: 8px;
  &::placeholder {
    color: ${(props) => props.theme.blackColor};
  }
`;

const Button = styled.button`
  background-color: #a593e0;
  border: none;
  border-radius: 12px;
  color: white;
  width: 60px;
  height: 30px;
  margin-right: 10px;
  margin-top: 15px;
  cursor: pointer;
`;

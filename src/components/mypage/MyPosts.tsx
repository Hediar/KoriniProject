import { useAppSelector } from "../../hooks";
import { RootState } from "../../redux/config/configStore";

import { useQuery } from "@tanstack/react-query";
import { getMyPosts } from "../../api/post";

import { PostType } from "../../types/types";

import Loading from "../layout/Loading";
import { useNavigate } from "react-router-dom";

import { S } from '../../styles/StPostCard';

const MyPosts = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.user);

  const { isLoading, isError, data: myPosts } = useQuery<PostType[]>(['myPosts'], () => getMyPosts(user?.userid ?? ''));

  // 페이지네이션

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h2>내가 쓴 글들</h2>
      {myPosts?.map((myPost) => {
        return (
          <S.box>
            <div key={myPost.postid}>
            <S.PostBox onClick={() => {navigate(`/detail/${myPost.postid}`)}}>{myPost.title}</S.PostBox>
          </div>
          </S.box>
        )
      })}
    </>
  )
}

export default MyPosts;
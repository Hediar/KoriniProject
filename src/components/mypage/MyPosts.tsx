import { useAppSelector } from "../../hooks";
import { RootState } from "../../redux/config/configStore";
import supabase from "../../lib/client";
import { useQuery } from "@tanstack/react-query";

const MyPosts = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  console.log("myposts user >> ", user)

  // user.id와 supabase post DB의 userid 비교해서 같은 것만 가져오기
  // 무한 스크롤 😭

  return (
    <>
      <h2>내가 쓴 글들</h2>
    </>
  )
}

export default MyPosts
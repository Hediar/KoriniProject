import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../redux/config/configStore';
import updateUserNickname from '../../api/editprofile';
import { updateUserName } from '../../redux/module/userSlice';

import * as S from '../../styles/StMyPage';
import * as G from '../../styles/StButton';

const ChangeNickname = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  // store에서 가져온 user 닉네임 state에 설정
  const [userName, setUserName] = useState(user?.name);
  useEffect(() => {
    setUserName(user?.name);
  }, [user?.name]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.name === userName) {
      alert('현재 사용 중인 닉네임과 변경하려는 닉네임이 같습니다.');
      return false;
    } else if (user?.userid && userName) {
      updateUserNickname(user.userid, userName);
      dispatch(updateUserName(userName));
      alert('닉네임이 정상적으로 변경되었습니다!');
    }
  };

  return (
    <>
      {user && (
        <>
          <S.LabelInputBox>
            <label htmlFor="email">가입 이메일</label>
            <S.MyPageInput id="email" value={user.email} disabled />
          </S.LabelInputBox>
          <form onSubmit={onSubmit}>
            <S.LabelInputBox>
              <label htmlFor="nickname">닉네임</label>
              <S.MyPageInput id="nickname" value={userName} onChange={onChange} required />
              <G.Button type="submit" width="70px">
                수정
              </G.Button>
            </S.LabelInputBox>
          </form>
        </>
      )}
    </>
  );
};

export default ChangeNickname;

import supabase from '../../lib/client';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import * as S from '../../styles/StMyPage';
import * as G from '../../styles/StButton';

interface IFormInput {
  password: string;
  passwordCheck: string;
}

const ChangePassword = () => {
  const { register, handleSubmit, formState } = useForm<IFormInput>();

  const onSubmit = async (formValues: IFormInput) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: formValues.password
      });

      if (error) {
        if (error.message === 'New password should be different from the old password.') {
          // 새 비밀번호가 이전 비밀번호와 같은 경우
          window.alert('기존 비밀번호와 변경 비밀번호가 같습니다. 다른 비밀번호로 시도해주세요.');
          return false;
        } else {
          console.log(error, typeof error);
          window.alert('비밀번호가 정상적으로 변경되지 않았습니다. 다시 시도해주세요.');
          return false;
        }
      }
      if (data) {
        window.alert('비밀번호가 정상적으로 변경되었습니다.');
        return false;
      }
    } catch (error) {
      console.log(error);
      window.alert('비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.');
      return false;
    }
  };

  return (
    <>
      <S.MyPageForm onSubmit={handleSubmit(onSubmit)}>
        <S.LabelInputBox>
          <label htmlFor="password">비밀번호 변경</label>
          <S.MyPageInput
            id="password"
            type="password"
            {...register('password', {
              required: '새 비밀번호를 입력하세요.',
              minLength: {
                value: 6,
                message: '비밀번호는 6자 이상 입력해주세요.'
              }
            })}
          />
        </S.LabelInputBox>
        <ErrorMessage
          errors={formState.errors}
          name="password"
          render={({ message }) => <S.MyPageErrorMsg>{message}</S.MyPageErrorMsg>}
        />
        <S.LabelInputBox>
          <label htmlFor="passwordCheck">비밀번호 변경 확인</label>
          <S.MyPageInput
            id="passwordCheck"
            type="password"
            {...register('passwordCheck', {
              validate: (value, formValues) =>
                value === formValues.password || '비밀번호와 비밀번호 확인이 일치하지 않습니다.'
            })}
          />
        </S.LabelInputBox>
        <ErrorMessage
          errors={formState.errors}
          name="passwordCheck"
          render={({ message }) => <S.MyPageErrorMsg>{message}</S.MyPageErrorMsg>}
        />
        <G.Button type="submit">비밀번호 변경</G.Button>
      </S.MyPageForm>
    </>
  );
};

export default ChangePassword;

import supabase from "../../lib/client";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface IFormInput {
  password: string;
  passwordCheck: string;
}

const ChangePassword = () => {
  const { register, handleSubmit, formState } = useForm<IFormInput>();

  const onSubmit = async (formValues: IFormInput) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: formValues.password,
      });

      if (error) {
        console.log(error);
        window.alert("비밀번호가 정상적으로 변경되지 않았습니다. 다시 시도해주세요.");
      }
      if (data) {
        window.alert("비밀번호가 정상적으로 변경되었습니다.");
      }
    } catch (error) {
      console.log(error);
      window.alert("비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="password"
          {...register("password", {
            required: "새 비밀번호를 입력하세요.",
          })}
        />
        <ErrorMessage
          errors={formState.errors}
          name="password"
          render={({ message }) => <p>{message}</p>}
        />
        <input
          type="password"
          {...register("passwordCheck", {
            validate: (value, formValues) =>
              value === formValues.password ||
              "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
          })}
        />
        <ErrorMessage
          errors={formState.errors}
          name="passwordCheck"
          render={({ message }) => <p>{message}</p>}
        />
        <button type="submit">비밀번호 변경</button>
      </form>
    </>
  );
};

export default ChangePassword;

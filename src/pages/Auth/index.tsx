import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AuthHeader } from "../../components/AuthHeader";
import { AuthLogin } from "../../components/AuthLogin";
import { AuthLayout } from "../../layout/auth";
import { UserActions } from "../../store/userSlice";
import { UserProps } from "../../@types/User";

export const AuthPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: any) => state.user);

  const handlerLogin = (userLogin: UserProps): any => {
    const userExist = users.find(
      (user: UserProps) => user.email === userLogin.email
    );
    if (!userExist) {
      return alert("Usuario não existe");
    }
    if (userExist.password !== userLogin.password) {
      return alert("Senha errada");
    } else {
      dispatch(UserActions.logIn());
      <Redirect to="/" />;
    }
  };
  return (
    <AuthLayout>
      <AuthHeader />
      <AuthLogin handlerLogin={handlerLogin} />
    </AuthLayout>
  );
};

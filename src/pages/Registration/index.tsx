import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { UserActions } from "../../store/userSlice";
import { AuthHeader } from "../../components/AuthHeader";
import { AuthRegistration } from "../../components/AuthRegistration";
import { AuthLayout } from "../../layout/auth";
import { UserProps } from "../../@types/User";

export const Registration = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const handleProps = (user: UserProps): any => {
    dispatch(UserActions.addUser(user));
    console.log(user);
    push("/");
  };

  return (
    <AuthLayout>
      <AuthHeader />
      <AuthRegistration handlerLogin={handleProps} />
    </AuthLayout>
  );
};

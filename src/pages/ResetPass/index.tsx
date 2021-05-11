import { UserProps } from "../../@types/User";
import { AuthHeader } from "../../components/AuthHeader";
import { AuthResetPass } from "../../components/AuthResetPass";
import { AuthLayout } from "../../layout/auth";
import { useHistory } from "react-router-dom";

export const ResetPassword = () => {
  const { push } = useHistory();
  const handleSubmit = (user: UserProps) => {
    //Find email, show modal when mensage
    push("/");
    console.log(user.email);
  };

  return (
    <AuthLayout>
      <AuthHeader />
      <AuthResetPass handlerLogin={handleSubmit} />
    </AuthLayout>
  );
};

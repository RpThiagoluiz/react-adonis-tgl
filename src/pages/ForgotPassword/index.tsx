import { AuthHeader } from "../../components/AuthHeader";
import { AuthForgotPassword } from "../../components/AuthForgotPassword";
import { AuthLayout } from "../../layout/auth";

export const Forgotpassword = () => {
  return (
    <AuthLayout>
      <AuthHeader />
      <AuthForgotPassword />
    </AuthLayout>
  );
};

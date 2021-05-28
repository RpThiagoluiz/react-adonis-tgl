import { AuthHeader } from "../../components/AuthHeader";
import { AuthResetPassword } from "../../components/AuthResetPassword";
import { AuthLayout } from "../../layout/auth";

export const ResetPassword = () => {
  return (
    <AuthLayout>
      <AuthHeader />
      <AuthResetPassword />
    </AuthLayout>
  );
};

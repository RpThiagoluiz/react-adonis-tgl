import { AuthHeader } from "../../components/AuthHeader";
import { AuthResetPass } from "../../components/AuthResetPass";
import { AuthLayout } from "../../layout/auth";

export const ResetPassword = () => (
  <AuthLayout>
    <AuthHeader />
    <AuthResetPass />
  </AuthLayout>
);

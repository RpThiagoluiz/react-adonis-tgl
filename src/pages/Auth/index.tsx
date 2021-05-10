import { AuthHeader } from "../../components/AuthHeader";
import { AuthLogin } from "../../components/AuthLogin";
import { AuthLayout } from "../../layout/auth";

export const AuthPage = () => (
  <AuthLayout>
    <AuthHeader />
    <AuthLogin />
  </AuthLayout>
);

import { AuthHeader } from "../../components/AuthHeader";
import { AuthRegistration } from "../../components/AuthRegistration";

import { AuthLayout } from "../../layout/auth";

export const Registration = () => (
  <AuthLayout>
    <AuthHeader />
    <AuthRegistration />
  </AuthLayout>
);

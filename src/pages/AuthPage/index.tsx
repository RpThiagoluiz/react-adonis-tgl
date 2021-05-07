import { AuthHeader } from "../../components/AuthHeader";
import { AuthLogin } from "../../components/AuthLogin";

import { Container } from "./styles";

export const AuthPage = () => (
  <Container>
    <AuthHeader />
    <AuthLogin />
  </Container>
);

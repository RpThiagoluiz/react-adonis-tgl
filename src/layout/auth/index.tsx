import { ReactNode } from "react";
import { AuthHeader } from "../../components/AuthHeader";
import { AuthLogin } from "../../components/AuthLogin";
import { AuthResetPass } from "../../components/AuthResetPass";
import { Footer } from "../../components/Footer";
import { Grid } from "./styles";

interface AuthLayout {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayout) => <Grid>{children}</Grid>;

{
  /* <AuthHeader />
    <AuthLogin />
    {/* <AuthResetPass /> */
}

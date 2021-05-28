import { Route, Switch } from "react-router-dom";
import { AuthPage } from "../pages/Auth";
import { Registration } from "../pages/Registration";
import { Forgotpassword } from "../pages/ForgotPassword";
import { ResetPassword } from "../pages//ResetPassword";
import { NotFound } from "../pages/NotFound";

export const AuthRoutes = () => (
  <Switch>
    <Route path="/" exact component={AuthPage} />
    <Route path="/singup" component={Registration} />
    <Route path="/forgotpassword" component={Forgotpassword} />
    <Route path="/resetpassword/:token" component={ResetPassword} />
    <Route path="*" exact component={NotFound} />
  </Switch>
);

import { Route, Switch } from "react-router-dom";
import { AuthPage } from "../pages/Auth";
import { Registration } from "../pages/Registration";
import { ResetPassword } from "../pages/ResetPass";
import { NotFound } from "../pages/NotFound";

export const AuthRoutes = () => (
  <Switch>
    <Route path="/" exact component={AuthPage} />
    <Route path="/singup" component={Registration} />
    <Route path="/resetpassword" component={ResetPassword} />
    <Route path="*" exact component={NotFound} />
  </Switch>
);

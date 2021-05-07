import { Route, Switch } from "react-router-dom";
import { AuthPage } from "../pages/AuthPage";
import { NotFound } from "../pages/NotFound";

export const AuthRoutes = () => (
  <Switch>
    <Route path="/" exact component={AuthPage} />
    <Route path="*" exact component={NotFound} />
  </Switch>
);

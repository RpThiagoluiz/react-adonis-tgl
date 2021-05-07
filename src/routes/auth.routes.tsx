import { Route, Switch } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { NotFound } from "../pages/NotFound";

export const AuthRoutes = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="*" exact component={NotFound} />
  </Switch>
);

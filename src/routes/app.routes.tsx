import { Switch, Route } from "react-router-dom";

import { NotFound } from "../pages/NotFound";
import { Header } from "../components/AppHeader/styles";
import { AppPage } from "../pages/App";
import { AppHeader } from "../components/AppHeader";

export const AppRoutes = () => (
  <Switch>
    <Route path="/" exact component={AppPage} />
    <Route path="*" exact component={NotFound} />
  </Switch>
);

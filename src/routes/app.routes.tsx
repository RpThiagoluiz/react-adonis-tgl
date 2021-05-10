import { Switch, Route } from "react-router-dom";
import { AppRecentGames } from "../pages/AppRecentGames";
import { NotFound } from "../pages/NotFound";
import { AppPage } from "../pages/App";

export const AppRoutes = () => (
  <Switch>
    <Route path="/" exact component={AppPage} />
    <Route path="/recentgames" component={AppRecentGames} />
    <Route path="*" exact component={NotFound} />
  </Switch>
);

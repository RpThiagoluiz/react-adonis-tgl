import { Switch, Route } from "react-router-dom";
import { RecentGames } from "../pages/RecentGames";
import { NotFound } from "../pages/NotFound";
import { AppPage } from "../pages/App";

export const AppRoutes = () => (
  <Switch>
    <Route path="/" exact component={AppPage} />
    <Route path="/recentgames" component={RecentGames} />
    <Route path="*" exact component={NotFound} />
  </Switch>
);

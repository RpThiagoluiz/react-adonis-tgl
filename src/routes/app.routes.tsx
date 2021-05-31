import { Switch, Route } from "react-router-dom";
import { RecentGames } from "../pages/RecentGames";
import { NotFound } from "../pages/NotFound";
import { AppPage } from "../pages/App";
import { Account } from "../pages/Account";

export const AppRoutes = () => (
  <Switch>
    <Route path="/" exact component={RecentGames} />
    <Route path="/newbet" component={AppPage} />
    <Route path="/account" component={Account} />
    <Route path="*" exact component={NotFound} />
  </Switch>
);

import { BrowserRouter } from "react-router-dom";
import {} from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes = () => (
  <BrowserRouter>
    <AuthRoutes />
  </BrowserRouter>
);

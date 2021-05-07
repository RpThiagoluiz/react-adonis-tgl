import { BrowserRouter } from "react-router-dom";
import { Footer } from "../components/Footer";
import {} from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes = () => (
  <BrowserRouter>
    <AuthRoutes />
    <Footer />
  </BrowserRouter>
);

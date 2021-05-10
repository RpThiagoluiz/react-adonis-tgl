import { BrowserRouter } from "react-router-dom";
import { Footer } from "../components/Footer";
//import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { AppHeader } from "../components/AppHeader";

//Header so vai aparecer quando o usuario estiver logado.

export const Routes = () => (
  <BrowserRouter>
    <AppHeader />
    {/* <AuthRoutes /> */}
    <AppRoutes />
    <Footer />
  </BrowserRouter>
);

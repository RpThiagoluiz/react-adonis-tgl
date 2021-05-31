import { Footer } from "../components/Footer";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { AppHeader } from "../components/AppHeader";
import { useAuth } from "../hooks/AuthContext";

export const Routes = () => {
  const { logged } = useAuth();

  return (
    <>
      {logged ? (
        <>
          <AppHeader /> <AppRoutes />
        </>
      ) : (
        <>
          <AuthRoutes /> <Footer />
        </>
      )}
    </>
  );
};

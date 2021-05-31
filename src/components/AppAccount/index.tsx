import { useEffect, useState } from "react";
import { UserApiReturn } from "../../@types/User";
import { useAuth } from "../../hooks/AuthContext";
import { api } from "../../services/api";
import { dateFormatValue } from "../../utils";
import { Footer } from "../Footer";
import { LoadingSpinner } from "../LoadingSpiner";
import { Container } from "./styles";

export const AppAccount = () => {
  const [userData, setUserData] = useState<UserApiReturn>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUserData() {
      setIsLoading(true);
      try {
        await api.get("/users/1").then((response) => {
          const { data } = response;
          console.log(data);
          setUserData(data);
        });
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    }
    setIsLoading(false);
    getUserData();
  }, []);

  const userCheck = () => {
    if (userData) {
      return (
        <>
          <strong>{userData.username}</strong>
          <p>{userData.email}</p>
          <small>
            Usuario desde de
            <strong>{userData.created_at}</strong>
          </small>
        </>
      );
    } else {
      <p>Algo deu errado ao Carregar seu perfil!</p>;
    }
  };

  return (
    <Container>
      <h1>AcountPage</h1>

      {isLoading ? <LoadingSpinner /> : userCheck()}

      <Footer />
    </Container>
  );
};

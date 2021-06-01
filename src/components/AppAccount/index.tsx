import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { MdSystemUpdateAlt } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { ErrorProps } from "../../@types/Error";
import { UserApiReturn, UserProps } from "../../@types/User";
import { useModalApp } from "../../hooks/ModalContext";
import { api } from "../../services/api";
import { AuthToast } from "../AuthToast";
import { Spinner } from "../ButtonSpinner/styles";
import { Footer } from "../Footer";
import { LoadingSpinner } from "../LoadingSpiner";
import {
  Container,
  UserData,
  UpdateUserData,
  UserContentData,
  Form,
  FormContent,
} from "./styles";

export const AppAccount = () => {
  const [userData, setUserData] = useState<UserApiReturn>();
  const [isLoading, setIsLoading] = useState(false);

  const { uxToUser } = useModalApp();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { push } = useHistory();

  useEffect(() => {
    async function getUserData() {
      setIsLoading(true);
      try {
        await api.get("/users/1").then((response) => {
          const { data } = response;

          setUserData(data);
        });
        setIsLoading(false);
      } catch (error) {
        uxToUser({
          title: `Email Invalido ${error.status}`,
          description: error.message,
          color: "var(--red)",
          active: true,
          redirect: false,
        });
      }
    }
    setIsLoading(false);
    getUserData();
  }, []);

  //useEffect dando update nos dados do usuario

  const userCheck = () => {
    if (userData) {
      return (
        <UserContentData>
          <strong>{userData.username}</strong>
          <p>
            <strong>{userData.email}</strong>
          </p>
          <p>
            Usuario desde de
            <strong> {userData.created_at}</strong>
          </p>
          <p>
            Ultima Atualizacao <strong>{userData.updated_at}</strong>
          </p>
        </UserContentData>
      );
    } else {
      <p>Algo deu errado ao Carregar seu perfil!</p>;
    }
  };

  //Just send when all date is valid!
  const onBlurEmail = () => {
    if (emailInputRef.current?.value) {
      const regexValidEmail = /^[\w+.]*@\w+.(?:[A-Z]{2,})?.[\w\w]*$/.test(
        emailInputRef.current?.value
      );
      try {
        if (!regexValidEmail) {
          throw new Error(
            "Digite um email valido. Exemplos: meu.email+categoria@gmail.com, juca_malandro@bol.com.br, pedrobala@hotmail.uy, sandro@culinaria.dahora"
          );
        }
      } catch (error) {
        uxToUser({
          title: "Email Invalido",
          description: error.message,
          color: "var(--red)",
          active: true,
          redirect: false,
        });
      }
    }
  };

  const onBlurName = () => {
    const name = nameInputRef.current?.value;
    if (name) {
      try {
        if (name.length < 3) {
          throw new Error("Nome deve possuir pelo menos  3 letras!");
        }
      } catch (error) {
        uxToUser({
          title: "Name Invalido",
          description: error.message,
          color: "var(--red)",
          active: true,
          redirect: false,
        });
      }
    }
  };

  const onBlurPassword = () => {
    const password = passwordInputRef.current?.value;
    if (password) {
      try {
        if (password.length < 6) {
          throw new Error(`Password deve conter pelo menos 6 caracteres`);
        }
      } catch (error) {
        uxToUser({
          title: "Password Invalido",
          description: error.message,
          color: "var(--red)",
          active: true,
          redirect: false,
        });
      }
    }
  };

  //valid for Send
  const isEmptyName = (value: string) => value.trim().length >= 3;
  const isEmptyEmail = (value: string) => value.trim() !== "";
  const isValidRegex = (value: string) =>
    /^[\w+.]*@\w+.(?:[A-Z]{2,})?.[\w\w]*$/.test(value);
  const isMinChars = (value: string) => value.trim().length >= 6;

  const handleSubmit = useCallback(async (event: FormEvent) => {
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    event.preventDefault();
    setIsLoading(true);

    const sendData = async (user: UserProps) => {
      const response = await api.put("/users/1", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      return response;
    };

    try {
      if (name && email && password) {
        const enteredName = isEmptyName(name);
        const enteredEmail = isEmptyEmail(email) && isValidRegex(email);
        const enteredPassword = isMinChars(password);

        const formIsValid = enteredName && enteredEmail && enteredPassword;

        if (formIsValid) {
          const userData: any = {
            name,
            email,
            password,
          };

          await sendData(userData);

          if (!sendData(userData)) {
            throw new Error("BRABO DEU CERTO! nao cadastrado");
          }
          setIsLoading(false);
          uxToUser({
            title: `Ola,${userData.name}`,
            description:
              "Seu cadastrado foi realizado com sucesso, aproveite! 🎉 ",
            color: "var(--green)",
            active: true,
            redirect: true,
          });
        } else {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      setIsLoading(false);
      uxToUser({
        title: "Ocorreu um durante o cadastro !",
        description: `Email ja cadastrado, caso tenha esquecido a senha, basta acessar "forgotPassword" na tela inicial e seguir os passos. Ou cadastrar um novo email.`,
        color: "var(--red)",
        active: true,
        redirect: false,
      });
    }
  }, []);

  return (
    <>
      <Container>
        <UserData>{isLoading ? <LoadingSpinner /> : userCheck()}</UserData>
        <UpdateUserData>
          <h4>Atualizar os dados</h4>

          <Form onSubmit={handleSubmit}>
            <FormContent>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                required
                defaultValue={userData?.username}
                ref={nameInputRef}
                onBlur={() => onBlurName()}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                defaultValue={userData?.email}
                ref={emailInputRef}
                onBlur={() => onBlurEmail()}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
                onBlur={() => onBlurPassword()}
              />

              {isLoading ? (
                <Spinner />
              ) : (
                <button type="submit" className="registration">
                  Update
                  <MdSystemUpdateAlt />
                </button>
              )}
            </FormContent>
          </Form>
        </UpdateUserData>
      </Container>
      <Footer />
    </>
  );
};

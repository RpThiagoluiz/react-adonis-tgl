import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";
import { FormEvent, useCallback, useRef, useState } from "react";
import { UserProps } from "../../@types/User";
import { api } from "../../services/api";
import { Spinner } from "../ButtonSpinner/styles";
import { useModalApp } from "../../hooks/ModalContext";

export const AuthRegistration = () => {
  const [loading, setLoading] = useState(false);

  //valid for Send
  const isEmptyName = (value: string) => value.trim().length >= 3;
  const isEmptyEmail = (value: string) => value.trim() !== "";
  const isValidRegex = (value: string) =>
    /^[\w+.]*@\w+.(?:[A-Z]{2,})?.[\w\w]*$/.test(value);
  const isMinChars = (value: string) => value.trim().length >= 6;

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { push } = useHistory();
  const { uxToUser } = useModalApp();

  const handlerBackButton = () => {
    push("/");
  };

  const handleSubmit = useCallback(async (event: FormEvent) => {
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    event.preventDefault();
    setLoading(true);

    const sendData = async (user: UserProps) => {
      const response = await api.post("/users", {
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
          const userData: UserProps = {
            name,
            email,
            password,
          };

          await sendData(userData);

          if (!sendData(userData)) {
            throw new Error("BRABO DEU CERTO! nao cadastrado");
          }
          setLoading(false);
          uxToUser({
            title: `Ola,${userData.name}`,
            description:
              "Seu cadastrado foi realizado com sucesso, aproveite! 🎉 ",
            color: "var(--green)",
            active: true,
            redirect: true,
            handleSvgError: true,
          });
        } else {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      setLoading(false);
      uxToUser({
        title: "Ocorreu um durante o cadastro !",
        description: `Email ja cadastrado, caso tenha esquecido a senha, basta acessar "forgotPassword" na tela inicial e seguir os passos. Ou cadastrar um novo email.`,
        color: "var(--red)",
        active: true,
        redirect: false,
        handleSvgError: false,
      });
    }
  }, []);

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
          handleSvgError: false,
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
          handleSvgError: false,
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
          handleSvgError: false,
        });
      }
    }
  };

  return (
    <Container>
      <h2>
        <strong>Registration</strong>
      </h2>
      <Form onSubmit={handleSubmit}>
        <FormContent>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            required
            ref={nameInputRef}
            onBlur={() => onBlurName()}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
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

          {loading ? (
            <Spinner />
          ) : (
            <button type="submit" className="registration">
              Registration
              <HiOutlineArrowRight />
            </button>
          )}
        </FormContent>
      </Form>
      <button className="back" onClick={handlerBackButton}>
        <HiOutlineArrowLeft />
        <span>Back</span>
      </button>
    </Container>
  );
};

import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";
import { FormEvent, useRef, useState } from "react";
import { ErrorProps } from "../../@types/Error";
import { AuthToast } from "../AuthToast";
import { useAuth } from "../../hooks/AuthContext";

export const AuthLogin = () => {
  const [messageToUser, setMessageToUser] = useState<ErrorProps>({
    title: "",
    description: "",
    color: "",
    active: false,
  });

  const { signIn } = useAuth();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    event.preventDefault();

    try {
      if (email && password) {
        const user = {
          email,
          password,
        };

        await signIn(user);
        // if (email && password) {
        //   const findUser = users.find(
        //     (user: UserProps) => user.email === email
        //   );

        //   if (!findUser) {
        //     throw new Error("Usuario não existe");
        //   }
        //   if (findUser.password !== password && findUser.email !== email) {
        //     throw new Error("Dados nao conferem!!!");
        //   } else {
        //     dispatch(logIn());
        //   }
        // }
      }
    } catch (error) {
      setMessageToUser({
        title: "Ocorreu um erro !",
        description: error.message,
        color: "var(--red)",
        active: true,
      });
    }
  };

  const toggletToast = () => {
    setMessageToUser({ title: "", description: "", color: "", active: false });
  };

  const toast = (
    <AuthToast
      color={messageToUser.color}
      title={messageToUser.title}
      description={messageToUser.description}
      onClickClose={toggletToast}
      handleSvgError={false}
    />
  );

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
        setMessageToUser({
          title: "Email Invalido",
          description: error.message,
          color: "var(--red)",
          active: true,
        });
      }
    }
  };

  const onBlurPassword = () => {
    if (passwordInputRef.current?.value) {
      try {
        if (passwordInputRef.current?.value.length < 6) {
          throw new Error(`Password deve conter pelo menos 6 caracteres`);
        }
      } catch (error) {
        setMessageToUser({
          title: "Password Invalido",
          description: error.message,
          color: "var(--red)",
          active: true,
        });
      }
    }
  };

  return (
    <Container>
      {messageToUser.active && toast}
      <h2>
        <strong>Authentication</strong>
      </h2>
      <Form onSubmit={handleSubmit}>
        <FormContent>
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
        </FormContent>
        <Link to="/forgotpassword">I forget my password</Link>
        <button type="submit" className="sing-in">
          <span>Log In</span>

          <HiOutlineArrowRight />
        </button>
      </Form>
      <button className="sing-up">
        <Link to="/singup">Sing Up</Link> <HiOutlineArrowRight />
      </button>
    </Container>
  );
};

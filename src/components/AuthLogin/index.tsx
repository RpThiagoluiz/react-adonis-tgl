import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";
import { FormEvent, useRef } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { useModalApp } from "../../hooks/ModalContext";

export const AuthLogin = () => {
  const { signIn } = useAuth();
  const { uxToUser } = useModalApp();

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
      }
    } catch (error) {
      uxToUser({
        title: "Ocorreu um erro !",
        description: error.message,
        color: "var(--red)",
        active: true,
        handleSvgError: false,
      });
    }
  };

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
          handleSvgError: false,
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
        uxToUser({
          title: "Password Invalido",
          description: error.message,
          color: "var(--red)",
          active: true,
          handleSvgError: false,
        });
      }
    }
  };

  return (
    <Container>
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

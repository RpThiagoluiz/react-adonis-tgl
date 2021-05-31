import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";

import { api } from "../../services/api";
import { Spinner } from "../ButtonSpinner/styles";
import { useModalApp } from "../../hooks/ModalContext";

export const AuthForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const { push } = useHistory();
  const { uxToUser } = useModalApp();

  const handlerBackButton = () => {
    push("/");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const sendData = async () => {
      const response = await api.post("/forgetpassword", {
        email: email,
      });
      return response;
    };
    try {
      await sendData();

      if (!sendData()) {
        throw new Error("email nao cadastrado");
      }
      setLoading(false);
      uxToUser({
        title: "Email enviado",
        description: "uma nova senha foi enviada para seu email informado",
        color: "var(--green)",
        active: true,
        redirect: true,
        handleSvgError: true,
      });
    } catch (error) {
      setLoading(false);

      uxToUser({
        title: "Ocorreu um erro !",
        description: `Email nao cadastrado`,
        color: "var(--red)",
        active: true,
        redirect: false,
        handleSvgError: false,
      });
    }
  };

  const onBlurEmail = (enteredEmail: string) => {
    const regexValidEmail = /^[\w+.]*@\w+.(?:[A-Z]{2,})?.[\w\w]*$/.test(
      enteredEmail
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
  };

  return (
    <Container>
      <h2>
        <strong>Forgot Password</strong>
      </h2>
      <Form onSubmit={handleSubmit}>
        <FormContent>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={(event) => onBlurEmail(event.target.value)}
          />
          {loading ? (
            <Spinner />
          ) : (
            <button type="submit" className="send-link">
              <span>Send Link</span>
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

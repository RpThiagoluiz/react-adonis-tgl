import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";

import { UserProps } from "../../@types/User";
import { useSelector } from "react-redux";
import { ErrorProps } from "../../@types/Error";
import { AuthToast } from "../AuthToast";

export const AuthResetPass = () => {
  const [messageToUser, setMessageToUser] = useState<ErrorProps>({
    title: "",
    description: "",
    color: "",
    active: false,
  });
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { users } = useSelector((state: any) => state.user);

  const { push } = useHistory();

  const handlerBackButton = () => {
    push("/");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const emailExists = users.find((user: UserProps) => user.email === email);
      if (!emailExists) {
        throw new Error(`email nao cadastrado`);
      } else {
        setMessageToUser({
          title: "Email enviado",
          description: "uma nova senha foi enviada para seu email informado",
          color: "var(--green)",
          active: true,
        });
        setRedirect(true);
      }
    } catch (error) {
      setRedirect(false);
      setMessageToUser({
        title: "Ocorreu um erro !",
        description: error.message,
        color: "var(--red)",
        active: true,
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
      setRedirect(false);
      setMessageToUser({
        title: "Email Invalido",
        description: error.message,
        color: "var(--red)",
        active: true,
      });
    }
  };

  const toggletToast = () => {
    setMessageToUser({ title: "", description: "", color: "", active: false });
    redirect && push("/");
  };

  const toast = (
    <AuthToast
      color={messageToUser.color}
      title={messageToUser.title}
      description={messageToUser.description}
      onClickClose={toggletToast}
      handleSvgError={redirect}
    />
  );

  return (
    <Container>
      {messageToUser.active && toast}
      <h2>
        <strong>Reset Password</strong>
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
          <button type="submit" className="send-link">
            <span>Send Link</span>
            <HiOutlineArrowRight />
          </button>
        </FormContent>
      </Form>
      <button className="back" onClick={handlerBackButton}>
        <HiOutlineArrowLeft />
        <span>Back</span>
      </button>
    </Container>
  );
};

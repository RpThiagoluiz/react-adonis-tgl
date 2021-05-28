import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";
import { ErrorProps } from "../../@types/Error";
import { AuthToast } from "../AuthToast";
import { api } from "../../services/api";
import { Spinner } from "../ButtonSpinner/styles";

export const AuthForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [messageToUser, setMessageToUser] = useState<ErrorProps>({
    title: "",
    description: "",
    color: "",
    active: false,
  });
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { push } = useHistory();

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
      setMessageToUser({
        title: "Email enviado",
        description: "uma nova senha foi enviada para seu email informado",
        color: "var(--green)",
        active: true,
      });

      setRedirect(true);
    } catch (error) {
      setLoading(false);
      setRedirect(false);
      setMessageToUser({
        title: "Ocorreu um erro !",
        description: `Email nao cadastrado`,
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

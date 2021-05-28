import { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";
import { ErrorProps } from "../../@types/Error";
import { AuthToast } from "../AuthToast";
import { api } from "../../services/api";
import { Spinner } from "../ButtonSpinner/styles";

export const AuthResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [messageToUser, setMessageToUser] = useState<ErrorProps>({
    title: "",
    description: "",
    color: "",
    active: false,
  });
  const [password, setpassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { push } = useHistory();
  const params: { token: string } = useParams();

  const handlerBackButton = () => {
    push("/");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    //resetpassword
    const sendData = async () => {
      const response = await api.put("/forgetpassword", {
        token: params.token,
        password,
      });
      return response;
    };
    try {
      await sendData();

      if (!sendData()) {
        throw new Error("Error na troca de senha.");
      }
      setLoading(false);
      setMessageToUser({
        title: "Sucesso",
        description: "Senha resetada!",
        color: "var(--green)",
        active: true,
      });

      setRedirect(true);
    } catch (error) {
      setLoading(false);
      setRedirect(false);
      setMessageToUser({
        title: "Ocorreu um erro !",
        description: error.message,
        color: "var(--red)",
        active: true,
      });
    }
  };

  const onBlurPassword = (enteredPassword: string) => {
    if (enteredPassword) {
      try {
        if (enteredPassword.length < 6) {
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setpassword(event.target.value)}
            onBlur={(event) => onBlurPassword(event.target.value)}
          />
          {loading ? (
            <Spinner />
          ) : (
            <button type="submit" className="send-link">
              <span>Confirm</span>
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

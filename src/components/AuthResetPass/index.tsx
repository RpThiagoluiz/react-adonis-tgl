import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";

export const AuthResetPass = () => {
  const emailInputRef = useRef(null);
  const { push } = useHistory();

  const handlerBackButton = () => {
    push("/");
  };

  const handleSubmit = () => {
    console.log(`Brabo!`);
  };

  return (
    <Container>
      <h2>
        <strong>Reset Password</strong>
      </h2>
      <Form onSubmit={handleSubmit}>
        <FormContent>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
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

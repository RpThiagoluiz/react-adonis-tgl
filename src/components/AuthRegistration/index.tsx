//import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";

interface AuthLoginProps {
  handlerLogin: (event: any) => void;
}

export const AuthRegistration = ({ handlerLogin }: AuthLoginProps) => {
  const { push } = useHistory();

  const handlerBackButton = () => {
    push("/");
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handlerLogin({
      name: event.currentTarget.name.value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    });
  };

  return (
    <Container>
      <h2>
        <strong>Registration</strong>
      </h2>
      <Form onSubmit={handleSubmit}>
        <FormContent>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />

          <button type="submit" className="registration">
            Registration
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

import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";

interface AuthLoginProps {
  handlerLogin: (event: any) => void;
}

export const AuthLogin = ({ handlerLogin }: AuthLoginProps) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    handlerLogin({
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    });
  };

  //   const enteredEmail = emailInputRef.current.value;
  //   const enteredPassword = passwordInputRef.current.value;
  //   console.log(enteredEmail, enteredPassword);
  // };

  return (
    <Container>
      <h2>
        <strong>Authentication</strong>
      </h2>
      <Form onSubmit={handleSubmit}>
        <FormContent>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </FormContent>
        <Link to="/resetpassword">I forget my password</Link>
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

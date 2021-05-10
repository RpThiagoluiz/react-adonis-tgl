import { useRef } from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";

export const AuthLogin = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleSubmit = () => {
    console.log(`Brabo!`);
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
          <input type="email" id="email" required ref={emailInputRef} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </FormContent>
        <Link to="/resetpassword">I forget my password</Link>
        <button type="submit" className="sing-in">
          <Link to="/app">
            <span>Log In</span>
          </Link>
          <HiOutlineArrowRight />
        </button>
      </Form>
      <button className="sing-up">
        <Link to="/singup">Sing Up</Link> <HiOutlineArrowRight />
      </button>
    </Container>
  );
};

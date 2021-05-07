import { useRef } from "react";
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
        <p>I forget my password</p>
        <button type="submit" className="sing-in">
          <span>Log In</span>
          <HiOutlineArrowRight />
        </button>
      </Form>
      <button className="sing-up">
        <span>Sing Up</span> <HiOutlineArrowRight />
      </button>
    </Container>
  );
};

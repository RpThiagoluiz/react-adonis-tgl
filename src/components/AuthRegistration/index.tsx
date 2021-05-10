import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";

export const AuthRegistration = () => {
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

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
        <strong>Registration</strong>
      </h2>
      <Form onSubmit={handleSubmit}>
        <FormContent>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required ref={nameInputRef} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />

          <button type="submit" className="registration">
            <Link to="/app">Registration</Link>
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

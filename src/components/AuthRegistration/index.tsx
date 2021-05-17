//import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Container, Form, FormContent } from "./styles";
import { FormEvent, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../store/userSlice";
import { UserProps } from "../../@types/User";
import { ErrorProps } from "../../@types/Error";
import { AuthToast } from "../AuthToast";

export const AuthRegistration = () => {
  const [messageToUser, setMessageToUser] = useState<ErrorProps>({
    title: "",
    description: "",
    color: "",
    active: false,
  });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { push } = useHistory();
  const dispatch = useDispatch();
  const { addUser } = UserActions;
  const { users } = useSelector((state: any) => state.user);

  const handlerBackButton = () => {
    push("/");
  };

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      const name = nameInputRef.current?.value;
      const email = emailInputRef.current?.value;
      const password = passwordInputRef.current?.value;
      event.preventDefault();

      try {
        if (name && email && password) {
          const userData: UserProps = {
            id: String(new Date().getTime()),
            name,
            email,
            password,
            recentGames: [],
          };
          dispatch(addUser(userData));
          console.log(users);
          push("/");
        } else {
          throw new Error(`error on create a data `);
        }
      } catch (error) {
        setMessageToUser({
          title: "Ocorreu um durante o cadastro !",
          description: error.message,
          color: "var(--red)",
          active: true,
        });
      }
    },
    [addUser, dispatch, push, users]
  );

  const toggletToast = () => {
    setMessageToUser({ title: "", description: "", color: "", active: false });
  };

  const toast = (
    <AuthToast
      color={messageToUser.color}
      title={messageToUser.title}
      description={messageToUser.description}
      onClickClose={toggletToast}
    />
  );

  return (
    <Container>
      {messageToUser.active && toast}
      <h2>
        <strong>Registration</strong>
      </h2>
      <Form onSubmit={handleSubmit}>
        <FormContent>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            required
            ref={nameInputRef}
            onBlur={() => {}}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            onBlur={() => {}}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            onBlur={() => {}}
          />

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

import { useHistory } from "react-router-dom";
import { createContext, ReactNode, useContext, useState } from "react";
import { ErrorProps } from "../@types/Error";
import { ModalError } from "../components/ModalError";

interface ModalAppProviderData {
  uxToUser: ({
    title,
    description,
    color,
    active,
    redirect,
  }: ErrorProps) => void;
}

interface ModalAppProviderProps {
  children: ReactNode;
}

const ModalAppContext = createContext({} as ModalAppProviderData);

const ModalAppProvider = ({ children }: ModalAppProviderProps) => {
  const [messageToUser, setMessageToUser] = useState<ErrorProps>({
    title: "",
    description: "",
    color: "",
    active: false,
    redirect: false,
  });

  const { push } = useHistory();

  const uxToUser = ({
    title,
    description,
    color,
    active,
    redirect,
    handleSvgError,
  }: ErrorProps) => {
    setMessageToUser({
      title,
      description,
      color,
      active,
      redirect,
      handleSvgError,
    });
  };

  const toggleModal = () => {
    setMessageToUser({
      title: "",
      description: "",
      color: "",
      active: false,
      redirect: false,
      handleSvgError: undefined,
    });
    messageToUser.redirect && push("/");
  };

  const modal = (
    <ModalError
      color={messageToUser.color}
      title={messageToUser.title}
      description={messageToUser.description}
      onClickClose={toggleModal}
      handleSvgError={messageToUser.handleSvgError}
    />
  );

  return (
    <ModalAppContext.Provider value={{ uxToUser }}>
      {children}
      {messageToUser.active && modal}
    </ModalAppContext.Provider>
  );
};

const useModalApp = () => useContext(ModalAppContext);

export { ModalAppProvider, useModalApp };

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
import { ModalAppProvider } from "./hooks/ModalContext";
import { Routes } from "./routes";
import GlobalStyles from "./styles/GlobalStyles";

const App = () => (
  //Ele ta aq, por cima de tudo sempre,
  //Vc precisa do contexto dele na sua aplicacao.
  <BrowserRouter>
    <ModalAppProvider>
      <AuthProvider>
        <GlobalStyles />
        <Routes />
      </AuthProvider>
    </ModalAppProvider>
  </BrowserRouter>
);

export default App;

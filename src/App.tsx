import { AuthProvider } from "./hooks/AuthContext";
import { Routes } from "./routes";
import GlobalStyles from "./styles/GlobalStyles";

const App = () => (
  <AuthProvider>
    <GlobalStyles />
    <Routes />
  </AuthProvider>
);

export default App;

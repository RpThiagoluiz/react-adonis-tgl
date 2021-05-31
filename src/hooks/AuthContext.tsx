import { createContext, ReactNode, useContext, useState } from "react";
import { UserData } from "../@types/User";

import { api } from "../services/api";

interface TokenData {
  token: string;
}

interface AuthContextData {
  userEmail: string;
  token: TokenData;
  logged: boolean;
  signIn: ({ email, password }: UserData) => Promise<void>;
  signOut: () => void;
  updateUser(userData: UserData): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem("@tgl-labluby-devthiago");

    return !!isLogged;
  });

  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState<TokenData>(() => {
    const token = localStorage.getItem("@tgl-labluby-devthiago");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      return { token };
    }

    return {} as TokenData;
  });

  const signIn = async ({ email, password }: UserData) => {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      //console.log(response.status);

      const { token } = response.data.token;
      const user = response.data.user;
      //back devolvendo os dados do user, voltar somente email por la qlq coisa

      setUserEmail(user.email);
      setToken(token);
      setLogged(true);

      //Save on localStorage
      localStorage.setItem("@tgl-labluby-devthiago", token);
      localStorage.setItem("@tgl-labluby-devthiago-user", user);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      alert(error.response);
    }
  };

  const signOut = () => {
    localStorage.removeItem("@tgl-labluby-devthiago");
    localStorage.removeItem("@tgl-labluby-devthiago-user");
    setToken({} as TokenData);
    setLogged(false);
  };

  const updateUser = async (userData: any) => {
    try {
      await api.put("/users ", {
        name: userData.username,
        email: userData.email,
        password: userData.password,
      });
    } catch (err) {
      alert("Erro ao atualizar perfil!");
    }
  };

  return (
    <AuthContext.Provider
      value={{ userEmail, token, logged, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

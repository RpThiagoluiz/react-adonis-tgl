import { userSlice } from "../userSlice";
import { UserProps } from "../../@types/User";
import { api } from "../../services/api";

//Actions
//Add user, forgotpassword, resetPassword , -> getGame user

export const CreateUser = (userData: UserProps) => {
  //React Advanced
  return async () => {
    const sendData = async () => {
      const response = await api.post("/users", {
        username: userData.name,
        email: userData.email,
        password: userData.password,
      });
      return response;
    };
    try {
      await sendData();
    } catch (error) {
      alert(error.message);
    }
  };
};

export const Forgotpassword = (userDataEmail: string) => {
  return async () => {
    const sendData = async () => {
      const response = await api.post("/forgetpassword", {
        email: userDataEmail,
      });
      return response;
    };

    try {
      await sendData();
    } catch (error) {
      alert(error.message);
    }
  };
};

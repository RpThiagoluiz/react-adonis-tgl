import { createSlice } from "@reduxjs/toolkit";

import { RegisTeredUserProps } from "../@types/RegisteredUser";

const initialState: RegisTeredUserProps = {
  users: [
    {
      id: 1,
      name: "thiago",
      email: "test@test.com",
      password: "123456",
      recentGames: [],
    },
  ],
  isLogged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      const newUser = action.payload;
      state.users.push(newUser);
    },
    logIn(state) {
      state.isLogged = true;
    },
    logOut(state) {
      state.isLogged = false;
    },
  },
});

const UserActions = userSlice.actions;
export { userSlice, UserActions };

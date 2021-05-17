import { createSlice } from "@reduxjs/toolkit";

import { RegisTeredUserProps } from "../@types/RegisteredUser";

const initialState: RegisTeredUserProps = {
  users: [
    {
      id: "asdadsadas123123",
      name: "thiago",
      email: "test@test.com",
      password: "123",
      recentGames: [],
    },
    {
      id: "asdadsad123232as123123",
      name: "thiago",
      email: "admilson@adm.com",
      password: "123",
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
    saveInRecentGames(state, action) {
      const users = [...state.users];
      const user = users.find((user) => user.id === action.payload.id);
      if (user) {
        //SavedGame[]
        const prevState: any = [...user.recentGames];
        user.recentGames.push(prevState, ...action.payload.games);
      }
    },
  },
});

const UserActions = userSlice.actions;
export { userSlice, UserActions };

import { createSlice } from "@reduxjs/toolkit";
import { handleGetLocalStorage } from "../../utils/util";

const initialState = {
  user: handleGetLocalStorage("dataUser"),
  token: handleGetLocalStorage("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleGetValue: (state, action) => {
      state.user = action.payload;
    },
    handleGetValueUserToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { handleGetValue, handleGetValueUserToken } = userSlice.actions;

export default userSlice.reducer;

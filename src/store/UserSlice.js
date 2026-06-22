import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "Users_Store",
  initialState: null,
  reducers: {
    add_user: (state, action) => {
      return action.payload;
    },
    sub_user: (state, action) => {
      return null;
    },
  },
});

export const { add_user, sub_user } = UserSlice.actions;

export default UserSlice.reducer;

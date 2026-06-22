import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../store/UserSlice";

const persistedUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
})();

const store = configureStore({
  reducer: {
    User_Store: UserSlice,
  },
  preloadedState: {
    User_Store: persistedUser,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("user", JSON.stringify(state.User_Store));
});

export default store;

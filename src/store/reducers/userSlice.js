import { createSlice } from "@reduxjs/toolkit";

const initialState = { firstName: "", lastName: "", role: "" };

const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload };
    },
    logout(state, action) {
      localStorage.clear();
      return (state = {
        firstName: "",
        lastName: "",
        role: "",
      });
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

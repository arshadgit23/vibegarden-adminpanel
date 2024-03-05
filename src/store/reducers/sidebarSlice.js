import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarDisabled: false,
};

const sidebarSlice = createSlice({
  name: "Disable Sidebar",
  initialState,
  reducers: {
    setDisableSidebar(state, action) {
      return { ...state, sidebarDisabled: action.payload };
    },
  },
});

export const { setDisableSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;

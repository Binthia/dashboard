import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "Binthia",
    role: "Admin", // Admin, Manager, Employee
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.user.role = action.payload;
    },
  },
});

export const { setRole } = authSlice.actions;
export default authSlice.reducer;

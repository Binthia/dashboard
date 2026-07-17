import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../slice/employeeSlice";
import departmentReducer from "../slice/departmentSlice";
import authReducer from '../slice/AuthSlice'

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    department: departmentReducer,
    auth: authReducer,
  },
});

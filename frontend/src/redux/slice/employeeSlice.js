import { createSlice } from "@reduxjs/toolkit";
import { employeeRows as employeeData } from "../../data/employeeData";

const initialState = {
  employees:employeeData
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,

  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },

    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },

    editEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );

      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
  },
});

export const {
  addEmployee,
  deleteEmployee,
  editEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
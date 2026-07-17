import { createSlice } from "@reduxjs/toolkit";
import { departmentRows as departmentData }  from "../../data/departmentData";

console.log("Department Data:", departmentData);
console.log("Length:", departmentData.length);

const initialState = {
  departments: departmentData,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,

  reducers: {
    addDepartment: (state, action) => {
      state.departments.push(action.payload);
    },

    deleteDepartment: (state, action) => {
      state.departments = state.departments.filter(
        (dept) => dept.id !== action.payload
      );
    },
  },
});

export const {
  addDepartment,
  deleteDepartment,
} = departmentSlice.actions;

export default departmentSlice.reducer;
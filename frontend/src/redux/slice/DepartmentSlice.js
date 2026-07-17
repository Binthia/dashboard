import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async () => {
    const response = await fetch("http://localhost:8080/departments");
    const data = await response.json();
    console.log("data=",data);    
    return data;
  }
);

const initialState = {
  departments: [],
};

const DepartmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    addDepartment: (state, action) => {
      state.departments.push(action.payload);
    },

    editDepartment: (state, action) => {
      const index = state.departments.findIndex(
        dept => dept.id === action.payload.id
      );

      if (index !== -1) {
        state.departments[index] = action.payload;
      }
    },

    deleteDepartment: (state, action) => {
      state.departments = state.departments.filter(
        dept => dept.id !== action.payload
      );
    },
    
  },

  
extraReducers: (builder) => {
  builder.addCase(fetchDepartments.fulfilled, (state, action) => {
    state.departments = action.payload;
  });
},

});

export const {
  addDepartment,
  editDepartment,
  deleteDepartment,
} = DepartmentSlice.actions;

export default DepartmentSlice.reducer;

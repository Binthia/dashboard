import React from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import "../styles/Department.css";
import CommonTable from "../components/CommonTable";
import {fetchDepartments} from '../redux/slice/DepartmentSlice'

export const departmentColumns = [
  { field: "id", headerName: "ID" },
  { field: "department", headerName: "Department" },
  { field: "manager", headerName: "Manager" },
  { field: "employees", headerName: "Employees" },
  { field: "location", headerName: "Location" },
  { field: "status", headerName: "Status" },
];
 
const Department = () => {
  const departments = useSelector((state) => state.department.departments);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchDepartments());
    }, [dispatch]);
  
  return (
    <div className="department-page">
    <CommonTable
        type="department"
        title="Departments"
        columns={departmentColumns}
        rows={departments}
      />
    </div>
  );
};
 
export default Department;
  

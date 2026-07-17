import React from "react";
import CommonTable from "../components/CommonTable";
import { useSelector } from "react-redux";
import "../styles/Employee.css";

export const employeeColumns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "department", headerName: "Department" },
  { field: "email", headerName: "Email" },
  { field: "phone", headerName: "Phone" },
  { field: "dob", headerName: "DOB" },
  { field: "joiningDate", headerName: "Joining Date" },
  { field: "status", headerName: "Status" },
];
 
const Employee = () => {
  const employees = useSelector((state) => state.employee.employees);
  return (
    <div className="employee-page">
      <CommonTable
        type="employee"
        title="Employees"
        columns={employeeColumns}
        rows={employees}
      />
    </div>
      );
};
export default Employee;

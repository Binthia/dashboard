import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const EmployeeForm = ({
  initialValues,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: initialValues || {
    id: "",
    name: "",
    department: "",
    email: "",
    phone: "",
    dob: "",
    joiningDate: "",
    status: "Active",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required"),

      department: Yup.string()
        .required("Department is required"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      phone: Yup.string()
        .required("Phone is required"),

      dob: Yup.string()
        .required("Date of Birth is required"),

      joiningDate: Yup.string()
        .required("Joining Date is required"),
    }),

    onSubmit,
    enableReinitialize: true,
  });

  return (
    <form
      id="employeeForm"
      onSubmit={formik.handleSubmit}
      style={{ padding: "20px" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.name &&
              Boolean(formik.errors.name)
            }
            helperText={
              formik.touched.name &&
              formik.errors.name
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Department"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.department &&
              Boolean(
                formik.errors.department
              )
            }
            helperText={
              formik.touched.department &&
              formik.errors.department
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email &&
              Boolean(formik.errors.email)
            }
            helperText={
              formik.touched.email &&
              formik.errors.email
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phone &&
              Boolean(formik.errors.phone)
            }
            helperText={
              formik.touched.phone &&
              formik.errors.phone
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <label>DOB</label>
          <TextField
            fullWidth
            type="date"
            // label="DOB"
            name="dob"
            InputLabelProps={{
              shrink: false,
            }}
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.dob &&
              Boolean(formik.errors.dob)
            }
            helperText={
              formik.touched.dob &&
              formik.errors.dob
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <label>Joining Date</label>
          <TextField
            fullWidth
            type="date"
            // label="Joining Date"
            name="joiningDate"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.joiningDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.joiningDate &&
              Boolean(
                formik.errors.joiningDate
              )
            }
            helperText={
              formik.touched.joiningDate &&
              formik.errors.joiningDate
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
          >
            <MenuItem value="Active">
              Active
            </MenuItem>

            <MenuItem value="Inactive">
              Inactive
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Save Employee
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeForm;

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";  
import Button from "@mui/material/Button";

export default function DepartmentForm({
  onSubmit,
  initialValues,
}) {
  const formik = useFormik({
    initialValues: initialValues || {
      id: "",
      department: "",
      manager: "",
      employees: "",
      location: "",
      status: "Active",
    },

    validationSchema: Yup.object({
      department: Yup.string().required(
        "Department is required"
      ),
      manager: Yup.string().required(
        "Manager is required"
      ),
      location: Yup.string().required(
        "Location is required"
      ),
    }),

    onSubmit,
    enableReinitialize: true,
  });

  return (
    <form
      id="departmentForm"
      onSubmit={formik.handleSubmit}
      style={{ padding: "20px" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Department"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.department &&
              Boolean(formik.errors.department)
            }
            helperText={
              formik.touched.department &&
              formik.errors.department
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Manager"
            name="manager"
            value={formik.values.manager}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.manager &&
              Boolean(formik.errors.manager)
            }
            helperText={
              formik.touched.manager &&
              formik.errors.manager
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Employees"
            name="employees"
            value={formik.values.employees}
            onChange={formik.handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.location &&
              Boolean(formik.errors.location)
            }
            helperText={
              formik.touched.location &&
              formik.errors.location
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Save Department
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

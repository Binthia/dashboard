import * as React from "react";
import PropTypes from "prop-types";

import { visuallyHidden } from "@mui/utils";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch } from "react-redux";

import {
  addEmployee,
  editEmployee,
  deleteEmployee,
} from "../../redux/slice/employeeSlice";


// =======================================================
// Sorting Helpers
// =======================================================

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


// =======================================================
// Table Head
// =======================================================

function EnhancedTableHead({
  columns,
  order,
  orderBy,
  numSelected,
  rowCount,
  onSelectAllClick,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={
              rowCount > 0 &&
              numSelected === rowCount
            }
            indeterminate={
              numSelected > 0 &&
              numSelected < rowCount
            }
            onChange={onSelectAllClick}
          />
        </TableCell>

        {columns.map((column) => {
          const columnId =
            column.id || column.field;

          const columnLabel =
            column.label || column.headerName;

          return (
            <TableCell
              key={columnId}
              align="center"
              sortDirection={
                orderBy === columnId
                  ? order
                  : false
              }
            >
              <TableSortLabel
                active={
                  orderBy === columnId
                }
                direction={
                  orderBy === columnId
                    ? order
                    : "asc"
                }
                onClick={createSortHandler(
                  columnId
                )}
              >
                {columnLabel}

                {orderBy === columnId && (
                  <Box
                    component="span"
                    sx={visuallyHidden}
                  >
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                )}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}


// =======================================================
// Toolbar
// =======================================================

function EnhancedTableToolbar({
  title,
  numSelected,
  onCreate,
  onEdit,
  onDelete,
}) {
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
      >
        {numSelected > 0
          ? `${numSelected} Selected`
          : title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        {numSelected === 0 && (
          <Button
            variant="contained"
            onClick={onCreate}
          >
            Add Employee
          </Button>
        )}

        {numSelected === 1 && (
          <Button
            variant="contained"
            color="warning"
            onClick={onEdit}
          >
            Edit
          </Button>
        )}

        {numSelected > 0 && (
          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </Box>
    </Toolbar>
  );
}

// =======================================================
// Main Component
// =======================================================

export default function CommonTable({
  columns,
  rows,
  title = "Table Data",
}) {
  const dispatch = useDispatch();

  // ==========================
  // States
  // ==========================

  const [order, setOrder] = React.useState("asc");

  const [orderBy, setOrderBy] = React.useState(
    columns[0]?.id || columns[0]?.field || ""
  );

  const [selected, setSelected] = React.useState([]);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] =
    React.useState(5);

  const [open, setOpen] =
    React.useState(false);

  const [isEdit, setIsEdit] =
    React.useState(false);

  const [errors, setErrors] =
    React.useState({});

  const emptyForm = {
    id: "",
    name: "",
    department: "",
    email: "",
    phone: "",
    dob: "",
    joiningDate: "",
    status: "Active",
  };

  const [formData, setFormData] =
    React.useState(emptyForm);

  // ==========================
  // Dialog
  // ==========================

  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setFormData(emptyForm);
    setIsEdit(false);
  };

  // ==========================
  // Create
  // ==========================

  const handleCreate = () => {
    setIsEdit(false);

    setFormData({
      ...emptyForm,
      id: Date.now(),
    });

    setErrors({});
    setOpen(true);
  };

  // ==========================
  // Edit
  // ==========================

  const handleEdit = () => {
    if (selected.length !== 1) return;

    const employee = rows.find(
      (emp) => emp.id === selected[0]
    );

    if (!employee) return;

    setIsEdit(true);

    setFormData({
      ...employee,
    });

    setErrors({});

    setOpen(true);
  };

  // ==========================
  // Delete
  // ==========================

  const handleDelete = () => {
    selected.forEach((id) => {
      dispatch(deleteEmployee(id));
    });

    setSelected([]);
  };

  // ==========================
  // Input Change
  // ==========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==========================
  // Validation
  // ==========================

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Employee name is required";
    }

    if (!formData.department.trim()) {
      newErrors.department =
        "Department is required";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email =
        "Enter valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    }

    if (!formData.dob) {
      newErrors.dob =
        "DOB is required";
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate =
        "Joining date is required";
    }

    if (!formData.status) {
      newErrors.status =
        "Status is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================
  // Save
  // ==========================

  const handleSave = () => {
    if (!validate()) return;

    if (isEdit) {
      dispatch(editEmployee(formData));
    } else {
      dispatch(addEmployee(formData));
    }

    handleClose();
    setSelected([]);
  };

  // ==========================
  // Sorting
  // ==========================

  const handleRequestSort = (
    event,
    property
  ) => {
    const isAsc =
      orderBy === property &&
      order === "asc";

    setOrder(
      isAsc ? "desc" : "asc"
    );

    setOrderBy(property);
  };

  // ==========================
  // Select All
  // ==========================

  const handleSelectAllClick = (
    event
  ) => {
    if (event.target.checked) {
      setSelected(
        rows.map((row) => row.id)
      );
      return;
    }

    setSelected([]);
  };

  // ==========================
  // Row Selection
  // ==========================

  const handleClick = (id) => {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter(
            (item) => item !== id
          )
        : [...previous, id]
    );
  };

  // ==========================
  // Pagination
  // ==========================

  const handleChangePage = (
    event,
    newPage
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event
  ) => {
    setRowsPerPage(
      parseInt(event.target.value, 10)
    );

    setPage(0);
  };

  // ==========================
  // Visible Rows
  // ==========================

  const visibleRows = React.useMemo(() => {
    return [...rows]
      .sort(
        getComparator(
          order,
          orderBy
        )
      )
      .slice(
        page * rowsPerPage,
        page * rowsPerPage +
          rowsPerPage
      );
  }, [
    rows,
    order,
    orderBy,
    page,
    rowsPerPage,
  ]);

  return (
    <Box
  sx={{
    width: "100% - 250px",
    ml: {
      xs: 0,        // below 600px
      sm: "250px",  // 600px and above
    },
    p: 3,
    transition: "margin-left 0.3s ease",
    boxSizing: "border-box",
  }}
>
      {/* ================= Dialog ================= */}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {isEdit ? "Edit Employee" : "Add Employee"}
        </DialogTitle>

        <DialogContent
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />

          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            error={!!errors.department}
            helperText={errors.department}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
          />

          <TextField
            fullWidth
            type="date"
            label="DOB"
            name="dob"
            value={formData.dob || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.dob}
            helperText={errors.dob}
          />

          <TextField
            type="date"
            label="Joining Date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            error={!!errors.joiningDate}
            helperText={errors.joiningDate}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            error={!!errors.status}
            helperText={errors.status}
            fullWidth
          >
            <MenuItem value="Active">
              Active
            </MenuItem>

            <MenuItem value="Inactive">
              Inactive
            </MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            color="inherit"
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= Table ================= */}

      <Paper
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <EnhancedTableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              numSelected={selected.length}
              rowCount={rows.length}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
            />

            <TableBody>
                          {visibleRows.map((row) => {
                const isItemSelected =
                  selected.includes(row.id);

                return (
                  <TableRow
                    hover
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={() =>
                          handleClick(row.id)
                        }
                      />
                    </TableCell>

                    {columns.map((column) => {
                      const columnId =
                        column.id || column.field;

                      return (
                        <TableCell
                          key={columnId}
                          align="center"
                        >
                          {column.render
                            ? column.render(row)
                            : row[columnId]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
                <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

// =====================================
// PropTypes
// =====================================

CommonTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  title: PropTypes.string,
};
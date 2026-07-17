import * as React from "react";
import { useCallback } from "react";
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
import EmployeeForm from "./form/EmployeeForm";
import DepartmentForm from "./form/DepartmentForm";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";

import {
  addEmployee,
  editEmployee,
  deleteEmployee,
} from "../redux/slice/employeeSlice";
import {
  addDepartment,
  editDepartment,
  deleteDepartment,
} from "../redux/slice/DepartmentSlice";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const crudActions = {
  employee: {
    add: addEmployee,
    edit: editEmployee,
    delete: deleteEmployee,
  },

  department: {
    add: addDepartment,
    edit: editDepartment,
    delete: deleteDepartment,
  },
};

function EnhancedTableHead({
  columns,
  order,
  orderBy,
  numSelected,
  rowCount,
  filters,
  setFilters,
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
            checked={rowCount > 0 && numSelected === rowCount}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {columns.map((column) => {
          const columnId = column.id || column.field;

          return (
            <TableCell
              key={columnId}
              align="center"
              sortDirection={orderBy === columnId ? order : false}
            >
              <TableSortLabel
                active={orderBy === columnId}
                direction={orderBy === columnId ? order : "asc"}
                onClick={createSortHandler(columnId)}
              >
                {column.headerName}
                {orderBy === columnId && (
                  <Box component="span" sx={visuallyHidden}>
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

      <TableRow>
        <TableCell padding="checkbox" />

        {columns.map((column) => (
          <TableCell key={column.id || column.field}>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="Filter..."
              value={filters[column.field] || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  [column.field]: e.target.value,
                }))
              }
            />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function CommonTable({ columns, rows, title, type }) {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [formData, setFormData] = React.useState({});
  const [orderBy, setOrderBy] = React.useState(columns?.[0]?.field || "");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [filters, setFilters] = React.useState({});
  const actions = crudActions[type];

  const handleClose = useCallback(() => {
    setOpen(false);
    setIsEdit(false);
  }, []);

  const handleCreate = useCallback(() => {
    setIsEdit(false);
    setFormData({});
    setOpen(true);
  }, []);

  const handleEdit = useCallback(() => {
    if (selected.length !== 1) return;
    const item = rows.find((row) => row.id === selected[0]);
    if (!item) return;
    setIsEdit(true);
    setFormData(item);
    setOpen(true);
  }, [selected, rows]);

  const handleDelete = useCallback(() => {
    selected.forEach((id) => {
      dispatch(actions.delete(id));
    });
    setSelected([]);
  }, [selected, dispatch, actions]);

  const filteredRows = React.useMemo(() => {
    return rows.filter((row) =>
      columns.every((column) => {
        const value = filters[column.field];
        if (!value) return true;
        return String(row[column.field] || "")
          .toLowerCase()
          .includes(value.toLowerCase());
      }),
    );
  }, [rows, filters, columns]);

  const visibleRows = React.useMemo(() => {
    return [...filteredRows]
      .sort((a, b) => getComparator(order, orderBy)(a, b))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredRows, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ p: 3 }}>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? `Edit ${type}` : `Add ${type}`}</DialogTitle>

        {type === "employee" ? (
          <EmployeeForm
            initialValues={isEdit ? formData : undefined}
            onSubmit={(values) => {
              if (isEdit) {
                dispatch(actions.edit(values));
              } else {
                const nextId =
                  rows.length > 0
                    ? Math.max(...rows.map((row) => Number(row.id))) + 1
                    : 1;

                dispatch(
                  actions.add({
                    ...values,
                    id: nextId,
                  }),
                );
              }

              handleClose();
            }}
          />
        ) : (
          <DepartmentForm
            initialValues={isEdit ? formData : undefined}
            onSubmit={(values) => {
              if (isEdit) {
                dispatch(actions.edit(values));
              } else {
                const nextId =
                  rows.length > 0
                    ? Math.max(...rows.map((row) => Number(row.id))) + 1
                    : 1;

                dispatch(
                  actions.add({
                    ...values,
                    id: nextId,
                  }),
                );
              }

              handleClose();
            }}
          />
        )}
      </Dialog>
      <Paper>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Box>
            {selected.length === 0 && (
              <Button variant="contained" onClick={handleCreate}>
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            )}
            {selected.length === 1 && (
              <Button
                color="warning"
                variant="contained"
                onClick={handleEdit}
                sx={{ mx: 1 }}
              >
                Edit
              </Button>
            )}
            {selected.length > 0 && (
              <Button color="error" variant="contained" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </Box>
        </Toolbar>

        <TableContainer>
          <Table>
            <EnhancedTableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              numSelected={selected.length}
              rowCount={filteredRows.length}
              filters={filters}
              setFilters={setFilters}
              onSelectAllClick={(e) =>
                setSelected(
                  e.target.checked ? filteredRows.map((r) => r.id) : [],
                )
              }
              onRequestSort={(e, property) => {
                const isAsc = orderBy === property && order === "asc";

                setOrder(isAsc ? "desc" : "asc");
                setOrderBy(property);
              }}
            />

            <TableBody>
              {visibleRows.map((row) => {
                const isSelected = selected.includes(row.id);
                return (
                  <TableRow key={row.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => {
                          setSelected((prev) =>
                            isSelected
                              ? prev.filter((x) => x !== row.id)
                              : [...prev, row.id],
                          );
                        }}
                      />
                    </TableCell>

                    {columns.map((column) => (
                      <TableCell key={column.field} align="center">
                        {row[column.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
}

export default React.memo(CommonTable);

CommonTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  title: PropTypes.string,
  type: PropTypes.oneOf(["employee", "department"]).isRequired,
};

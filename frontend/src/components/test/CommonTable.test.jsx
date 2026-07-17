import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CommonTable from "../CommonTable";

const store = configureStore({
  reducer: {
    department: (state = { departments: [] }) => state,
    employee: (state = { employees: [] }) => state,
  },
});

describe("CommonTable", () => {
  test("renders table data", () => {
    const columns = [
      {
        field: "name",
        headerName: "Name",
      },
    ];

    const rows = [
      {
        id: 1,
        name: "Binthia",
      },
    ];

    render(
      <Provider store={store}>
        <CommonTable
          columns={columns}
          rows={rows}
          title="Employees"
          type="employee"
        />
      </Provider>
    );

    expect(screen.getByText("Binthia")).toBeInTheDocument();
  });
});

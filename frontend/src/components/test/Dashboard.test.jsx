import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Dashboard from "../../pages/Dashboard";

const store = configureStore({
  reducer: {
    employee: () => ({
      employees: [],
    }),
    department: () => ({
      departments: [],
    }),
  },
});

describe("Dashboard", () => {
  test("renders dashboard page", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(
      screen.getByText(/dashboard/i)
    ).toBeInTheDocument();
  });
});

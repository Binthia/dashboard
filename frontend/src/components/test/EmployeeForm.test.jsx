import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeForm from "../form/EmployeeForm"

describe("EmployeeForm", () => {
  test("renders employee form fields", () => {
    render(
      <EmployeeForm
        initialValues={null}
        onSubmit={() => {}}
      />
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  test("shows validation errors on submit", async () => {
    render(
      <EmployeeForm
        initialValues={null}
        onSubmit={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(
      await screen.findByText(/name is required/i)
    ).toBeInTheDocument();
  });
});

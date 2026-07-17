import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import DepartmentForm from "../form/DepartmentForm";

describe("DepartmentForm", () => {
  test("renders department form fields", () => {
    render(
      <DepartmentForm
        initialValues={null}
        onSubmit={() => {}}
      />
    );

    expect(
      screen.getByLabelText(/department/i)
    ).toBeInTheDocument();
  });

  test("shows validation errors on submit", async () => {
    render(
      <DepartmentForm
        initialValues={null}
        onSubmit={() => {}}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /save/i })
    );

    expect(
      await screen.findByText(/department is required/i)
    ).toBeInTheDocument();
  });
});

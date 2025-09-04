import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders upload files button", () => {
  render(<App />);
  const buttonElement = screen.getByText(/Upload files/i);
  expect(buttonElement).toBeInTheDocument();
});

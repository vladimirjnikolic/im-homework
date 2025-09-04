import { render, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import InputFileUpload from "./InputFileUpload";
import {
  MAX_FILE_UPLOAD,
  NUMBER_OF_FILES_EXCEEDED_MESSAGE,
} from "./InputFileUploadConsts";

test("selection of more than 5 files shows alert", async () => {
  render(<InputFileUpload />);
  const input = document.querySelector('input[type="file"]');
  const files = [];
  for (let i = 1; i <= MAX_FILE_UPLOAD + 1; i++) {
    files.push(new File([`file${i}`], `file${i}.png`, { type: "image/png" }));
  }

  // Since window.alert is used, we can mock it to test if it was called
  window.alert = jest.fn();
  user.upload(input, files);
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith(NUMBER_OF_FILES_EXCEEDED_MESSAGE);
  });
});

test("selection up to 5 files pass", async () => {
  render(<InputFileUpload />);
  const input = document.querySelector('input[type="file"]');
  const files = [];
  for (let i = 1; i <= MAX_FILE_UPLOAD; i++) {
    files.push(new File([`file${i}`], `file${i}.png`, { type: "image/png" }));
  }

  // Since window.alert is used, we can mock it to test if it was called
  window.alert = jest.fn();
  user.upload(input, files);
  await waitFor(() => {
    expect(window.alert).not.toHaveBeenCalled();
  });
});

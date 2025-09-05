import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_UPLOAD,
  NUMBER_OF_FILES_EXCEEDED_MESSAGE,
} from "./InputFileUploadConsts";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface IInputFileUpload {
  uploadFiles: (files: FileList) => void;
}

const InputFileUpload = ({ uploadFiles }: IInputFileUpload) => {
  const filesSelected = (event: any) => {
    if (event.target.files?.length > MAX_FILE_UPLOAD) {
      alert(NUMBER_OF_FILES_EXCEEDED_MESSAGE);
    } else {
      uploadFiles(event.target.files);
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={filesSelected}
        multiple
        accept={ACCEPTED_FILE_TYPES}
      />
    </Button>
  );
};

export default InputFileUpload;

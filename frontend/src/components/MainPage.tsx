import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SelectImageSize from "./SelectImageSize/SelectImageSize";
import InputFileUpload from "./InputFileUpload/InputFileUpload";
import { useState } from "react";
import { resizeImages } from "api/resizeService";
import { v4 as uuidv4 } from "uuid";

const MainPage = () => {
  const [size, setSize] = useState<string>("");
  const uploadFiles = async (files: FileList) => {
    if (files.length > 0 && size) {
      const formData = new FormData();
      formData.append("size", size);
      const uploadId = uuidv4();
      formData.append("uploadId", uploadId);
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        file && formData.append("file", file, file.name);
      }
      try {
        console.log("Uploading files...");
        const imageResized = await resizeImages(formData);
        console.log("Files uploaded and resized:", imageResized);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      alert("Please select image size and files to upload.");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid size={8}>
          <SelectImageSize size={size} setSize={setSize} />
        </Grid>
        <Grid size={4}>
          <InputFileUpload uploadFiles={uploadFiles} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;

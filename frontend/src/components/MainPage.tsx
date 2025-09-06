import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SelectImageSize from "./SelectImageSize/SelectImageSize";
import InputFileUpload from "./InputFileUpload/InputFileUpload";
import { useEffect, useState } from "react";
import { checkStatus, resizeImages } from "api/resizeService";
import { v4 as uuidv4 } from "uuid";
import { IUpload } from "model/IUpload";

const MainPage = () => {
  const [size, setSize] = useState<string>("");
  const [uploads, setUploads] = useState<IUpload[]>([]);
  const uploadFiles = async (files: FileList) => {
    if (files.length > 0 && size) {
      const formData = new FormData();
      formData.append("size", size);
      const uploadId = uuidv4();
      formData.append("uploadId", uploadId);
      const fileNames = [];
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        fileNames.push(file?.name || "");
        file && formData.append("file", file, file.name);
      }
      try {
        const imageResized = await resizeImages(formData);
        if (imageResized) {
          setUploads([
            ...uploads,
            {
              uploadId,
              size,
              files: fileNames.map((fileName: string) => ({
                uploadId,
                fileName,
                status: "processing",
              })),
            },
          ]);
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      alert("Please select image size and files to upload.");
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      for (const upload of uploads) {
        try {
          for (const file of upload.files) {
            if (file.status === "completed" || file.status === "failed")
              continue;
            try {
              const downloadUrl = await checkStatus(
                file.uploadId,
                file.fileName
              );
              file.status = "completed";
              file.downloadUrl = downloadUrl;
            } catch (error: any) {
              if (error.response && error.response.status === 410) {
                file.status = "failed";
              }
            }
          }
          setUploads([...uploads]);
        } catch (error) {
          console.error("Error checking status:", error);
        }
      }
    }, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [uploads]);

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

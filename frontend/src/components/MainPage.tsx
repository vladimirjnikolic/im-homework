import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SelectImageSize from "./SelectImageSize/SelectImageSize";
import InputFileUpload from "./InputFileUpload/InputFileUpload";

const MainPage = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid size={8}>
          <SelectImageSize />
        </Grid>
        <Grid size={4}>
          <InputFileUpload />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;

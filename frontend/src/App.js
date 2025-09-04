import "./App.css";
import { StyledEngineProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SelectImageSize from "components/SelectImageSize/SelectImageSize";
import InputFileUpload from "components/InputFileUpload/InputFileUpload";

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <Box sx={{ flexGrow: 1, p: 4 }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid size={8}>
              <SelectImageSize />
            </Grid>
            <Grid size={4}>
              <InputFileUpload />
            </Grid>
          </Grid>
        </Box>
      </StyledEngineProvider>
    </div>
  );
}

export default App;

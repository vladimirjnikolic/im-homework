import "./App.css";
import { StyledEngineProvider } from "@mui/material/styles";
import MainPage from "components/MainPage";

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <MainPage />
      </StyledEngineProvider>
    </div>
  );
}

export default App;

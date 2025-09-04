import "./App.css";
import { Button, VisuallyHiddenInput } from "@mui/material";
import { CloudUploadIcon } from "@emotion/react";
import InputFileUpload from "components/InputFileUpload";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InputFileUpload />
      </header>
    </div>
  );
}

export default App;

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ISelectImageSize {
  size?: string;
  setSize: (size: string) => void;
}

const SelectImageSize = ({ size, setSize }: ISelectImageSize) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">New image size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          label="Resize image to"
          onChange={handleChange}
        >
          <MenuItem value="qHD">960 × 540</MenuItem>
          <MenuItem value="HD">1280 × 720</MenuItem>
          <MenuItem value="HD+">1600 × 900</MenuItem>
          <MenuItem value="FHD">1920 × 1080</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectImageSize;

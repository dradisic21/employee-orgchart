import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./SearchEmployee.scss"

export function SearchEmployee({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="input-container">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "300px" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Pretraži po imenu"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
    </div>
  );
}

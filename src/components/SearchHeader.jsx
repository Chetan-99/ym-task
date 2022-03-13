import {
  Grid,
  TextField,
  Box,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import React from "react";
import { generateExcel } from "./getData";
const { CSVLink } = require("react-csv");

function SearchHeader({ handleSearch, handleExport, data }) {
  const [cat, setcat] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    if (cat === 0) handleSearch("name", searchText);
    else if (cat === 1) handleSearch("gender", searchText);
    else if (cat === 2) handleSearch("email", searchText);
  }, [searchText, cat]);

  React.useEffect(() => {
    setSearchText("");
  }, [cat]);

  const handleChange = (event) => {
    setcat(event.target.value);
  };

  const handleSearchText = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <Grid
      container
      marginBottom={"2%"}
      spacing={2}
      // width={"98%"}
      // marginLeft={"0.1em"}
    >
      <Grid item xs={12} lg={2} md={2}>
        <Box>
          <FormControl fullWidth>
            <Select
              value={cat}
              onChange={handleChange}
              style={{
                textAlign: "center",
              }}
            >
              <MenuItem value={0}>Name</MenuItem>
              <MenuItem value={1}>Gender</MenuItem>
              <MenuItem value={2}>Email</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} lg={8} md={8}>
        <TextField
          fullWidth
          onChange={handleSearchText}
          label="Search"
          variant="outlined"
          value={searchText}
        />
      </Grid>
      <Grid item xs={12} lg={2} md={2}>
        <Button
          onClick={handleExport}
          variant="contained"
          fullWidth
          style={{ height: "55px" }}
        >
          <CSVLink
            {...generateExcel(data)}
            style={{
              color: "white",
              textTransform: "none",
              textDecoration: "none",
            }}
          >
            Export CSV
          </CSVLink>
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchHeader;

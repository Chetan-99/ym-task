import {
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

function SearchHeader(props) {
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid
      container
      marginBottom={"2%"}
      spacing={2}
      width={"98%"}
      marginLeft={"0.1em"}
    >
      <Grid item xs={0} md={2} lg={2}></Grid>
      <Grid item xs={12} lg={2} md={2}>
        <Box sx={{ textAlign: "center" }}>
          <FormControl fullWidth>
            <Select value={age} onChange={handleChange}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} lg={8} md={8}>
        <TextField fullWidth label="Search" variant="outlined" />
      </Grid>
    </Grid>
  );
}

export default SearchHeader;

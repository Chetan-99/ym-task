import * as React from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
} from "@mui/material";
import {
  getData,
  sortDataWithName,
  sortDataWithGender,
  sortDataWithEmail,
  searchName,
  searchGender,
  searchEmail,
  generateExcel,
} from "../components/getData";
import TableHeader from "../components/TableHeader";
import SearchHeader from "../components/SearchHeader";

const columns = [
  { id: "name", label: "Name", minWidth: 100, align: "left" },
  { id: "gender", label: "Gender", minWidth: 100, align: "left" },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "left",
  },
];

let globalData = [];

export default function HomeTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [nameOrder, setNameOrder] = React.useState(false);
  const [genderOrder, setGenderOrder] = React.useState(false);
  const [emailOrder, setEmailOrder] = React.useState(false);

  React.useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    await getData(100)
      .then((res) => {
        globalData = res;
        setData(res);
      })
      .catch((er) => {
        console.log(er);
      });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCSV = () => {
    generateExcel(data);
  };

  function handleSearch(category, text) {
    if (text !== "") {
      if (category === "name") setData(searchName(text, globalData));
      else if (category === "gender") setData(searchGender(text, globalData));
      else if (category === "email") setData(searchEmail(text, globalData));
    } else if (text === "") setData(globalData);
  }

  function columnData(cId, rId) {
    if (cId === "name") {
      return (
        <Grid container>
          <Grid item style={{ marginRight: "10px" }}>
            <img
              style={{ borderRadius: "50%" }}
              src={data[rId + page]["picture"]}
              alt="thumbNail"
            />
          </Grid>
          <Grid item style={{ marginTop: "10px" }}>
            {`${data[rId + page][cId]["title"]} ${
              data[rId + page][cId]["first"]
            } ${data[rId + page][cId]["last"]}`}
          </Grid>
        </Grid>
      );
    } else return data[rId + page][cId];
  }

  function handleHeaderButton(id) {
    switch (id) {
      case "name": {
        setNameOrder(!nameOrder);
        const newData = sortDataWithName(data, nameOrder);
        setData(newData);
        break;
      }
      case "gender": {
        setGenderOrder(!genderOrder);
        const newData = sortDataWithGender(data, genderOrder);
        setData(newData);
        break;
      }
      case "email": {
        setEmailOrder(!emailOrder);
        const newData = sortDataWithEmail(data, emailOrder);
        setData(newData);
        break;
      }
      default:
    }
  }

  return (
    <Container maxWidth="lg">
      <SearchHeader
        handleSearch={handleSearch}
        handleExport={handleCSV}
        data={data}
      />
      <Paper
        sx={{
          overflow: "hidden",
          // marginLeft: "1em",
          // marginRight: "1em",
        }}
      >
        <TableContainer sx={{ maxHeight: "90%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableHeader
                  columns={columns}
                  handleClick={handleHeaderButton}
                  arrowOrder={[nameOrder, genderOrder, emailOrder]}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={rowIndex}
                    >
                      {columns.map((column, columnIndex) => {
                        return (
                          <TableCell key={columnIndex} align={column.align}>
                            {columnData(column.id, rowIndex)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}

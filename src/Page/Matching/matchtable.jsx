import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TextField from "@mui/material/TextField";
import companies from "../../const/companies";
function convertCompanyData(company) {
  return {
    id: company.id.toString(), // IDを文字列に変換
    name: company.name,
    matchdo: 90, // マッチ度の初期値
    history: [
      {
        industry: company.category,
        location: company.work_location,
        department: company.recruitment_grade,
        employees: company.number_of_employees,
        capital: company.capital,
        sales: company.amount_of_sales,
      },
    ],
  };
}

const rows = companies.map(convertCompanyData);

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.matchdo}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                詳細
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>業種</TableCell>
                    <TableCell>勤務地</TableCell>
                    <TableCell>募集学科</TableCell>
                    <TableCell>従業員数</TableCell>
                    <TableCell>資本金</TableCell>
                    <TableCell>売上高</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.industry}
                      </TableCell>
                      <TableCell>{historyRow.location}</TableCell>
                      <TableCell>{historyRow.department}</TableCell>
                      <TableCell>{historyRow.employees}</TableCell>
                      <TableCell>{historyRow.capital}</TableCell>
                      <TableCell>{historyRow.sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    matchdo: PropTypes.number.isRequired,

    history: PropTypes.arrayOf(
      PropTypes.shape({
        industry: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        employees: PropTypes.string.isRequired,
        capital: PropTypes.string.isRequired,
        sales: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export function Matchtable() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TextField
        label="IDまたは会社名入力"
        value={searchTerm}
        onChange={handleSearch}
        variant="outlined"
        sx={{ marginBottom: "1rem", width: 500 }}
        className="sertch"
      />
      <TableContainer
        component={Paper}
        className="table1"
        sx={{
          width: 1400,
          fontSize: 30,
          border: "2px solid gray",
          boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>会社ID</TableCell>
              <TableCell>会社名</TableCell>
              <TableCell>マッチ度</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <head>
        <link
          href="matchtable.css"
          rel="stylesheet"
          type="text/css"
          media="all"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
    </>
  );
}
export default companies;

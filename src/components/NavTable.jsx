import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TablePagination,
} from "@material-ui/core";

import { green, red } from "@material-ui/core/colors";

import { ArrowUpward, ArrowDownward } from "@material-ui/icons";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

function NavTable({ dataRows }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowPerPageChange = (event) => {
    setRowPerPage(event.target.value);
  };

  return (
    // <TableContainer component={Paper}>
    <TableContainer>
      <Table className={classes.table} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Nav value</TableCell>
            <TableCell align="right">Nav diff</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRows
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((row, index) => (
              <TableRow key={row.date}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.nav}</TableCell>
                <TableCell align="right">
                  {(dataRows[index + 1].nav - row.nav).toFixed(2)}
                  <span>
                    {dataRows[index + 1].nav - row.nav >= 0 ? (
                      <ArrowUpward style={{ color: green[500] }} />
                    ) : (
                      <ArrowDownward style={{ color: red[500] }} />
                    )}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TablePagination
          count={dataRows.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleRowPerPageChange}
          rowsPerPageOptions={[10, 20, 30]}
        />
      </Table>
    </TableContainer>
  );
}

export default NavTable;

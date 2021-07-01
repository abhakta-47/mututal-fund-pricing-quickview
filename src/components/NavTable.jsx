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

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

function NavTable({
  navDataRows,
  page,
  setPage,
  rowsPerPage,
  setRowPerPage,
  rowPage,
  setRowPage,
}) {
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setRowPage(
      navDataRows.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage)
    );
  };

  const handleRowPerPageChange = (event) => {
    setRowPerPage(event.target.value);
    const newRowPerPage = event.target.value;
    setRowPage(
      navDataRows.slice(page * newRowPerPage, (page + 1) * newRowPerPage)
    );
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
          {rowPage.map((row, index) => (
            <TableRow key={row.date}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.nav}</TableCell>
              <TableCell align="right">
                {row.diff}
                <span>
                  {row.diff >= 0 ? (
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
          count={navDataRows.length}
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

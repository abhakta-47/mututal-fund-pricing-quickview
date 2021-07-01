import React from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TablePagination,
  Paper,
} from "@material-ui/core";

import { green, red } from "@material-ui/core/colors";

import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import NavUnit from "./NavUnit";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    // minWidth: 700,
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
  navUnits,
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Nav value</StyledTableCell>
            <StyledTableCell align="right">Current Value</StyledTableCell>
            <StyledTableCell align="right">Value Change</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowPage.map((row) => (
            <StyledTableRow key={row.date}>
              <StyledTableCell component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nav}</StyledTableCell>
              <StyledTableCell align="right">
                {(row.nav * navUnits).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {(row.diff * navUnits).toFixed(2)}
                <span>
                  {row.diff >= 0 ? (
                    <ArrowUpward style={{ color: green[500] }} />
                  ) : (
                    <ArrowDownward style={{ color: red[500] }} />
                  )}
                </span>
              </StyledTableCell>
            </StyledTableRow>
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

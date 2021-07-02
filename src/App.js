import React, { useState, useEffect } from "react";

import NavTable from "./components/NavTable";
import NavChart from "./components/NavChart";
import NavUnit from "./components/NavUnit";

import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  Modal,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  const [navData, setNavData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowPerPage] = React.useState(10);
  const [rowPage, setRowPage] = React.useState([]);
  const [navUnits, setNavUnits] = React.useState(100);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const savedNavUnits = JSON.parse(localStorage.getItem("navUnits"));
    if (savedNavUnits) setNavUnits(savedNavUnits);

    fetch("https://api.mfapi.in/mf/102885")
      .then((res) => res.json())
      .then((data) => {
        if (data.STATUS !== "SUCCESS") console.log("api error");
        const formData = data.data.slice(0, 300).map((d, i) =>
          Object({
            date: d.date.substr(0, 5),
            nav: parseFloat(d.nav),
            diff: (data.data[i + 1].nav - data.data[i].nav).toPrecision(2),
          })
        );
        // console.log(formData);
        setNavData(formData);
        setRowPage(
          formData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
        );
      })
      .catch((err) => console.log(err));
  }, [page, rowsPerPage]);

  return (
    <Container className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            L24G SBI EHFRG
          </Typography>
          <Tooltip title="Settings">
            <SettingsIcon onClick={handleOpenModal} />
          </Tooltip>
        </Toolbar>
      </AppBar>

      <div className="row">
        <NavTable
          navDataRows={navData}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowPerPage={setRowPerPage}
          rowPage={rowPage}
          setRowPage={setRowPage}
          navUnits={parseFloat(navUnits)}
        />
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <NavUnit
          navUnits={navUnits}
          setNavUnits={setNavUnits}
          handleCloseModal={handleCloseModal}
        />
      </Modal>

      <div className="row">
        <NavChart navData={rowPage} />
      </div>
    </Container>
  );
}

export default App;

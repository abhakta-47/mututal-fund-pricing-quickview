import React, { useState, useEffect } from "react";

import NavTable from "./components/NavTable";
import NavChart from "./components/NavChart";

function App() {
  const [navData, setNavData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowPerPage] = React.useState(10);
  const [rowPage, setRowPage] = React.useState([]);

  useEffect(() => {
    fetch("https://api.mfapi.in/mf/102885")
      .then((res) => res.json())
      .then((data) => {
        if (data.STATUS !== "SUCCESS") console.log("api error");
        const formData = data.data.slice(0, 300).map((d, i) =>
          Object({
            date: d.date,
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
  }, [NavTable]);

  return (
    <div className="App">
      <NavTable
        navDataRows={navData}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowPerPage={setRowPerPage}
        rowPage={rowPage}
        setRowPage={setRowPage}
      />
      <NavChart navData={rowPage} />
    </div>
  );
}

export default App;

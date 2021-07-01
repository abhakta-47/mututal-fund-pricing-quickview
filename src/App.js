import NavTable from "./components/NavTable";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.mfapi.in/mf/102885")
      .then((res) => res.json())
      .then((data) => {
        if (data.STATUS != "SUCCESS") console.log("api error");
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }, [NavTable]);

  return (
    <div className="App">
      <NavTable dataRows={data} />
    </div>
  );
}

export default App;

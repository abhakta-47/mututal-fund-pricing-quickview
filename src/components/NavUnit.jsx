import React, { useState, useEffect } from "react";

function NavUnit({ navUnits, setNavUnits }) {
  const [navUnit, setNavUnit] = useState(navUnits);

  useEffect(() => {
    const savedNavUnits = JSON.parse(localStorage.getItem("navUnits"));
    if (savedNavUnits) setNavUnit(savedNavUnits);
  }, []);

  const handleButton = (e) => {
    if (!isNaN(parseFloat(navUnit))) {
      setNavUnits(navUnit);
      localStorage.setItem("navUnits", JSON.stringify(navUnit));
    } else alert("only number allowed");
  };

  return (
    <div>
      <h3>Change Current Unit :: </h3>
      <input
        type="number"
        name="NavUnits"
        placeHolder="enter current nav units"
        id="navUnitArea"
        value={navUnit}
        onChange={(e) => setNavUnit(e.target.value)}
      />
      <button onClick={handleButton}>Save</button>
    </div>
  );
}

export default NavUnit;

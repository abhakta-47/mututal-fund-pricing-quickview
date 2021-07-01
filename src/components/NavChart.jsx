import React from "react";
import { Paper } from "@material-ui/core";

import { PluginHost } from "@devexpress/dx-react-core";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  ZoomAndPan,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

function NavChart({ navData }) {
  navData = navData.map((d) =>
    Object({
      date: d.date.substr(0, 5),
      nav: parseFloat(d.nav),
    })
  );

  return (
    <Paper>
      <PluginHost>
        <Chart data={navData.slice().reverse()}>
          <ArgumentAxis />
          <ValueAxis />
          <LineSeries valueField="nav" argumentField="date" />
          <ZoomAndPan />
          <Title text="Nav Changes" />
          <Animation />
        </Chart>
      </PluginHost>
    </Paper>
  );
}

export default NavChart;

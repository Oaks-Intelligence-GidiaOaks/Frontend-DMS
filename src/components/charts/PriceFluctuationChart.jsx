import React from "react";
import { ResponsiveLine } from "@nivo/line";

const PriceFluctuationChart = ({ data }) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      enableGridX={false}
      enableGridY={false}
      enablePoints={true} // Disable the points on the lines
      // enableArea // Enable the filled area under the lines
      enableSlices="x" // Enable the tooltips on hover
      useMesh={false} // Disable meshing for overlapping lines
    />
  );
};

export default PriceFluctuationChart;

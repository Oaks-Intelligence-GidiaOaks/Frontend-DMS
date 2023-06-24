import React from "react";
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 andtrac
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const formatTime = (time) => {
  // const dateOject = new Date(time);

  const getReferenceTime = () => {
    const currentDate = new Date();

    const currentDay = currentDate.getDay();

    const daysToAdd = currentDay <= 3 ? 3 - currentDay : 10 - currentDay;

    currentDate.setDate(currentDate.getDate() + daysToAdd);

    currentDate.setHours(0, 0, 0, 0);

    return currentDate.toISOString();
  };

  const referenceTime = new Date(getReferenceTime()).getTime();
  const submissionTime = new Date(time).getTime();

  const submissionDelta = submissionTime - referenceTime;

  return `${submissionDelta}`;
};

const arrangeTime = (time) => {
  const passedDate = new Date(time);
  const formattedDate = passedDate.toLocaleDateString();
  const formattedTime = passedDate.toLocaleDateString();

  return `${formattedDate} ${formattedTime}`;
};

const MeshedLineChart = ({ data: MeshedLineD }) => {
  const transformedData =
    MeshedLineD?.length > 0 &&
    MeshedLineD.map((item) => {
      let id = item.lga;

      let data = item.weeklyValues
        .map((obj) => ({
          x: `Week ${obj.weekNo}`,
          y: formatTime(obj.submissionTime),
        }))
        .sort((a, b) => (a.x > b.x ? 1 : -1));

      return { id, data };
    });

  return MeshedLineD?.length > 0 ? (
    <ResponsiveLine
      className="responsive-line-chart"
      data={transformedData}
      margin={{ top: 50, right: 110, bottom: 50, left: 70 }}
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
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Submission week",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 2,
        tickPadding: 2,
        tickRotation: 0,
        // legend: "Submission time",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      enablePoints={true} // Disable the points on the lines
      // enableArea // Enable the filled area under the lines
      enableSlices="x" // Enable the tooltips on hover
      useMesh={false} // Disable meshing for overlapping lines
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 8,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
          itemWrapperStyle: {
            wordBreak: "break-all",
          },
          itemTextStyle: {
            fontSize: "5px",
          },
        },
      ]}
    />
  ) : (
    <div className="h-32 grid place-items-center">No chart data..</div>
  );
};

export default MeshedLineChart;

// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import LinearProgress, {
//   linearProgressClasses,
// } from "@mui/material/LinearProgress";

// const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
//   height: 8,
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor:
//       value >= 0
//         ? theme.palette.grey[theme.palette.mode === "light" ? 200 : 800]
//         : theme.palette.error.main,
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor:
//       value >= 0
//         ? theme.palette.mode === "light"
//           ? "#1a90ff"
//           : "#308fe8"
//         : theme.palette.error.main,
//   },
// }));

// export default function PercentageBar({ value }) {
//   let convertedValue = value % 100;

//   if (convertedValue < 0) {
//     convertedValue += 100;
//   }

//   if (convertedValue > 100) {
//     convertedValue %= 100;
//   }

//   return (
//     <Box sx={{ flexGrow: 1, alignItems: "center" }}>
//       <BorderLinearProgress variant="determinate" value={convertedValue} />
//       <span>{Math.round(value)}%</span>
//     </Box>
//   );
// }

// PercentageBar.js
// import React from "react";

// const PercentageBar = ({ value }) => {
//   let convertedValue = value % 100;
//   if (convertedValue < 0) {
//     convertedValue += 100;
//   }

//   if (convertedValue > 100) {
//     convertedValue %= 100;
//   }

//   const barColor = value >= 0 ? "bg-blue-500" : "bg-red-500";
//   const progressWidth = value >= 0 ? convertedValue : 100 - convertedValue;

//   return (
//     <div className="relative w-full h-8">
//       <div
//         className={`absolute bg-gray-200 bottom-0 h-4 rounded-full ${barColor}`}
//         style={{ width: `${progressWidth}%` }}
//       ></div>
//       <span className="absolute bottom-0 left-0 pb-1 pl-1">
//         {Math.round(value)}%
//       </span>
//     </div>
//   );
// };

// export default PercentageBar;

import React from "react";

const PercentageBar = ({ value }) => {
  console.log(value);
  let convertedValue = value % 100;
  if (convertedValue < 0) {
    convertedValue += 100;
  }

  if (convertedValue > 100) {
    convertedValue %= 100;
  }

  const barColor = value >= 0 ? "bg-blue-500" : "bg-red-500";
  const progressWidth = value >= 0 ? convertedValue : 100 - convertedValue;

  return (
    <div className="py-4">
      <div className="relative w-full h-2 rounded-full bg-gray-200">
        <div
          className={`absolute h-full rounded-full ${barColor}`}
          style={{ width: `${progressWidth}%` }}
        ></div>
        <span className="absolute bottom-0 left-3 top-2 transform -translate-x-1/2 py-1 bg-white rounded-full">
          {Math.round(value)}%
        </span>
      </div>
    </div>
  );
};

export default PercentageBar;

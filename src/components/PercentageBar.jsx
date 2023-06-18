import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      value >= 0
        ? theme.palette.grey[theme.palette.mode === "light" ? 200 : 800]
        : theme.palette.error.main,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      value >= 0
        ? theme.palette.mode === "light"
          ? "#1a90ff"
          : "#308fe8"
        : theme.palette.error.main,
  },
}));

export default function PercentageBar({ value }) {
  let convertedValue = value % 100;

  if (convertedValue < 0) {
    convertedValue += 100;
  }

  if (convertedValue > 100) {
    convertedValue %= 100;
  }

  return (
    <Box sx={{ flexGrow: 1, alignItems: "center" }}>
      <BorderLinearProgress variant="determinate" value={convertedValue} />
      <span>{Math.round(value)}%</span>
    </Box>
  );
}

import React from "react";
import { Rings } from "react-loader-spinner";

const RingsCircle = () => {
  return (
    <Rings
      height="32"
      width="32"
      color="#ffffff"
      radius="10"
      wrapperStyle={{ backgoundColor: "yellow" }}
      wrapperClass=""
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};

export default RingsCircle;

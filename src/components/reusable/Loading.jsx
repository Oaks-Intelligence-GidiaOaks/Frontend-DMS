import React from "react";
import { ClipLoader, FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full my-auto py-6 grid place-items-center">
      {/* <ClipLoader
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}

      <FadeLoader color="gray" radius={1} width={3} height={10} size={30} />
    </div>
  );
};

export default Loading;

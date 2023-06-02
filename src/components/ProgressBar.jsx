import { useContext } from "react";
import EnumeratorFormContext from "../context/enumeratorFormContext";

function ProgressBar() {
  const { totalNumOfFields, numOfValidFields, progressPercentage } = useContext(
    EnumeratorFormContext
  );

  return (
    <div className="flex flex-col gap-1 basis-[280px] pl-3">
      <div className="flex justify-between">
        <span className="text-secondary-gray font-medium text-base">
          Progress bar
        </span>
        <span className="text-primary-gold text-base">
          ({numOfValidFields}/{totalNumOfFields})
        </span>
      </div>
      <div className="w-full h-1 rounded bg-gray-300">
        <div
          className={`h-1 rounded bg-primary-green`}
          style={{ width: progressPercentage + "%" }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;

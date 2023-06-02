import { useContext, useRef } from "react";
import EnumeratorFormContext from "../context/enumeratorFormContext";

function TabBar() {
  const { setCurrentFormTab, state } = useContext(EnumeratorFormContext);

  const tabs = useRef([
    "Food",
    "Commodity",
    "Transport",
    "Accomodation",
    "Reports",
  ]);

  return (
    <div className="flex flex-nowrap mx-auto mt-5 w-fit pb-3">
      {tabs.current.map((tab, index) => (
        <div
          key={index}
          className="flex justify-end flex-col gap-1 auto-size cursor-pointer"
          onClick={() => setCurrentFormTab(tab)}
        >
          <p
            className={`text-4 ${
              state.currentFormTab === tab
                ? "text-primary-green font-bold"
                : "text-primary-gray"
            } text-center`}
          >
            {tab}
          </p>
          <div
            className={`${
              state.currentFormTab === tab
                ? "h-[2px] bg-primary-green"
                : "h-[1px] bg-mid-gray"
            }
             w-full`}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default TabBar;

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Pie from "../../components/charts/Pie";
import { data } from "../../data/chartData";

import { Enum } from "../../components/grid";
import { Link } from "react-router-dom";

const AdminEnumerators = () => {
  const [tableData, setTableData] = useState(null);
  // const [isloading, setIsLoading] = useState(true)

  const memoizedEnumerators = useMemo(() => {
    return () =>
      axios
        .get("admin/enumerators")
        .then((res) => setTableData(res.data))
        .catch((err) => console.log(err));
  }, []);

  useEffect(() => memoizedEnumerators, []);

  return tableData ? (
    <div className="border flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center flex-wrap gap-2 xs:text-[10px]">
        <div className="rounded bg-primary p-3 flex items-center gap-2 text-xs">
          <p className="text-white">Total Enumerators</p>
          <p className="rounded p-1 text-primary bg-white">
            {tableData?.totalEnumerators}
          </p>
        </div>

        <div className="flex p-3 md:ml-8 items-center gap-6 w-fit rounded bg-white">
          <p className="">Recently Added</p>
          <p className="text-primary p-1 bg-gray-200 rounded text-sm">
            {tableData?.newlyAdded}
          </p>
        </div>

        <Link
          to="/add"
          onClick={() => {}}
          className="rounded bg-white border border-primary text-primary flex items-center p-3 gap-12 sm:ml-auto cursor-pointer sm:flex-initial xs:flex-1 xs:justify-between"
        >
          <p>Add new</p>
          <span>+</span>
        </Link>

        <Link
          to="/new-lga"
          onClick={() => {}}
          className="rounded bg-white border border-primary text-primary flex items-center p-3 gap-12 sm:ml-auto cursor-pointer sm:flex-initial xs:flex-1 xs:justify-between"
        >
          {/* <div> */}
          <p>Enroll new Lga</p>
          <span>+</span>
          {/* </div> */}
        </Link>
      </div>

      {/* table */}
      <div className="bg-white  w-full text-xs">
        <Enum enumData={tableData?.enumerators} />
      </div>

      {/* chart */}
      <div className="h-fit mt-10 lg:w-2/5 md:w-3/5 p-3  rounded-md drop-shadow-sm bg-white flex flex-col ">
        <h2 className="text-primary font-semibold">Enumerators</h2>

        <div className="flex">
          <div className=" pr-6 mt-2 text-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2  rounded-full bg-primary" /> Enumerators
            </div>

            <div className="flex items-center gap-2  ">
              <div className="h-2 w-2  rounded-full bg-primary " />
              <span className="whitespace-no-wrap">Recently added</span>
            </div>
          </div>
          <div className="h-[140px] w-200px] border">
            <Pie iR={0.7} data={data} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="w-full h-screen grid place-items-center text-center">
      <span>loading.....</span>
    </p>
  );
};

export default AdminEnumerators;

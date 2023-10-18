import React, { useEffect, useState } from "react";
import TrackerGrid from "../../components/grid/TrackerGrid";
import MeshedLineChart from "../../components/charts/MeshedLineChart";
import CategoryTab from "../../components/CategoryTab";
import { MeshedLineChartData } from "../../data/charts";
import axios from "axios";
import { Download, ClearOutlined } from "@mui/icons-material";
import { useAuth } from "../../context";
import { Loading } from "../../components/reusable";
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';

const Tracker = () => {
  const {
    user: { token },
  } = useAuth();
  const [trackerData, setTrackerData] = useState(null);
  const [timeOfSub, setTimeOfSub] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // console.log(trackerData);

  let submitted = trackerData && trackerData.totalSubmision;

  let noResponse =
    trackerData && trackerData.totalEnumerators - trackerData.totalSubmision;

  if (timeOfSub) {
    
  }

  let firstChart = timeOfSub && timeOfSub.slice(0, 10);
  let secondChart =
    timeOfSub && timeOfSub.length > 10 && timeOfSub.slice(10, 20);
  let thirdChart =
    timeOfSub && timeOfSub.length > 20 && timeOfSub.slice(20, 30);
  let fourthChart = timeOfSub && timeOfSub.length > 30 && timeOfSub.slice(30);

  const handleSubmit = () => {
    let data = trackerData.results;

    const formattedData = data.map((value) => value.form_id);
    console.log("formattedData:", formattedData);

    try {
      setIsLoading(true);
      axios
        .post(
          "form_response/approve_response",
          { ids: formattedData },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((data) => {
          console.log(data);
          const message = data.data.message;
          console.log('Success:', message);
          toast.success("Data submitted successfully");
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.error("You have already submitted your data.");
          } else {
            toast.error(error.response.data || error.response.statusText);
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    axios
      .get("form_response/response_tracker")
      .then((res) => setTrackerData(res.data))
      .catch((err) => console.log(err));

    axios
      .get("form_response/submission_time")
      .then((res) => setTimeOfSub(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6 relative">
      <div className="flex items-center flex-wrap gap-3">
        <div className="rounded bg-primary p-3 flex items-center justify-between  xs:flex-1 md:flex-initial gap-6 xs:gap-16 shrink-0 text-xs">
          <p className="text-white">Submitted</p>
          <p className="rounded p-1 text-primary bg-white">{submitted}</p>
        </div>

        <div className="flex p-3 lg:ml-8 items-center gap-6 w-fit rounded bg-white">
          <p className="">No response</p>
          <p className="text-primary p-1 bg-gray-200 rounded text-sm">
            {noResponse}
          </p>
        </div>
      </div>

      <div
        className="w-fit text-white font-semibold bg-oaksgreen rounded shadow-md"
        onClick={() => setShowModal(true)}
      >
        <CategoryTab text="Submit" Icon={Download} />
      </div>

      {/* submit modal */}
      {showModal && (
        <div className="absolute h-screen w-full  backdrop-blur-sm bg-[rgba(0,0,0,0.15)] grid place-items-center z-40">
          {isLoading ? (
            <div>
              <ClipLoader color="#00BCD4" />
            </div>
          ) : (
            <div className="lg:w-1/3 bg-white mx-auto p-4 px-6 space-y-8 text-base rounded">
              <p>Are you sure you want to submit your weekly data?</p>

              <div className="flex gap-3 items-center justify-between  text-white">
                <div
                  onClick={handleSubmit}
                  className="rounded p-2 cursor-pointer text-center bg-blue-500 flex items-center px-5"
                >
                  <span>Submit</span>
                </div>

                <div
                  onClick={() => setShowModal(false)}
                  className="rounded cursor-pointer p-2 text-center flex items-center bg-green-500 px-5"
                >
                  <span>Cancel</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* table */}
      <div className="bg-white  w-full">
        {!trackerData ? (
          <Loading />
        ) : (
          <TrackerGrid data={trackerData.results} />
        )}
      </div>

      {/* chart */}
      <div className="p-3 flex flex-col lg:flex-row lg:overflow-x-auto gap-3 rounded-xl drop-shadow-lg ">
        {firstChart && (
          <div className="h-72 lg:w-1/2 bg-white rounded drop-shadow-lg">
            <MeshedLineChart data={firstChart} />
          </div>
        )}

        {secondChart && (
          <div className="h-72 lg:w-1/2 bg-white rounded drop-shadow-lg">
            <MeshedLineChart data={secondChart} />
          </div>
        )}

        {thirdChart && (
          <div className="h-72 lg:w-1/2 bg-white rounded drop-shadow-lg">
            <MeshedLineChart data={thirdChart} />
          </div>
        )}

        {fourthChart && (
          <div className="h-72 lg:w-1/2 bg-white rounded drop-shadow-lg">
            <MeshedLineChart data={fourthChart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;

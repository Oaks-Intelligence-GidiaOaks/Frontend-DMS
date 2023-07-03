import React, { useEffect, useState } from "react";
import { allLgasByState } from "../../data/form/allLgasByState";
import { FormInputDropDown, FormInputEditable } from "../form";
import { AllStates } from "../../data/form/states";
import { Rings } from "react-loader-spinner";
import axios from "axios";

const UpdateLgaRoutes = ({ lgaRoutes }) => {
  const [state, setState] = useState(null);
  const [lga, setLga] = useState(null);
  const [lgaId, setLgaId] = useState("");

  const [routesLga, setRoutesLga] = useState(null);
  const [route1Start, setRoute1Start] = useState(null);
  const [route1End, setRoute1End] = useState(null);
  const [route2Start, setRoute2Start] = useState(null);
  const [route2End, setRoute2End] = useState(null);
  const [route3Start, setRoute3Start] = useState(null);
  const [route3End, setRoute3End] = useState(null);

  const [errors, setErrors] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lga) {
      setRoutesLga(null);
      const filteredRoutesLga = lgaRoutes.filter((it) => it.lga === lga);
      setRoutesLga(filteredRoutesLga);

      filteredRoutesLga[0].routes.map((item, i) => {
        if (i === 0) {
          setRoute1Start(item.start);
          setRoute1End(item.end);
        }
        if (i === 1) {
          setRoute2Start(item.start);
          setRoute2End(item.end);
        }
        if (i === 2) {
          setRoute3Start(item.start);
          setRoute3End(item.end);
        }
      });
    } else {
      setRoutesLga(null);
    }
  }, [lga, lgaRoutes]);

  const coveredLgas = lgaRoutes && lgaRoutes.map((it) => it.lga);
  let lgaOptions = state ? allLgasByState[state].map((it) => it.value) : [];

  let currentLgas =
    lgaOptions.length > 0 &&
    coveredLgas &&
    lgaOptions
      .filter((val) => coveredLgas.includes(val))
      .map((it) => ({ label: it, value: it }));

  const onChangeState = (selectedOption) => {
    setState(selectedOption);
    setLga(null);
  };

  const onChangeLga = (selectedOption) => {
    setLga(selectedOption);
    let lgaid = lgaRoutes?.filter((item) => item.lga === selectedOption)[0]._id;

    setLgaId(lgaid);
  };

  const resetForm = () => {
    setErrors(false);
    setLga(null);
    setState(null);
    setRoute1Start("");
    setRoute1End("");

    setRoute2Start("");
    setRoute2End("");

    setRoute3Start("");
    setRoute3End("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      (!lga,
      !state,
      !route1Start,
      !route1End,
      !route2Start,
      !route2End,
      !route3Start,
      !route3End)
    ) {
      return setErrors("Please fill all fields");
    }

    let route1 = {
      start: route1Start,
      end: route1End,
    };

    let route2 = {
      start: route2Start,
      end: route2End,
    };

    let route3 = {
      start: route3Start,
      end: route3End,
    };

    const updatedRoutes = {
      lga,
      routes: [route1, route2, route3],
    };
    setLoading(true);

    axios
      .patch(`/lga_routes/${lgaId}`, updatedRoutes)
      .then((res) => {
        setSubmitted(true);
        setLoading(false);
        resetForm();
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setErrors(err.message);
      });
  };

  return (
    <div>
      <form action="" className="w-full px-2" onSubmit={handleFormSubmit}>
        <FormInputDropDown
          label="State"
          data={AllStates}
          onChange={onChangeState}
          index="z-20"
        />

        <FormInputDropDown
          label="LGA"
          onChange={onChangeLga}
          data={currentLgas}
          index="z-10"
        />

        {routesLga && (
          <>
            <div className="bg-white py-4 my-2 rounded-md drop-shadow-sm lg:items-center flex flex-col lg:flex-row flex-wrap lg:space-x-6">
              <FormInputEditable
                label="Route 1 - Start"
                data={routesLga?.[0]?.routes[0]?.start}
                onChange={(selectedOption) => setRoute1Start(selectedOption)}
              />

              <FormInputEditable
                label="Route 1 - End"
                data={routesLga?.[0]?.routes[0]?.end}
                onChange={(selectedOption) => setRoute1End(selectedOption)}
              />
            </div>

            <div className="bg-white py-4 my-2 rounded-md drop-shadow-sm lg:items-center flex flex-col lg:flex-row flex-wrap lg:space-x-6">
              <FormInputEditable
                label="Route 2 - Start"
                data={routesLga?.[0]?.routes[1]?.start}
                onChange={(selectedOption) => setRoute2Start(selectedOption)}
              />

              <FormInputEditable
                label="Route 2 - End"
                data={routesLga?.[0]?.routes[1]?.end}
                onChange={(selectedOption) => setRoute2End(selectedOption)}
              />
            </div>

            <div className="bg-white py-4 my-2 rounded-md drop-shadow-sm lg:items-center flex flex-col lg:flex-row flex-wrap lg:space-x-6">
              <FormInputEditable
                onChange={(selectedOption) => setRoute3Start(selectedOption)}
                label="Route 3 - Start"
                data={routesLga?.[0]?.routes[2]?.start}
              />

              <FormInputEditable
                onChange={(selectedOption) => setRoute3End(selectedOption)}
                label="Route 3 - End"
                data={routesLga?.[0]?.routes[2]?.end}
              />
            </div>
          </>
        )}

        {errors && (
          <p className="p-2 py-3 flex px-3 items-center justify-between rounded bg-white">
            <span className="text-red-500 text-xs">
              Please fill all form fields
            </span>

            <span
              onClick={() => setErrors(null)}
              className="text- text-xl cursor-pointer rounded-full bg-gray300"
            >
              x
            </span>
          </p>
        )}

        {submitted && (
          <p className="p-2 py-3 flex px-3 items-center justify-between rounded bg-white">
            <span className="text-green-500 text-xs">
              lga routes successfully updated
            </span>

            <span
              onClick={() => setSubmitted(null)}
              className="text- text-xl cursor-pointer rounded-full bg-gray300"
            >
              x
            </span>
          </p>
        )}

        <button
          className="bg-oaksgreen w-full text-xs grid place-items-center mx-2 text-white p-3 
          my-6 rounded"
        >
          {loading ? (
            <Rings
              height="36"
              width="36"
              color="#ffffff"
              radius="6"
              wrapperStyle={{ backgoundColor: "yellow" }}
              wrapperClass=""
              visible={true}
              ariaLabel="rings-loading"
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateLgaRoutes;

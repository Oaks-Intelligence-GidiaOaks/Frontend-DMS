import React, { useEffect, useState } from "react";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FormInputDropDown, FormInputEditable } from "../../components/form";
import axios from "axios";
import { AllStates, lgasByState } from "../../data/form/states";
import { allLgasByState } from "../../data/form/allLgasByState";
import { Rings } from "react-loader-spinner";

const AdminNewRoute = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);

  const [state, setState] = useState(null);
  const [lga, setLga] = useState(null);
  const [lgaRoutes, setLgaRoutes] = useState([]);

  const [route1, setRoute1] = useState(null);
  const [route2, setRoute2] = useState(null);
  const [route3, setRoute3] = useState(null);

  const [errors, setErrors] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);

  let lgaOptions = state ? allLgasByState[state] : [];

  // useEffect(() => {
  //   axios
  //     .get(`lga_routes`)
  //     .then((res) => setLgaRoutes(res.data.data))
  //     .catch((err) => console.error(err));
  // }, []);

  // const coveredLgas =
  //   lgaRoutes && lgaRoutes.map((it) => ({ label: it.lga, value: it.lga }));

  // if (coveredLgas) {
  //   console.log(coveredLgas);
  // }

  // const transformedLgaRoutes =
  //   lgaRoutes.length > 0 &&
  //   lgaRoutes.map((item) => {
  //     let routes = item.routes.map((r) => ({
  //       label: `${r.start} - ${r.end}`,
  //       value: `${r.start} - ${r.end}`,
  //     }));

  //     return {
  //       lga: item.lga,
  //       routes,
  //     };
  //   });

  // let routeOptions =
  //   lga &&
  //   transformedLgaRoutes.filter((tl) => tl.lga == lga).map((it) => it.routes);

  // if (transformedLgaRoutes) {
  //   // console.log(lgaRoutes);
  // }

  // if (routeOptions) {
  //   // console.log(routeOptions);
  // }

  const onChangeState = (selectedOption) => {
    setState(selectedOption);
    setLga(null);
  };

  const onChangeLga = (selectedOption) => {
    setLga(selectedOption);
    // console.log(selectedOption);
  };

  const resetForm = () => {
    setErrors(false);
    setLga(null);
    setState(null);
    setRoute1("");
    setRoute2("");
    setRoute3("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if ((!lga, !state, !route1, !route2, !route3)) {
      return setErrors("Please fill all fields");
    }

    const newRoutes = {
      lga,
      routes: [route1, route2, route3],
    };
    // console.log(newRoutes);
    setLoading(true);

    axios
      .post("/lga_routes", newRoutes)
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
    <div className="lg:w-3/5 lg:pl-16">
      <div className="my-6">
        <h2 className="text-sm font-bold ">Create New LGA Route</h2>
      </div>

      <form
        action=""
        className="border w-full px-2"
        onSubmit={handleFormSubmit}
      >
        <FormInputDropDown
          label="State"
          data={AllStates}
          onChange={onChangeState}
          index="z-20"
        />

        <FormInputDropDown
          label="LGA"
          onChange={onChangeLga}
          data={lgaOptions}
          index="z-10"
        />

        {lga && (
          <>
            <FormInputEditable
              label="Route 1"
              data=""
              onChange={(selectedOption) => setRoute1(selectedOption)}
              readOnly={false}
            />
            <FormInputEditable
              label="Route 2"
              data=""
              readOnly={false}
              onChange={(selectedOption) => setRoute2(selectedOption)}
            />
            <FormInputEditable
              onChange={(selectedOption) => setRoute3(selectedOption)}
              label="Route 3"
              data=""
              readOnly={false}
            />
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
              New lga added successfully...
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
          className="bg-oaksgreen w-full text-xs mx-2 text-white p-3 
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

export default AdminNewRoute;

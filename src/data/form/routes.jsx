import axios from "axios";
import { AllStates } from "./states";
import { allLgasByState } from "./states";

export const AllRoutesByLgas = () => {
  axios
    .get("/lga_route")
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
};

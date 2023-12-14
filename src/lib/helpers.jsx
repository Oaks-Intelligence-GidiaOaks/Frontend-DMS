import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function getCurrentYear() {
  return new Date().getFullYear();
}

export const arrangeTime = (time) => {
  const passedDate = new Date(time);
  const formattedDate = passedDate.toLocaleDateString();
  const formattedTime = passedDate.toLocaleTimeString();

  return `${formattedDate}`;
};

export const masterHeaderText = (header) => {
  let headerText;

  if (header === "Price of Rice_1-cup") {
    headerText = "Price of Rice (1 Cup)";
  }

  if (header === "Brand of Rice_1-cup") {
    headerText = "Brand of Rice (1 Cup)";
  }

  if (header === "Size of Rice_1-cup") {
    headerText = "Size of Rice (1 Cup)";
  }

  if (header === "Price of Rice_50-kg") {
    headerText = "Price of Rice (50kg)";
  }

  if (header === "Brand of Rice_50-kg") {
    headerText = "Brand of Rice(50kg)";
  }

  if (header === "Size of Rice_50-kg") {
    headerText = "Size of Rice(50kg)";
  }

  if (header === "Price of Beans_1-cup") {
    headerText = "Price of Beans (1 Cup)";
  }

  if (header === "Brand of Beans_1-cup") {
    headerText = "Brand of Beans (1 Cup)";
  }

  if (header === "Size of Beans_1-cup") {
    headerText = "Size of Beans (1 Cup)";
  }

  if (header === "Price of Beans_50-kg") {
    headerText = "Price of Beans (50kg)";
  }

  if (header === "Brand of Beans_50-kg") {
    headerText = "Brand of Beans (50 kg)";
  }

  if (header === "Size of Beans_50-kg") {
    headerText = "Size of Beans (50 kg)";
  }

  if (header === "Price of Garri_1-cup") {
    headerText = "Price of Garri (1 Cup)";
  }

  if (header === "Brand of Garri_1-cup") {
    headerText = "Brand of Garri (1 Cup)";
  }

  if (header === "Size of Garri_1-cup") {
    headerText = "Size of Garri (1 Cup)";
  }

  if (header === "Price of Garri_50-kg") {
    headerText = "Price of Garri (1 Cup)";
  }

  if (header === "Brand of Garri_50-kg") {
    headerText = "Brand of Garri (50 kg)";
  }

  if (header === "Size of Garri_50-kg") {
    headerText = "Size of Garri (50 kg)";
  }

  if (header === "Price of Tomatoes_4-seeds") {
    headerText = "Price of Tomatoes(4 seeds)";
  }

  if (header === "Brand of Tomatoes_4-seeds") {
    headerText = "Brand of Tomatoes (4 seeds)";
  }

  if (header === "Size of Tomatoes_4-seeds") {
    headerText = "Size of Tomatoes (4 seeds)";
  }

  if (header === "Price of Tomatoes_big-basket") {
    headerText = "Price of Tomatoes (big basket)";
  }

  if (header === "Brand of Tomatoes_big-basket") {
    headerText = "Brand of Tomatoes (big basket)";
  }

  if (header === "Size of Tomatoes_big-basket") {
    headerText = "Size of Tomatoes (big basket)";
  }

  if (header === "hours_per_week") {
    headerText = "Hours Per Week";
  }

  if (header === "Price of Kerosene_1-Litre") {
    headerText = "Price of Kerosene (1L)";
  }

  if (header === "Brand of Kerosene_1-Litre") {
    headerText = "Brand of Kerosene (1L)";
  }

  if (header === "Price of Cooking Gas_12-kg") {
    headerText = "Price of Cooking Gas (12kg)";
  }

  if (header === "Price of Petrol/PMS_1-Litre") {
    headerText = "Price of Petrol (1L)";
  }

  if (header === "Brand of Petrol/PMS_1-Litre") {
    headerText = "Brand of Petrol (1L)";
  }

  if (header === "Price of Cement_50-kg") {
    headerText = "Price of Cement (50kg)";
  }

  if (header === "Brand of Cement_50-kg") {
    headerText = "Brand of Cement (50kg)";
  }

  return headerText;
};

export const isOutsideLimit = (avgData, type, product) => {
  const value = product.price || product.cost || product.hours_per_week;
  let matchedCommodity;

  if (type === "food") {
    matchedCommodity = avgData?.filter(
      (item) => item.name === product.name && item.lga === product.lga
    );
  }

  if (type === "transport") {
    matchedCommodity = avgData?.filter(
      (item) => item.route === product.route && item.lga === product.lga
    );
  }

  if (type === "acc") {
    matchedCommodity = avgData?.filter(
      (item) =>
        item.type === product.type &&
        item.lga === product.LGA &&
        item.rooms === product.rooms
    );
  }

  if (type === "cloth") {
    matchedCommodity = avgData?.filter(
      (item) => item.category === product.category && item.lga === product.lga
    );
  }

  if (type === "elec") {
    matchedCommodity = avgData?.filter((item) => item.lga === product.LGA);
  }

  if (type === "others") {
    console.log(product, "average data");

    matchedCommodity = avgData?.filter(
      (item) => item.name === product.name && item.lga === product.LGA
    );

    console.log(matchedCommodity, "Others Matched");
  }

  let matchedObj;

  if (type === "acc") {
    matchedObj = matchedCommodity[0];
  } else {
    matchedObj = matchedCommodity?.reduce(
      (acc, current) => ({ ...acc, ...current }),
      {}
    );
  }

  let preValue = matchedObj?.price || matchedObj.cost;
  let commodityValue = parseInt(preValue);

  let ratio = 0.25 * commodityValue;
  let upperLimit = ratio + commodityValue;
  let lowerLimit = commodityValue - ratio;

  return value >= upperLimit || product.flagged
    ? true
    : value <= lowerLimit
    ? true
    : false;
};

export const resubmitProduct = (rowData, url, invalidateKey, queryClient) => {
  const prodMutation = useMutation({
    mutationFn: async (rowData) => await axios.patch(`${url}${rowData._id}`),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: [invalidateKey] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  prodMutation.mutate(rowData);
};

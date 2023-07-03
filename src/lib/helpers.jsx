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

  if (header === "Price of Rice_50-kg") {
    headerText = "Price of Rice (50kg)";
  }

  if (header === "Brand of Rice_50-kg") {
    headerText = "Brand of Rice(50kg)";
  }

  if (header === "Price of Beans_1-cup") {
    headerText = "Price of Beans (1 Cup)";
  }

  if (header === "Brand of Beans_1-cup") {
    headerText = "Brand of Beans (1 Cup)";
  }

  if (header === "Price of Beans_50-kg") {
    headerText = "Price of Beans (50kg)";
  }

  if (header === "Brand of Beans_50-kg") {
    headerText = "Brand of Beans (50 kg)";
  }

  if (header === "Price of Garri_1-cup") {
    headerText = "Price of Garri (1 Cup)";
  }

  if (header === "Brand of Garri_1-cup") {
    headerText = "Brand of Garri (1 Cup)";
  }

  if (header === "Price of Garri_50-kg") {
    headerText = "Price of Garri (1 Cup)";
  }

  if (header === "Brand of Garri_50-kg") {
    headerText = "Brand of Garri (50 kg)";
  }

  if (header === "Price of Tomatoes_4-seeds") {
    headerText = "Price of Tomatoes(4 seeds)";
  }

  if (header === "Brand of Tomatoes_4-seeds") {
    headerText = "Brand of Tomatoes (4 seeds)";
  }

  if (header === "Price of Tomatoes_big-basket") {
    headerText = "Price of Tomatoes (big basket)";
  }

  if (header === "Brand of Tomatoes_big-basket") {
    headerText = "Brand of Tomatoes (big basket)";
  }

  if (header === "Price of Rice_1-cup") {
    headerText = "Price of Rice (1 Cup)";
  }

  if (header === "Price of Rice_1-cup") {
    headerText = "Price of Rice (1 Cup)";
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

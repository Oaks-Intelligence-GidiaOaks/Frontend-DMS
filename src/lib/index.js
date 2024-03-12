function countEmptyStringFields(obj) {
  let count = 0;

  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "string" || typeof obj[key] === "boolean") {
        count++;
      } else if (typeof obj[key] === "object") {
        count += countEmptyStringFields(obj[key]); // Recursively count empty string fields within nested objects
      }
    }
  }

  return count;
}

function countValidFields(obj) {
  let count = 0;

  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      if (
        (typeof obj[key] === "string" && obj[key].length > 0) ||
        typeof obj[key] === "boolean"
      ) {
        count++;
      } else if (typeof obj[key] === "object") {
        count += countValidFields(obj[key]); // Recursively count fields within nested objects
      }
    }
  }

  return count;
}

const revertFormatProductName = (name) => {
  if (!name) {
    return null;
  }

  switch (name) {
    case "Rice(50kg)":
      return "Rice_50-kg";
    case "Rice(1cup)":
      return "Rice_1-cup";
    case "Beans(1cup)":
      return "Beans_1-cup";
    case "Beans(50kg)":
      return "Beans_50-kg";
    case "Garri(1cup)":
      return "Garri_1-cup";
    case "Garri(50kg)":
      return "Garri_50-kg";
    case "Tomatoes(4seeds)":
      return "Tomatoes_4-seeds";
    case "Tomatoes(bigbasket)":
      return "Tomatoes_big-basket";
    case "Cooking Gas(12kg)":
      return "Cooking Gas_12-kg";
    case "Kerosene(1Litre)":
      return "Kerosene_1-Litre";
    case "Cement(50kg)":
      return "Cement_50-kg";
    case "Diesel/AGO(1Litre)":
      return "Diesel/AGO_1-Litre";
    case "Petrol/PMS(1Litre)":
      return "Petrol/PMS_1-Litre";

    default:
      return name;
  }
};

const handleTomatoLabel = (val) => {
  console.log(val);
  if(val.toLowerCase().includes("4 seeds")) {
    return "4 pieces"
  }
  return val;
}

export { countEmptyStringFields, countValidFields, revertFormatProductName, handleTomatoLabel };

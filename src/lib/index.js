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

export { countEmptyStringFields, countValidFields };

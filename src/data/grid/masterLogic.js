let formResponses = [
  {
    id: "5y81288y13883",
    firstName: "Emmanuel",
    lastName: "otuonye",
    state: "abia",
    enumID: "266t772",
    createdAt: "t7812",
    updatedAt: "t7812",

    foodItems: [
      {
        name: "Rice_1cup",
        brand: "Cap Rice",
        price: "3000",
      },
      {
        name: "garri_1cup",
        brand: "yellow",
        price: "3000",
      },
    ],

    accomodations: [
      {
        type: "Block of flat",
        rooms: "1",
        price: "1000",
      },
      {
        type: "Block of flat",
        rooms: "2",
        price: "1000",
      },
    ],

    transports: [
      {
        route: "oshodi to oyingbo",
        mode: "bike",
        cost: "2000",
      },
      {
        route: "oshodi to oyingbo",
        mode: "uber",
        cost: "2000",
      },
    ],

    electricity: [
      {
        hours_per_week: 54,
      },
    ],
    others: [
      {
        name: "firewood_1-bundle",
        price: "3000",
        brand: "",
      },
      {
        name: "cooking Gas_12-kg",
        price: "3000",
        brand: "",
      },
    ],
  },

  {
    id: "5y81288y13883",
    firstName: "Emmanuel",
    lastName: "otuonye",
    state: "abia",
    enumID: "266t772",
    createdAt: "t7812",
    updatedAt: "t7812",

    foodItems: [
      {
        name: "Rice_1cup",
        brand: "Cap Rice",
        price: "3000",
      },
      {
        name: "beans_1cup",
        brand: "white",
        price: "3000",
      },
    ],

    accomodations: [
      {
        type: "Block of flat",
        rooms: "1",
        price: "1000",
      },
      {
        type: "Block of flat",
        rooms: "2",
        price: "1000",
      },
    ],

    transports: [
      {
        route: "oshodi to oyingbo",
        mode: "bike",
        cost: "2000",
      },
      {
        route: "oshodi to oyingbo",
        mode: "uber",
        cost: "2000",
      },
    ],

    electricity: [
      {
        hours_per_week: 54,
      },
    ],
    others: [
      {
        name: "firewood_1-bundle",
        price: "3000",
        brand: "",
      },
      {
        name: "cooking Gas_12kg",
        price: "3000",
        brand: "",
      },
    ],
  },
];

const newArr = formResponses.map((item) => {
  let { foodItems, accomodations, transports, electricity, others } = item;

  let foodArr = foodItems.map((food, index) => ({
    [`food-${index}`]: food.name,
    [`foodPrice-${index}`]: food.price,
    [`food-brand-${index}`]: food.brand,
  }));

  const foodObj = foodArr.reduce((acc, obj) => {
    // let key = Object.keys(obj)[0];
    // let value = obj[key];

    // acc[key] = value;

    return {
      ...acc,
      ...obj,
    };
  }, {});

  const accArr = accomodations.map((item) => ({
    [item.type.replace(/\s/g, "_") + "_" + item.rooms]: item.price,
  }));

  const accObj = accArr.reduce((acc, obj) => {
    let key = Object.keys(obj)[0];
    let value = obj[key];
    acc[key] = value;
    return acc;
  }, {});

  const transportObj = transports
    .map((transport) => ({
      [transport.route.replace(/\s/g, "_") + "_" + transport.mode]:
        transport.cost,
    }))
    .reduce((acc, obj) => {
      let key = Object.keys(obj)[0];
      let value = obj[key];
      acc[key] = value;
      return acc;
    });

  const electricityObj = electricity.reduce((acc, obj) => {
    let key = Object.keys(obj)[0];
    let value = Object.values(obj);

    acc[key] = value;

    return acc;
  });

  const othersObj = others
    .map((item) => ({
      [item.name.replace(/[-\s]/g, "_") + item.brand.replace(/[-\s]/g, "_")]:
        item.price,
    }))
    .reduce((acc, obj) => {
      let key = Object.keys(obj)[0];
      let value = Object.values(obj)[0];
      acc[key] = value;
      return acc;
    });

  const transformedObj = {
    food: "food",
    ...foodObj,
    transport: "",
    ...transportObj,
    accomodation: "accomodation",
    ...accObj,
    electricity: "electricity",
    ...electricityObj,
    others: "commodities",
    ...othersObj,
  };

  return transformedObj;
});

console.log(newArr);

// reduce logic

// masterRow.reduce((max, obj) => {
//   if (obj.length > max.length) {
//     return obj;
//   } else {
//     return max;
//   }
// });

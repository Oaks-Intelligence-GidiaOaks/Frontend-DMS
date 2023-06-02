const months = [
  { value: "Jan", label: "Jan" },
  { value: "Feb", label: "Feb" },
  { value: "Mar", label: "Mar" },
  { value: "Apr", label: "Apr" },
  { value: "May", label: "May" },
  { value: "Jun", label: "Jun" },
  { value: "Jul", label: "Jul" },
  { value: "Aug", label: "Aug" },
  { value: "Sep", label: "Sep" },
  { value: "Oct", label: "Oct" },
  { value: "Nov", label: "Nov" },
  { value: "Dec", label: "Dec" },
];

const weeksByMonth = {
  jan: [1, 2, 3, 4],
  feb: [5, 6, 7, 8],
  mar: [9, 10, 11, 12],
  apr: [13, 14, 15, 16],
  may: [17, 18, 19, 20],
  jun: [21, 22, 23, 24],
  jul: [25, 26, 27, 28],
  aug: [29, 30, 31, 32],
  sep: [33, 34, 35, 36],
  oct: [37, 38, 39, 40],
  nov: [41, 42, 43, 44],
  dec: [45, 46, 47, 48],
};

const weeks = Array.from({ length: 52 }, (_, index) => index + 1);

// function getWeekNumbers() {
//   const weeks = {};
//   const now = new Date();
//   const currentYear = now.getFullYear();

//   const jan1st = new Date(currentYear, 0, 1);
//   const startOfWeek = jan1st.getDay() || 7; // Get the day of the week (0-6) where Monday is 1 and Sunday is 7
//   const startDate = new Date(jan1st);
//   startDate.setDate(jan1st.getDate() + (8 - startOfWeek)); // Get the first Monday of the year

//   for (let i = 0; i < 12; i++) {
//     const monthName = new Date(
//       startDate.getFullYear(),
//       startDate.getMonth() + i,
//       1
//     ).toLocaleString("en-US", { month: "short" });
//     weeks[monthName.toLowerCase()] = [];

//     const weekNumber = Math.ceil((startDate.getDate() - 1) / 7) + 1;
//     weeks[monthName.toLowerCase()].push(weekNumber);

//     for (let j = 1; j < 4; j++) {
//       const nextWeek = new Date(startDate);
//       nextWeek.setDate(startDate.getDate() + j * 7);
//       if (nextWeek.getMonth() === startDate.getMonth()) {
//         const nextWeekNumber = weekNumber + j;
//         weeks[monthName.toLowerCase()].push(nextWeekNumber);
//       }
//     }
//   }

//   return weeks;
// }

// const weekNumbers = getWeekNumbers();
// console.log(weekNumbers);

export { weeks, months };

import React from "react";

const YearDropDown = ({ startYear, endYear, selectedYear, onChange }) => {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }

  const handleChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    onChange(selectedYear);
  };

  return (
    <div>
      <select
        className="p-2 bg-gray-200 rounded border-0 outline-0"
        defaultValue={selectedYear}
        // value={selectedYear}
        // className="bg-transparent"
        onChange={handleChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearDropDown;

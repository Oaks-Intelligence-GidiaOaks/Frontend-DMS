import React from "react";

const Pagination = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
}) => {
  return (
    <div className="flex items-center justify-end gap-3">
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {"<<"}
      </button>{" "}
      <button
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        className="text-[14px] leading-[20px] font-normal"
      >
        Previous
      </button>{" "}
      <button
        onClick={() => nextPage()}
        disabled={!canNextPage}
        className="text-[14px] leading-[20px] font-normal"
      >
        Next
      </button>{" "}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {">>"}
      </button>{" "}
      <span className="text-[14px] leading-[20px] font-normal">
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{" "}
      </span>
      <span className="text-[14px] leading-[20px] font-normal">
        Go to page:{" "}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          style={{ width: "50px" }}
        />
      </span>{" "}
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="text-[14px] leading-[20px] font-normal"
      >
        {[10, 25, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;

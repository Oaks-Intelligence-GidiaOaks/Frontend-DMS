import React, { useMemo, useState, useEffect, useRef } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import PopUpGrid from "./PopupGrid";
// import { AiOutlineMenu } from "react-icons/ai";
import * as XLSX from "xlsx";
import MenuIcon from "@mui/icons-material/Menu";
import Pagination from "./Pagination";
import { usePopper } from "react-popper";
import Checkbox from "./Checkbox";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);
  console.log(value);

  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  return (
    <input
      readOnly={value === "id"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="w-full px-1 py-1 border border-gray-300 rounded"
    />
  );
};

const TeamLeadGrid = ({ data: teamLeadData }) => {
  // console.log(Object.keys(teamLeadData?.[1]).length);
  console.log(teamLeadData);

  let allTeamLeads = teamLeadData.users;
  console.log(allTeamLeads);

  const headColumns = Object.keys(allTeamLeads?.[0])
    .filter(
      (item) =>
        item !== "role" &&
        item !== "enumerators" &&
        item !== "disabled" &&
        item !== "__v" &&
        item !== "createdAt" &&
        item !== "created_at" &&
        item !== "updatedAt" &&
        item !== "user" &&
        item !== "avarter"
    )
    .map((item) => ({
      Header: item,
      accessor: item,
      defaultHidden: true,
    }));

  const columns = useMemo(() => headColumns, [allTeamLeads]);
  const [data, setData] = useState(allTeamLeads);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [selectedRowInfo, setSelectedRowInfo] = useState(null);
  // const [tableData, setTableData] = useState(data);

  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {});

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    rows,
    state,
    selectedFlatRows,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable({ columns, data }, usePagination, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <Checkbox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
      },
      ...columns,
    ]);
  });

  const handleDeleteClick = (row, event) => {
    setSelectedRow(row.original);
    console.log(row.original);
    setIsModalOpen(!row.original.showModal);
  };

  const deleteRow = () => {
    if (selectedRow) {
      const updatedData = data.filter((row) => row.id !== selectedRow.id);
      // setData(updatedData);
    }

    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditRow = (row) => {
    setEditedRow(row);
    setSelectedRowInfo(row.original);
    setIsEditing(true);
  };

  const handleSaveRow = (row) => {
    console.log(row.original);
    setIsEditing(false);
    setEditedRow(null);
    setSelectedRow(null);
  };

  const handleCancelRow = (row) => {
    setIsEditing(false);
    setEditedRow(null);
    setSelectedRow(null);
  };

  const resetPassword = (row) => {
    // Perform the password reset for the given row
    console.log("Reset password for row:", row);
  };

  const updateMyData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, closeModal]);

  const firstPageRows = rows.slice(0, 10);

  const handleOnExport = () => {
    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  return (
    <div className="w-full" ref={wrapperRef}>
      <button
        className="p-3 text-white rounded-md border bg-primary"
        onClick={handleOnExport}
      >
        Download
      </button>

      <div className="w-full overflow-x-scroll">
        <table {...getTableProps()} className="w-full my-5 bg-white">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="border-b-[1px] border-r-[1px] px-2 border-[#C9C3C3] pt-2 text-[14px] leading-[20px] font-normal"
                  >
                    {column.render("Header")}
                  </th>
                ))}
                <th className="border-b-[1px]  px-2 border-[#C9C3C3] pt-2 text-[14px] leading-[20px] font-normal">
                  Actions
                </th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row) => {
              prepareRow(row);
              // Keeping tracking of the editedRow and selectedRow
              const isEditingRow =
                editedRow && editedRow.id === row.original.id;

              const isRowSelected =
                selectedRow && selectedRow.id === row.original.id;

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="text-[11px] leading-[15px] font-normal px-2 py-3"
                      >
                        {isEditingRow ? (
                          <EditableCell
                            value={cell.value}
                            row={row}
                            column={cell.column}
                            updateMyData={updateMyData}
                          />
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    );
                  })}
                  <td className="relative flex items-center justify-center py-3">
                    {editedRow && editedRow.id === row.original.id ? (
                      <>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveRow(row)}
                            className="focus:outline-none text-[11px] leading-[15px] font-normal border-[1px] py-1 px-2 border-[#82B22E] bg-[#82B22E] text-white "
                          >
                            Save
                          </button>

                          <button
                            onClick={handleCancelRow}
                            className="focus:outline-none text-[11px] leading-[15px] font-normal border-[1px] py-1 px-2 border-[#FFAD10] bg-[#FFAD10] text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={(event) => handleDeleteClick(row, event)}
                        className="focus:outline-none"
                      >
                        <MenuIcon />
                      </button>
                    )}

                    {selectedRow &&
                      selectedRow.id === row.original.id &&
                      isModalOpen && (
                        <div
                          className="absolute rounded drop-shadow-sm z-10 top-0"
                          ref={setPopperElement}
                          style={styles.popper}
                          {...attributes.popper}
                        >
                          <PopUpGrid
                            selectedRow={selectedRow}
                            deleteRow={deleteRow}
                            closeModal={closeModal}
                            setPopperElement={setPopperElement}
                            popperStyles={styles}
                            handleEditRow={handleEditRow}
                            popperAttributes={attributes}
                            row={row}
                            selectedRowInfo={selectedRowInfo}
                            resetPassword={resetPassword}
                          />
                        </div>
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={true}
        canNextPage={true}
        pageCount={10}
        pageIndex={0}
        pageOptions={[1, 2, 3]}
        pageSize={10}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default TeamLeadGrid;

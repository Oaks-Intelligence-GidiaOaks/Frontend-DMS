import React, { useMemo, useState, useEffect, useRef } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import PopUpGrid from "./PopupGrid";
import * as XLSX from "xlsx";
import MenuIcon from "@mui/icons-material/Menu";
import Pagination from "./Pagination";
import { usePopper } from "react-popper";
import Checkbox from "./Checkbox";
import axios from "axios";
import EditableCell from "./EditableCell";

const Enum = ({ enumData, loadEnums }) => {
  const headColumns = Object.keys(enumData?.[0] || {})
    .filter(
      (item) =>
        item !== "_id" &&
        item !== "role" &&
        item !== "disabled" &&
        item !== "__v" &&
        item !== "createdAt" &&
        item !== "created_at" &&
        item !== "updatedAt" &&
        item !== "user" &&
        item !== "identityImage" &&
        item !== "identityImage"
    )
    .map((item) => {
      let Header = item;
      let accessor = item;
      let Cell = (cell) => cell.row.original[item];

      switch (item) {
        case "identityImage":
          //access properties that are object and extract their literal value
          Cell = (cell) => cell.row.original?.identityImage.url;
      }

      return {
        Header,
        accessor,
        defaultHidden: true,
        Cell,
      };
    });

  const columns = useMemo(() => headColumns, [enumData]);
  const [data, setData] = useState(enumData);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [selectedRowInfo, setSelectedRowInfo] = useState(null);
  const [tableData, setTableData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsModalOpen(!row.original.showModal);
  };

  const deleteRow = () => {
    if (selectedRow) {
      const updatedData = data.filter((row) => row.id !== selectedRow.id);
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

  const updateMyData = async (rowIndex, columnId, value) => {
    setIsLoading(true);
    try {
      const updatedData = data.map((row) => {
        if (row?._id === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      });

      setData(updatedData);

      const itemId = updatedData[rowIndex]?._id;

      await axios
        .put(`/admin/enumerator/${itemId}`, { [columnId]: value })
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
          setIsEditing(false);
          setEditedRow(null);
          setSelectedRow(null);

          setTableData(updatedData);
          window.location.reload(true);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error updating enumerator:", error);
    }
  };

  const handleToggleDisable = async (itemId) => {
    const selectedItem = data.find((item) => item._id === itemId);

    if (selectedItem) {
      try {
        await axios
          .put(`/admin/enumerator/disable/${itemId}`, {
            disabled: !selectedItem.disabled,
          })
          .then((res) => {
            // setData(res.data);
            loadEnums();

            console.log(loadEnums);
          })
          .catch((err) => console.log(err));
        console.log(
          "Disable property toggled and database updated successfully!"
        );
      } catch (error) {
        console.error("Failed to update the database:", error);
      }
    }
  };

  const handleSaveRow = async () => {
    if (editedRow) {
      const { id, columnId, value, index } = editedRow;

      await updateMyData(id, columnId, value);
      setIsEditing(false);
      setEditedRow(null);
      setSelectedRow(null);
    }
  };

  const handleCancelRow = (row) => {
    setIsEditing(false);
    setEditedRow(null);
    setSelectedRow(null);
  };

  const resetPassword = (row) => {
    // Perform the password reset
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
                            edit={isEditingRow}
                            setIsEditing={setIsEditing}
                            setEditedRow={setEditedRow}
                            setSelectedRow={setSelectedRow}
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
                            onClick={() => handleSaveRow(row.original)}
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
                            closeModal={closeModal}
                            setPopperElement={setPopperElement}
                            popperStyles={styles}
                            handleEditRow={handleEditRow}
                            popperAttributes={attributes}
                            row={row}
                            selectedRowInfo={selectedRowInfo}
                            resetPassword={resetPassword}
                            edit={isEditingRow}
                            toggleDisable={handleToggleDisable}
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

export default Enum;

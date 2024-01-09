import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Filter,
  Inject,
  Page,
  Edit,
  Sort,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import { NoData } from "../reusable";
import { arrangeTime, isOutsideLimit } from "../../lib/helpers";
import * as XLSX from "xlsx";
import { BiDownload } from "react-icons/bi";
import { useAuth } from "../../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";

const ElectricityGrid = ({ data, avgData }) => {
  const { user } = useAuth();

  let elecData = data;

  // resubmit mutation
  const resubmitProduct = useMutation({
    mutationFn: async (rowData) =>
      await axios.patch(`form_response/resubmit_electricity/${rowData._id}`),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getElecData"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // admin flag product
  const flagProduct = useMutation({
    mutationFn: async (rowData) =>
      await axios.patch(`form_response/flag_electricity/${rowData._id}`, {
        flagged: true,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getElecData"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // mutation
  const editElecHours = useMutation({
    mutationFn: async (modifiedData) =>
      axios.patch(
        `form_response/electricity/${modifiedData._id}`,
        modifiedData
      ),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getElecData"] });
    },
  });

  const transformedData =
    elecData &&
    elecData.length > 0 &&
    data.map((item, i) => ({
      S_N: i + 1,
      Date: arrangeTime(item?.updated_at),
      id: item.created_by?.id,
      State: item?.state,
      LGA: item?.lga,
      hours_per_week: item?.hours_per_week,
      flagged: item?.flagged,
      _id: item?._id,
    }));

  const elecColumns =
    elecData.length > 0 &&
    Object.keys(transformedData[0]).map((item) => ({
      field: item,
      width:
        item === "hours_per_week"
          ? 100
          : item.length < 4
          ? 120
          : item.length + 130,
    }));

  const handleFlagButtonClick = async (rowData) => {
    if (rowData && rowData._id) {
      await flagProduct.mutateAsync(rowData);
    } else {
      toast.error("Invalid data or _id. Unable to flag item.");
    }
  };

  const handleResubmitButtonClick = async (rowData) => {
    if (rowData && rowData._id) {
      await resubmitProduct.mutateAsync(rowData);
    } else {
      toast.error("Invalid data or _id. Unable to resubmit item.");
    }
  };

  const handleQueryCellInfo = (args) => {
    if (
      args.column.field === "hours_per_week" &&
      isOutsideLimit(avgData, "elec", args.data)
    ) {
      args.cell.classList.add("red-text");
    }
  };

  const toolbarOptions = ["Edit", "Delete", "Update", "Cancel"];
  const pageSettings = { pageSize: 50 };
  const sortSettings = { colums: [{ field: "state", direction: "Ascending" }] };

  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    newRowPosition: "Top",
  };

  const commands = [
    {
      type: "Edit",
      buttonOption: { cssClass: "e-flat", iconCss: "e-edit e-icons" },
    },
    {
      type: "Save",
      buttonOption: { cssClass: "e-flat", iconCss: "e-update e-icons" },
    },
    {
      type: "Cancel",
      buttonOption: { cssClass: "e-flat", iconCss: "e-cancel-icon e-icons" },
    },
  ];

  const gridTemplate = (rowData) => {
    return (
      <div>
        <div>
          <button
            onClick={() => handleFlagButtonClick(rowData)}
            className="bg-danger text-white px-2 py-1 rounded text-xs"
          >
            Flag
          </button>
        </div>
      </div>
    );
  };

  const resubmitTemplate = (rowData) => {
    return (
      <div>
        <div>
          <button
            onClick={() => handleResubmitButtonClick(rowData)}
            className="text-white px-2 py-1 rounded text-xs bg-primary-green"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  const handleSave = async (args) => {
    const { data } = args;
    if (args.requestType === "save") {
      const modifiedData = {
        hours_per_week: data.hours_per_week,
        _id: data._id,
      };

      editElecHours.mutate(modifiedData);
    }
  };

  const checkHeaderText = (field) => {
    return field === "S_N"
      ? "S/N"
      : field === "id"
      ? "ID"
      : field === "lga"
      ? "LGA"
      : field === "hours_per_week"
      ? "Hours per week"
      : field;
  };

  const handleDownload = () => {
    let downloadData = transformedData?.map(({ _id, ...item }) => item);

    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadData);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  return elecData.length > 0 ? (
    <div>
      {user?.role !== "team_lead" && (
        <div className="my-3">
          <button
            onClick={handleDownload}
            className="px-3 ml-auto p-2 flex items-center space-x-3 rounded-md drop-shadow-lg text-sm  bg-white hover:bg-oaksyellow hover:text-white"
          >
            <div className="w-fit p-1 rounded text-black bg-gray-100">
              <BiDownload />
            </div>
            <span className="pr-6 text-xs">Download</span>
          </button>
        </div>
      )}
      <GridComponent
        dataSource={transformedData}
        allowPaging={true}
        allowSorting={true}
        pageSettings={pageSettings}
        allowEditing={true}
        editSettings={editSettings}
        height={350}
        actionComplete={handleSave}
        queryCellInfo={handleQueryCellInfo}
        // commandClick={(args) => handleSave(args)}
      >
        <ColumnsDirective>
          {elecColumns.map(({ field, width }) => (
            <ColumnDirective
              key={field}
              allowEditing={field === "hours_per_week"}
              headerText={checkHeaderText(field)}
              field={field}
              width={width}
              visible={field !== "_id" && field !== "flagged"}
            />
          ))}
          <ColumnDirective
            headerText="Action"
            width={100}
            commands={commands}
          />

          <ColumnDirective
            headerText="Flag"
            width={100}
            template={gridTemplate}
            visible={user?.role === "admin"}
          />

          <ColumnDirective
            headerText="Flag"
            width={100}
            template={resubmitTemplate}
            visible={user?.role === "team_lead"}
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Edit, CommandColumn]} />
      </GridComponent>
    </div>
  ) : (
    <div className="h-32">
      <NoData text="No submissions received yet" />
    </div>
  );
};

export default ElectricityGrid;

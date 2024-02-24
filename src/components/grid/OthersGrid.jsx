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
import { revertFormatProductName } from "../../lib";

const OthersGrid = ({ data, avgData }) => {
  const { user } = useAuth();

  let othersData = data;

  const editOthersPrice = useMutation({
    mutationFn: async (modifiedData) => {
      return axios.patch(
        `form_response/other_products/${modifiedData._id}`,
        modifiedData
      );
    },
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getOthersData"] });
    },
  });

  // resubmit mutation
  const resubmitProduct = useMutation({
    mutationFn: async (rowData) =>
      await axios.patch(`form_response/resubmit_other_products/${rowData._id}`),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getOthersData"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // admin flag product
  const flagProduct = useMutation({
    mutationFn: async (rowData) =>
      await axios.patch(`form_response/flag_other_products/${rowData._id}`, {
        flagged: true,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getOthersData"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const formatProductName = (name) => {
    if (name.includes("_")) {
      name = name.replace("_", "(") + ")";
    }
    return name.replace(/-/g, "");
  };

  const transformedData =
    othersData &&
    othersData.length > 0 &&
    data.map((item, i) => ({
      S_N: i + 1,
      Date: arrangeTime(item?.updated_at),
      id: item?.created_by?.id,
      State: item?.state,
      LGA: item?.lga,
      name: formatProductName(item?.name),
      brand: item?.brand.length > 1 ? item?.brand : "N/A",
      _id: item?._id,
      size: item?.size,
      price: item?.price === 0 ? "N/A" : item?.price,
      flagged: item?.flagged,
    }));

  const othersColumns =
    othersData.length > 0 &&
    Object.keys(transformedData[0]).map((item) => ({
      field: item,
      width: item === "price" ? 90 : item.length < 4 ? 120 : item.length + 130,
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
      args.column.field === "price" &&
      isOutsideLimit(avgData, "others", args.data)
    ) {
      args.cell.classList.add("red-text");
    }
  };

  const pageSettings = { pageSize: 50 };

  const editSettings = {
    allowEditing: true,
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
    if (args.requestType === "save") {
      const { data } = args;

      const modifiedData = {
        name: revertFormatProductName(data.name),
        size: data.size,
        brand: data.brand,
        price: data.price,
        _id: data._id,
      };

      editOthersPrice.mutate(modifiedData);
    }
  };

  const handleDownload = () => {
    let downloadData = transformedData?.map(({ _id, ...item }) => item);

    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadData);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  const checkHeaderText = (field) => {
    return field === "S_N"
      ? "S/N"
      : field === "id"
      ? "ID"
      : field === "lga"
      ? "LGA"
      : field === "name"
      ? "Name"
      : field === "price"
      ? "Price"
      : field === "brand"
      ? "Brand"
      : field === "size"
      ? "Size"
      : field;
  };

  return othersData.length > 0 ? (
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
        allowGrouping={true}
        queryCellInfo={handleQueryCellInfo}
        // commandClick={(args) => handleSave(args)}
        actionComplete={handleSave}
      >
        <ColumnsDirective>
          {othersColumns.map(({ field, width }) => (
            <ColumnDirective
              key={field}
              visible={field !== "_id" && field !== "flagged"}
              headerText={checkHeaderText(field)}
              allowEditing={
                field === "price" || field === "brand" || field === "size"
              }
              field={field}
              width={width}
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

export default OthersGrid;

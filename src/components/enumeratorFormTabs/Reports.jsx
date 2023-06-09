import { useContext } from "react";

import { binaryQuestionValues } from "../../data/enumeratorFormStructure";
import EnumeratorFormContext from "../../context/enumeratorFormContext";
import { useEffect } from "react";
import { useAuth } from "../../context";
import { Rings } from "react-loader-spinner";
import { Info, InfoOutlined } from "@mui/icons-material";

function Reports() {
  const {
    state: {
      reportsSectionStructure: reportsForm,
      isSubmitting,
      attachedImage,
    },
    setReportsItemValue,
    progressPercentage,
    submitForm,
    handleValue,
    setImageUrl,
    removeImageUrl,
  } = useContext(EnumeratorFormContext);

  const {
    user: { token },
  } = useAuth();

  const convertValue = (value, variant) => {
    if (value === true && variant === "Yes") {
      return true;
    }
    if (value === false && variant === "No") {
      return true;
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      setImageUrl(fileReader.result);
    });

    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  return (
    // Container
    <div className="flex flex-col mx-auto items-center max-w-[1040px] min-h-screen pb-40">
      {/* Content */}
      <div className="flex flex-col gap-10 w-full min-h-[50vh] mt-[30px] mb-20">
        {Object.keys(reportsForm).map((item, id) => (
          <div
            key={`${item}-${id}`}
            className="flex flex-col gap-10 bg-white px-[5%] pt-[5%] pb-10 md:pb-16 sm:pt-[5%] xs:pt-[10%] login-form-shadow rounded-[10px]"
          >
            {item === "Projects" && (
              <>
                <div className="flex flex-col gap-4">
                  <p>
                    Any new Government project in your LGA within the{" "}
                    <span className="font-medium">last 1 week</span>?
                  </p>

                  <div className="flex flex-col gap-2">
                    {binaryQuestionValues.map((variant, i) => (
                      <div key={i} className="flex items-center">
                        <label
                          htmlFor={`${item}-${variant}`}
                          className="flex flex-1 items-center gap-x-3 flex-wrap"
                        >
                          <input
                            type="radio"
                            id={`${item}-${variant}`}
                            value={`${variant}`}
                            name={`${item}`}
                            className="p-2 outline-primary-green accent-primary-green"
                            defaultChecked={convertValue(
                              reportsForm[item]["boolean"],
                              variant
                            )}
                            onChange={() => {
                              setReportsItemValue({
                                item,
                                value: variant === "Yes" ? true : false,
                                valueTitle: "boolean",
                              });
                            }}
                          />
                          <span className="block py-2">{variant}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {reportsForm[item]["boolean"] && (
                  <div className="flex flex-col gap-4">
                    <p>Enter link or summary below</p>
                    <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                      <input
                        type="text"
                        placeholder="Enter answer"
                        className="flex-1 pl-2 py-2 outline-primary-green"
                        value={reportsForm[item]["answer"]}
                        onChange={(e) => {
                          setReportsItemValue({
                            item,
                            value: true,
                            valueTitle: "boolean",
                            answer: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            {item === "Crimes" && (
              <>
                <div className="flex flex-col gap-4">
                  <p>
                    Any crime reported in your LGA within the{" "}
                    <span className="font-medium">last 1 week</span>?
                  </p>

                  <div className="flex flex-col gap-2">
                    {binaryQuestionValues.map((variant, i) => (
                      <div key={i} className="flex items-center">
                        <label
                          htmlFor={`${item}-${variant}`}
                          className="flex flex-1 items-center gap-x-3 flex-wrap"
                        >
                          <input
                            type="radio"
                            id={`${item}-${variant}`}
                            value={`${item} beans`}
                            name={`${item}`}
                            className="p-2 outline-primary-green accent-primary-green"
                            defaultChecked={convertValue(
                              reportsForm[item]["boolean"],
                              variant
                            )}
                            onChange={() => {
                              setReportsItemValue({
                                item,
                                value: variant === "Yes" ? true : false,
                                valueTitle: "boolean",
                              });
                            }}
                          />
                          <span className="block py-2">{variant}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {reportsForm[item]["boolean"] && (
                  <div className="flex flex-col gap-4">
                    <p>Enter link or summary below</p>
                    <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                      <input
                        type="text"
                        placeholder="Enter answer"
                        className="flex-1 pl-2 py-2 outline-primary-green"
                        value={reportsForm[item]["answer"]}
                        onChange={(e) => {
                          setReportsItemValue({
                            item,
                            value: true,
                            valueTitle: "boolean",
                            answer: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            {item === "Accidents" && (
              <>
                <div className="flex flex-col gap-4">
                  <p>
                    Any accidents in your LGA within the{" "}
                    <span className="font-medium">last 1 week</span>?
                  </p>

                  <div className="flex flex-col gap-2">
                    {binaryQuestionValues.map((variant, i) => (
                      <div key={i} className="flex items-center">
                        <label
                          htmlFor={`${item}-${variant}`}
                          className="flex flex-1 items-center gap-x-3 flex-wrap"
                        >
                          <input
                            type="radio"
                            id={`${item}-${variant}`}
                            value={`${item}`}
                            name={`${item}`}
                            className="p-2 outline-primary-green accent-primary-green"
                            defaultChecked={convertValue(
                              reportsForm[item]["boolean"],
                              variant
                            )}
                            onChange={() => {
                              setReportsItemValue({
                                item,
                                value: variant === "Yes" ? true : false,
                                valueTitle: "boolean",
                              });
                            }}
                          />
                          <span className="block py-2">{variant}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {reportsForm[item]["boolean"] && (
                  <div className="flex flex-col gap-4">
                    <p>Enter link or summary below</p>
                    <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                      <input
                        type="text"
                        placeholder="Enter answer"
                        className="flex-1 pl-2 py-2 outline-primary-green"
                        value={reportsForm[item]["answer"]}
                        onChange={(e) => {
                          setReportsItemValue({
                            item,
                            value: true,
                            valueTitle: "boolean",
                            answer: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            {item === "Electricity" && (
              <>
                <div className="flex flex-col gap-4">
                  <p>
                    Number of hours of electricity in your LGA within the{" "}
                    <span className="font-medium">last 1 week</span>?
                  </p>
                  <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter answer"
                      className="flex-1 pl-2 py-2 outline-primary-green"
                      value={reportsForm[item]["hours"]}
                      onChange={(e) => {
                        setReportsItemValue({
                          item,
                          value: handleValue(e.target.value),
                          valueTitle: "hours",
                        });
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                </div>
              </>
            )}
            {item === "Notes" && (
              <>
                <div className="flex flex-col gap-4">
                  <p>
                    Do you want to leave any{" "}
                    <span className="font-medium">comments</span>?
                  </p>

                  <div className="flex flex-col gap-2">
                    {binaryQuestionValues.map((variant, i) => (
                      <div key={i} className="flex items-center">
                        <label
                          htmlFor={`${item}-${variant}`}
                          className="flex flex-1 items-center gap-x-3 flex-wrap"
                        >
                          <input
                            type="radio"
                            id={`${item}-${variant}`}
                            value={`${variant}`}
                            name={`${item}`}
                            defaultChecked={convertValue(
                              reportsForm[item]["boolean"],
                              variant
                            )}
                            className="p-2 outline-primary-green accent-primary-green"
                            onChange={(e) =>
                              setReportsItemValue({
                                item,
                                value: e.target.value === "Yes" ? true : false,
                                valueTitle: "boolean",
                              })
                            }
                          />
                          <span className="block py-2">{variant}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {reportsForm[item]["boolean"] && (
                  <div className="flex flex-col gap-4">
                    <p>Enter your comments below</p>
                    <div className="flex gap-2 relative">
                      <textarea
                        type="text"
                        placeholder="Enter notes here..."
                        rows={7}
                        className="flex-1 min-h-[100px] max-h-[240px] pl-2 py-2 outline-primary-green border border-solid border-mid-gray rounded-[10px]"
                        value={reportsForm[item]["answer"]}
                        onChange={(e) => {
                          setReportsItemValue({
                            item,
                            value: true,
                            valueTitle: "boolean",
                            answer: e.target.value,
                          });
                        }}
                      />
                    </div>
                    {!attachedImage.url && (
                      <label
                        htmlFor="image-picker"
                        className="w-fit bg-oaksgreen rounded py-1 cursor-pointer"
                      >
                        <span className="text-white px-4">Attach Image</span>
                      </label>
                    )}
                    {attachedImage.url && (
                      <>
                        <label
                          className="w-fit bg-red-600 rounded py-1 cursor-pointer"
                          onClick={removeImageUrl}
                        >
                          <span className="text-white px-4">Remove Image</span>
                        </label>
                        <p className="flex items-center gap-1 text-[12px] w-full text-gray-500">
                          <InfoOutlined fontSize="small" />
                          <span>Selected image should preview below:</span>
                        </p>
                        <div className="flex flex-wrap justify-center items-center w-full rounded-xl h-[50vh]">
                          <img
                            src={attachedImage.url}
                            className="h-full rounded login-form-shadow"
                          />
                        </div>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-picker"
                      onChange={handleFile}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <p className="text-[14px] w-full mb-10 text-gray-500">
        <span className="font-bold">NOTE</span>: Submit button will only be
        active once the progress bar at the top of this page is complete.
        {console.log(progressPercentage)}
      </p>
      <button
        disabled={progressPercentage !== 100}
        onClick={() => {
          submitForm(token);
        }}
        className={`${
          progressPercentage === 100 ? "bg-primary-green" : "bg-gray-300"
        } w-full rounded-lg flex justify-center items-center p-2 mt-2 text-white`}
      >
        {isSubmitting ? (
          <Rings
            height="36"
            width="36"
            color="#ffffff"
            radius="6"
            wrapperStyle={{ backgoundColor: "yellow" }}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
        ) : (
          <span className="block p-2 text-[14px]">Submit</span>
        )}
      </button>
    </div>
  );
}

export default Reports;

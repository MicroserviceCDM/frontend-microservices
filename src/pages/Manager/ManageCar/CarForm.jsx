import React, { useState, useEffect, useRef } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

const ModalForm = (props) => {
  // Form State
  const [formState, setFormState] = useState(
    props.defaultValues || {
      trim: "",
      orgPrice: "",
      disPrice: "",
      perMonthPrice: "",
      odo: "",
      range: "",
      topSpeed: "",
      timeToReach: "",
      tech: "",
      keyFeatures: null,
      gift: "",
      count: "",
      imgSrc: "",
      model: "",
      status: "AVAILABLE",
    }
  );

  // Image State
  const inputRef = useRef(null);
  const [formImage, setFormImage] = useState(formState.imgSrc);

  // Handle Image Change
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormState({ ...formState, imgSrc: e.target.files[0] });
      setFormImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Form Validation State
  const [errors, setErrors] = useState();

  // Form Validation Logic (Consider moving this to a separate function if it gets more complex)
  // const validateFrom = () => {
  //   if (
  //     formState.trim &&
  //     formState.description &&
  //     formState.price &&
  //     formState.model &&
  //     formState.status
  //   ) {
  //     setErrors("");
  //     return true;
  //   } else {
  //     let errorFields = [];
  //     for (const [key, value] of Object.entries(formState)) {
  //       if (!value) errorFields.push(key);
  //     }
  //     setErrors(errorFields.join(", "));
  //     return false;
  //   }
  // };

  // Handle Form Submission
  const handleSubmitForm = (e) => {
    e.preventDefault();
    props.onSubmit(formState);
  };

  return (
    <div
      className="fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-80 modal-container flex items-center justify-center"
      onClick={(e) => {
        if (e.target.classList.contains("modal-container")) props.closeModel();
      }}
    >
      <form
        onSubmit={handleSubmitForm}
        className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-6 overflow-y-auto max-h-[90vh] w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]"
      >
        {/* Form Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {props.defaultValues ? "Edit Car" : "Add New Car"}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side: Form Inputs */}
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="trim"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                name="trim"
                id="trim"
                value={formState.trim}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Model & Quantity Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  value={formState.model}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="count"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="count"
                  id="count"
                  value={formState.count}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Prices Input */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="orgPrice"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Original Price
                </label>
                <input
                  type="text"
                  name="orgPrice"
                  id="orgPrice"
                  value={formState.orgPrice}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="disPrice"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Discounted Price
                </label>
                <input
                  type="text"
                  name="disPrice"
                  id="disPrice"
                  value={formState.disPrice}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="perMonthPrice"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Price Per Month
                </label>
                <input
                  type="text"
                  name="perMonthPrice"
                  id="perMonthPrice"
                  value={formState.perMonthPrice}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Odo, Range, Top Speed, Time to Reach Inputs */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="odo"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Odo
                </label>
                <input
                  type="text"
                  name="odo"
                  id="odo"
                  value={formState.odo}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="range"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Range
                </label>
                <input
                  type="number"
                  name="range"
                  id="range"
                  value={formState.range}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="topSpeed"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Top Speed
                </label>
                <input
                  type="number"
                  name="topSpeed"
                  id="topSpeed"
                  value={formState.topSpeed}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="timeToReach"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Time To Reach
                </label>
                <input
                  type="number"
                  name="timeToReach"
                  id="timeToReach"
                  value={formState.timeToReach}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Technology & Gift Inputs */}
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <label
                  htmlFor="tech"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Technology
                </label>
                <input
                  type="text"
                  name="tech"
                  id="tech"
                  value={formState.tech}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="gift"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Gift
                </label>
                <input
                  type="text"
                  name="gift"
                  id="gift"
                  value={formState.gift}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Status Input */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Status
              </label>
              <select
                value={formState.status}
                onChange={handleChange}
                id="status"
                name="status"
                className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="UNAVAILABLE">UNAVAILABLE</option>
              </select>
            </div>
          </div>

          {/* Right Side: Image Upload */}
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              {formImage || formState.imgSrc ? (
                <div>
                  <img
                    src={formImage}
                    alt="Car"
                    onClick={() => inputRef.current.click()}
                    className="w-full max-w-xs h-auto rounded-lg cursor-pointer"
                  />
                  <p className="text-xs mt-2 text-gray-500 dark:text-gray-400 italic text-center">
                    Click on the image to upload a new one
                  </p>
                </div>
              ) : (
                <div
                  className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-600 px-6 py-10 cursor-pointer"
                  onClick={() => inputRef.current.click()}
                >
                  <div className="text-center">
                    <InsertPhotoIcon
                      style={{ fontSize: "50px" }}
                      className="text-gray-400 dark:text-gray-500"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Please upload your image
                    </p>
                  </div>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageChange}
                ref={inputRef}
                className="hidden"
              />
            </div>

            {/* Upload Image Button (Hidden on larger screens) */}
            <button
              className="lg:hidden hover:shadow-form w-full rounded-md bg-blue-600 dark:bg-blue-700 py-2 px-4 text-center text-base font-semibold text-white outline-none"
              onClick={() => inputRef.current.click()}
            >
              Upload Image
            </button>
          </div>
        </div>

        {/* Error Message */}
        {errors && (
          <div className="text-red-500 text-sm mt-4 mb-6 bg-red-100 dark:bg-red-900 p-2 rounded-md">
            <p>
              Please fill in <span className="font-medium">{errors}</span> fields!
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
          >
            {props.defaultValues ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalForm;
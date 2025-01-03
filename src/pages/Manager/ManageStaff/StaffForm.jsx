import React, { useState, useEffect, useRef } from 'react'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const StaffModalForm = (props) => {
  // Form State
  const [formState, setFormState] = useState(
    props.defaultValues || {
      name: '',
      email: '',
      phone_number: '',
      address: '',
      avatar: '',
    }
  );

  // Image State
  const inputRef = useRef(null);
  const [formImage, setFormImage] = useState(formState.avatar);

  // Handle Image Change
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormState({ ...formState, avatar: e.target.files[0] });
      setFormImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Form Validation
  const [errors, setErrors] = useState();

  // Handle Form Submission
  const handleSubmitForm = (e) => {
    e.preventDefault();
    props.onSubmit(formState);
  };

  return (
    <div
      className="fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-80 modal-container flex items-center justify-center" // Add flex, items-center, justify-center
      onClick={(e) => {
        if (e.target.classList.contains('modal-container')) props.closeModel();
      }}
    >
      <form
        onSubmit={handleSubmitForm}
        className="my-auto w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto bg-white dark:bg-gray-800 rounded-md shadow-lg p-6 overflow-y-auto max-h-[90vh]"
      >
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formState.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Input */}
        <div className="mt-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Phone
          </label>
          <input
            type="text"
            name="phone_number"
            id="phone"
            value={formState.phone_number}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Input */}
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address Input */}
        <div className="mt-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formState.address}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-4 text-base font-medium text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload Section */}
        <div className="mt-6 flex gap-8 items-center">
          <div className="flex-1">
          {(formImage || formState.avatar) ? (
            <div className="flex flex-col items-center">
              <img
                src={formImage}
                alt="Uploaded or default avatar"
                onClick={() => inputRef.current.click()}
                className="w-48 h-48 rounded-full object-cover cursor-pointer"
              />
              <p className="text-xs mt-2 text-gray-500 dark:text-gray-400 italic text-center">
                Click on the image to upload a new one
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div
                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-300/25 px-6 py-10 cursor-pointer"
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
            </div>
          )}
          <input
            type="file"
            onChange={handleImageChange}
            ref={inputRef}
            className="hidden"
          />
          </div>
          
        </div>

        {/* Error Message */}
        {errors && (
          <div className="text-red-500 text-sm mt-4 mb-6 bg-red-100 dark:bg-red-900 p-2 rounded-md">
            <p>
              Please fill in <span className="font-medium">{errors}</span>{" "}
              fields!
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffModalForm;
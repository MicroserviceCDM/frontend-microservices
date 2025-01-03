import SideBar from "../../../layouts/components/sideBar/SideBar";
import React, { useState, useRef } from "react";
import { cdmApi } from "../../../misc/cdmApi";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Snackbar, Alert } from "@mui/material";
import { Checkbox } from "@/components/ui/checkbox";
import OtherLoading from "@/components/OtherLoading";

function CustomerReport() {
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInput = useRef(null);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [loading, setLoading] = useState(false);

  const uploadImages = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cdmpreset");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/droondbdu/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await response.json();
      return imgData.url.toString();
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title === "" || description === "") {
      setSnackbar({
        children: "Please describe your problem",
        severity: "error",
      });
      return;
    }

    try {
      setLoading(true);
      let imgUrl = "";
      if (file) {
        imgUrl = await uploadImages(file);
      }

      const userId = user.id;
      const report = {
        title,
        description,
        userId,
        image: imgUrl,
        type: "USER",
      };

      await cdmApi.createCustomerReport(report);
      setTitle("");
      setDescription("");
      setFile("");
      setImagePreviewUrl("");
      setSelectedOption(null);

      setSnackbar({
        children: "Your report is sent",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        children: "Failed to send report",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Modified handleRadioChange
  const handleRadioChange = (value) => {
    setSelectedOption(value);
    switch (value) {
      case "website":
        setTitle("Website Problem");
        break;
      case "service":
        setTitle("Service Problem");
        break;
      case "product":
        setTitle("Product Problem");
        break;
      default:
        setTitle("");
        break;
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      reader.onloadend = () => {
        setFile(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSnackbar({
        children: "Please select an image file",
        severity: "error",
      });
    }
  };

  const triggerFileInput = () => {
    fileInput.current.click();
  };

  return (
    <>
      {loading && <OtherLoading />}
      <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
        <SideBar />
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Report Problem
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Which of the following options best describes the type of issue you
            are experiencing?
          </p>
          <RadioGroup
            value={selectedOption}
            onValueChange={handleRadioChange} // Correctly pass the function reference
            className="mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <RadioGroupItem
                value="website"
                id="website"
                className="peer sr-only"
              />
              <Label
                htmlFor="website"
                className="flex items-center justify-between w-full p-4 text-gray-600 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-gray-300 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Website Problem
              </Label>

              <RadioGroupItem
                value="service"
                id="service"
                className="peer sr-only"
              />
              <Label
                htmlFor="service"
                className="flex items-center justify-between w-full p-4 text-gray-600 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-gray-300 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Service Problem
              </Label>

              <RadioGroupItem
                value="product"
                id="product"
                className="peer sr-only"
              />
              <Label
                htmlFor="product"
                className="flex items-center justify-between w-full p-4 text-gray-600 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-gray-300 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Product Problem
              </Label>
            </div>
          </RadioGroup>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Please describe the problem you are experiencing in the space below.
            Be as descriptive as possible so we can be sure to help you as best
            as we can.
          </p>
          {title && (
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
          )}
          <Textarea
            placeholder="Write your thoughts here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 p-4" // Added padding here
            rows={5}
          />
          <div className="flex items-center mb-4">
            <Button
              variant="outline"
              onClick={triggerFileInput}
              className="inline-flex items-center text-gray-600"
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              Attach Image
            </Button>
            <input
              type="file"
              ref={fileInput}
              onChange={handleImageChange}
              className="hidden"
            />
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="h-20 ml-4 rounded-md"
              />
            )}
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            How would you like us to contact you? Please select an option from
            the list below.
          </p>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Checkbox
                defaultChecked
                className="text-blue-600 dark:text-blue-500"
              />
              <Label className="ml-2 text-gray-700 dark:text-gray-300">
                Phone Call
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
              className="text-blue-600 dark:text-blue-500" 
              />
              <Label className="ml-2 text-gray-700 dark:text-gray-300">
                Text Message
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
              className="text-blue-600 dark:text-blue-500" 
              />
              <Label className="ml-2 text-gray-700 dark:text-gray-300">
                Email Address
              </Label>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            disabled={loading}
          >
            {loading && (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
            )}
            Submit
          </Button>
        </div>
      </div>

      {!!snackbar && (
        <Snackbar
          open
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}

export default CustomerReport;
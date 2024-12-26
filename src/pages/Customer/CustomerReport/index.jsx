import SideBar from "../../../layouts/components/sideBar/SideBar";
import "./CustomerReport.css";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { cdmApi } from "../../../misc/cdmApi";
import { Checkbox, Navbar } from "@material-tailwind/react";
import ImageUploading from 'react-images-uploading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faRectangleXmark, faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Check, CheckRounded } from "@mui/icons-material";
import axios, { Axios } from "axios";
import DragAndDrop from "../../../components/DragAndDrop";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Loading from "../../../components/Loading";
import OtherLoading from "../../../components/OtherLoading"

function CustomerReport() {
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInput = useRef(null)
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  let img = "";
  const uploadImages = async (thing) => {
    const image = new FormData()

    image.append("file", thing)
    image. append("cloud_name", "droondbdu")
    image. append("upload_preset", "cdmpreset")
    
    const response = await fetch("https://api.cloudinary.com/v1_1/droondbdu/image/upload", 
        {
          method: "post",
          body: image
        }
    )
    const imgData = await response.json();
    img = imgData.url.toString();
    console.log(img);
    //img = imgData.url.jsxToString();  
    // console.log(imgData.url);
  };

  const handleChange = (event) => {
    setReport({ ...report, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    uploadImages(img);
    console.log(img);
    const userId = user.id;
    const report = { title, description, userId, image: img, type: "USER" };
    if(title == "" || description == "")
    {
      setSnackbar({ children: "Plese describe your problem", severity: "error" });
      return;
    }
    await cdmApi.createCustomerReport(report)
      .then((response) => {
        // setSnackbar({ children: "Your report is sent", severity: "success" });
        // // window.location.reload() 
        setLoading(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRadioChange = (value) => {
    setSelectedOption(value);
    switch (value) {
      case 'website':
        setTitle("Website Problem");
        break;
      case 'service':
        setTitle("Service Problem");
        break;
      case 'product':
        setTitle("Product Problem");
        break;
      default:
        setTitle("");
        break;
    }
  };

  useEffect(() => {
    if(!loading)
        return;
    const timeoutId = setTimeout(() => {
        setLoading(false);
        setSnackbar({ children: "Your report is sent", severity: "success" });
        //window.location.reload() 
      }, 3000);
      return () => clearTimeout(timeoutId);
  }, [loading]);

  return (
    <>            
        {loading && <OtherLoading setOpenModal={setLoading} />}

        <div className="flex bg-white dark:bg-slate-800">
            <SideBar />
            <div style={{ marginLeft: 40, width: "100vw" }}>
                  <h1 className="font-medium text-3xl mt-16 text-black dark:text-white">Report Problem</h1>
                  <p className="mt-8 xl:mr-2 mr-4 text-black dark:text-white">Which of the following options best describes the type of issue you are experiencing</p>
                  <div className="flex flex-col xl:ml-8 ml-2">
                      <div class="inline-flex items-center">
                          <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
                            <input name="type" type="radio" 
                              class="before:content[''] peer relative dark:checked:border-white h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                              id="html" onChange={() => handleRadioChange('website')}
                              checked={selectedOption === 'website'}/>
                            <span
                              class="absolute text-gray-900 dark:text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                              </svg>
                            </span>
                          </label>
                          <label class="mt-px font-light text-gray-700 dark:text-white cursor-pointer select-none" htmlFor="html">
                            Website Problem
                          </label>
                        </div>
                        <div class="inline-flex items-center">
                          <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
                            <input name="type" type="radio" 
                              class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity dark:checked:border-white checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                              id="html" onChange={() => handleRadioChange('service')}
                              checked={selectedOption === 'service'}/>
                            <span
                              class="absolute text-gray-900 dark:text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                              </svg>
                            </span>
                          </label>
                          <label class="mt-px font-light ext-gray-700 dark:text-white cursor-pointer select-none" htmlFor="html">
                            Service Problem
                          </label>
                        </div>
                        <div class="inline-flex items-center">
                          <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="react">
                            <input name="type" type="radio" 
                              class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 dark:text-white dark:border-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 dark:checked:border-white checked:before:bg-gray-900 hover:before:opacity-10"
                              id="react" onChange={() => handleRadioChange('product')}
                              checked={selectedOption === 'product'}/>
                            <span
                              class="absolute text-gray-900 dark:text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 " viewBox="0 0 16 16" fill="currentColor">
                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                              </svg>
                            </span>
                          </label>
                          <label class="mt-px font-light ext-gray-700 dark:text-white cursor-pointer select-none" htmlFor="react">
                            Product Problem
                          </label>
                        </div>
                  </div>
                  <p className="mt-4 xl:mr-2 mr-4 text-black dark:text-white">Please describe the problem you are experiencing in the space below. Be as descriptive as possible so we can be sure to help you as best as we can.</p>
                  <textarea onChange={(e) => setDescription(e.target.value)} rows="5" className="bg-white dark:bg-gray-600 p-6 mt-4 mr-2 xl:mr-24 block p-2.5 w-4/5 text-sm text-black rounded-lg border border-gray-200 focus:border-black bg-white" placeholder="Write your thoughts here..."></textarea>
                  <p className="mt-4 xl:mr-2 mr-4 text-black dark:text-white">Attach Image (if neccessary)</p>
                  <DragAndDrop  uploadImage={uploadImages}/>
                  <p className="mt-4 xl:mr-2 mr-4 text-black dark:text-white">How would you like us to contact you? Please select an option from the list below.</p>
                  <div className="flex flex-col xl:ml-8 ml-2">
                        <div className="flex"><Checkbox className="bg-black dark:bg-transparent" color="blue" defaultChecked /><label className="mt-2.5 text-black dark:text-white" htmlFor="">Phone Call</label></div>
                        <div className="flex"><Checkbox className="bg-black dark:bg-transparent" color="blue"  /><label className="mt-2.5 text-black dark:text-white" htmlFor="">Text Message</label></div>
                        <div className="flex"><Checkbox className="bg-black dark:bg-transparent" color="blue"  /><label className="mt-2.5 text-black dark:text-white" htmlFor="">Email Address</label></div>
                  </div>
                  <button onClick={handleSubmit} class="mt-2 mb-64 bg-black dark:bg-blue-500 hover:bg-gray-700 dark:hover:bg-blue-700  text-white font-bold py-2 px-4 rounded text-center mr-2">
                        Submit
                  </button>
                 </div>
                 {!!snackbar && (
              <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert {...snackbar} onClose={handleCloseSnackbar} />
              </Snackbar>
            )}
        </div>
    </>
  );
}

export default CustomerReport;

import React, { useState, useEffect } from "react";
import SideBarStaff from "../../../layouts/components/SideBarStaff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { cdmApi } from "../../../misc/cdmApi";
import OtherLoading from "../../../components/OtherLoading";
import ManagerSideBar from "../../../layouts/components/ManagerSideBar";
const StaffReport = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReport = async () => {
    await cdmApi
      .getCustomerReport()
      .then((response) => {
        console.log("Report");
        console.log(response.data);
        setReport(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReport();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = report.slice(firstIndex, lastIndex);
  const npage = Math.ceil(report.length / recordsPerPage);
  const numbers = (() => {
    if (currentPage > 1 && currentPage < npage) {
      return [currentPage - 1, currentPage, currentPage + 1];
    } else if (currentPage <= 1) {
      return [1, 2, 3];
    } else {
      return [npage - 2, npage - 1, npage];
    }
  })();
  function changeCPage(id) {
    setCurrentPage(id);
  }
  const renderStatus = (status) => {
    const statusClasses = {
      complete: "green",
      pending: "red",
      processing: "orange",
    };
    return (
      <span className={`status ${statusClasses[status]}`}>• {status}</span>
    );
  };

  const DetailModal = ({ report, onClose }) => {
    if (!report) return null;
    return (
      <div className={`modal ${report ? "active" : ""}`}>
        <div className="modal-content">
          <div className="title-bar">
            <div className="heading-report">Detail</div>
            <button class="close-button" onClick={onClose}>
              <FontAwesomeIcon icon={faCircleXmark} className="closes-icon" />
            </button>
          </div>
          <div className="detail-box">
            <p className="flex mt-6 ml-10">
              <strong className="mr-12">{report.customer}</strong>{" "}
              <div className="mr-12">{report.createdDate.split("T")[0]}</div>{" "}
              {report.status.toUpperCase()}
            </p>
            <textarea
              rows={12}
              className="area-detail bg-gray-100 mt-6 ml-10"
              readOnly
              value={report.description}
            ></textarea>
          </div>
        </div>
      </div>
    );
  };

  const ImageModal = ({ src, onClose }) => {
    if (!src) return null;

    return (
      <div className={`modal ${selectedImage ? "active" : ""}`}>
        <div className="modal-content">
          <div className="title-bar">
            <div className="heading-report">Image</div>
            <button class="close-button" onClick={onClose}>
              <FontAwesomeIcon icon={faCircleXmark} className="closes-icon" />
            </button>
          </div>
          <img
            src={src}
            className="img-box"
            alt="Expanded"
            style={{ width: "400px" }}
          />
        </div>
      </div>
    );
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  const handleViewClick = (report) => {
    setSelectedReport(report);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [loading]);

  return (
    <div>
      {!loading ? (
        <span className="flex dark:bg-slate-800 h-screen">
          <ManagerSideBar className="flex-1" />
          <div className="flex flex-col">
            <h1 className="font-medium text-3xl mt-16 ml-10 dark:text-white">
              Report
            </h1>
            <table className="mt-12 ml-10 dark:text-white">
              <thead>
                <tr>
                  <th className="dark:bg-gray-500">No.</th>
                  <th className="dark:bg-gray-500">User ID</th>
                  <th className="dark:bg-gray-500">Image</th>
                  <th className="dark:bg-gray-500">Title</th>
                  <th className="dark:bg-gray-500">Status</th>
                  <th className="dark:bg-gray-500">Type</th>
                  <th className="dark:bg-gray-500">Detail</th>
                </tr>
              </thead>
              <tbody>
                {records.map((report, index) => (
                  <tr key={report.id}>
                    <td className="id-col">
                      {(currentPage - 1) * recordsPerPage + index + 1}
                    </td>
                    <td className="customer-col">{report.userId}</td>
                    <td className="img-col">
                      <img
                        onClick={() => handleImageClick(report.image)}
                        className="image-col"
                        src={report.image}
                        alt=""
                      />
                    </td>
                    <td className="problem-col">{report.title}</td>
                    {/* <td className="img-col">
                    {" "}
                    <img
                      src={report.img}
                      className="img-mini"
                      onClick={() => handleImageClick(report.img)}
                      alt="preview"
                      width="60"
                      height="60"
                    />{" "}
                  </td> */}
                    {/* <td className="date-col">{report.date}</td> */}
                    <td className="status-col">{report.status}</td>
                    <td className="type-col">{report.type}</td>
                    <td className="view-col">
                      {/* <button
                      className="view-btn"
                      onClick={() => handleViewClick(report)}
                    >
                      View
                    </button> */}
                      <button
                        onClick={() => handleViewClick(report)}
                        type="button"
                        class="text-white bg-green-500 dark:bg-blue-500 hover:bg-green-700 dark:hover:bg-blue-700 focus:ring-4 dark:focus:ring-blue-300 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 focus:outline-none"
                      >
                        View
                      </button>

                      {/* <button onClick={() => handleViewClick(report)}
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                        View
                    </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav className="ml-auto mt-8">
              <ul className="flex items-center -space-x-px h-10 text-base">
                <li style={{ margin: 0 }}>
                  <a
                    href="#"
                    className="dark:bg-gray-500 dark:text-white flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </a>
                </li>
                <li
                  className={`${
                    currentPage > 2 ? "block" : "hidden"
                  } dark:bg-gray-500 dark:text-white flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                >
                  ...
                </li>
                {numbers.map((n, i) => (
                  <li
                    className={`dark:bg-gray-500 dark:text-white flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700  ${
                      currentPage === n
                        ? "bg-gray-300 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-500"
                    }`}
                    key={i}
                  >
                    <a href="#" onClick={() => changeCPage(n)}>
                      {n}
                    </a>
                  </li>
                ))}
                <li
                  className={`${
                    currentPage < npage - 1 ? "block" : "hidden"
                  } dark:bg-gray-500 dark:text-white flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                >
                  ...
                </li>

                <li>
                  <a
                    href="#"
                    className=" dark:bg-gray-500 dark:text-white flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>

            {selectedReport && (
              <DetailModal report={selectedReport} onClose={handleCloseModal} />
            )}
            {selectedImage && (
              <ImageModal
                src={selectedImage}
                onClose={() => setSelectedImage(null)}
              />
            )}
          </div>
        </span>
      ) : (
        <p>
          <OtherLoading />
        </p>
      )}
    </div>
  );
};

export default StaffReport;

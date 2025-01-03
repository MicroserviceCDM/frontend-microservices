import React, { useState, useEffect } from "react";
import SideBarStaff from "../../../layouts/components/SideBarStaff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { cdmApi } from "../../../misc/cdmApi";
import OtherLoading from "../../../components/OtherLoading";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
} from "@mui/material";
import { useTheme } from '../../../ThemeContext'

const StaffReport = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ85OS-FZ দেখলেন-h475y4fVn8Ag&usqp=CAU"; // Replace with your default image URL

  const getReport = async () => {
    try {
      const response = await cdmApi.getCustomerReport();
      setReports(response.data.content);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getReport();
      setLoading(false);
    };
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = reports.slice(firstIndex, lastIndex);
  const npage = Math.ceil(reports.length / recordsPerPage);
  const numbers = (() => {
    let nums = [];
    if (npage <= 1) {
      return [1];
    }
    if (currentPage > 2 && currentPage < npage - 1) {
      nums = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    } else if (currentPage <= 2) {
      for (let i = 0; i < npage; i++) {
        if (i < 5) {
          nums.push(i + 1);
        }
      }
    } else {
      for (let i = npage - 5; i < npage; i++) {
        if (i >= 0) {
          nums.push(i + 1);
        }
      }
    }
    return nums;
  })();

  function changeCPage(id) {
    setCurrentPage(id);
  }

  const DetailModal = ({ report, onClose }) => {
    if (!report) return null;
  
    return (
      <Dialog
        open={!!report}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          className: "dark:bg-gray-800"
        }}
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Report Detail
            </span>
            <IconButton onClick={onClose}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500" // Add hover effect
              />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="dark:bg-gray-700" /> {/* Add a divider */}
        <DialogContent className="pt-4">
          {/* User and Date Information */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-400 dark:bg-gray-700 rounded-full flex items-center justify-center text-white">
              {/* You can replace this with an avatar if available */}
              {report.userId.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {report.userId}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {report.createdDate.split("T")[0]}
              </div>
            </div>
            <div className="ml-auto">
              <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  {report.status.toUpperCase()}
              </span>
            </div>
          </div>
  
          {/* Description Textarea */}
          <div className="mt-2">
            <textarea
              rows={6} // Reduced row count
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
              readOnly
              value={report.description}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const ImageModal = ({ src, onClose }) => {
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageLoading(false); // Image loaded, set loading to false
      };
      img.onerror = () => {
        setImageLoading(false); // Image failed to load
        console.error("Error loading image:", src);
      };
    }, [src]);

    return (
      <Dialog
        open={!!src}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          className: "bg-white dark:bg-gray-800 rounded-lg",
        }}
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <span className="text-gray-900 dark:text-white">Image</span>
            <IconButton onClick={onClose}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-gray-700 dark:text-gray-300"
              />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          {imageLoading ? (
            <div className="flex justify-center items-center p-16">
              <OtherLoading />
            </div>
          ) : (
            <img
              src={src || defaultImageUrl}
              className="w-full rounded-lg"
              alt="Expanded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImageUrl;
              }} // Handle error by setting default image
            />
          )}
        </DialogContent>
      </Dialog>
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

  return (
    <div>
      {!loading ? (
        <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
          <SideBarStaff />
          <div className="flex-1 p-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Report
            </h1>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-gray-900 dark:text-white rounded-lg overflow-hidden">
                <thead className="bg-gray-200 dark:bg-gray-800">
                  <tr>
                    <th className="py-4 px-6 text-center dark:bg-gray-600 rounded-tl-lg">No.</th>
                    <th className="py-4 px-6 text-center dark:bg-gray-600">User ID</th>
                    <th className="py-4 px-6 text-center dark:bg-gray-600">Image</th>
                    <th className="py-4 px-6 text-center dark:bg-gray-600">Title</th>
                    <th className="py-4 px-6 text-center dark:bg-gray-600">Status</th>
                    <th className="py-4 px-6 text-center dark:bg-gray-600">Type</th>
                    <th className="py-4 px-6 text-center dark:bg-gray-600 rounded-tr-lg">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((report, index) => (
                    <tr
                      key={report.id}
                      className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="py-4 px-6 text-center">
                        {(currentPage - 1) * recordsPerPage + index + 1}
                      </td>
                      <td className="py-4 px-6 text-center">{report.userId}</td>
                      <td className="py-4 px-6 text-center">
                        <img
                          onClick={() => handleImageClick(report.image)}
                          className="h-12 w-12 object-cover rounded-lg cursor-pointer mx-auto"
                          src={report.image || defaultImageUrl}
                          alt="Report"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultImageUrl;
                          }} // Handle error by setting default image
                        />
                      </td>
                      <td className="py-4 px-6 text-center">{report.title}</td>
                      <td className="py-4 px-6 text-center">{report.status}</td>
                      <td className="py-4 px-6 text-center">{report.type}</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleViewClick(report)}
                          type="button"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <nav className="mt-8 flex justify-end">
              <ul className="flex items-center space-x-2">
                <li>
                  <button
                    onClick={() => changeCPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </button>
                </li>
                {numbers.map((n, i) => (
                  <li key={i}>
                    <button
                      onClick={() => changeCPage(n)}
                      className={`px-3 py-1 ${
                        currentPage === n
                          ? "bg-blue-600 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                      } border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg`}
                    >
                      {n}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => changeCPage(currentPage + 1)}
                    disabled={currentPage === npage}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>

            {selectedReport && (
              <DetailModal
                report={selectedReport}
                onClose={handleCloseModal}
              />
            )}
            {selectedImage && (
              <ImageModal
                src={selectedImage}
                onClose={() => setSelectedImage(null)}
              />
            )}
          </div>
        </div>
      ) : (
        <OtherLoading />
      )}
    </div>
  );
};

export default StaffReport;
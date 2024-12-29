import SideBar from "../../../layouts/components/sideBar/SideBar";
import "../../../components/CarCard/CarCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faPenToSquare,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { cdmApi } from "../../../misc/cdmApi";
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import OtherLoading from "../../../components/OtherLoading";
import ManagerSideBar from "../../../layouts/components/ManagerSideBar";
import SideBarStaff from "../../../layouts/components/SideBarStaff/SideBarStaff";
function StaffProfile() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || []
  );
  const [user, setUser] = useState({});
  const [id, setId] = useState(userData.id);
  const [avatar, setAvatar] = useState(userData.avatar);
  const [name, setName] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phoneNumber);
  const [address, setAddress] = useState(userData.address);
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("accessories");

  const getUserMe = async () => {
    let response = await cdmApi.getUserMe(userData.username);
    setUser(response.data);
    setAvatar(response.data.avatar);
    setName(response.data.username);
    setEmail(response.data.email);
    setPhone(response.data.phoneNumber);
    setAddress(response.data.address);
  };

  const handleSubmitUserData = async (event) => {
    event.preventDefault();
    console.log(id);
    try {
      setLoading(true);

      const user = { id, avatar, name, email, phone, address };
      await cdmApi.updateUser(user);
      setSnackbar({
        children: "Update personal information successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        children: "Update personal information fail!",
        severity: "error",
      });
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (password == null || newPassword == null || confirmNewPassword == null) {
      setSnackbar({
        children: "These field cannot be null!",
        severity: "warning",
      });
      return;
    }
    if (password === newPassword) {
      setSnackbar({
        children: "New password and current password are the same!",
        severity: "warning",
      });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setSnackbar({
        children: "New password and confirm new password are not match!",
        severity: "warning",
      });
      return;
    }
    try {
      setLoading(true);
      const user = { id, password, newPassword, confirmNewPassword };
      await cdmApi.changePassword(user);
      setSnackbar({
        children: "Change password successfully!",
        severity: "success",
      });
      //Document.getElementById("cr").value = "";
    } catch (error) {
      setSnackbar({ children: "Change password failed!", severity: "error" });
    }
  };

  useEffect(() => {
    getUserMe();
  }, []);

  useEffect(() => {
    setId(userData.id);
    setAvatar(user.avatar);
    setName(user.username);
    setEmail(user.email);
    setPhone(user.phoneNumber);
    setAddress(user.address);
    console.log(user);
  }, [user]);

  document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("avatar-upload");
    fileInput.addEventListener("change", handleFileUpload);

    function handleFileUpload(event) {
      const file = event.target.files[0];
      // Handle the file upload logic later =)
    }
  });

  const handleMouseEnter = () => {
    const avar = document.getElementById("avartar");
    avar.style.opacity = 0.5;
  };

  const handleMouseLeave = () => {
    const avar = document.getElementById("avartar");
    avar.style.opacity = 1;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file.");
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("avatar-upload");
    fileInput.click();
  };

  useEffect(() => {
    if (!loading) return;
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [loading]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <SideBarStaff />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Profile Settings
            </h1>

            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center space-x-8">
                <div className="relative">
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <button
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-primary-600 p-2 rounded-full text-white hover:bg-primary-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faCamera} />
                  </button>
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {email}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">{address}</p>
                </div>
              </div>
            </div>

            {/* Personal Information Form */}
            <form onSubmit={handleSubmitUserData} className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={name}
                      readOnly
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700 bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>

            {/* Password Change Form */}
            <form onSubmit={handleChangePassword} className="space-y-6 mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Change Password
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </main>
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
    </div>
  );
}

export default StaffProfile;

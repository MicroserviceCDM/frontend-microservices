import SideBarStaff from "../../../layouts/components/SideBarStaff/SideBarStaff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { cdmApi } from "../../../misc/cdmApi";
import React, { useEffect, useState, useRef } from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import OtherLoading from "../../../components/OtherLoading";

function StaffProfile() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  ); // Initialize as an empty object
  const [user, setUser] = useState({});
  const [id, setId] = useState(userData.id || ""); // Initialize with empty strings to avoid undefined
  const [avatar, setAvatar] = useState(userData.avatar || "");
  const [name, setName] = useState(userData.username || "");
  const [email, setEmail] = useState(userData.email || "");
  const [phone, setPhone] = useState(userData.phoneNumber || "");
  const [address, setAddress] = useState(userData.address || "");
  const [password, setPassword] = useState(""); // Initialize password fields as empty strings
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [snackbar, setSnackbar] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Ref for the file input

  const handleCloseSnackbar = () => setSnackbar(null);

  const getUserMe = async () => {
    try {
      let response = await cdmApi.getUserMe(userData.username);
      setUser(response.data);
      // Set the state after successfully fetching data
      setId(response.data.id);
      setAvatar(response.data.avatar);
      setName(response.data.username);
      setEmail(response.data.email);
      setPhone(response.data.phoneNumber);
      setAddress(response.data.address);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmitUserData = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const updatedUser = { id, avatar, name, email, phone, address }; // Use updated state values
      await cdmApi.updateUser(updatedUser);
      // Update local storage after successful API call
      const updatedUserData = { ...userData, ...updatedUser };
      localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
      setUserData(updatedUserData);

      setSnackbar({
        children: "Update personal information successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating user data:", error);
      setSnackbar({
        children: "Update personal information fail!",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (!password || !newPassword || !confirmNewPassword) {
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
      const userPasswordData = { id, password, newPassword };
      await cdmApi.changePassword(userPasswordData);
      setSnackbar({
        children: "Change password successfully!",
        severity: "success",
      });
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      setSnackbar({ children: "Change password failed!", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserMe();
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setLoading(true); 
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cdmpreset"); // Replace with your Cloudinary upload preset

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/droondbdu/image/upload`, // Replace with your Cloudinary cloud name
          {
            method: "POST",
            body: formData,
          }
        );
        const imgData = await response.json();
        const newAvatarUrl = imgData.secure_url;

        setAvatar(newAvatarUrl); // Update the avatar state with the new URL

        // Automatically update user data after successful upload
        const updatedUser = { id, avatar: newAvatarUrl, name, email, phone, address };
        await cdmApi.updateUser(updatedUser);

        // Update local storage after successful API call
        const updatedUserData = { ...userData, avatar: newAvatarUrl };
        localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
        setUserData(updatedUserData);

        setSnackbar({
          children: "Avatar updated successfully!",
          severity: "success",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        setSnackbar({
          children: "Error uploading avatar.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setSnackbar({
        children: "Please select an image file.",
        severity: "warning",
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click(); // Use the ref to trigger the click
  };

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
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    <FontAwesomeIcon icon={faCamera} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    id="avatar-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">{email}</p>
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700 bg-gray-100 p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700 bg-gray-100 p-2"
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
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700 bg-gray-100 p-2"
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
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700 bg-gray-100 p-2"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                  disabled={loading}
                >
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  )}
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
                      value={password || ""}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700 bg-gray-100 p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword || ""}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700 bg-gray-100 p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmNewPassword || ""}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700 bg-gray-100 p-2"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  disabled={loading}
                >
                  {loading && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  )}
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
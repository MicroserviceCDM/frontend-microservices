import "../../../components/CarCard/CarCard.css";
import "./ManagerProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faPenToSquare,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { cdmApi } from "../../../misc/cdmApi";
import React, { useEffect, useState } from "react";
import  Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import OtherLoading from "../../../components/OtherLoading"
import ManagerSideBar from "../../../layouts/components/ManagerSideBar";
function CustomerProfile() {
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
      setSnackbar({ children: "Update personal information successfully!", severity: "success" });

    } catch (error) {
      setSnackbar({ children: "Update personal information fail!", severity: "error" });
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if(password == null || newPassword == null || confirmNewPassword == null)
    {
      setSnackbar({ children: "These field cannot be null!", severity: "warning" });
      return;
    }
    if (password === newPassword) {
      setSnackbar({ children: "New password and current password are the same!", severity: "warning" });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setSnackbar({ children: "New password and confirm new password are not match!", severity: "warning" });
      return;
    }
    try {
      setLoading(true);
      const user = { id, password, newPassword, confirmNewPassword };
      await cdmApi.changePassword(user);
      setSnackbar({ children: "Change password successfully!", severity: "success" });
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
    if (file && file.type.startsWith('image/')) {

      const reader = new FileReader();
      reader.onloadend = () => {

        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file.');
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("avatar-upload");
    fileInput.click();
  };

  useEffect(() => {
    if(!loading)
        return;
    const timeoutId = setTimeout(() => {
        
       setLoading(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
}, [loading]);

  return (
    <>
      {loading && <OtherLoading setOpenModal={setLoading}/>}

      <div className="flex bg-white dark:bg-slate-800">
        <ManagerSideBar />
        <div style={{ marginLeft: 40, width: "100vw" }} >
          <h1 className="font-medium text-3xl mt-16 text-black dark:text-white">Profile Settings</h1>
          <div className="flex">
            <div className="flex-2">
              <label for="avatar-upload" className="avatar-container mt-2">
                <img
                  src={avatar}
                  alt="avatar"
                  className="avatar-input"
                  id="avartar"
                />
                <div
                  className="overlay"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <FontAwesomeIcon icon={faCamera} />
                </div>
              </label>
              <input
                type="file"
                id="avatar-upload"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </div>
            <div className="vertical-line bg-black dark:bg-white"></div>
            <div style={{ flex: 4 }}>
              <p className="font-medium underline mt-4 text-black dark:text-white">Mr. {email}</p>
              <p className=" text-black dark:text-white">
                {" "}
                {address} 
              </p>

              
            </div>
            <div className="flex-5 flex justify-center items-center"></div>
          </div>

          {/* line 1 */}
          <div className="flex items-center">
            <div className="horizontal-line bg-black dark:bg-white"></div>
          </div>

          <form className="flex flex-col text-black dark:text-white"  onSubmit={handleSubmitUserData}>
            <div className="form-group">
              <label for="user" className="article">
                Full Name
              </label>
              <input
                type="user"
                id="last"
                className="input-article bg-white dark:bg-gray-600 text-black dark:text-white dark:border-none"
                style={{ width: "90%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex mt-3">
              <div className="form-group text-black dark:text-white">
                <label for="email" className="article">
                  Email Address
                </label>
                <input
                  readOnly
                  type="text"
                  id="email"
                  className="input-article text-black dark:text-white bg-white dark:bg-gray-600 dark:border-none" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  title="This field is read-only"
                />
              </div>
              <div class="form-group">
                <label for="phone" className="article">
                  Phone Numer
                </label>
                <input
                  type="text"
                  id="phone"
                  className="input-article text-black dark:text-white bg-white dark:bg-gray-600 dark:border-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="last1" className="article">
                Home Address
              </label>
              <input
                type="text"
                name="last1"
                className="input-article text-black dark:text-white bg-white dark:bg-gray-600 dark:border-none"
                style={{ width: "90%" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div style={{ width: "90%" }}>
              {/* <button type="submit" className="button button--light">
                Save Change
              </button> */}
                <button type="submit" class="button py-4 bg-black hover:bg-gray-600 dark:bg-blue-500 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Save Change
                </button>
            </div>
          </form>

          {/* <div className="flex">
                        <div class="form-group">
                            <label for="first" class="article">First Name</label>
                            <input type="text" id="first" class="input-article" value="Luffy" />
                        </div>
                        <div class="form-group">
                            <label for="last" class="article">Last Name</label>
                            <input type="text" id="last" class="input-article" value="Monkey D" />
                        </div>
                   </div> */}

          {/* line 2 */}
          {/* <div className="flex items-center">
                        <div className="horizontal-line"></div>
                    </div>

                    <label for="last" class="article">Gender</label>
                    <div className="flex mt-4">
                        <input className="input-radio" type="radio" name="gt"/>
                        <div className="flex justify-center items-center">
                            <p className="radio-text-car-sort">Male</p>
                        </div>
                    </div>
                    <div className="flex mt-4">
                        <input className="input-radio" type="radio"  name="gt"/>
                        <div className="flex justify-center items-center">
                            <p className="radio-text-car-sort">Female</p>
                        </div>
                    </div> */}

          {/* line 3 */}
          <div className="flex items-center">
            <div className="horizontal-line"></div>
          </div>

          <form className="flex flex-col" onSubmit={handleChangePassword}>
            <div className="flex ">
              <div class="form-group text-black dark:text-white">
                <label for="cr" class="article">
                  Current Password
                </label>
                <input
                  type="password"
                  id="cr"
                  class="input-article text-black dark:text-white bg-white dark:bg-gray-600 dark:border-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="form-group text-black dark:text-white">
                <label for="ne" class="article">
                  New Password
                </label>
                <input
                  type="password"
                  id="ne"
                  class="input-article text-black dark:text-white bg-white dark:bg-gray-600 dark:border-none"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div class="form-group text-black dark:text-white" style={{ marginTop: 15 }}>
              <label for="user" class="article">
                Confirm New Password
              </label>
              <input
                type="password"
                id="user"
                class="input-article text-black dark:text-white bg-white dark:bg-gray-600 dark:border-none"
                style={{ width: "90%" }}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <div style={{ width: "90%" }}>
              {/* <button className="button button--light mb-10">Cancel</button> */}
              <button type="submit" class=" button py-4 bg-black hover:bg-gray-600 dark:bg-blue-500  dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Save Change
              </button>
            </div>
          </form>
        </div>
      </div>
      {!!snackbar && (
              <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert {...snackbar} onClose={handleCloseSnackbar} />
              </Snackbar>
            )}
    </>
  );
}

export default CustomerProfile;

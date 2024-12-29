import SideBarStaff from "../../../layouts/components/SideBarStaff";
import React, { useState } from "react";
import "./StaffHome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleUser,
  faClipboardCheck,
  faPencil,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import ChatRoom from "../../../components/Chat/ChatRoom";
import { Chat } from "@mui/icons-material";

function StaffHome() {
  // Simulated data
  const users = [
    {
      id: 1,
      name: "John Smith",
      address: "12/255 Nguyen Huu Canh, district 9, HCMC",
      phone: "(+84)94123456",
      email: "johnS@gmail.com",
      notes: "This guy will pay this car by weekly instalment.",
      chat: [
        "Hi. i offer an advice for choosing car. Can you help me?",
        "Ok sure. Which model do you like?",
        "Well. I'm looking for ModelX at first because it looks so cool. However, its price's extremely high so that I can't afford that. Is there any other cars have same appearance but it's much cheaper?",
      ],
    },
    {
      id: 2,
      name: "CR7",
      address: "24/11 No Trang Long, Binh Thanh district, HCMC",
      phone: "(+84)94777776",
      email: "crBuoi@gmail.com",
      notes: "This guy is rich.",
      chat: [
        "Hi. i need to buy 10 cars. Can you help me?",
        "Ok Bro. Which model do you like?",
        "Well. I'm looking for ModelS. How much for 10 cars?",
      ],
    },
    {
      id: 3,
      name: "Elon Musk",
      address: "24 Wall.st , Financial district, NYC",
      phone: "(+84)99999999",
      email: "richestguy@gmail.com",
      notes: "This guy is the richest.",
      chat: [
        "Hi. i need to buy your web. Can you help me?",
        "Ok Bro. 1000000000 dollar",
        "OK, deal!",
      ],
    },
    // ... other users
  ];

  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers = searchTerm
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  function capitalizeFirstLetter(string) {
    const capitalized = string.charAt(0).toUpperCase();
    return <div>{capitalized}</div>;
  }

  return (
    <div className='bg-white dark:bg-slate-800 h-screen'>
      <span className="flex">
        <SideBarStaff className="flex-1" />
        <div className="flex flex-col w-full m-5">
          <h1 className="font-medium text-3xl mt-16 ml-10  text-black dark:text-white">Dashboard</h1>
          <ChatRoom />

          {/* <div id="list-box" className="flex flex-col h-4/5 mt-10 ml-10 w-60">
            <div className="search-bar-container">
              <input
                className="search-bar"
                type="text"
                placeholder="search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn-search">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="sidebar__icon"
                />
              </button>
            </div>

            <div>
              {filteredUsers.map((user) => (
                <li key={user.id} onClick={() => handleUserClick(user)}>
                  <div className="user-box">
                    <div className="circle-name">
                      <b className="user-fname">
                        {capitalizeFirstLetter(user.name)}
                      </b>
                    </div>
                    {user.name}
                  </div>
                </li>
              ))}
            </div>
          </div> */}
        </div>
        {/* <div className="flex flex-col">
          <div id="info-user" className="flex mt-36 ml-5 w-60">
            <div className="avatar-user">
              <FontAwesomeIcon icon={faCircleUser} className="common_icon" />
            </div>
            <div>
              {selectedUser && (
                <>
                  <div>
                    <b>{selectedUser.name}</b>
                  </div>
                  <div className="info-basic">{selectedUser.address}</div>
                  <div className="info-basic">Phone: {selectedUser.phone}</div>
                  <div className="info-basic">Email: {selectedUser.email}</div>
                </>
              )}
            </div>
          </div>
          <div id="task-list" className="flex mt-2 ml-5 w-60">
            <div className="avatar-user">
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className="common_icon"
              />
            </div>
            <div>
              {selectedUser && (
                <>
                  <div className="flex">
                    <input type="checkbox" id="check1" className="check-box" />
                    <label for="check1" className="check-title">
                      Credit received
                    </label>
                  </div>
                  <div className="flex">
                    <input type="checkbox" id="check2" className="check-box" />
                    <label htmlFor="check2" className="check-title">
                      Schedule test drive
                    </label>
                  </div>
                  <div className="flex">
                    <input type="checkbox" id="check3" className="check-box" />
                    <label htmlFor="check3" className="check-title">
                      Take payment
                    </label>
                  </div>
                  <div className="flex">
                    <input type="checkbox" id="check4" className="check-box" />
                    <label htmlFor="check4" className="check-title">
                      Sell vehicle
                    </label>
                  </div>
                  <div className="flex">
                    <input type="checkbox" id="check5" className="check-box" />
                    <label htmlFor="check5" className="check-title">
                      Schedule a meeting
                    </label>
                  </div>
                  <div className="flex">
                    <input type="checkbox" id="check6" className="check-box" />
                    <label htmlFor="check6" className="check-title">
                      Make paperwork
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
          <div id="note-box" className=" flex mt-2 ml-5 w-60">
            <div className="avatar-user">
              <FontAwesomeIcon
                icon={faPencil}
                rotation={270}
                className="common_icon"
              />
            </div>
            <div className="note-wrapper">
              {selectedUser && (
                <>
                  <div>
                    <b>Notes</b>
                  </div>
                  <div className="info-basic" id="note-content">
                    {selectedUser.notes}
                  </div>
                  <input
                    className="info-basic"
                    id="note-write"
                    placeholder="take note..."
                  ></input>

                  <div className="save-box">
                    <button type="save" className="btn-save">
                      <b>SAVE</b>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div id="chat-box" className="flex flex-col mt-36 ml-5 w-80">
            {selectedUser && (
              <>
                <div className="area-chat">
                  <div className="balloon-chat-customer">
                    <div className="chat-content">{selectedUser.chat[0]}</div>
                  </div>
                  <div className="balloon-chat-staff">
                    <div className="chat-content">{selectedUser.chat[1]}</div>
                  </div>
                  <div className="balloon-chat-customer">
                    <div className="chat-content">{selectedUser.chat[2]}</div>
                  </div>
                </div>
                <div className="area-write">
                  <input type="file" id="file" />
                  <label for="file">
                    <FontAwesomeIcon icon={faCamera} className="camera_icon" />
                  </label>

                  <input
                    type="text1"
                    name="message"
                    id="message"
                    placeholder="type a message here"
                  />
                  <button type="save" className="btn-send">
                    <b>SEND</b>
                  </button>
                </div>
              </>
            )}
          </div>
        </div> */}
      </span>
    </div>
  );
}

export default StaffHome;

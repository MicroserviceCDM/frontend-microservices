import SideBarStaff from "../../../layouts/components/SideBarStaff";
import React, { useState } from "react";
// import "./StaffHome.css";
import ChatRoom from "../../../components/Chat/ChatRoom";

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
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex">
        <SideBarStaff />
        <div className="flex-1 min-h-min"> {/* Main content area with padding */}
          <ChatRoom />
        </div>
      </div>
    </div>
  );
}

export default StaffHome;

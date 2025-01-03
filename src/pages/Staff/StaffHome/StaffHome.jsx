import SideBarStaff from "../../../layouts/components/SideBarStaff";
import React, { useState } from "react";
// import "./StaffHome.css";
import ChatRoom from "../../../components/Chat/ChatRoom";

function StaffHome() {
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

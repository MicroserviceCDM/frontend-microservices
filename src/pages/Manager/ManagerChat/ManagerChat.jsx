import React from 'react'
import ChatRoom from '../../../components/Chat/ChatRoom'
import ManagerSideBar from '../../../layouts/components/ManagerSideBar'

function ManagerChat() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex">
        <ManagerSideBar />
        <div className="flex-1 min-h-min"> {/* Main content area with padding */}
          <ChatRoom />
        </div>
      </div>
    </div>
  )
}

export default ManagerChat;
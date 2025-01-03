import React from 'react'
import ChatRoom from '../../../components/Chat/ChatRoom'
import ManagerSideBar from '../../../layouts/components/ManagerSideBar'

const ManagerChat = () => {
  

  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-5/6">
      <div className="flex">
        <ManagerSideBar />
        <div className="flex-auto h-5/6">
          <ChatRoom />
        </div>
      </div>
    </div>
  )
}
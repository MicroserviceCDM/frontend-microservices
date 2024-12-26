import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { cdmApi } from "../../misc/cdmApi";

import "./ChatRoom.css";
import axios from "axios";

var stompClient = null;
const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || ""
  );
  const [userData, setUserData] = useState({
    username: user.email,
    receivername: "",
    connected: false,
    message: "",
  });

  // const getAllUsers = async () => {
  //   const response = await cdmApi.getAllUsers();
  //   const data = response.data;
  //   console.log("user data" + data);
  //   const chats = new Map(data.content.map(user => [user.email, user]));
  //   setPrivateChats(new Map(chats));
  // };

  const loadPublicChats = async () => {
    const response = await axios.get("http://localhost:8080/api/chat/public-messages");
    const data = response.data;
    setPublicChats(data);
  };
  
  const loadPrivateChats = async (senderName, receiverName) => {
    const response = await axios.get(`http://localhost:8080/api/chat/private-messages/${senderName}/${receiverName}`);
    const data = response.data;
    console.log(data);
    if (data) {
      privateChats.set(receiverName, data);
      setPrivateChats(new Map(privateChats));
    }
  };

  const handleUserClick = (receiverName) => {
    console.log("user bam vao tab ng dung")
    console.log(receiverName);
    loadPrivateChats(userData.username, receiverName);
  };

  useEffect(() => {
    console.log(userData);
    connect();
    loadPublicChats();
    // getAllUsers();
  }, []);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        setPublicChats(prevChats => [...prevChats, payloadData]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      setPrivateChats(prevChats => {
        const updatedChats = new Map(prevChats);
        updatedChats.get(payloadData.senderName).push(payloadData);
        return updatedChats;
      });
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    const now = new Date();
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        date: now.getTime(),
        receiverName: "public",
        message: userData.message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };
  return (
    <div className="flex flex-col w-full h-full">
      {userData.connected ? (
        <div className="chat-box flex flex-row h-full rounded-lg">
          {/* chat list */}
          <div className="w-1/5 m-2">
            <ul>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`member ${tab === "CHATROOM" && "active"}`}
              >
                Chatroom
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                    handleUserClick(name)
                  }}
                  className={`member ${tab === name && "active"}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {/* public chat content */}
          {tab === "CHATROOM" && (
            <div className="w-4/5 ml-2">
              <ul className="h-4/5 border-solid border-2 border-black m-2 rounded overflow-y-auto max-h-96">
                {publicChats.map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">
                        {/* <img
                          class="inline-block h-6 w-6 rounded-full mr-1"
                          src={user.avatar}
                          alt=""
                        ></img> */}
                        {chat.senderName}
                      </div>
                    )}
                        <div className="message-data">{chat.message}</div>      
                    {chat.senderName === userData.username && (
                      <div className="avatar self">                        
                        {chat.senderName}
                        {/* <img
                          class="inline-block h-6 w-6 rounded-full mr-1"
                          src={user.avatar}
                          alt=""
                        ></img> */}
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="w-full flex flex-row mt-2">
                <input
                  type="text"
                  className="w-4/5 rounded bg-black text-white ml-2 bg-gray-500 focus:outline-none focus:ring focus:ring-violet-300"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="w-1/5 text-black cursor-pointer hover:bg-gray-300 ml-2 mr-2"
                  onClick={sendValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
          {/* private chat */}
          {tab !== "CHATROOM" && (
            <div className="w-4/5 ml-2">
              <ul className="h-4/5 border-solid border-2 border-black m-2 rounded">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="w-full flex flex-row mt-2">
                <input
                  type="text"
                  className="w-4/5 rounded bg-black text-white ml-2"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="w-1/5 text-black cursor-pointer"
                  onClick={sendPrivateValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
            margin="normal"
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;

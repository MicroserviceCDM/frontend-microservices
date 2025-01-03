import React, { useEffect, useState, useRef } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { cdmApi } from "../../misc/cdmApi";
import { config } from "../../misc/Constants";
import axios from "axios";
import {
  Avatar,
  Badge,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

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

  // Ref for automatic scrolling
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the messages list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Call scrollToBottom after each new message is received
  useEffect(() => {
    scrollToBottom();
  }, [publicChats, privateChats]);


  const loadPublicChats = async () => {
    try {
      const response = await axios.get(
        `${config.url.API_BASE_URL}/api/chat/public-messages`
      );
      setPublicChats(response.data);
    } catch (error) {
      console.error("Error loading public chats:", error);
    }
  };

  const loadPrivateChats = async (senderName, receiverName) => {
    try {
      const response = await axios.get(
        `${config.url.API_BASE_URL}/api/chat/private-messages/${senderName}/${receiverName}`
      );

      if (response.data) {
        privateChats.set(receiverName, response.data);
        setPrivateChats(new Map(privateChats));
      }
    } catch (error) {
      console.error("Error loading private chats:", error);
    }
  };

  const handleUserClick = (receiverName) => {
    loadPrivateChats(userData.username, receiverName);
  };

  useEffect(() => {
    connect();
    loadPublicChats();
  }, []);

  const connect = () => {
    let Sock = new SockJS(`${config.url.API_BASE_URL}/ws`);
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
        setPublicChats((prevChats) => [...prevChats, payloadData]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      setPrivateChats((prevChats) => {
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

  return (
    <div className="flex flex-col w-full h-screen items-center justify-start p-4 bg-gray-100 dark:bg-gray-800">
      {userData.connected ? (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full flex">
          {/* Chat List */}
          <div className="w-1/4 pr-4 border-r border-gray-200 dark:border-gray-600">
            <List disablePadding>
              {" "}
              {/* Add disablePadding here */}
              <ListItem
                button
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`${
                  tab === "CHATROOM"
                    ? "bg-gray-200 dark:bg-gray-600"
                    : "hover:bg-gray-100 dark:hover:bg-gray-500"
                } py-2`} // Reduce padding with py-2
              >
                <ListItemText
                  primary="Chatroom"
                  className="dark:text-gray-200"
                />
              </ListItem>
              {[...privateChats.keys()].map((name, index) => (
                <ListItem
                  button
                  onClick={() => {
                    setTab(name);
                    handleUserClick(name);
                  }}
                  className={`${
                    tab === name
                      ? "bg-gray-200 dark:bg-gray-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-500"
                  } py-2`} // Reduce padding with py-2
                  key={index}
                >
                  <ListItemAvatar>
                    <Avatar className="dark:bg-gray-500">
                      {name.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} className="dark:text-gray-200" />
                </ListItem>
              ))}
            </List>
          </div>

          {/* Chat Content */}
          <div className="w-3/4">
            {/* Public Chat */}
            {tab === "CHATROOM" && (
              <div className="flex flex-col h-full">
                {/* Set a fixed height for the chat messages container */}
                <div
                  className="overflow-auto flex-grow"
                  style={{ maxHeight: "70vh" }}
                >
                  <List disablePadding>
                    {publicChats.map((chat, index) => (
                      <ListItem
                        key={index}
                        className="w-full"
                        style={{
                          justifyContent:
                            chat.senderName === userData.username
                              ? "flex-end"
                              : "flex-start",
                        }}
                      >
                        <div
                          className={`flex items-start w-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ${
                            chat.senderName === userData.username
                              ? "flex-row-reverse"
                              : ""
                          }`}
                        >
                          {chat.senderName !== userData.username && (
                            <Avatar className="mr-2 dark:bg-gray-500">
                              {chat.senderName.charAt(0).toUpperCase()}
                            </Avatar>
                          )}
                          <div
                            className={`p-3 rounded-lg shadow-md ${
                              chat.senderName === userData.username
                                ? "bg-blue-100 dark:bg-blue-500"
                                : "bg-gray-100 dark:bg-gray-600"
                            }`}
                          >
                            {chat.senderName !== userData.username && (
                              <Typography
                                variant="caption"
                                className="font-bold block dark:text-gray-200"
                              >
                                {chat.senderName}
                              </Typography>
                            )}
                            <Typography
                              variant="body2"
                              className="whitespace-pre-wrap dark:text-gray-100"
                            >
                              {chat.message}
                            </Typography>
                          </div>
                        </div>
                      </ListItem>
                    ))}
                    {/* Ref for automatic scrolling */}
                    <div ref={messagesEndRef} />
                  </List>
                </div>

                <div className="mt-4 flex items-center">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter the message"
                    value={userData.message}
                    onChange={handleMessage}
                    className="dark:border-gray-500"
                    InputProps={{
                      className: "h-full rounded-l-full dark:text-gray-100 dark:bg-gray-600",
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={sendValue}
                    className="h-full rounded-r-full dark:bg-blue-600 dark:text-gray-100"
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </div>
              </div>
            )}

            {/* Private Chat */}
            {tab !== "CHATROOM" && (
              <div className="flex flex-col h-full">
                {/* Set a fixed height for the chat messages container */}
                <div
                  className="overflow-y-auto flex-grow"
                  style={{ maxHeight: "70vh" }}
                >
                  <List className="flex flex-col gap-2 p-4">
                    {[...privateChats.get(tab)].map((chat, index) => (
                      <ListItem
                        key={index}
                        className="flex"
                        style={{
                          justifyContent:
                            chat.senderName === userData.username
                              ? "flex-end"
                              : "flex-start",
                        }}
                      >
                        <div
                          className={`flex items-start w-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ${
                            chat.senderName === userData.username
                              ? "flex-row-reverse"
                              : ""
                          }`}
                        >
                          {chat.senderName !== userData.username && (
                            <Avatar className="mr-2 dark:bg-gray-500">
                              {chat.senderName.charAt(0).toUpperCase()}
                            </Avatar>
                          )}
                          <div
                            className={`p-3 rounded-lg shadow-md ${
                              chat.senderName === userData.username
                                ? "bg-blue-100 dark:bg-blue-500"
                                : "bg-gray-100 dark:bg-gray-600"
                            }`}
                          >
                            <Typography
                              variant="body2"
                              className="dark:text-gray-100"
                            >
                              {chat.message}
                            </Typography>
                          </div>
                        </div>
                      </ListItem>
                    ))}
                    {/* Ref for automatic scrolling */}
                    <div ref={messagesEndRef} />
                  </List>
                </div>

                <div className="mt-4 flex items-center">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter the message"
                    value={userData.message}
                    onChange={handleMessage}
                    className="rounded-r-none dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                    InputProps={{
                      className: "dark:text-gray-100",
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={sendPrivateValue}
                    className="rounded-l-none dark:bg-blue-600 dark:text-gray-100"
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="register">
          <Typography variant="h5" className="dark:text-gray-200">
            Please connect to start chatting
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
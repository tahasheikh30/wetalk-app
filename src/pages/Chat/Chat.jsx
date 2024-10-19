import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Chatbox from "../../components/Chatbox/Chatbox";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { AppContext } from "../../context/AppContext";

function Chat() {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if (chatData && userData) {
      setLoading(false)
    }
  },[chatData,userData])

  return (
    <div className="chat">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="chat-container">
          <LeftSidebar />
          <Chatbox />
          <RightSidebar />
        </div>
      )}
    </div>
  );
}

export default Chat;

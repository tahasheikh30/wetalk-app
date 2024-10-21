import React, { useContext, useEffect, useState } from "react";
import "./RightSidebar.css";
import assets from "../../assets/assets.js";
import { logout } from "../../config/Firebase.js";
import { AppContext } from "../../context/AppContext.jsx";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/Firebase.js";
import { toast } from "react-toastify";

function RightSidebar() {
  const {
    userData,
    chatUser,
    messages,
    setChatData,
    setChatUser,
    setMessagesId,
  } = useContext(AppContext);
  const [messageImages, setMessageImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const removeChat = async () => {
    try {
      // Ensure userData is retrieved correctly
      const userChatRef = doc(db, "chats", userData.id); // userData is now properly defined
      const chatUserChatRef = doc(db, "chats", chatUser.rId);

      // Fetch both chat documents to retrieve their full chatData arrays
      const userChatSnapshot = await getDoc(userChatRef);
      const chatUserChatSnapshot = await getDoc(chatUserChatRef);

      // Check if documents exist before proceeding
      if (!userChatSnapshot.exists() || !chatUserChatSnapshot.exists()) {
        toast.error("Chat document does not exist.");
        return;
      }

      const userChatData = userChatSnapshot.data().chatsData || [];
      const chatUserData = chatUserChatSnapshot.data().chatsData || [];

      // Filter out the specific chat data that matches the messageId for both users
      const updatedUserChatData = userChatData.filter(
        (chat) => chat.messageId !== chatUser.messageId
      );
      const updatedChatUserData = chatUserData.filter(
        (chat) => chat.messageId !== chatUser.messageId
      );

      // Update the chat documents for both users, without deleting the entire document
      await updateDoc(userChatRef, {
        chatsData: updatedUserChatData,
      });

      await updateDoc(chatUserChatRef, {
        chatsData: updatedChatUserData,
      });

      // Optionally delete the message document associated with the chat
      const messageDocRef = doc(db, "messages", chatUser.messageId);
      const messageDocSnap = await getDoc(messageDocRef);

      if (messageDocSnap.exists()) {
        await deleteDoc(messageDocRef);
      }

      // Update local state: remove the chat from chatData array
      setChatData((prevChatData) =>
        prevChatData.filter((chat) => chat.rId !== chatUser.rId)
      );

      // Clear the current chat context to remove it from the UI
      setChatUser(null);
      setMessagesId(null);
      toast.success("Chat and messages removed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove chat and messages from Firestore");
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    let tempVar = [];
    messages.forEach((message) => {
      if (message.image) {
        tempVar.push(message.image);
      }
    });
    setMessageImages(tempVar);
  }, [messages]);

  return chatUser ? (
    <div className="rs">
      <div className="rs-profile">
        <img src={chatUser.userData.avatar} alt="" />
        <h3>
          {chatUser.userData.name}{" "}
          {Date.now() - chatUser.userData.lastSeen <= 60000 ? (
            <img className="dot" src={assets.green_dot} alt="online" />
          ) : null}
        </h3>
        <p>
          {Date.now() - chatUser.userData.lastSeen <= 60000 ? (
            "Online"
          ) : (
            <span>
              Last seen:{" "}
              {new Date(chatUser.userData.lastSeen).toLocaleTimeString()}
            </span>
          )}
        </p>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          {messageImages.map((url, index) => (
            <img
              onClick={() => handleImageClick(url)} // Fixed to pass the correct `url`
              key={index}
              src={url}
              alt=""
            />
          ))}
        </div>
      </div>
      <button onClick={removeChat}>Remove chat</button>

      {/* Modal for image preview */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={selectedImage} alt="" />
        </div>
      )}
    </div>
  ) : (
    <div className="rs">
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default RightSidebar;

import React, { useContext, useEffect, useState } from "react";
import "./RightSidebar.css";
import assets from "../../assets/assets.js";
import { logout } from "../../config/Firebase.js";
import { AppContext } from "../../context/AppContext.jsx";

function RightSidebar() {
  const { chatUser, messages } = useContext(AppContext);
  const [messageImages, setMessageImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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
          {Date.now() - chatUser.userData.lastSeen <= 50000 ? (
            <img className="dot" src={assets.green_dot} alt="online" />
          ) : null}
        </h3>
        <p>
          {Date.now() - chatUser.userData.lastSeen <= 70000 ? (
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
      <button onClick={() => logout()}>Logout</button>

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

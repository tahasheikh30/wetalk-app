import React from "react";
import "./Chatbox.css";
import assets from "../../assets/assets.js";

function Chatbox() {
  return (
    <div className="chatbox">
      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>
          Elijah Mikaelson <img className="dot" src={assets.green_dot} alt="" />
        </p>
        <img src={assets.help_icon} className="help" alt="" />
      </div>

      <div className="chat-message">
      <div className="s-msg">
          <p className="message">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
            perspiciatis?
          </p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 pm</p>
          </div>
        </div>
        <div className="s-msg">
          <img className="message-image" src={assets.pic1} alt="" />
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 pm</p>
          </div>
        </div>
        <div className="r-msg">
          <p className="message">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
            perspiciatis?
          </p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 pm</p>
          </div>
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder="Type a message..." />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
    </div>
  );
}

export default Chatbox;

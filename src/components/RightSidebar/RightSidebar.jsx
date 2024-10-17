import React from 'react'
import "./RightSidebar.css"
import assets from "../../assets/assets.js"
import { logout } from '../../config/Firebase.js'

function RightSidebar() {
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={assets.profile_img} alt="" />
        <h3>Elijah Mikaelson <img src={assets.green_dot} className='dot' alt="" /></h3>
        <p>Hey there, I am using WeTalk </p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  )
}

export default RightSidebar
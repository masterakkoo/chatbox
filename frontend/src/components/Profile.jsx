import React from 'react'
import "../css/profile.css"
import { Avatar, Button } from '@chakra-ui/react';
import edit from "../images/edit.png"
import { json, useNavigate } from "react-router-dom";
import back_btn from "../images/left-arrow.png"
const Profile = () => {
    const info = JSON.parse(localStorage.getItem('userinfo'));
    const navigate = useNavigate();
    return (
        <>
            <div className='main-profile'>
                <div class="card-container">
                    {/* <span class="pro">PRO</span> */}
                    <div className='round'>
                        {/* <Avatar name={info.fname+" " + info.lname} src={info.pro_pic} /> */}
                        <img className="pro-pic" src={info.pro_pic} alt="user" />

                    </div>
                    {/* <div class="buttons">
                        <button class="primary">
                            Message
                        </button>
                        <button class="primary ghost">
                            Add
                        </button>
                    </div> */}
                    <img className="edit-btn edit" src={edit} onClick={() => { navigate("/edit") }} />
                    <div class="skills">
                        <h3 className='name'>{info.fname}  {info.lname} </h3>
                        <p className='bio'>User interface designer and <br /> front-end developer</p>
                    </div>
                </div>
                <p className='back-btn bg-white' onClick={() => navigate("/chats")}><img src={back_btn} /></p>
                <footer>
                    {/* <button className='btn'>BACK</button> */}
                </footer>
            </div>
        </>
    )
}

export default Profile
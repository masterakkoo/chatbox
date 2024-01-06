
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import "../css/chat.css"
import { json, useNavigate } from "react-router-dom";
import SideDrawer from './SideDrawer';
import FriendCard from './FriendCard';
import MyChats from './Mychat';
import { Modal } from '@chakra-ui/react';
import GroupModal from './GroupModal';
import Messages from './Messages';
import back_btn from "../images/left-arrow.png"
const MobileChat = () => {
    const [fetchagain, setFetchAgain] = useState(false);
    const navigate = useNavigate();

    const info = JSON.parse(localStorage.getItem('userinfo'));
    return (

        <>
            {/* <div style={{ position: "relative", height: "95vh" }}> */}
            <div className='mob-chat' >
                <p className='back-btn bg-white' onClick={() => navigate("/chats")}><img src={back_btn} /></p>
                <Messages fetchAgain={fetchagain} setFetchAgain={setFetchAgain} />

            </div>
            {/* </div> */}
        </>
    )
}

export default MobileChat
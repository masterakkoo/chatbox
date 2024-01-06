import React from 'react'
import "../css/agency.css"
const pro = "https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { ChatState } from "./ChatProvider";
function FriendCard(p) {
    const { selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats, } = ChatState();
    const navigate = useNavigate();
    return (
        <>
            <div className='profile' >
                {/* <div style={{ margin: "auto", width: "20%" }}> */}
                <Avatar name={p.name} src={p.pro_pic}  />
                {/* </div> */}
                <div className='profile-info'>
                    <p style={{ fontWeight: "1000" }}>{p.name}</p>
                    <p>{p.lastMsg}</p>
                </div>
            </div>
        </>
    )
}

export default FriendCard;
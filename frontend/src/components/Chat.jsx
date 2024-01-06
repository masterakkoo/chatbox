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
import { ChatState } from './ChatProvider';
import { Avatar } from '@chakra-ui/react';
const Chat = () => {


    const [fetchAgain, setFetchAgain] = useState(false);
    const navigate = useNavigate();

    const info = JSON.parse(localStorage.getItem('userinfo'));

    const { selectedChat, setSelectedChat, user, notification, setNotification } =
        ChatState();
    // console.log(notification)
    const getSender = (loggedUser, users) => {
        // console.log(loggedUser);
        // console.log(users);
        var nn = users[0]._id === loggedUser ? users[1].fname + " " + users[1].lname : users[0].fname + " " + users[0].lname;

        return (nn);
    };
    const HANDLENOTIFICATION = (val) => {
        setSelectedChat(val.chat);

        const w = window.innerWidth;
        if (w <= 900)
            navigate("/s_chats")
        // console.log(val)
    }
    return (
        <>
            <div className='home-chat'>
                <header className='head1'>
                    <nav id="main-navbar" class="navbar navbar1 navbar-expand-lg navbar-light  fixed-top">

                        <div class="container-fluid">

                            <button
                                class="navbar-toggler"
                                type="button"
                                data-mdb-toggle="collapse"
                                data-mdb-target="#sidebarMenu"
                                aria-controls="sidebarMenu"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                {/* <i class="fas fa-bars" onClick={onOpen}>

                                </i> */}
                            </button>


                            <a class="navbar-brand" href="#">
                                <SideDrawer />
                            </a>

                            {/* <GroupModal /> */}

                            <ul class="navbar-nav ms-auto d-flex flex-row">







                                <li class="nav-item dropdown">
                                    <a
                                        class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                                        href="#"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        data-mdb-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <Avatar name={info.fname + " " + info.lname} src={info.pro_pic} size='sm' />
                                    </a>
                                    <ul
                                        class="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="navbarDropdownMenuLink"
                                    >
                                        <li onClick={() => { navigate("/profile") }}>
                                            <a class="dropdown-item" href="#">My profile</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onClick={() => {
                                                localStorage.removeItem("userinfo");
                                                navigate("/login");
                                            }} >Logout</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                    </nav>

                </header>
                <div className='main-chat'>
                    <div className='chats'>
                        {(selectedChat) ? <Messages fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> : <section
                            style={{
                                display: "flex", alignItems: "center", justifyContent: "center", height: "100%",
                                width: "100%"
                            }} className='text-white'><p>Click on a friend to start chating</p></section>}


                    </div>
                    <div className='friends'>
                        <MyChats
                            fetchAgain={fetchAgain}
                        />
                    </div>
                    <div className='sidemenu'>
                        <GroupModal />
                    </div>
                </div>

            </div>
            {/* <Modal /> */}
        </>
    )
}

export default Chat
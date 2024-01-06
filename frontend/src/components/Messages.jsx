import React, { useEffect, useState } from 'react'
import send from "../images/send-icon.png"
import grp_icon from "../images/add-group.png"
import { Avatar, AvatarBadge, AvatarGroup, useToast } from '@chakra-ui/react'
import "../css/chat.css"
import { Dna, Triangle } from 'react-loader-spinner'
import { ChatState } from "./ChatProvider";
import UpdateGroup from './UpdateGroup'
import UpdateFriend from './UpdateFriend'
import { useNavigate } from 'react-router-dom'
import ScrollableFeed from 'react-scrollable-feed'
import "../css/messages.css"
import ChatBox from './ChatBox'
import io from "socket.io-client";
const Messages = ({ fetchAgain, setFetchAgain }) => {
    var socket;
    const toast = useToast();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setsending] = useState(false);
    const [msg, setMsg] = useState("");
    const [userTyping, setUserTyping] = useState(false);
    const [typing, setTyping] = useState(false);
    const { selectedChat, setSelectedChat, user, notification, setNotification } =
        ChatState();
    var selectedChatCompare;
    const [socketconnect, setsocketconnect] = useState(false);
    if (selectedChat)
        localStorage.setItem("selected", JSON.stringify(selectedChat));
    const selectChat = JSON.parse(localStorage.getItem('selected'));
    const info = JSON.parse(localStorage.getItem('userinfo'));

    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;

    // if (!selectedChat) navigate("/chats")
    const SEND = async (e) => {
        e.preventDefault();

        if (!msg) return;

        try {
            setsending(true);
            const rest = await fetch(`${port}/message/`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + info.token,
                    "content-type": "application/json"
                },
                body: JSON.stringify({ msg, chatId: selectChat._id })
            })
            const data = await rest.json();
            socket.emit("send", data);
            setMessages([...messages, data]);
            setMsg("");
            setsending(false);

        }
        catch (err) {
            toast({
                title: "Some error occured..!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            // console.log(err);

        }

    }
    const FETCH = async () => {

        if (!selectChat) return;
        setLoading(true);
        try {
            const rest = await fetch(`${port}/message/${selectChat._id}`, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + info.token,
                    "content-type": "application/json"
                },
            })
            const data = await rest.json();
            // console.log(data);
            setMessages(data);
            socket.emit("room", selectChat._id)
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    const getImage = (items) => {

        if (info._id === items[0]._id)
            return items[1].profile_pic;
        else
            return items[0].profile_pic;

    }
    const getName = (items) => {

        if (info._id === items[0]._id)
            return (`${items[1].fname} ${items[1].lname}`);
        else
            return items[0].fname + " " + items[0].lname;

    }
    // console.log(selectedChat);
    useEffect(() => {
        socket = io(port);
        socket.emit('connectSocket', info);
        socket.on("connected", () => setsocketconnect(true));
        socket.on("user typing", () => setUserTyping(true))
        socket.on("end typing", () => setUserTyping(false))
    })
    useEffect(() => { FETCH(); selectedChatCompare = selectedChat; }, [selectedChat]);
    useEffect(() => {
        socket.on("message recived", (messgesRecieved) => {

            setMessages([...messages, messgesRecieved])


        })
    });
    const TYPING = () => {
        if (!socketconnect) return;

        if (!typing) {
            // console.log("typing")
            setTyping(true);
            socket.emit("user typing", selectChat._id);

        }
        var lt = new Date().getTime();
        var tl = 3000;
        setTimeout(() => {
            var tn = new Date().getTime();
            var diff = tn - lt;
            if (diff >= tl && userTyping) {
                socket.emit("end typing", selectChat._id);
                setTyping(false);
            }
        }, tl);
    };
    return (
        <>



            <div className="pro1  bg-[#252b3a]" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                    <Avatar bg="black" name={(selectChat.group) ? selectChat.cname : getName(selectChat.users)} src={(selectChat.group) ? "" : getImage(selectChat.users)} />
                    <p className='m-3 text-white ' >{(selectChat.group) ? selectChat.cname : getName(selectChat.users)}</p>
                </div>
                {(selectChat.group) ? <UpdateGroup

                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain} /> : <UpdateFriend fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain} />}
            </div>
            <div className='chat-messages ' >


                {(loading) ? <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Dna /></div> : <ChatBox messages={messages} />
                }

            </div>

            <div className='inputside' style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* {(userTyping) ? <p>loading...</p> : ""} */}
                <input type='text' placeholder='Enter your text' name='msg' value={msg} onChange={(e) => { setMsg(e.target.value); TYPING(); }} />
                {(sending) ? <Triangle
                    height="40"
                    width="40"
                    color="#4fa94d"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                /> : <button className='send-btn text-white' onClick={SEND}><img style={{ objectFit: "contain" }}
                    src={send} /></button>}

            </div>
        </>
    )
}

export default Messages
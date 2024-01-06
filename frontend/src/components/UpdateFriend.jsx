import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react';
import { ChatState } from './ChatProvider';
import { useNavigate } from 'react-router-dom';
const UpdateFriend = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
    const naviagte = useNavigate();
    const { selectedChat, setSelectedChat, notification, setNotification } =
        ChatState();
    const info = JSON.parse(localStorage.getItem('userinfo'));
    const selectChat = JSON.parse(localStorage.getItem('selected'));
    if (!selectChat)
        setSelectedChat(selectChat)
    const friend = (selectChat.users[0]._id === info._id) ? selectChat.users[1] : selectChat.users[0];

    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const DELETE = async (_id) => {
        if (selectedChat.group && selectedChat.admin._id !== info._id) {
            toast({
                title: "Only admins can remove!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true);
            const rest = await fetch(`${port}/chat/delete`, {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + info.token,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id
                })
            })
            const data = await rest.json();
            // console.log(data);
            setLoading(false);
            setFetchAgain(!fetchAgain);
            setSelectedChat();
            naviagte("/chats")

        }
        catch (err) {
            toast({
                title: "Some error occured..!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            console.log(err)
            setLoading(false);
        }
    }
    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <button className='btn btn-primary bg-[#0e262d] m-2' onClick={() => DELETE(selectedChat._id)}> Remove</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    Profile
                </button>
            </div>

            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content bg-[#0e262d]">
                        <div class="modal-header">
                            <h3 class="modal-title text-[#595956]" id="exampleModalLongTitle">Profile</h3>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body ">
                            <div class="card-container" style={{ margin: "auto", height: "50%" }}>
                                {/* <span class="pro">PRO</span> */}
                                <div className='round' style={{ height: "80%", width: "80%" }}>
                                    <img className="pro-pic" style={{ height: "80%", width: "100%" }} src={friend.profile_pic} alt="user" />

                                </div>

                                <div class="skills">
                                    <p className=' font-bold m-2'>{friend.fname}  {friend.lname} </p>
                                    <p className='bio m-2'>{friend.email}</p>
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer">

                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default UpdateFriend
import React, { useState } from 'react'
import { ChatState } from './ChatProvider';
import GroupSearch from './GroupSearch';
import { position, useToast } from '@chakra-ui/react';
import { Dna } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';

const UpdateGroup = ({ fetchMessages, fetchAgain, setFetchAgain }) => {

    const navigate = useNavigate();
    const { selectedChat, setSelectedChat, notification, setNotification } =
        ChatState();
    const toast = useToast();
    const [users, setusers] = useState([]);
    const [search, setsearch] = useState("");
    const [res, setres] = useState([]);
    const [loading, setLoading] = useState(false)
    const info = JSON.parse(localStorage.getItem('userinfo'));
    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;

    // console.log(selectedChat);

    const addfriend = async (user) => {
        const _id = user._id;
        var c = 0;
        selectedChat.users.map((val) => {
            if (val._id == user._id) {
                toast({
                    title: "User already in group!",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
                c = 1;
                return;
            }

        })
        if (c == 1) return;


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
            const rest = await fetch(`${port}/chat/addMem`, {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + info.token,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    userId: user._id,
                })
            })
            const data = await rest.json();
            console.log(data);
            user._id === info._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        }
        catch (err) {
            console.log(err);

        }
    }

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
            console.log(data);
            setLoading(false);
            setFetchAgain(!fetchAgain);
            setSelectedChat();
            navigate("/chats")
        }
        catch {
            toast({
                title: "Some error occured..!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }
    const REMOVE = async (user1) => {
        if (selectedChat.admin._id !== info._id && user1._id !== info._id) {
            toast({
                title: "Only admins can remove someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true);
            const rest = await fetch(`${port}/chat/removeMem`, {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + info.token,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    userId: user1._id,
                })
            })
            const data = await rest.json();
            console.log(data);
            user1._id === info._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            // fetchMessages();
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
        // setGroupChatName("");
    }



    const Handle = async (val) => {
        setLoading(true);
        // e.preventDefault();
        if (!val) {
            toast({
                title: 'Search field should not be empty...',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
            setLoading(false)
            return;
        }
        try {
            const rest = await fetch(`${port}/user?search=${val}`, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + info.token,
                    "content-type": "application/json"
                }
            })
            // console.log(rest);
            const result = await rest.json();
            console.log(result)
            setres(result);

            setLoading(false)
            // console.log(res)

        }
        catch (err) {
            console.log(err)
            toast({
                title: 'Some error occurred...',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
            setLoading(false)
        }
    }
    const CHECK = () => {
        if (!selectedChat) navigate("./chats")
    }
    return (
        <>
            <a data-toggle="modal" href="#myModal" class=" bg-[#0e262d;]  btn btn-primary" >
                <p>INFO</p></a>
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content bg-[#0e262d]">
                        <div class="modal-header">
                            <h4 class="modal-title text-[white]">Create Group</h4>
                            <button type="button" class="close" data-dismiss="modal">×</button>
                        </div><div class="container"></div>
                        <div class="modal-body">
                            {(!selectedChat) ? CHECK : ""}
                            {
                                selectedChat.users.map((val, index) => {
                                    if (val._id != info._id) {
                                        return <div className=' rounded-lg p-2 m-2 search-card text-[#595956]' style={{ backgroundColor: "white", display: "flex", alignItems: "center", position: 'relative' }}>
                                            <img className='w-12 h-12' src={val.profile_pic} ></img>
                                            <div className='ml-2'>
                                                <p>{val.fname} {val.lname}</p>
                                            </div>
                                            <button className='p-2 bg-[#252b3a] text-[#9d9d9d] rounded-lg ' style={{ position: "absolute", right: '10px' }} onClick={() => REMOVE(val)}>Remove</button>
                                        </div>;
                                    }
                                    return null;
                                })
                            }


                        </div>
                        <div class="modal-footer">
                            <button><a style={{ backgroundColor: "#0e262d" }} className='bg-[#0e262d] btn btn-primary'
                                data-toggle="modal" href="#myModal2" >Add Members</a></button>
                            {/* <a href="#" data-dismiss="modal" class="btn">Close</a> */}
                            <button type="button" class="bg-[#0e262d] btn btn-primary" data-dismiss="modal" onClick={() => DELETE(selectedChat._id)} >{(loading) ? "Removing" : "Delete Chat"}</button>


                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" id="myModal2" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content bg-[#5d939e]">
                        <div class="modal-header" style={{ position: "relative" }}>

                            <input style={{ backgroundColor: "#5B6376", position: "absolute", top: "5px", left: "5px" }} className='m-1' placeholder="Add Members" type='text' name='search' value={search}
                                onChange={(e) => { setsearch(e.target.value); Handle(e.target.value) }} />
                            <h4 class="modal-title text-[white] "></h4>

                            <button type="button" class="close" data-dismiss="modal">×</button>
                        </div><div class="container"></div>
                        <div class="modal-body" style={{ position: "relative" }}>

                            {(loading) ? <div style={{ display: "flex", justifyContent: "center" }}><Dna

                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            /></div> :
                                <div>
                                    {(res.length != 0) ? res.map(val => (
                                        <GroupSearch
                                            fname={val.fname}
                                            lname={val.lname}
                                            img={val.profile_pic}
                                            email={val.email}
                                            _id={val._id}
                                            ADDFRIEND={() => addfriend(val)}
                                        />
                                    ))

                                        : <p className='text-[#9d9d9d]'>No user found</p>}
                                </div>}

                        </div>

                        <div class="modal-footer">

                            <a href="#" data-dismiss="modal" class=" bg-[#0e262d] btn btn-primary">Close</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateGroup
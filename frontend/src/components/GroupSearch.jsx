import { background } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { ChatState } from "./ChatProvider";

const GroupSearch = ({ fname, lname, img, email, _id, ADDFRIEND }) => {
    const [add, setadd] = useState(false);
    const toast = useToast();

    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;
    const info = JSON.parse(localStorage.getItem('userinfo'));

    const { selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats, } = ChatState();


    const ADD = async () => {
        setadd(true);
        try {
            const rest = await fetch(`${port}/chat`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + info.token,
                    "content-type": "application/json"
                },
                body: JSON.stringify({ id: _id })
            })
            const data = await rest.json();
            console.log(data)
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setadd(false)
            // console.log(chats)

        }
        catch (err) {
            toast({
                title: 'Some error occurred...',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
            console.log(err)
            setadd(false)
        }

    }

    const myArray = email.split("@");
    return (
        <div className=' rounded-lg p-2 m-2 search-card text-[#595956]' style={{ backgroundColor: "white", display: "flex", alignItems: "center", position: 'relative' }}>
            <img className='w-12 h-12' src={img} ></img>
            <div className='ml-2'>
                <p className='font-bold text-[#9d9d9d]'>{myArray[0]}</p>
                <p>{fname} {lname}</p>
            </div>
            <button className='p-2 bg-[#252b3a] text-[#9d9d9d] rounded-lg ' style={{ position: "absolute", right: '10px' }} onClick={() => ADDFRIEND()}>Add</button>
        </div>
    )
}

export default GroupSearch
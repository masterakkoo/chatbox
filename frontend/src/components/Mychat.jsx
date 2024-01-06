import React, { useState, useEffect } from 'react'
import { ChatState } from "./ChatProvider";
import { useToast } from '@chakra-ui/react'
import FriendCard from './FriendCard';
import { Dna } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
const pro = "https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg";
const Mychat = ({ fetchAgain }) => {
    const navigate = useNavigate();
    const {
        setSelectedChat,
        chats,
        setChats, } = ChatState();
    const toast = useToast();
    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;
    const [loggedUser, setLoggedUser] = useState();
    const [loading, setLoading] = useState(true);
    const info = JSON.parse(localStorage.getItem('userinfo'));

    const CHECKWIDTH = () => {
        const w = window.innerWidth;
        if (w <= 900)
            navigate("/s_chats")

    }

    const getImage = (items) => {
        // console.log(items)

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

    const ChatS = async () => {
        // setLoading(true)
        try {
            const msg = await fetch(`${port}/chat/`, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + info.token,
                }
            })
            const res = await msg.json();
            // console.log(res)
            setChats(res);
            setLoading(false)
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
            setLoading(false)
        }
    }
    // location.reload()
    useEffect(() => {
        setLoggedUser(info);
        ChatS();
        // eslint-disable-next-line
    }, [fetchAgain]);


    return (
        <>
            {(!loading) ?
                (chats.length != 0) ?
                    chats.map(val => (
                        <div onClick={() => { setSelectedChat(val); CHECKWIDTH() }}>
                            <FriendCard
                                pro_pic={(val.group) ? pro : getImage(val.users)}
                                name={(val.group) ? val.cname : getName(val.users)}
                                lastMsg={(val.lastMsg) ? val.lastMsg : "Welcome"}
                            />
                        </div>
                    ))
                    : <p style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} className='mt-5 text-[white]'>You have no friends to show</p> :
                <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Dna
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                </div>
            }
        </>
    )
}

export default Mychat
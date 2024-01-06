import React, { useState } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
// import { useDisclosure } from '@chakra-ui/react'
import "../css/drawer.css"
import Searchcard from './Searchcard'
import { ChatState } from "./ChatProvider";
const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [placement, setPlacement] = React.useState('left');
    const toast = useToast()
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [res, setres] = useState([]);
    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;
    const info = JSON.parse(localStorage.getItem('userinfo'));
    const Submit = async (e) => {
        console.log("Bearer " + info.token)
        setLoading(true);
        e.preventDefault();
        if (!search) {
            toast({
                title: 'Search field should not be empty...',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
            return;
        }
        try {
            const rest = await fetch(`${port}/user?search=${search}`, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + info.token,
                    "content-type": "application/json"
                }
            })
            console.log(rest);
            setres(await rest.json());
            setLoading(false)
            console.log(res)

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
            setLoading(false)
        }
    }

    return (
        <>
            <div>
                <Button colorScheme='#0e262d' onClick={onOpen}>
                    <div class="group">
                        <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                        <input autoComplete='off' placeholder="Search" type="search" class="input1" />
                    </div>
                </Button>
                <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent style={{ backgroundColor: "#252b3a" }}>
                        <DrawerHeader borderBottomWidth='1px' style={{ display: "flex" }}>
                            <div class="group">
                                <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                                <input placeholder="Search" type="search" class="input1" name='search' value={search}
                                    onChange={(e) => { setSearch(e.target.value); }} />
                            </div>
                            <button className='ml-4 w-20 bg-[#0e262d] text-[#9d9d9d] rounded-lg' onClick={Submit}>Go</button>
                        </DrawerHeader>
                        {(loading) ? <Skeleton className='h-14 mt-2 mb-2' style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }} baseColor="#202020" highlightColor="#444" count={5} /> :
                            <DrawerBody>
                                {(res.length != 0) ? res.map(val => (
                                    <Searchcard

                                        fname={val.fname}
                                        lname={val.lname}
                                        img={val.profile_pic}
                                        email={val.email}
                                        _id={val._id}
                                    />
                                ))

                                    : <p className='text-[#9d9d9d]'>No user found</p>}
                            </DrawerBody>}
                    </DrawerContent>
                </Drawer>
            </div >
        </>
    )
}

export default SideDrawer
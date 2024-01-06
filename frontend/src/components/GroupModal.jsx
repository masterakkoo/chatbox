import React, { useState } from 'react'
import grp_icon from "../images/add-group.png"
import { useToast } from '@chakra-ui/react';
import { Dna } from 'react-loader-spinner'
import GroupSearch from './GroupSearch';
import SelectedMember from './SelectedMember';
const GroupModal = ({ change }) => {

    const [name, setname] = useState("");
    const [search, setsearch] = useState("");
    const [users, setusers] = useState([]);
    const [add, setadd] = useState(false);
    const [res, setres] = useState([]);
    const [loading, setLoading] = useState(false)
    const [mem, setmem] = useState(false);
    // const [userids, setuserids] = useState([]);
    const toast = useToast();
    const [createing, setCreating] = useState(false);
    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;
    const info = JSON.parse(localStorage.getItem('userinfo'));
    const addfriend = (val) => {
        if (users.find((c) => c._id === val._id)) {
            // 
            toast({
                title: 'Already Selected...',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'top',
            })

            return;
        }
        // console.log(users);
        setusers([...users, val]);
        // setuserids([...userids, val._id]);
        // console.log(userids);
    }
    const CREATE = async (users) => {
        setCreating(true)
        // console.log(users._id)
        if (!users || !name) {
            toast({
                title: 'No Members are selected...Or Name is not defined',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
            setCreating(false);
            return;

        }
        try {
            // console.log(users)
            const user = JSON.stringify(users.map((u) => u._id));
            // console.log(JSON.stringify(user));
            // console.log({ users, name: JSON.stringify(name) });
            const rest = await fetch(`${port}/chat/groupchat`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + info.token,
                    "content-type": "application/json"
                },
                body: JSON.stringify({ users: user, name })
            })


            const ans = await rest.json();
            toast({
                title: 'Group Created Close the box and refresh page...',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
            console.log(ans);
            setCreating(false);

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

            setCreating(false);
        }
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

    return (
        <>
            <a data-toggle="modal" href="#myModal1" class=" bg-[#0e262d;] mt-4 btn " onClick={change}>
                <img src={grp_icon} /></a>

            <div class="modal" id="myModal1">
                <div class="modal-dialog">
                    <div class="modal-content bg-[#0e262d]">
                        <div class="modal-header">
                            <h4 class="modal-title text-[white]">Create Group</h4>
                            <button type="button" class="close" data-dismiss="modal">×</button>
                        </div><div class="container"></div>
                        <div class="modal-body">
                            <div className='text-[#e3d8d8] ' style={{ display: "flex", justifyContent: "center" }}>

                                <input style={{ backgroundColor: "#5B6376" }} className='m-2 p-1' placeholder="Group Name" type='text' name='name' value={name}
                                    onChange={(e) => setname(e.target.value)} />
                                <input style={{ backgroundColor: "#5B6376" }} className='m-2 p-1' placeholder="Add Members" type='text' name='search' value={search}
                                    onChange={(e) => { setsearch(e.target.value); Handle(e.target.value) }} />
                            </div>
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
                            <button><a style={{ backgroundColor: "#0e262d" }} className='bg-[#0e262d] btn btn-primary'
                                data-toggle="modal" href="#myModal23" >Selected Members</a></button>
                            {/* <a href="#" data-dismiss="modal" class="btn">Close</a> */}
                            <button type="button" class="bg-[#0e262d] btn btn-primary" data-dismiss="modal">Close</button>
                            <button type="button" class=" btn btn-primary" onClick={() => CREATE(users)} > {(createing) ? "Creating" : "Create"}</button>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" id="myModal23" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content bg-[#5d939e]">
                        <div class="modal-header">
                            <h4 class="modal-title text-[white] ">Selected Members</h4>
                            <button type="button" class="close" data-dismiss="modal">×</button>
                        </div><div class="container"></div>
                        <div class="modal-body">
                            {(users.length != 0) ? users.map(val => (
                                <div className=' rounded-lg p-2 m-2 search-card text-[#595956]' style={{ backgroundColor: "white", display: "flex", alignItems: "center", position: 'relative' }}>
                                    <img className='w-12 h-12' src={val.profile_pic} ></img>
                                    <div className='ml-2'>
                                        <p>{val.fname} {val.lname}</p>
                                    </div>

                                </div>
                            ))

                                : <p className='text-[#9d9d9d]'>No user found</p>}
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

export default GroupModal
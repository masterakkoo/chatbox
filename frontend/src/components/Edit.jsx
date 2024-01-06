import React, { useState } from 'react'
import "../css/register.css"
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { json, useNavigate } from "react-router-dom";
const Edit = () => {
    const toast = useToast();
    const info = JSON.parse(localStorage.getItem('userinfo'));
    const navigate = useNavigate();
    const [user, setuser] = useState({ fname: info.fname, lname: info.lname, pro_pic: info.pro_pic });
    console.log(info)
    const [loading, setLoading] = useState(false);
    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;

    const Handle = (e) => {
        console.log(e);
        const nam = e.target.name;
        const val = e.target.value;
        console.log(nam);
        if (nam == "pro_pic") {
            const pic = event.target.files[0];
            setLoading(true)
            if (pic == undefined) {
                toast({
                    title: 'Please select infoan image.',
                    // description: "We've created your account for you.",
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom',
                })
                return;
            }
            if (pic.type === "image/jpeg" || pic.type === "image/png") {
                const data = new FormData();
                data.append("file", pic);
                data.append("upload_preset", "chatApp");
                data.append("cloud_name", "dzkllu2tb");
                fetch("https://api.cloudinary.com/v1_1/dzkllu2tb/image/upload", {
                    method: 'post',
                    body: data
                }).then((res) => res.json())
                    .then((data) => {
                        setuser({ ...user, [nam]: data.url.toString() });
                        console.log(data.url.toString());
                        setLoading(false);
                    }).catch((err) => {
                        console.log(err);
                        setLoading(false);
                    })
            }
            else {
                toast({
                    title: 'Please select an image.',
                    // description: "We've created your account for you.",
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom',
                })
                setLoading(false);
            }
        } else
            setuser({ ...user, [nam]: val })
        console.log(user)

    }

    const SUBMIT = async (e) => {
        console.log(e);
        const { fname, lname, pro_pic } = user;
        e.preventDefault();
        if (!fname || !lname) {
            console.log("fill")
            toast({
                title: 'Please fill all field.',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'bottom',
            })
        }
        else {
            const email = info.email;
            const res = await fetch(`${port}/user/edit`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ fname, lname, email, profile_pic: pro_pic })
            })
            const rest = await res.json();
            if (rest.success == true) {
                toast({
                    title: 'Changes are made Succesfull',
                    // description: "We've created your account for you.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom',
                })
                const userinfo = {
                    fname: rest.fname,
                    lname: rest.lname,
                    email: rest.email,
                    token: rest.token,
                    pro_pic: rest.profile_pic
                }
                localStorage.setItem("userinfo", JSON.stringify(userinfo))
                setLoading(false);
                navigate("/profile")
            }
        }
    }

    return (
        <>
            <div className='main-register'>

                <div className='register'>
                    <h1 style={{ color: "white", fontSize: "1.8rem", margin: "10px 10px" }}>Edit Details</h1>

                    <form  >

                        <div className='name'>


                            <input className='input' type="text" id="fname" name="fname" placeholder='first name' value={user.fname} onChange={Handle} />

                            <input className='input' type="text" id="lname" name="lname" placeholder='last name' value={user.lname} onChange={Handle} />
                        </div>



                        <input className='input' type='file' name="pro_pic" placeholder='Profile Picture' onChange={Handle}
                            accept="image/*" />



                        <div className='submit'>
                            {/* <input className='input' type="submit" value="Submit" /> */}
                            <Button className='input' bg={"#252b3a"} onClick={SUBMIT} isLoading={loading} >Submit</Button>
                        </div>

                        {/* <li><NavLink to="/login">Already a User?</NavLink></li> */}


                    </form>
                </div >
               
            </div >
        </>
    )
}

export default Edit
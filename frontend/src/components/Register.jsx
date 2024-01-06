import React, { useState } from 'react'
import "../css/register.css"
import reg from "../images/register.png"
import { useToast } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Register = () => {


    const port = process.env.NODE_ENV === 'development' ?
        import.meta.env.VITE_DEV_MODE : import.meta.env.VITE_PRO_MODE;

    const toast = useToast()
    const [user, setuser] = useState({ fname: "", lname: "", email: "", password: "", con_password: "", pro_pic: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
                    title: 'Please select an image.',
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
        console.log(e)
        e.preventDefault();
        console.log(user)
        const { fname, lname, email, password, con_password, pro_pic } = user;
        if (!fname || !lname || !email || !password || !con_password) {
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

        if (password === con_password) {
            const res = await fetch(`${port}/user/register`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ fname, lname, email, password, profile_pic: pro_pic })
            })
            const rest = await res.json()
            console.log(rest)
            if (rest.found == true && rest.success == true) {
                toast({
                    title: 'User already exist...',
                    // description: "We've created your account for you.",
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom',
                })
            }
            else if (rest.success == true) {
                toast({
                    title: 'Resgistration Succesfull',
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
                    pro_pic: rest.profile_pic,
                    _id: rest._id,
                }
                localStorage.setItem("userinfo", JSON.stringify(userinfo))
                setLoading(false)
                navigate("/chats")
                setuser({ fname: "", lname: "", email: "", password: "", con_password: "", pro_pic: "" });
                // navigate("/login")
            }
            else {
                window.alert("some problem occured try again after some time")
            }




        }
        else {
            setuser({ ...user, password: "", con_password: "" });
            window.alert("passwords are not matching")
        }

    }


    return (
        <>
            <div className='main-register'>

                <div className='register'>
                    <h1 style={{ color: "white", fontSize: "1.8rem", margin: "10px 10px" }}>User Registration</h1>

                    <form  >

                        <div className='name'>


                            <input autocomplete="off" className='input' type="text" id="fname" name="fname" placeholder='first name' value={user.fname} onChange={Handle} />

                            <input autocomplete="off" className='input' type="text" id="lname" name="lname" placeholder='last name' value={user.lname} onChange={Handle} />
                        </div>
                        <input autocomplete="off" className='input' type="email" name="email" id="email" placeholder='Email' onChange={Handle} value={user.email} />

                        <input className='input' type='password' name="password" placeholder='password' onChange={Handle} value={user.password} />

                        <input autocomplete="off" className="input" type='password' name="con_password" placeholder='confirm password' onChange={Handle} value={user.con_password} />
                        <input autocomplete="off" className='input' type='file' name="pro_pic" placeholder='Profile Picture' onChange={Handle}
                            accept="image/*" />



                        <div className='submit'>
                            {/* <input className='input' type="submit" value="Submit" /> */}
                            <Button className='input' bg={"#252b3a"} onClick={SUBMIT} isLoading={loading} >Submit</Button>
                            <button className='btn' bg={"#252b3a"} onClick={() => { navigate("/login") }}>Login</button>
                        </div>

                        {/* <li><NavLink to="/login">Already a User?</NavLink></li> */}


                    </form>
                </div >
            </div >
        </>
    )
}

export default Register
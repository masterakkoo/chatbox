import React from 'react'
import "../css/navbar.css"
import { useNavigate } from "react-router-dom"
function Navbar() {
    const navigate = useNavigate();
    return (
        <>
            <div className='nav-bar'>
                <div className='brand-name'>
                    <p> <span className='span1'> Chatter </span><span className='span2'>Box</span></p>
                </div>
                <div className='nav-right'>
                    <ul>
                        <li onClick={() => { navigate("/login") }} >Login</li>
                        <li onClick={() => { navigate("/register") }} >Sign Up</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar
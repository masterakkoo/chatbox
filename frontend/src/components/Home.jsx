import React from 'react'
import "../css/Home.css"
import Navbar from './Navbar'
import dot from "../images/dots.png"
import img1 from "../images/img1.png"
import img2 from "../images/img2.png"
function Home() {
    return (
        <>
            <div className='home-main'>
                <Navbar />
                <div className='home-main-1'>
                    <div className='home-left'>
                        <div className='tagline'> <p>Have Your Best Chat</p> </div>
                        <div className='about'>
                            <p>Aiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudan.</p>
                        </div>
                        <div className='get-start'>
                            <p>Get Started</p>
                        </div>
                    </div>
                    <div className='home-right'>
                        <img className='dot1' src={dot} />
                        <img className='img1' src={img1} />
                        <img className='img2' src={img2} />
                        <img className='dot2' src={dot} />
                        <div className='msg1'>
                            <div className='msg11'>
                                <img src={img2} style={{ width: "45px", height: "50px", borderRadius: "50% 50%" }} />

                                <p>I'm doing fine😊</p>
                            </div>



                        </div>
                        <div className='msg2'>
                            <div className='msg21'>
                                <img src={img1} style={{ width: "45px", height: "50px", borderRadius: "50% 50%" }} />
                                <p>Hey! How you doing ?</p>
                            </div>
                            <div className='msg21'>
                                <img src={img1} style={{ width: "45px", height: "50px", borderRadius: "50% 50%" }} />

                                <p>Are you free?</p>
                            </div>



                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home
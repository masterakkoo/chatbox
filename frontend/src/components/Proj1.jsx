import { Container } from '@chakra-ui/react';
import React from 'react'
import "../css/proj.css"

const Proj1 = () => {
    return (
        <>
            <div className=' flex  bg-[blue] ' style={{ width: "100%", height: "100vh", justifyContent: "center", alignItems: "center" }}>
                <div className=' flex bg-[white] left-div w-6/12 h-4/5' style={{ justifyContent: "center", alignItems: "center" }}>
                    <div className=' mobile w-3/12 h-3/5 bg-[white]' >

                    </div>
                </div>
                <div className=' right-div w-6/12 h-4/5'>
                    <h1>Never Watste Another <span>Lead</span></h1>
                    <div className='flex m-5'>
                        <img src='https://jalditech.com/wp-content/uploads/2022/07/w_01.png' />
                        <div>
                            <h3>Enforced lead updates</h3>
                            <p>After every call, sales agents have to update the lead status before moving on to the next lead.</p>
                        </div>
                    </div>
                    <div className='flex m-5'>
                        <img src="https://jalditech.com/wp-content/uploads/2022/08/notifications-icon.png" />
                        <div>
                            <h3>Mobile notifications for all your follow ups</h3>
                            <p>Easily add follow up reminders for your leads to ensure you don’t lose any deals.</p>
                        </div>
                    </div>
                    <div className='flex m-5'>
                        <img src="https://jalditech.com/wp-content/uploads/2022/08/whatsapp.png" />
                        <div>
                            <h3>Conversation history for every lead</h3>
                            <p>View history of calls, WhatsApp messages, and notes for every lead.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Proj1;
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { Avatar } from '@chakra-ui/react';
import { Tooltip } from "@chakra-ui/tooltip";

function ChatBox({ messages }) {
    const user = JSON.parse(localStorage.getItem('userinfo'));
    // console.log(messages);
    const isSameSenderMargin = (messages, m, i, userId) => {
        // console.log(i === messages.length - 1);

        if (
            i < messages.length - 1 &&
            messages[i + 1].sender._id === m.sender._id &&
            messages[i].sender._id !== userId
        )
            return 33;
        else if (
            (i < messages.length - 1 &&
                messages[i + 1].sender._id !== m.sender._id &&
                messages[i].sender._id !== userId) ||
            (i === messages.length - 1 && messages[i].sender._id !== userId)
        )
            return 0;
        else return "auto";
    };
    const isSameSender = (messages, m, i, userId) => {
        return (
            i < messages.length - 1 &&
            (messages[i + 1].sender._id !== m.sender._id ||
                messages[i + 1].sender._id === undefined) &&
            messages[i].sender._id !== userId
        );
    };
    const isLastMessage = (messages, i, userId) => {
        return (
            i === messages.length - 1 &&
            messages[messages.length - 1].sender._id !== userId &&
            messages[messages.length - 1].sender._id
        );
    };
    const isSameUser = (messages, m, i) => {
        return i > 0 && messages[i - 1].sender._id === m.sender._id;
    };
    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    };
    const getSenderFull = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1] : users[0];
    };
    const getImage = (items) => {
        return items.profile_pic;

    }



    return (
        <><div className='chat-messages1'>
            <ScrollableFeed className='m-3 chat-messages2   text-[white] '  >
                {messages &&
                    messages.map((m, i) => (
                        <div style={{ display: "flex" }} key={m._id}>
                            {(isSameSender(messages, m, i, user._id) ||
                                isLastMessage(messages, i, user._id)) && (
                                    <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                        <Avatar
                                            mt="7px"
                                            mr={1}
                                            size="sm"
                                            cursor="pointer"

                                            name={m.sender.fname + " " + m.sender.lname}
                                            src={getImage(m.sender)}
                                        />
                                    </Tooltip>
                                )}
                            <span
                                style={{
                                    backgroundColor: "#252b3a",
                                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                    marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                    borderRadius: "20px",
                                    padding: "5px 15px",
                                    maxWidth: "75%",
                                }}
                            >
                                {m.text}
                            </span>
                        </div>
                    ))}
            </ScrollableFeed>
        </div>
        </>
    )
}
export default ChatBox
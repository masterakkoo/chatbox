const mongoose = require("mongoose");

const chat = mongoose.Schema({
    cname: {
        type: String,
        trim: true
    },
    group: {
        type: Boolean,
        default: false
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamp: true,
    }
);

const Chat = mongoose.model("Chat", chat);

module.exports = Chat;
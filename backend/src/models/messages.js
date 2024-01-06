const mongoose = require("mongoose");

const messages = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
}, {
    timestamps: true
});

const Message = mongoose.model("Message", messages);
module.exports = Message;

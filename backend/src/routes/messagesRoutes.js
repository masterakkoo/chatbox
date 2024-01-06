const express = require("express")
const router = new express.Router();
const Chat = require("../models/chat")
const User = require("../models/user")
const Message = require("../models/messages");
const genrateToken = require("../webToken")
const { protect } = require("../middleware/aurhorization");

router.post("/", protect, async (req, res) => {

    const { msg, chatId } = req.body;

    if (!msg || !chatId) {
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        text: msg,
        chat: chatId,
    };
    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "fname lname profile_pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "fname lname profile_pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { lastMessage: message });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

router.get("/:chatId", protect, async (req, res) => {

    try {
        const messages = await Message.find({ chat: req.params['chatId'] })
            .populate("sender", "fname lname profile_pic email")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

})



module.exports = router;
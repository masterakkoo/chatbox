const express = require("express")
const router = new express.Router();
const User = require("../models/user")
const genrateToken = require("../webToken")
const bcrypt = require("bcrypt")
const Chat = require("../models/chat")

router.get("/hey", (req, res) => {
    res.send("Hello exxprss router")
})

const { protect } = require("../middleware/aurhorization");
router.post("/", protect, async (req, res) => {
    const user = req.body;
    // console.log()
    const userId = user.id;
    // res.send(userId);
    // return;
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        group: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("lastMessage");

    isChat = await User.populate(isChat, {
        path: "lastMessage.sender",
        select: "name profile_pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            group: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

router.get("/", protect, async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("admin", "-password")
            .populate("lastMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "lastMessage.sender",
                    select: "name profile_pic email",
                });
                res.status(200).json(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
router.post("/groupchat", protect, async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            cname: req.body.name,
            users: users,
            group: true,
            admin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("admin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})
router.put("/removeMem", protect, async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("admin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
})
router.put("/addMem", protect, async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("admin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
})

router.put("/delete", protect, async (req, res) => {
    const _id = req.body._id;
    // console.log(_id)
    try {
        const rest = await Chat.deleteOne({ _id });
        return res.json(rest);
    }
    catch (err) {
        throw new Error(err);
        res.send(err);
    }

})
module.exports = router;
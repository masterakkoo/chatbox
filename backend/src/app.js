const express = require("express")
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const connect = require("./db/conn")
connect();
const { createServer } = require('node:http');
const router1 = require("./routes/userRoutes")
const router2 = require("./routes/chatRoutes")
const router3 = require("./routes/messagesRoutes")
const port = 5000;

const port1 = process.env.NODE_ENV === 'development' ?
    process.env.DEV_MODE : process.env.PRO_MODE
app.use((req, res, next) => {
    // res.set("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", false);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');


    next()
})



// app.use(cors({
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'origin': '*',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
// }));

app.get("/", (req, res) => {
    res.send("hello")
})

app.use(express.json())
app.use("/user", router1);
app.use("/chat", router2);
app.use("/message", router3);


const server = app.listen(port, () => {
    console.log("listeing to the port at 5000")
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: port1,
        credentials: true,
    },
});
io.on("connection", (socket) => {
    // console.log("Connected to socket.io");
    socket.on('connectSocket', (arg) => {
        // console.log(arg); // 'world'
        socket.join(arg._id)
        socket.emit("connected")
        console.log("connected");
    });

    socket.on("room", id => {
        socket.join(id);
        // console.log("joined")
    })
    // socket.on("typing", (room) => socket.in(room).emit("typing"));
    // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    socket.on("send", (messages) => {
        var chat = messages.chat;
        // console.log(chat);
        chat = chat.users;
        chat.forEach((user) => {
            if (user._id == messages.sender._id) return;
            socket.in(user._id).emit("message recived", messages);
            console.log("Send");
        });
    })
})
const mongoose = require("mongoose");
const db = process.env.MONGO_URL
const connect = async () => {
    mongoose.connect(db).then(() => console.log("connection succesfull")).catch((err) => console.log(err));
}

module.exports = connect;
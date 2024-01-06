const express = require("express")
const router = new express.Router();
const User = require("../models/user")
const genrateToken = require("../webToken")
const bcrypt = require("bcrypt")
const { protect } = require("../middleware/aurhorization");

router.get("/hey", (req, res) => {
    res.send("Hello exxprss router")
})

router.post("/register", async (req, res) => {
    const { fname, lname, email, password, profile_pic } = req.body;
    // console.log(profile_pic)

    const already = await User.find({ email });
    const found = (already.length != 0) ? true : false;


    const salt = await bcrypt.genSalt(10);

    if (found) {
        return res.json({
            found: found,
            success: true
        })
    }
    else {
        const user = await User.create({
            fname,
            lname,
            email,
            password: await bcrypt.hash(password, salt),
            profile_pic,
        })
        if (user) {
            return res.json({
                _id: user._id,
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                profile_pic: user.profile_pic,
                token: genrateToken(user._id),
                found: found,
                success: true
            })
        }
    }
})


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // return res.send(user);
    if (!user) {
        return res.status(200).json({

            match: false,
            success: true
        })
    }
    const pass = await bcrypt.compare(password, user.password);
    if (user && pass) {
        return res.status(200).json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            profile_pic: user.profile_pic,
            token: genrateToken(user._id),
            match: true,
            success: true
        })
    }
    else {
        return res.status(200).json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            profile_pic: user.profile_pic,
            token: genrateToken(user._id),
            match: false,
            success: true
        })
    }
}

);
router.post("/edit", async (req, res) => {
    const { fname, lname, email, profile_pic } = req.body;
    const user = User.findOne({ email });
    const filter = { email };
    const update = { fname, lname, profile_pic: (profile_pic) ? profile_pic : user.profile_pic };
    try {
        const result = await User.findOneAndUpdate(filter, update, {
            new: true
        });
        return res.json({
            _id: result._id,
            fname: result.fname,
            lname: result.lname,
            email: result.email,
            profile_pic: result.profile_pic,
            success: true
        });
    } catch (err) {
        return res.json({ success: false });
    }
})



router.get("/", protect, async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { fname: { $regex: req.query.search, $options: "i" } },
                { lname: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    return res.json(users);
});



module.exports = router;

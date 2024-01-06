const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const users = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAM1BMVEXk5ueutLersbTP09Xn6erLz9G2u77q7O3Y29ze4eKxt7qorrLV2Nrb3t/IzM7Fycu9wsR4UE6mAAAC0ElEQVRoge2a627rIAyAgTiEWxLe/2lPSNupa1OwUztHmvj2Y9I06avN3a5SnU6n0+l0Op1O5+8CAPff15t9WrMt5MVd+gEmtdhojL5hosnpKj34HB/iB8aM6gI9qNW8qne9HsTt4MKRetdnaffwSV3swYu6l4q7MMulHtaGW5tZzN2Ku9iFMg+p7dY6CCUe497mvIQdMkquo+O3g4so95Z4drdSFunWZuQOHRI2cIHQAR34Fjr3Lj/j3VpbXjlmf3mCd5+DQHEzTzlPcXPnHbWzPoU+MbphpMkj5/ECmeTWxjHKJ8Iq3+WcK32iuXmn+0Qbcm2W/ylf/0zkpA2OecwpZ9ou55zt7Tvzi5z1ZKk9VA6InG7lSG6tOfd2pUhq1pW2TXfkvfkuT5xu6pnK61aKsNKZs05bbPxPVcJFiv+1hg9d5I2OdXOPeAH9YOJXK+wbOXJe355BLDeRpO+0Z7xMXeJG67ko6d5i/1h/lM35ncqsM6Osuryc9LHeBMHy44/9oOJdis7slZhjpvlFb6K+pNx+AyBla6IpRG1Xd22jpdjmNAxD8uq6oG/mu877n79c4t1+3LDmbEPQe9p1CDavY/Igm4EJ3JJDjO9NljL2Jq9p+xcJMUx+tAfa3x8hhoV/8oEfw4fN5e0D6HVm9INKGWd+bDh2YBp/UIMlPs/LXrtw6Kch4OvNv8Jfvk0+OEq+X/TbK/0LPdQOUIzenm95wHA+7AfrWfd3YT+C9yeCB0+f48f6RLaD41FvxJFYp6h2i6mYlWRndRNv1LiuKcWOv1PDzOwmlSS51RsRO+eJtU4cuMY6tdSJBdVxohYbsWCGnVpgJtjbiedeZU/y5mqntnIotGrR7NvLM62thtq9I1KP3AsG3jpdmQ+UN6pTTjjruv7NLWILi0qslWVlh7y0vCpy9BdxzlJZbDDeKh1y1E4XNwjD3PnpdDqdzhH/AMTQH4C5OvyNAAAAAElFTkSuQmCC"
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", users);
module.exports = User;
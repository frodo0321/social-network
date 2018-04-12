const mongoose = require("mongoose");

const Friendship = mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    friendRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = Friendship;

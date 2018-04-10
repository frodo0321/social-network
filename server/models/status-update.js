const mongoose = require("mongoose");

const StatusUpdate = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = StatusUpdate;

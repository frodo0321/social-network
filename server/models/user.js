const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, {
    timestamps: true,
    versionKey: false
})

User.pre("save", function preSavePassword(next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(5));
    }   
    next();
});

User.methods.verifyPassword = function verifyPassword(password) {
    return bcrypt.default.compareSync(password, this.password);
};



module.exports = User;

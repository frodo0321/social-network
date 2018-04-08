const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

        var user = this;
        return bcrypt.hash(user.password, 10).then(hash => {
                user.password = hash;
                return next();
            })
            .catch(next);

    }   
    return next();
});

User.methods.verifyPassword = function verifyPassword(password) {
    return bcrypt.compare(password, this.password)
};



module.exports = User;

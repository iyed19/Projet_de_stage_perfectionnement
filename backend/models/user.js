const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const userCollection = new mongoose.model("users", userSchema);

module.exports = userCollection;
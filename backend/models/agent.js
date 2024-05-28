const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    serialNumber: {
        type: Number,
        required: true
    },
    service: {
        type: String,
        required: true
    }
});

const agentCollection = new mongoose.model("agents", agentSchema);

module.exports = agentCollection;
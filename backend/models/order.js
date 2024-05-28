const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    agent: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Number,
        required: true
    }
});

const orderCollection = new mongoose.model("orders", orderSchema);

module.exports = orderCollection;
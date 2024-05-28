const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    buyingDate: {
        type: Date,
        required: true
    }
});

const productCollection = new mongoose.model("products", productSchema);

module.exports = productCollection;
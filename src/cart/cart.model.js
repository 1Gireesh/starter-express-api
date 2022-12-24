const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    product: {
        type:Object,
        required: true
    },
    user: {
        type: String
    },
    quantity: { type: Number, required: true }
}, {
    versionKey: false,
    timestamps: true
});

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
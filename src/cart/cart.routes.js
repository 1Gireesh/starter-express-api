const express = require("express");
const Cart = require("./cart.model");
const Product = require("../products/product.model")
const User = require("../users/user.model");
const { default: mongoose } = require("mongoose");


const Auth = async (req, res, next) => {
    let { token } = req.headers;
    if (token) {
        req.userId = token;
        next();
    } else {
        return res.send("please provide the token");
    }
}

const app = express.Router();
app.use(Auth);



app.get("/", async (req, res) => {
    let { token = req.userId } = req.headers;
    console.log(token)
    let carts = await Cart.find({ user: token })
    res.send(carts);
});


app.post("/", async (req, res) => {
    let id = req.userId || req.headers.token;
    let product = new mongoose.Types.ObjectId(req.body.product)
    try {
        let b = await Product.findById(product);
        let cart = await Cart.create({
            product: b,
            user: id,
            quantity: req.body.quantity,
        })
        // console.log(cart)
        res.send(cart);

    }
    catch (e) {
        res.send(e.message);
    }

})

app.delete("/", async (req, res) => {
    let [uid, id] = req.userId && req.userId.split(" ");
    try {

        let cart = await Cart.findOneAndDelete({ id: id, user: uid })
        console.log(cart)
        res.send(cart);
    }
    catch (e) {
        res.send(e);
    }

})





app.patch("/", async (req, res) => {
    let id = req.userId;
    try {
        let c = await Cart.findOne({ id: req.body.product, user: req.body.uid })
        let cart = await Cart.findByIdAndUpdate(c._id, { quantity: req.body.quantity })
        res.send(cart);
    }
    catch (e) {
        res.send(e);
    }

})

module.exports = app;
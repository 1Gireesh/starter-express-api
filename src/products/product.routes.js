const express = require("express");
const product = require("./product.model");
const { default: mongoose } = require("mongoose");


const app = express.Router();



app.get("/", async (req, res) => {
    let { limit = 20, skip = 0 } = req.query;
    try {
        let prd = await product.find().skip(skip).limit(limit);
        res.send(prd);
    } catch (e) {
        res.send(e.message)
    }

})



app.get("/search", async (req, res) => {
    let q = ("/" + req.query.q + "/i")
    try {
        let prd = await product.find({ name: { '$regex': req.query.q, $options: "i" } }).limit(5);
        res.send(prd);
    } catch (e) {
        res.send(e.message);
    }


})

app.get("/:id", async (req, res) => {
    let id = req.params.id;
    id = new mongoose.Types.ObjectId(id)
    console.log(id)
    try {
        let prd = await product.findById(id);
        return res.send(prd);
    } catch (e) {
        return res.send(e.message);
    }

})


module.exports = app;
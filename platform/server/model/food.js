"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: String, required: true }
});
var food = mongoose.model('foodCollection', FoodSchema);
module.exports = food;

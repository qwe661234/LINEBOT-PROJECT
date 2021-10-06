import * as mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: String, required: true },
});

const food = mongoose.model('foodCollection', FoodSchema);
module.exports = food;

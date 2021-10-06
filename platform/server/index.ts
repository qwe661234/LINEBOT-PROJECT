const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const FoodModel = require('./model/food');

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb+srv://code:12345@cluster0.mqsvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true },
);

app.get('/food', (req, res) => {
    try {
        FoodModel.find({}, (err, result) => {
            res.status(200).send(result);
        });
    } catch (err) {
        console.log(err);
    }
});

app.get('/food/:category', (req, res) => {
    try {
        FoodModel.find(req.params, (err, result) => {
            res.status(200).send(result);
        });
    } catch (err) {
        console.log(err);
    }
});

app.post('/food', async (req, res) => {
    try {
        const food = new FoodModel({
            name: req.body.name,
            address: req.body.address,
            link: req.body.link,
            category: req.body.category,
        });
        await food.save();
        res.status(201).send('Success');
    } catch (err) {
        console.log(err);
    }
});

app.patch('/food/:address', async (req, res) => {
    try {
        await FoodModel.findOneAndUpdate(req.params, req.body);
        res.status(200).send('Success');
    } catch (err) {
        console.log(err);
    }
});
app.delete('/food/:address', async (req, res) => {
    try {
        await FoodModel.findOneAndDelete(req.params);
        res.status(200).send('Success');
    } catch (err) {
        console.log(err);
    }
});

app.listen(8080, () => {
    console.log('server running on port 8080');
});

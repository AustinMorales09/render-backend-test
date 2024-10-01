const mongoose = require('mongoose');

// Define the Pet schema and model
const petSchema = new mongoose.Schema({
    name: String,
    category: String,
    imageURL: String, // Instead of 'type', we use 'category'
    age: Number
});

const Pet = mongoose.model('Pet', petSchema);
//comment
module.exports = Pet
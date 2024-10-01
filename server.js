const express = require('express');
const mongoose = require('mongoose');
const Pet = require('./models/Pets');
const cors = require('cors')
// Initialize Express
const app = express();
const port = 5500;

// Middleware for JSON parsing
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your frontend origin
 
}));
// Connect to MongoDB (replace with your own connection string)
mongoose.connect('mongodb+srv://test:Kable123@cluster0.mlagjiq.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Could not connect to MongoDB', error));


// Routes

// Get all pets
app.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get pets by category
app.get('/pets/:category', async (req, res) => {
    try {
        const pets = await Pet.find({ category: req.params.category });
        if (pets.length === 0) {
            return res.status(404).json({ message: 'No pets found in this category' });
        }
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new pet
app.post('/pets', async (req, res) => {
    const { name, category,imageURL, age } = req.body;

    const pet = new Pet({
        name,
        category,
        imageURL, // Category is now stored in the document
        age
    });

    try {
        const savedPet = await pet.save();
        res.status(201).json(savedPet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

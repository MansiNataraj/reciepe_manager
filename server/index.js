require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');
const { CATEGORIES } = require('./models/Recipe');
const Recipe = require('./models/Recipe');
const samples = require('./sampleData');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '5mb' }));

app.get('/api/categories', (req, res) => res.json(CATEGORIES));
app.use('/api/recipes', recipeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/recipe-manager';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    // Give the bundled sample recipes their photos if they were saved without one
    for (const s of samples) {
      await Recipe.updateOne({ name: s.name, $or: [{ image: '' }, { image: { $exists: false } }] }, { $set: { image: s.image } });
    }
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

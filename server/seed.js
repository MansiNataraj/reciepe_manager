require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const samples = require('./sampleData');

// Adds any missing sample recipes and fills in photos on existing ones.
// Recipes you created yourself are left untouched.
(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/recipe-manager');
  let added = 0;
  let updated = 0;
  for (const sample of samples) {
    const existing = await Recipe.findOne({ name: sample.name });
    if (!existing) {
      await Recipe.create(sample);
      added++;
    } else if (!existing.image) {
      existing.image = sample.image;
      await existing.save();
      updated++;
    }
  }
  console.log(`Seed done: ${added} added, ${updated} photos filled in`);
  await mongoose.disconnect();
})();

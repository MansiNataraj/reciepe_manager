const mongoose = require('mongoose');

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegetarian', 'Snack', 'Beverage'];

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 120 },
    category: { type: String, required: [true, 'Category is required'], enum: CATEGORIES },
    ingredients: {
      type: [String],
      validate: [(v) => v.length > 0, 'At least one ingredient is required'],
    },
    steps: {
      type: [String],
      validate: [(v) => v.length > 0, 'At least one step is required'],
    },
    cookingTime: { type: Number, required: [true, 'Cooking time is required'], min: 1 },
    servings: { type: Number, required: [true, 'Servings is required'], min: 1 },
    image: { type: String, default: '' },
    favourite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

recipeSchema.index({ name: 'text', ingredients: 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);
module.exports.CATEGORIES = CATEGORIES;

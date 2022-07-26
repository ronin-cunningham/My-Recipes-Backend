const mongoose = require('mongoose');

// create schema
const recipeSchema = new mongoose.Schema({
	title: String,
	ingredients: String,
	instructions: String,
	uniqueId: String,
	completionTime: String,
});

recipeSchema.methods.speak = function speak() {
    console.log(`I'm a talking recipe named ${this.title}`);
}

// create model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
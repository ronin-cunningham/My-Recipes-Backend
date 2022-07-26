const Recipe = require('./model');
const { v4: uuid } = require('uuid');

function generateData() {
    // make a sandwich
    const pizza = new Recipe({
		title: "Pizza",
		ingredients: "dough, salami, cheese",
		instructions: "Knead the dough, add the salami and cheese, bake in oven",
		uniqueId: uuid(),
		completionTime: "60"
	})
    const pasta = new Recipe({
		title: "Pasta",
		ingredients: "dough, tomatoes, cheese",
		instructions: "Knead the dough, add the tomatoes and cheese, boil the pasta, pour sauce",
		uniqueId: uuid(),
		completionTime: "90"
	});
    
    // Save a sandwich to db
    pizza.save();
    pasta.save();
}

module.exports = generateData;
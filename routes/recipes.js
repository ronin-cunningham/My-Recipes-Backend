var express = require('express');
const Recipe = require('../mongodb/model');
var router = express.Router();
const recipeModel = require("../mongodb/model");
const { v4: uuid } = require('uuid');

// let recipes = JSON.parse(recipesJSON);

router.get('/', async function(req, res, next) {
  const recipes = await recipeModel.find({});
  res.send(recipes);
});

router.post('/', function (req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'Recipe must have a body of data!' })
  }
  const recipe = 
  { 
    title: req.body.title, 
    ingredients: req.body.ingredients, 
    instructions: req.body.instructions, 
    uniqueId: uuid(),
    completionTime: req.body.completionTime
  };
  
  const dbRecipe = new Recipe(recipe);
  dbRecipe.save();
  return res.send(recipe);
});

router.delete('/delete/:uniqueId', async function (req, res, next) {
  const recipes = await recipeModel.deleteOne({ uniqueId: req.params.uniqueId });
  const newRecipes = await recipeModel.find({});
  return res.send(newRecipes);
});

router.get('/instructions/:uniqueId', async function (req, res, next) {
  const foundRecipe = await recipeModel.find({uniqueId: req.params.uniqueId});

  if (!foundRecipe) {
    console.log("asd");
    return res.status(404).send({ message: 'Recipe not found' });
  }
  return res.send(JSON.stringify(foundRecipe));
})

// router.delete('/all', function (req, res, next) {
//   recipes = [];
//   return res.send(recipes);
// })

module.exports = router;

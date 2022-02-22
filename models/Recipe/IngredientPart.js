const mongoose = require("mongoose");
const Ingredient = require("models/Recipe/Ingredient")

const IngredientPartSchema = new mongoose.Schema(
    {
        ingredients: [Ingredient]
    },
    { timestamps: true }
)

module.exports = mongoose.model("IngredientPart", IngredientPartSchema);
const mongoose = require("mongoose")

const RecipeStepSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: false,
            unique: false
        },
        image: {
            type: String,
            required: false,
            unique: false
        }
    }
)

const IngredientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false
        },
        amount: {
            type: String,
            required: false,
            unique: false
        },
        type: {
            type: String,
            required: false,
            unique: false
        }
    }
)

const IngredientPartSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false
        },
        ingredients: [IngredientSchema]
    }
)

const RecipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        mainImage: {
            type: String,
            required: true,
            unique: true
        },
        boxImage1: {
            type: String,
            required: true,
            unique: true
        },
        boxImage2: {
            type: String,
            required: true,
            unique: true
        },
        categories: {
            type: Array,
            required: false,
        },
        ingredientParts: [IngredientPartSchema],
        recipeSteps: [RecipeStepSchema]
    },
    { timestamps: true }
)


module.exports = mongoose.model("Recipe", RecipeSchema)
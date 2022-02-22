const mongoose = require("mongoose")

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
    },
    {}
)

module.exports = mongoose.model("Ingredient", IngredientSchema);
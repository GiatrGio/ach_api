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
    },
    {}
)

module.exports = mongoose.model("RecipeStep", RecipeStepSchema);
const router = require("express").Router();
const Recipe = require("../models/Recipe/Recipe")

// CREATE RECIPE
router.post("/", async (req, res) => {
    const newRecipe = new Recipe(req.body);
    try {
        const savedRecipe = await newRecipe.save();
        res.status(200).json(savedRecipe);
    } catch (err) {
        res.status(500).send(String(err));
    }
})

// UPDATE RECIPE
router.put("/:id", async (req, res) => {
    try {
        await Recipe.findById(req.params.id);
        try {
            const updatedRecipe = await Recipe.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {new: true}
            );
            res.status(200).json(updatedRecipe)
        } catch (err) {
            res.status(500).send(String(err));
        }
    } catch (err) {
        res.status(500).send(String(err))
    }
})

// DELETE recipe by id
router.delete("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        try {
            await recipe.delete();
            res.status(200).json("RecipeExample has been deleted...");
        } catch (err) {
            res.status(500).send(String(err))
        }
    } catch (err) {
        res.status(500).send(String(err));
    }
})

// GET recipe by id
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).send(String(err));
    }
})

module.exports = router;
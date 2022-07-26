const express = require("express")
const router = express.Router()
const Search = require("../models/search")

// get all dog breed names
router.get("/dog-breeds", async (req, res, next) => {
    try {
        const dogBreedNames = await Search.fetchDogBreedNames()
        return res.status(200).json({ dogBreedNames })
    } catch (err) {
        next(err)
    }
})

module.exports = router
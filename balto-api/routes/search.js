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

router.get("/shelters", async (req, res, next) => {
    try {
        const shelters = await Search.fetchShelters()
        return res.status(200).json({ shelters })
    } catch (err) {
        next(err)
    }
})

module.exports = router
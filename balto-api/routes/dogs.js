const express = require("express")
const router = express.Router()
const Dogs = require("../models/dogs")

// get the dog for the given dog id
router.get("/:dogId", async (req, res, next) => {
    try {
        const dogId = req.params.dogId
        const dog = await Dogs.fetchDogInfo(dogId)
        return res.status(200).json({ dog })
    } catch (err) {
        next(err)
    }
})

// view dog search results
router.post("/", async (req, res, next) => {
    try {
        const dogResults = await Dogs.listDogResults(req.body)
        return res.status(200).json({ dogResults })
    } catch(err) {
        next(err)
    }
})

module.exports = router
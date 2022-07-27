const express = require("express")
const router = express.Router()
const Dogs = require("../models/dogs")

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
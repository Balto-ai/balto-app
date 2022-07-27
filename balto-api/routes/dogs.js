const express = require("express")
const router = express.Router()
const Dogs = require("../models/dogs")

// view dog search results
router.post("/", async (req, res, next) => {
    try {
        const filters = req.body
        // if (!req.body) return res.status(200).json({ "ping":"pong" })
        // const { filters } = req.body 
        // const filters = req.body.filters
        console.log("request body in dogs routes:", filters)
        const dogResults = await Dogs.listDogResults(filters)
        return res.status(200).json({ dogResults })
    } catch(err) {
        next(err)
    }
})

module.exports = router
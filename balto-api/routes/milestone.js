const express = require("express")
const router = express.Router()
const Milestone = require("../models/milestone")


// get the dog for the given dog id
router.get("/view/:dogId", async (req, res, next) => {
    try {
        const dogId = req.params.dogId
        const milestoneResults = await Milestone.fetchMilestones(dogId)
        return res.status(200).json({ milestoneResults })
    } catch (err) {
        next(err)
    }
})

// router.post("/", async (req, res, next) => {

// })




module.exports = router
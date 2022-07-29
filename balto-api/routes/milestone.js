const express = require("express")
const router = express.Router()
const Milestone = "../models/milestone"


// get the dog for the given dog id
router.get("/dog/:dogId", async (req, res, next) => {
    console.log("reached routes for milestone")
    console.log("dogId in routes; ", req.params.dogId)
    try {
        const dogId = req.params.dogId
        const milestoneResults = await Milestone.fetchMilestones(dogId)
        return res.status(200).json({ milestoneResults })
    } catch (err) {
        next(err)
    }
})


module.exports = router
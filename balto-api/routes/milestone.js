const express = require("express")
const router = express.Router()
const Milestone = require("../models/milestone")
const security = require("../middleware/security")



// get all the milestones for a dog
router.get("/view/:dogId", async (req, res, next) => {
    try {
        const dogId = req.params.dogId
        const milestoneResults = await Milestone.fetchMilestones(dogId)
        return res.status(200).json({ milestoneResults })
    } catch (err) {
        next(err)
    }
})

// TODO: add in security middleware!!!

// create a milestone for a given dog
router.post("/", async (req, res, next) => {
    try {
        const { dogId } = req.body
        const newMilestoneForm  = req?.body
        const milestone = await Milestone.createMilestone({ newMilestoneForm, dogId} )
        return res.status(201).json( { milestone: milestone } )
    } catch(err) {
        next(err)
    }
})

// update a milestone for a given dog
router.put("/:milestoneId", async(req, res, next) => {
    try {
        const milestoneId = req.params.dogId
        const updatedMilestoneForm = req?.body
        const updatedMilestone = await Milestone.updateMilestone(updatedMilestoneForm, milestoneId)
        return res.status(200).json( { milestone: updatedMilestone } )
    } catch (err) {
        next(err)
    }
})

// delete a milestone for a given dog
router.delete("/:milestoneId", async(req, res, next) => {
    try {
        const milestoneId = req.params.dogId
        const deletedMilestone = await Milestone.deleteMilestone(milestoneId)
        return res.status(200).json( { milestone: deletedMilestone } )
    } catch (err) {
        next(err)
    }
})


module.exports = router
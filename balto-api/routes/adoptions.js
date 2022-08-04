const express = require("express")
const router = express.Router()
const Adoptions = require("../models/adoptions")
const security = require("../middleware/security")

// get all the adoption inquiries in the db for a specific shelter
router.get("/", security.requireShelterAdminUser, async (req, res, next) => {
    try {
        const { shelterId } = res.locals.user
        const allAdoptionInquiries = await Adoptions.fetchAllAdoptionInquiries(shelterId)
        return res.status(200).json({ allAdoptionInquiries })
    } catch (err) {
        next(err)
    }
})

// get the adoption inquiries for a specific dog
router.get("/:dogId", async (req, res, next) => {
    try {
        const dogId = req.params.dogId
        const dogAdoptionInquiries = await Adoptions.fetchAdoptionInquiryByDog(dogId)
        return res.status(200).json({ dogAdoptionInquiries })
    } catch (err) {
        next(err)
    }
})

// create the adoption inquiry between a dog and user
router.post("/", async (req, res, next) => {
    try {
        const adoptionForm = req?.body
        const { dogId } = req?.body
        const { userId } = req?.body
        const inquiry = await Adoptions.createAdoptionInquiry(adoptionForm, userId, dogId)
        return res.status(201).json( {inquiry} )
    } catch (err) {
        next(err)
    }
})

// delete the adoption inqury between a dog and user
router.delete("/", async (req, res, next) => {
    try {
        const { dogId } = req?.body
        const { userId } = req?.body
        const inquiry = await Adoptions.deleteAdoptionInquiry(userId, dogId)
        return res.status(201).json( {inquiry} )
    } catch(err) {
        next(err)
    }
})

module.exports = router
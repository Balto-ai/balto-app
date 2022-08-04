const express = require("express")
const router = express.Router()
const Images = require("../models/images")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")

// view all dog images
router.get("/", async (req, res, next) =>{
    try {
        const { dogId } = res.locals.dogId
        const images = await Images.fetchAllImages(dogId)
        return res.status(200).json({images})
    } catch (error) {
        next(error)
    }
})
// create new dog image
router.post("/",  security.requireAuthenticatedUser, security.requireShelterAdminUser, async (req, res, next) =>{
    try {
        const {dogRecord} = res.locals.dogRecord
        const newImage = req?.body
        const image = await Images.createImage(newImage, dogRecord)
        return res.status(201).json({image})
    } catch (error) {
        next(error)
    }
})
// view a dog image
router.get("/:imageId", async (req, res, next) =>{
    try {
        const {imageId} = req.params
        const {dogId} = res.locals.dogId
        const image = await Images.fetchImageById(imageId, dogId)
        return res.status(200).json({image})
    } catch (error) {
        
    }
})

// delete a dog image
router.delete("/:imageId",  security.requireAuthenticatedUser, security.requireShelterAdminUser, permissions.shelterAdminUserOwnsImage, async (req, res, next) =>{
    try {
        const {imageId} = req.params
        const {dogRecord} = res.locals.dogRecord
        await Images.deleteImage(imageId, dogRecord)
        return res.status(204).send("Image successfully deleted")
    } catch (error) {
        next(err)
    }
})

module.exports = router
const express = require("express")
const router = express.Router()
const Images = require("../models/images")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")

// view all dog images
router.get("/:dogId", async (req, res, next) =>{
    try {
        const { dogId } = req.params
        const images = await Images.fetchAllImages(dogId)
        return res.status(200).json({images})
    } catch (error) {
        next(error)
    }
})
// create new dog image
router.post("/",  security.requireAuthenticatedUser, security.requireShelterAdminUser, async (req, res, next) =>{
    try {
        console.log(req.body)
        const newImage = req?.body
        const image = await Images.createImage(newImage)
        return res.status(201).json({image})
    } catch (error) {
        next(error)
    }
})
// view a dog image
router.get("/:dogId/:imageId", async (req, res, next) =>{
    try {
        const {dogId, imageId} = req.params
        console.log(req.params, dogId, imageId)
        const image = await Images.fetchImagebyId(imageId, dogId)
        console.log(image)
        return res.status(200).json({image})
    } catch (error) {
        next(error)
    }
})

// delete a dog image
router.delete("/:dogId/:imageId",  security.requireAuthenticatedUser, security.requireShelterAdminUser, async (req, res, next) =>{
    try {
        const {imageId, dogId} = req.params
        console.log(Images.deleteImage(imageId, dogId))
        await Images.deleteImage(imageId, dogId)
        return res.status(204).send("Image successfully deleted")
    } catch (error) {
        next(error)
    }
})

module.exports = router
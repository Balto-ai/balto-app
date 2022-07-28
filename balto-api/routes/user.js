const express = require("express")
const router = express.Router()
const Starred = require("../models/starred")
const security = require("../middleware/security")

// get all user-dog pairings for the user
router.get("/starred", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { userId } = res.locals.user
        const starredDogs = await Starred.listStarredDogsForUser(userId)
        return res.status(200).json({ starredDogs })
    } catch (err) {
        next(err)
    }
})

// get a dog via user-dog pairing dogId
router.get("/starred/:dogId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { dogId } = req.params
        const dog = await Starred.fetchStarredDogById(dogId)
        return res.status(200).json({ dog })
    } catch (err) {
        next(err)
    }
})

// star a dog; create a new user_dog pairing in the database
router.post("/starred", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { userId } = res.locals.user
        const { dogId } = req.body
        const userDogPairing = await Starred.createUserDogPairing(userId, dogId)
        return res.status(200).json({ userDogPairing })
    } catch (err) {
        next(err)
    }
})

// unstar a dog; delete a user_dog pairing in the database
router.delete("/starred/:dogId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { userId } = res.locals.user
        const { dogId } = req.params
        await Starred.deleteUserDogPairing(userId, dogId)
        return res.status(204).send("Resource successfully deleted")
    } catch (err) {
        next(err)
    }
})

module.exports = router
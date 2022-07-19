const express = require("express")
const router = express.Router()
const DogRecords = require("../models/dog-records")
const security = require("../middleware/security")

// view dogs under user's associated shelter
router.get("/", security.requireAuthenticatedUser, security.requireShelterAdminUser, async (req, res, next) => {
    try {
        const { shelterId } = res.locals.user
        const dogs = await DogRecords.listDogRecordsForShelter(shelterId) 
        return res.status(201).json( dogs )
    } catch(err) {
        next(err)
    }
})

// create a dog record
router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { userId } = res.locals.user
        return res.status(201).json( "hello post" )
    } catch(err) {
        next(err)
    }
})

// view a dog record
router.get("/:dogId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { userId } = res.locals.user
        const dogId = req.params.dogId
        return res.status(201).json( { dogId } )
    } catch (err) {
        next(err)
    }
  })

  // edit a dog record
  router.put("/:dogId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const dogId = req.params.dogId
        return res.status(201).json( { dogId } )
    } catch (err) {
        next(err)
    }
  })

  // delete a dog record
  router.delete("/:dogId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const dogId = req.params.dogId
        return res.status(201).json( { dogId } )
    } catch (err) {
        next(err)
    }
  })

module.exports = router
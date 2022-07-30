const express = require("express")
const router = express.Router()
const DogRecords = require("../models/dog-records")
const security = require("../middleware/security")

// view dogs under user's associated shelter
router.get("/", security.requireAuthenticatedUser, security.requireShelterAdminUser, async (req, res, next) => {
    try {
        const { shelterId } = res.locals.user
        const dogRecords = await DogRecords.listDogRecordsForShelter(shelterId)
        return res.status(200).json( { dogRecords } )
    } catch(err) {
        next(err)
    }
})

// create a dog record
router.post("/", security.requireAuthenticatedUser, security.requireShelterAdminUser, async (req, res, next) => {
    try {
        const { shelterId } = res.locals.user
        const newDogRecordForm = req?.body
        const dogRecord = await DogRecords.createDogRecord(shelterId, newDogRecordForm)
        return res.status(201).json( { dogRecord } )
    } catch(err) {
        next(err)
    }
})

// view a dog record
router.get("/:dogId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { shelterId } = res.locals.user
        const { dogId } = req.params
        const dogRecord = await DogRecords.fetchDogRecordById(shelterId, dogId)
        return res.status(200).json( { dogRecord } )
    } catch (err) {
        next(err)
    }
  })

  // update a dog record
  router.put("/:dogId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { shelterId } = res.locals.user
        const { dogId } = req.params
        const updateDogRecordForm = req?.body
        const updatedDogRecord = await DogRecords.updateDogRecord(shelterId, dogId, updateDogRecordForm)
        return res.status(200).json( { updatedDogRecord } )
    } catch (err) {
        next(err)
    }
  })

  // delete a dog record
  // TODO: incomplete
  router.delete("/:dogId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { shelterId } = res.locals.user
        const { dogId } = req.params
        await DogRecords.deleteDogRecord(shelterId, dogId)
        return res.status(204).send("Dog record successfully deleted")
    } catch (err) {
        next(err)
    }
  })

module.exports = router
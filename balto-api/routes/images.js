const express = require("express")
const router = express.Router()
const DogRecords = require("../models/dog-records")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")

// view all dog images
router.get("/", async (req, res, next) =>{
    
})

// create new dog image
router.post("/",  security.requireAuthenticatedUser, security.requireShelterAdminUser, permissions.shelterAdminUserOwnsDogRecord, async (req, res, next) =>{

})
// view a dog image
router.post("/:imageId",  security.requireAuthenticatedUser, security.requireShelterAdminUser, permissions.shelterAdminUserOwnsDogRecord, async (req, res, next) =>{

})
// delete a dog image
router.delete("/:imageId",  security.requireAuthenticatedUser, security.requireShelterAdminUser, permissions.shelterAdminUserOwnsDogRecord, async (req, res, next) =>{

})

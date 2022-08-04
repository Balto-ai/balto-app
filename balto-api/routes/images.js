// view all dog images
router.get("/:dogId/images",  security.requireAuthenticatedUser, security.requireShelterAdminUser, permissions.shelterAdminUserOwnsDogRecord, async (req, res, next) =>{
    
})

// create new dog image
router.post("/:dogId/images",  security.requireAuthenticatedUser, security.requireShelterAdminUser, permissions.shelterAdminUserOwnsDogRecord, async (req, res, next) =>{

})
// view a dog image
router.post("/:dogId/images/:imageId",  security.requireAuthenticatedUser, security.requireShelterAdminUser, permissions.shelterAdminUserOwnsDogRecord, async (req, res, next) =>{

})
// view a dog image
router.delete("/:dogId/images/:imageId",  security.requireAuthenticatedUser, security.requireShelterAdminUser, permissions.shelterAdminUserOwnsDogRecord, async (req, res, next) =>{

})

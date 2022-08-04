const DogRecords = require("../models/dog-records")
const {BadRequestError, ForbiddenError} = require("../utils/errors")

// ensure shelter is the owner of the dog record

const shelterAdminUserOwnsDogRecord = async (req, res, next) =>{
   try {
    const { shelterId } = res.locals.user
    const { dogId } = req.params
    const dogRecord = await DogRecords.fetchDogRecordById(dogId)

    if (dogRecord?.shelter_id !== shelterId){
        throw new ForbiddenError(`This dog record (id ${dogRecord.id}) belongs to another shelter`)
    }

    res.locals.dogRecord = dogRecord
    return next()
   } catch (error) {
    return next(error)
   } 
}
module.exports = {
    shelterAdminUserOwnsDogRecord
}
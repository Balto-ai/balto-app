const db = require("../db")
const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class DogRecords {

    // called in GET request to /dog-records/
    static async listDogRecordsForShelter(shelterId) {
        if (!shelterId) {
            throw new BadRequestError("No shelterId provided")
        }

        // get all the rows in nutrition where the shelter_id column matches the shelterId parameter
        const query = `
            SELECT * FROM dogs
            WHERE shelter_id = $1
            ORDER BY created_at ASC
            `
        const result = await db.query(query, [shelterId])
        return result.rows
    }


    // called in POST request to /dog-records/
    static async createDogRecord(shelterId, dogRecordForm) {
        if (!shelterId) {
            throw new BadRequestError("No shelterId provided")
        }
        if (!dogRecordForm) {
            throw new BadRequestError("No dogRecordForm provided")
        }

        // throw error if any required fields are missing
        const requiredFields = ["name", "dob", "size", "breed", "sex", "color",
                                "desc1", "desc2", "dateEntered", "imageUrl",
                                "noviceFriendly", "kidFriendly", "dogFriendly", "catFriendly", "strangerFriendly",
                                "playfulness", "energyLevel", "exerciseNeeds"]

        requiredFields.forEach((field) => {
            if (!dogRecordForm.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        // check if size is a valid value
        if (!["small", "medium", "large"].includes(dogRecordForm.size)) throw new BadRequestError("Invalid size")
        // check if sex is valid value
        if (!["m", "f"].includes(dogRecordForm.sex)) throw new BadRequestError("Invalid sex")
        
        // TODO: check if breed is a valid value, would need to get breed list from the json?
        // TODO: check if dateEntered is not in the future

        const query = `
            INSERT INTO dogs (
                name, dob, size, breed, sex, color, desc_1, desc_2, date_entered, image_url,
                novice_friendly, kid_friendly, dog_friendly, cat_friendly, stranger_friendly,
                playfulness, energy_level, exercise_needs, 
                shelter_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            RETURNING id;
            `

        const result = await db.query(query, [dogRecordForm.name,
                                              dogRecordForm.dob,
                                              dogRecordForm.size,
                                              dogRecordForm.breed,
                                              dogRecordForm.sex,
                                              dogRecordForm.color,
                                              dogRecordForm.desc1,
                                              dogRecordForm.desc2,
                                              dogRecordForm.dateEntered,
                                              dogRecordForm.imageUrl,
                                              dogRecordForm.noviceFriendly,
                                              dogRecordForm.kidFriendly,
                                              dogRecordForm.dogFriendly,
                                              dogRecordForm.catFriendly,
                                              dogRecordForm.strangerFriendly,
                                              dogRecordForm.playfulness,
                                              dogRecordForm.energyLevel,
                                              dogRecordForm.exerciseNeeds,
                                              shelterId
                                             ])
        return result.rows[0]
    }


    // called in GET request to /dog-recors/:dogId
    static async fetchDogRecordById(shelterId, dogId) {
        if (!shelterId) {
            throw new BadRequestError("No shelterId provided")
        }
        if (!dogId) {
            throw new BadRequestError("No dogId provided")
        }

        // get dog record with requested id that matches the shelterId of the user
        const query = `
            SELECT * FROM dogs
            WHERE id = $1 AND shelter_id = $2;
            `
        const result = await db.query(query, [dogId, shelterId])

        // checking if there is there the requested dog record belongs to the shelter
        if (result.rows.length === 0) {
            throw new UnauthorizedError(`There is no dog with id ${dogId} at shelter id ${shelterId}`)
        } 

        return result.rows
    }


    // called in PUT request to /dog-records/:dogId
    static async updateDogRecord(shelterId, dogId, updateForm) {
        if (!shelterId) {
            throw new BadRequestError("No userId provided")
        }
        if (!dogId){
            throw new BadRequestError("No dogId provided")
        }
        if (!updateForm) {
            throw new BadRequestError("No updateForm provided")
        }

        // array of valid column names that can be updated here
        const validColumns = ["name", "dob", "size", "breed", "sex", "color",
                              "desc_1", "desc_2", "date_entered", "image_url",
                              "novice_friendly", "kid_friendly", "dog_friendly", "cat_friendly", "stranger_friendly",
                              "playfulness", "energy_level", "exercise_needs"]
    
        // loop through the updateForm object's keys to construct SET clause string to update the database
        //  ex. {"size": "medium", "kid_friendly": false} -> `size='medium', kid_friendly=false`             
        const setClauseString = Object.keys(updateForm).map(
            function(key) {
                const value = updateForm[key]
                if (!validColumns.includes(key)) { // checking if the key matches an actual column
                    throw new BadRequestError(`${key} is not a valid column`)
                }
                //  also check for valid size and sex values while we're at it
                if (key==="size" && !["small", "medium", "large"].includes(value)) {
                    throw new BadRequestError(`Invalid size: ${value}`)
                }
                if (key==="sex" && !["m", "f"].includes(value)) {
                    throw new BadRequestError(`Invalid sex: ${value}`)
            }
            // NOTE: the stringify and replacing double quotes with single quotes seems a bit hacky and
            //      I feel like it wouldn't work with some edge cases but this seems to work for now
            // NOTE: strings need to be in single quotes for SQL queries, double quotes seem to cause 500 errors
            return `${key} = ${JSON.stringify(value).replaceAll("\"", "'")}` // ex. size='medium'
            }
        ).join(", ")
        
        const query = `
            UPDATE dogs
            SET ${setClauseString}
            WHERE id = $1 AND shelter_id = $2
            RETURNING *;
            `

        const result = await db.query(query, [dogId, shelterId])
        
        // checking if the query actually found a dog with that dogId to update
        if (result.rowCount == 0) {
            throw new BadRequestError(`There is no dog with id ${dogId} at shelter id ${shelterId}`)
        }

        return result.rows[0]
    }

    
    // called in DELETE request to /dog-records/:dogId
    static async deleteDogRecord(shelterId, dogId) {
        if (!shelterId) {
            throw new BadRequestError("No userId provided")
        }
        if (!dogId) {
            throw new BadRequestError("No dogId provided")
        }

        const query = `
            DELETE FROM dogs
            WHERE shelter_id = $1 AND id = $2
            RETURNING id
            `
        const result = await db.query(query, [shelterId, dogId])

        // checking if the query actually deleted anything (if the pairing exists)
        if (result.rowCount == 0) {
            throw new BadRequestError(`There is no dog with id ${dogId} at shelter id ${shelterId}`)
        }

        return result.rows[0]
    }

}

module.exports = DogRecords
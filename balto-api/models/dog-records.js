const db = require("../db")
const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class DogRecords {

    // called in GET request to /dog-records/
    static async listDogRecordsForShelter(shelterId) {
        if (!shelterId) {
            throw new BadRequestError("No shelterId provided")
        }

        // get all the rows in nutrition where the shelter_id column matches the shelterId parameter
        // TODO: revisit how we want to order the data; alternatively could just do this all on the frontend
        const query = `
            SELECT * FROM dogs
            WHERE shelter_id = $1
            ORDER BY created_at ASC
            `
        const result = await db.query(query, [shelterId])
        return result.rows
    }

    // called in POST request to /dog-records/
    // TODO: incomplete
    static async createDogRecord(dogRecordForm, shelterId) {
        if (!shelterId) {
            throw new BadRequestError("No shelterId provided")
        }

        // throw error if any required fields are missing
        const requiredFields = ["name", "dateOfBirth", "size", "breed", "sex", "color",
                                "desc1", "desc2", "dateEntered", "imageUrl"]

        requiredFields.forEach((field) => {
            if (!dogRecordForm.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        const query = `
            INSERT INTO dogs (
                name,
                dob,
                size,
                breed,
                sex,
                color,
                desc_1,
                desc_2,
                date_entered,
                image_url,
                shelter_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id, name, dob, size, breed, color, desc_1, desc_2, date_entered, image_url, shelter_id;
            `

        const result = await db.query(query, [dogRecordForm.name,
                                              dogRecordForm.dateOfBirth,
                                              dogRecordForm.size,
                                              dogRecordForm.breed,
                                              dogRecordForm.sex,
                                              dogRecordForm.color,
                                              dogRecordForm.desc1,
                                              dogRecordForm.desc2,
                                              dogRecordForm.dateEntered,
                                              dogRecordForm.imageUrl,
                                              shelterId
                                             ])
        return result.rows[0]
    }

    static async fetchDogRecordById( dogId, shelterId ) {
        if (!dogId) {
            throw new BadRequestError("No dogId provided")
        }
        if (!shelterId) {
            throw new BadRequestError("No shelterId provided")
        }

        // get all the rows in nutrition where the shelter_id column matches the shelterId parameter
        const query = `
            SELECT * FROM dogs
            WHERE id = $1 AND shelter_id = $2;
            `
        const result = await db.query(query, [dogId, shelterId])

        console.log(3465, result.rows)
        if (result.rows.length === 0) {
            throw new UnauthorizedError("The requested dog record is not at this shelter")
        } 

        return result.rows
    }

}

module.exports = DogRecords
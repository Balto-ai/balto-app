const db = require("../db")
const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class DogRecords {

    static async listDogRecordsForShelter(shelterId) {
        if (!shelterId) {
            throw new BadRequestError("No shelterId provided")
        }

        // get all the rows in nutrition where the shelter_id column matches the shelterId parameter
        // TODO: revisit how we want to order the data; alternatively could just do this all on the frontend
        const query = `SELECT * FROM dogs
                       WHERE shelter_id = $1
                       ORDER BY created_at ASC
                      `
        const result = await db.query(query, [shelterId])
        return result.rows
    }

}

module.exports = DogRecords
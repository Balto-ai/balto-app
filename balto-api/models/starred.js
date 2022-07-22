const db = require("../db")
const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class Starred {

    // called in GET request to /user/starred
    static async listStarredDogsForUser(userId) {
        if (!userId) {
            throw new BadRequestError("No userId")
        }

        // CHANGE BACK TO USER PARAMETER
        const query = `
            SELECT * FROM user_dog_pairings
            ORDER BY created_at ASC
            `
        const result = await db.query(query)
        return result.rows
    }

    // called in POST response to /user/starred
    static async createUserDogPairing(userId, dogId) {
        // make sure there isn't already a pairing with the two supplied IDs
        const existingPairing = await Starred.fetchUserDogPairing(userId, dogId)
        if (existingPairing) {
            throw new BadRequestError("Duplicate pairing")
        }

        const query = `
            INSERT INTO user_dog_pairings (user_id, dog_id)
            VALUES ($1, $2)
            RETURNING *
            `     
        const result = await db.query(query, [userId, dogId])
        return result.rows
    }

    // called in DELETE response to /user/starred
    static async deleteUserDogPairing(userId, dogId) {
        if (!userId) {
            throw new BadRequestError("No userId provided")
        }
        if (!dogId) {
            throw new BadRequestError("No dogId provided")
        }

        const query = `
            DELETE FROM user_dog_pairings
            WHERE user_id = $1 AND dog_id = $2
            RETURNING id
            `
        const result = await db.query(query, [userId, dogId])

        // checking if the query actually deleted anything (if the pairing exists)
        if (result.rowCount == 0) {
            throw new BadRequestError("Pairing does not exist")
        }
    }


    // check if there is already a specific user dog pairing in the database
    static async fetchUserDogPairing(userId, dogId) {
        console.log("in fetchUserDogPairing", userId, dogId)
        if (!userId) {
            throw new BadRequestError("No userId provided")
        }
        if (!dogId) {
            throw new BadRequestError("No dogId provided")
        }

        const query = `
            SELECT * FROM user_dog_pairings
            WHERE user_id = $1 AND dog_id = $2
            `
        const result = await db.query(query, [userId, dogId])
        return result.rows[0]
    }

}

module.exports = Starred
const db = require("../db")
const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class Starred {

    // called in GET request to /user/starred
    static async listStarredDogsForUser(userId) {
        if (!userId) {
            throw new BadRequestError("No userId")
        }

        // merge user_dog_pairings and dogs and shelter to get coordinates
        const query = `
            SELECT dogs.id AS dog_id, dogs.name, dogs.breed, dogs.dob, dogs.image_url,
                shelters.longitude, shelters.latitude
            FROM user_dog_pairings
            INNER JOIN dogs
                ON user_dog_pairings.dog_id = dogs.id
            INNER JOIN shelters
                ON dogs.shelter_id = shelters.id
            WHERE user_dog_pairings.user_id = $1
            ORDER BY user_dog_pairings.created_at DESC;
            `
        const result = await db.query(query, [userId])
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

    // fetch each individual dog from a dog id
    static async fetchStarredDogById(dogId) {
        if (!dogId) {
            throw new BadRequestError("No dogId provided")
        }

        const query = `
            SELECT * FROM dogs
            WHERE dogs.id = $1
            `
        const result = await db.query(query, [dogId])

        if (result.rows.length === 0) {
            throw new UnauthorizedError("The starred dog does not exist")
        }

        return result.rows
    }

}

module.exports = Starred
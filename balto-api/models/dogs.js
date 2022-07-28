const db = require("../db")
const { BadRequestError } = require("../utils/errors")

class Dogs {
    static async fetchDogInfo(dogId) {
        if (!dogId) {
            throw new BadRequestError("No dog id provided")
        }

        const query = `
            SELECT * FROM dogs
            WHERE id = $1
            `
        const result = await db.query(query, [dogId])
        return result.rows
    }
}

module.exports = Dogs;
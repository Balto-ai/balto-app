const db = require("../db")

const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class Milestone {

    // get all milestones for specific dog id
    static async fetchMilestones(dogId) {
        if (!dogId) {
            throw new BadRequestError("No dog id provided")
        }
        const query = `
            SELECT *
            FROM milestones
            WHERE dog_id = $1;
            `
        const result = await db.query(query, [dogId])
        return result.rows
    }
    
}

module.exports = Milestone

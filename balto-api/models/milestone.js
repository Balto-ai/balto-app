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

    // create a milestone for a dog
    static async createMilestone(form, dogId) {
        if (!dogId) {
            throw new BadRequestError("No dog id provided")
        }
        const query = `
            INSERT INTO milestones (
                name, 
                status, 
                minutes, 
                notes,
                dog_id
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, status, minutes, notes, dog_id, created_at;
        `
        const result = await db.query(query, [
            form.name, form.status, form.minutes, form.notes, dogId])
        
        const milestone = result.rows[0]
        return milestone
    }

    // update a milestone for a dog
    static async updateMilestone(form, dogId) {
        if (!dogId) {
            throw new BadRequestError("no dog id provided")
        }
        const query = `
            UPDATE milestones
            SET name = $1, status = $2, minutes = $3, notes = $4
            WHERE dog_id = $5
            RETURNING *;
        `
        const result = await db.query(query, [form.name, form.status, form.minutes, form.notes, dogId])

        const milestone = result.rows[0]
        return milestone
    }

    // delete a milestone for a dog
    static async deleteMilestone(dogId) {
        if (!dogId) {
            throw new BadRequestError("no dog id provided")
        }
        const query = `
            DELETE FROM milestones
            WHERE dog_id = $1
            REtURNING *;
        `
        const result = await db.query(query, [dogId])
        
        const milestone = result.rows[0]
        return milestone
    }

}

module.exports = Milestone

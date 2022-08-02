const db = require("../db")

const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class Adoptions {

    // get adoption inquiries for specific dog
    static async fetchAdoptionInquiryByDog(dogId) {
        if (!dogId) {
            throw new BadRequestError("No dog id provided")
        }

        const query = `
            SELECT * FROM adoption_inquiries
            WHERE dog_id = $1
            ORDER BY created_at ASC;
            `
        const result = await db.query(query, [dogId])
        return result.rows
    }

    // get adoption inquiries for specific user
    static async fetchAdoptionInquiryByUser(userId) {
        if (!userId) {
            throw new BadRequestError("No dog id provided")
        }

        const query = `
            SELECT * FROM adoption_inquiries
            WHERE user_id = $1
            ORDER BY created_at ASC;
            `
        const result = await db.query(query, [userId])
        return result.rows
    }

 

    // get adoption inquiries for specific dog
    static async fetchAdoptionInquiryByDogAndUser(dogId, userId) {
        if (!dogId) {
            throw new BadRequestError("No dog id provided")
        }
        if (!userId) {
            throw new BadRequestError("No user id provided")
        }

        const query = `
            SELECT id FROM adoption_inquiries
            WHERE dog_id = $1 AND user_id = $2;
            `
        const result = await db.query(query, [dogId, userId])
        return result.rows
    }

    // get all adoption inquiries in the db
    static async fetchAllAdoptionInquiries() {
        const query =  `
            SELECT * FROM adoption_inquiries
            ORDER BY created_at ASC;
        `

        const result = await db.query(query, [])
        return result.rows
    }

    // create an adoption inquiry
    static async createAdoptionInquiry(form, userId, dogId) {

        if (!userId) {
            throw new BadRequestError("No userId provided")
        }
        if (!dogId) {
            throw new BadRequestError("No dogId provided")
        }
        if (!form) {
            throw new BadRequestError("No form provided")
        }

        const existingAdoptionInquiry = await Adoptions.fetchAdoptionInquiryByDogAndUser(dogId, userId)
        if (existingAdoptionInquiry.length > 0) {
            throw new BadRequestError("This adoption inquiry already exists")
        }

        const query = `
            INSERT INTO adoption_inquiries
            (email, phone_number, comments, user_id, dog_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `

        const result = await db.query(query, [form.email, form.phoneNumber, form.comments, userId, dogId])
        return result.rows
    }

    // delete an adoption inquiry
    static async deleteAdoptionInquiry(userId, dogId) {
        if (!userId) {
            throw new BadRequestError("No userId provided")
        }
        if (!dogId) {
            throw new BadRequestError("No dogId provided")
        }

        const query = `
            DELETE FROM adoption_inquiries
            WHERE user_id = $1 AND dog_id = $2
            RETURNING *;
        `
        const result = await db.query(query, [userId, dogId])

        if (result.rowCount = 0) {
            throw new BadRequestError("Adoption Inquiry does not exist")
        }

    }

}

module.exports = Adoptions

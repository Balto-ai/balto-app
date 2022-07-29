const db = require("../db")

const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class Dogs {

    // get dog info for specific dog id
    static async fetchDogInfo(dogId) {
        if (!dogId) {
            throw new BadRequestError("No dog id provided")
        }

        const query = `
            SELECT *, dogs.id as dog_id, shelters.id as shelter_id,
            dogs.name as dog_name, shelters.name as shelter_name
            FROM dogs
            INNER JOIN shelters
            ON dogs.shelter_id = shelters.id
            WHERE dogs.id = $1;
            `
        const result = await db.query(query, [dogId])
        return result.rows
    }

    // used to create IN sql queries using array of strings
    //   ex. ["Yes", "True"] -> `col_name IN ('Yes', 'No')`
    static createStringListQuery(column, arr) {
        if (!arr || arr.length === 0) {
            return null
        }
        const sqlList = "("+arr.map(function(item) {return `'${item}'`}).join(", ")+")"
        return `${String(column)} IN ${sqlList}`
    }

    // used to create IN sql queries using array of numbers
    //   ex. [1, 2] -> `col_name IN (1, 2)`
    static createIntegerListQuery(column, arr) {
        if (!arr || arr.length === 0) {
            return null
        }
        const sqlList = "("+arr.join(", ")+")"
        return `${String(column)} IN ${sqlList}`
    }

    // called in GET request to /dogs/
    static async listDogResults(filters) {

        // if no filters are provided, return all dogs
        if (!filters) {
            // throw new BadRequestError("No filters provided")
            const query = `
                SELECT id, name, dob, breed, image_url, created_at FROM dogs
                ORDER BY created_at ASC
                `
            const result = await db.query(query)
            return result.rows
        }

        // check if everything in filters.size is 'small' or 'medium' or 'large'
        // check if everything in filters.sex is 'm' or 'f'

        const breedQuery = Dogs.createStringListQuery("breed", filters.breed)
        const sizeQuery = Dogs.createStringListQuery("size", filters.size)
        const sexQuery = Dogs.createStringListQuery("sex", filters.sex)
        const shelterQuery = Dogs.createIntegerListQuery("shelter_id", filters.shelterIds)

        const arrayQueryStrings = [breedQuery, sizeQuery, sexQuery, shelterQuery].filter((item)=>item)
        const whereClause = arrayQueryStrings.length > 0 ? 'WHERE ' + arrayQueryStrings.join(" AND ") : ""

        
        const query = `
            SELECT * FROM dogs
            ${whereClause}`
        console.log(query)
        const result = await db.query(query)
        return result.rows

    }
}

module.exports = Dogs

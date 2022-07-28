const db = require("../db")
// const fetch = require("node-fetch")
const BreedsJsonData = require("../breed_info.json")
const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class Search {

    // fetch all dog breed info, including the ratings
    static async fetchDogBreedInfo() {
        return BreedsJsonData.dog_breeds
    }

    // fetch all dog breed names; called for the /search/dog-breeds endpoint
    static async fetchDogBreedNames() {
        return Object.keys(BreedsJsonData.dog_breeds)
    }

    // fetch all shelter names in alphabetical order; called for the search/shelters endpoint
    static async fetchShelters() { 

        const query = `
            SELECT id, name FROM shelters
            ORDER BY name ASC
            `
        const result = await db.query(query)
        return result.rows
    }

}

module.exports = Search
const db = require("../db")

const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class Images {
    //fetchImageById
    // get all images  in the db
    static async fetchAllImages(dogId) {
        if (!dogId){
            throw new BadRequestError("No dogId provided")
        }
         // get all the rows in images where the dog_id column matches the dogId parameter
         const query = `
         SELECT * FROM dog_images
         WHERE dog_id = $1
         ORDER BY created_at ASC
         `

        const result = await db.query(query, [dogId])
        return result.rows
    }

    // create an adoption inquiry
    static async createImage(newImage) {
        if (!newImage) {
            throw new BadRequestError("No image provided")
        }

        const requiredFields = ["imageName", "imageUrl", "dogId"]

        requiredFields.forEach((field)=>{
            if (!newImage.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })
        const query = `
            INSERT INTO dog_images
            (image_name, image_url, dog_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `

        const result = await db.query(query, [newImage.imageName, newImage.imageUrl, newImage.dogId])
        return result.rows
    }
    
    // called in GET request to /images/:imageId
    static async fetchImagebyId(imageId, dogId) {
        if (!imageId) {
            throw new BadRequestError("No imageId provided")
        }
        if (!dogId) {
            throw new BadRequestError("No dogId provided")
        }

        // get image with requested id
        const query = `
            SELECT * FROM dog_images
            WHERE id = $1 AND dog_id = $2;
            `
        const result = await db.query(query, [imageId, dogId])

        // checking if the requested image belongs to the shelter
        if (result.rows.length === 0) {
            throw new UnauthorizedError(`There is no image with id ${imageId}`)
        } 

        return result.rows[0]
    }

    // delete an adoption inquiry
    static async deleteImage(imageId, dogId) {
        if (!imageId) {
            throw new BadRequestError("No imageId provided")
        }
        if (!dogId){
            throw new BadRequestError("No dog record provided")
        }
        const query = `
            DELETE FROM dog_images
            WHERE id = $1 AND dog_id = $2
            RETURNING *;
        `
        const result = await db.query(query, [imageId, dogId])

        if (result.rowCount = 0) {
            throw new BadRequestError("Image does not exist")
        }
        return result.rows[0]
    }

}

module.exports = Images

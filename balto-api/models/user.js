const bcrypt = require("bcrypt")
const db = require("../db")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class User {

    // NOTE: revisit to this to return the needed attributes, this works for now
    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            zipCode: user.zipcode,
            shelterId: user.shelter_id,
        }
    }

    static async login(credentials) {
        // throw error if any crediential fields are missing
        const requiredFields = ["email", "password"]
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body`)
        }})

        // look up user in database with email
        const user = await User.fetchUserByEmail(credentials.email)

        if (user) {
            // compare the submitted password to the one in the database
            const isValid = await bcrypt.compare(credentials.password, user.password)
            // if there is a match, return the user
            if (isValid) {
                return User.makePublicUser(user)
            }
        }
        // else (user is not found), throw an error
        throw new UnauthorizedError("Incorrect email or password")
    }

    static async register(credentials) {
        // throw error if any credential fields are missing
        const requiredFields = ["firstName", "lastName", "zipCode", "email", "password"]
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })

        // NOTE: this is what we did for the lifetracker project
        // check if there is an "@" symbol in the email and that it is not at the start of the string
        // if (credentials.email.indexOf('@') <= 0) {
        //     throw new BadRequestError("Invalid email")
        // }

        // check if the email is valid using a regular expression
        if (!(User.validateEmail(credentials.email))) {
            throw new BadRequestError("Invalid email")
        }

        // check if the zip code is all numeric using a regular expression
        if (!(/^[0-9]+$/.test(String(credentials.zipCode)))) {
            throw new BadRequestError("ZIP code must be numeric")
        }

        // check if the supplied email is already associated with a user
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }
        
        // take the password and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

        // take the email and lowercase it
        const lowercasedEmail = credentials.email.toLowerCase()

        // create a new user in the database with their information
        const result = await db.query(`
            INSERT INTO users (
                first_name,
                last_name,
                zipcode,
                email,
                password,
                shelter_id
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, first_name, last_name, email, password, zipcode, is_admin, created_at, shelter_id;
        `, [credentials.firstName,
            credentials.lastName,
            String(credentials.zipCode),
            lowercasedEmail,
            hashedPassword,
            null
           ])

        // return the user
        const user = result.rows[0]
        return User.makePublicUser(user)
    }

    // look up user by their email
    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()])
        // grab first row and return 
        const user = result.rows[0]

        return user
    }

    // check if an email is valid using a regular expression
    static validateEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(String(email).toLowerCase())
      }

}

module.exports = User
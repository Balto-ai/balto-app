import axios from "axios"
import API_BASE_URL from ".././constants"

class ApiClient {

    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "balto_token"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    // general method to make an API request
    async request({ endpoint, method = "GET", data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`
        const headers = {
            "Content-Type": "application/json"
        }

        // if token exists, attach Authorization header
        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        // return { data, error } object
        try {
            const res = await axios({ url, method, data, headers })
            return { data: res.data, error: null}
        } catch(error) {
            const message = error?.response?.data?.error?.message
            return { data: null, error: message || String(error) }
        }
    }

    // AUTH ===============================================================================

    async login(credentials) {
        return await this.request({ endpoint:'auth/login', method:'POST', data:credentials })
    }

    async signup(credentials) {
        return await this.request({ endpoint:'auth/register', method:'POST', data:credentials })
    }

    async logout() {
        // NOTE: could move this to auth context once that is implemented since it doesn't actually make an API call
        this.setToken(null)
        localStorage.removeItem(this.tokenName)
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint:'auth/me', method:'GET' })
    }


    // DOGS ===============================================================================

    async fetchDogs(filters) {
        return await this.request({ endpoint:'dogs/', method:'POST', data:filters })
    }

    async fetchDogById(dogId) {
        // get information about an individual dog using their ID
        console.log("Calling fetchDogsById in ApiClient")
        return await this.request({ endpoint:`dogs/${dogId}`, method: 'GET'})
    }

    // DOG-RECORDS ===============================================================================
    
    async fetchDogRecords() {
        // get dogs under the user's associated shelter
        return await this.request({ endpoint:'dog-records/', method:'GET' })
    }

    async createDogRecord(dogInformation) {
        // create a new dog record
        return await this.request({ endpoint:'dog-records/', method:'POST', data:dogInformation })
    }

    async fetchDogRecordById(dogId) {
        // get an individual dog record
        return await this.request({ endpoint:`dog-records/${dogId}`, method:'GET' })
    }

    async updateDogRecord(dogId, dogInformation) {
        // edit an individual dog record
        // NOTE: revisit once data structure is clearly defined, can possibly condense to just the dogInformation parameter
        return await this.request({ endpoint:`dog-records/${dogId}`, method:'PUT', data:dogInformation })
    }

    async deleteDogRecord(dogId) {
        // delete an individual dog record
        return await this.request({ endpoint:`dog-records/${dogId}`, method:'DELETE' })
    }


    // MILESTONES ===============================================================================

    async createMilestone(milestoneInformation) {
        // create a new milestone
        return await this.request({ endpoint:'milestone/', method:'POST', data:milestoneInformation })
    }

    async fetchMilestoneById(milestoneId) {
        // get information about an individual milestone
        return await this.request({ endpoint:`milestone/${milestoneId}`, method:'GET'})
    }

    async updateMilestone(milestoneId, milestoneInformation) {
        // edit information about an individual milestone
        // NOTE: revisit once data structure is clearly defined, can possibly condense to just the milestoneInformation parameter
        return await this.request({ endpoint:`milestone/${milestoneId}`, method:'PUT', data:milestoneInformation})
    }

    async deleteMilestone(milestoneId) {
        // delete a milestone
        return await this.request({ endpoint:`milestone/${milestoneId}`, method:'DELETE'})
    }


    // STARRED ===============================================================================

    async fetchStarredDogs() {
        // get all of the dogs a user has starred
        return await this.request({ endpoint:'user/starred', method:'GET' })
    }

    async fetchStarredDog(dogId) {
        return await this.request({ endpoint: `user/starred/${dogId}`, method: 'GET', data: {dogId}})
    }

    async starDog(dogId) {
        // add a dog to the user's starred list
        // called when the user clicks the "Star" button on the dog profile
        return await this.request({ endpoint:`user/starred`, method:'POST' })
    }

    async unstarDog(dogId) {
        // remove a dog from the user's starred list
        // called when the user clicks the "Unstar" button on the dog profile
        return await this.request({ endpoint:`user/starred`, method:'DELETE' })
    }


    // SEARCH ===============================================================================

    async fetchDogBreeds() {
        // get dog breed names
        // used to populate breed select area in dog search page
        return await this.request({ endpoint:`search/dog-breeds`, method:'GET' })
    }

    async fetchShelters() {
        // get shelter names
        // used to populate shelter select area in dog search page
        return await this.request({ endpoint:`search/shelters`, method: 'GET' })
    }

}

export default new ApiClient(API_BASE_URL || "http://localhost:3001")
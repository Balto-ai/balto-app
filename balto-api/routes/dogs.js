const express = require("express")
const router = express.Router()
const Dog = require("../models/Dog")
const security = require("../middleware/security")
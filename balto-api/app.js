const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { PORT } = require("./config")
const security = require("./middleware/security")
const authRoutes = require("./routes/auth")
const dogRecordsRoutes = require("./routes/dog-records")
const userRoutes = require("./routes/user")
const searchRoutes = require("./routes/search")

const { BadRequestError, NotFoundError } = require("./utils/errors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))

app.use(security.extractUserFromJwt)

app.use("/auth", authRoutes)
app.use("/dog-records", dogRecordsRoutes)
app.use("/user", userRoutes)
app.use("/search", searchRoutes)

// 404 error handler
app.use((req, res, next) => {
    return next(new NotFoundError())
})

// generic error handler
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message
    return res.status(status).json({
        error: { message, status }
    })
})

module.exports = app
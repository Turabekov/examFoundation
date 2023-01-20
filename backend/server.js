const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
dotenv.config()

// =========================================================
const router = require("./routes/router")

const app = express()

// body parser middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


// api contacts
app.use("/", router)

// listening server
const PORT = process.env.PORT || 3030
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
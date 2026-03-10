import type { Application } from "express";
import express from "express";
import dotenv from "dotenv"

dotenv.config()

const app:Application = express()
const PORT = process.env.BACKEND_SERVER_PORT || 302

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})  

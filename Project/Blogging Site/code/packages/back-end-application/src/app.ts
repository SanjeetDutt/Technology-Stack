import express from "express";
import {AppRouter, Errorhandler} from "./Controlers";
import cors from "cors"

export const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", AppRouter)
app.use(Errorhandler)
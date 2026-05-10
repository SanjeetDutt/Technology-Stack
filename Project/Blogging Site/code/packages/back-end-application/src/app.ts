import express from "express";
import {AppRouter, Errorhandler} from "./Controlers";

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", AppRouter)
app.use(Errorhandler)
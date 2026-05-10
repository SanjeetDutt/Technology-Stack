import {Router} from "express"
import {SignupRequest} from "../DTO/Request";
import {SignupResponse} from "../DTO/Response";
import {authenticate} from "../Middlewares";

export const userRouter = Router()

userRouter.post("/signup",authenticate([]),async (req,res)=>{
	console.log({req, res})
	res.status(200).json({
		status:"success",
	})
})
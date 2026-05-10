import {Request, Response, NextFunction} from "express"

export const authenticate = (permissions:string[])=>{
	return (req:Request, res:Response, next:NextFunction)=>{
		next()
	}
}
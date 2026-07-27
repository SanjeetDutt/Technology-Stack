import {ErrorRequestHandler, NextFunction} from "express";
import {_ResponseError} from "./Domains/_ResponseError";
import {InternalServerError} from "./Domains/InternnalServerError";

export const Errorhandler:ErrorRequestHandler = (err:_ResponseError|Error|any, req,res,next)=>{

	const handleError = (error:_ResponseError) => {
		const errorCode = error.code
		const errorMessage = error.errorMessage
		const errorDescription = error.description
		res.status(errorCode).json({
			message: errorMessage,
			description: errorDescription
		});
	}

	if(err instanceof _ResponseError){
		handleError(err)
	} else if(err instanceof Error){
		handleError(new InternalServerError(err.message, err.stack))
	}else {
		handleError(new InternalServerError("Internal server error"))
	}

}


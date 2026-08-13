import { Server } from "../Server/Server";
import { IEndpoint } from "./Endpoint";
import { Request } from "./Request";
import Express from "express"

export class Response{
    private status: number = 200

    constructor(params:{
        request: Request,
        response: Express.Response
    }){}

    static Create(
        server: Server, 
        endpoint:IEndpoint, 
        request: Request,
        express: {
            request:Express.Request, 
            response: Express.Response, 
            next: Express.NextFunction
        } 
    ){

        return new Response({
            request: request,
            response: express.response
        })

    }

    static ErrorResponse(
        server: Server,
        req: Request,
        request:Express.Request, 
        response: Express.Response, 
        next: Express.NextFunction
    ){
        return new Response({
            request: req,
            response: response
        })
    }
}
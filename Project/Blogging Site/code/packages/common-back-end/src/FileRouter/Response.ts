import { Request } from "./Request";
import Express from "express"

export class Response{
    private status: number = 200

    constructor(params:{
        request: Request,
        response: Express.Response
    }){}
}
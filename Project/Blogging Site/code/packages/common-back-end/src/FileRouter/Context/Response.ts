import { Server } from "../../Server";
import { Endpoint, IEndpoint } from "../Endpoint";
import { Request } from "./Request";
import Express from "express"

export class Response<R extends Endpoint.RESPONSE = {}>{
    private status: number = 200
    private response: R|null = null
    private request: Request<any>
    private readonly corelationId:string
    private readonly ExpressResponse: Express.Response

    constructor(
        request: Request<any>,
        response: Express.Response
    ){
        this.corelationId = request.corelationId
        this.ExpressResponse = response
        this.request = request
        response.setHeader("Corelation-Id", request.corelationId)
    }

    add(res:R){
        this.request.logger.log("Adding response " + JSON.stringify(res,null,4))
        this.response = res
    }

    submit(res: R|null = this.response, status:number = this.status){
        if(this.ExpressResponse.headersSent){
            this.request.logger.error("Trying the set response after response send to client.")
            return
        }
        this.request.logger.log("Sending response to client " + JSON.stringify({
            status: status, response: res
        },null, 4) )
        this.ExpressResponse
            .status(status)
            .send(res)
    }

    submitIfNot(res: R|null = this.response, status:number = this.status){
        if(this.ExpressResponse.headersSent){
            return
        }
        this.submit(res, status)
    }


}
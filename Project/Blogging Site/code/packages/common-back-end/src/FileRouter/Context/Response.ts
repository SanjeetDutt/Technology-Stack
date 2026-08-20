// import { Server } from "../../Server";
// import { Endpoint, IEndpoint } from "../Endpoint";
import { Logger } from "../../Logger";
import { Request } from "./Request";
// import Express from "express"

export class Response{
    static Builder(){
        return new ResponseBuilder()
    }
    private status: number = 200
    // private response: R|null = null
    private request: Request
    private readonly corelationId:string
    private readonly ExpressResponse: Express.Response

    constructor(
        request: Request,
        response: Express.Response
    ){
        this.corelationId = request.corelationId
        this.ExpressResponse = response
        this.request = request
    }

//     add(res:R){
//         this.request.logger.log("Adding response " + JSON.stringify(res,null,4))
//         this.response = res
//     }

//     submit(res: R|null = this.response, status:number = this.status){
//         if(this.ExpressResponse.headersSent){
//             this.request.logger.error("Trying the set response after response send to client.")
//             return
//         }
//         this.request.logger.log("Sending response to client " + JSON.stringify({
//             status: status, response: res
//         },null, 4) )
//         this.ExpressResponse
//             .status(status)
//             .send(res)
//     }

//     submitIfNot(res: R|null = this.response, status:number = this.status){
//         if(this.ExpressResponse.headersSent){
//             return
//         }
//         this.submit(res, status)
//     }
}

class ResponseBuilder{
    private _request?: Request
    private _expressResponse?: Express.Response

    build(){
        if(!this._request || !this._expressResponse){
            throw new Error(`Error while creating the request`)
        }
        return new Response(
            this._request,
            this._expressResponse
        )
    }

    request(r:Request){
        this._request = r
        return this
    }

    expressResponse(e:Express.Response){
        this._expressResponse = e
        return this
    }
}
import { Request } from "./Request";
import Express from "express"

export class Response<
    B extends any = {}
>{
    static Builder(){
        return new ResponseBuilder()
    }
    private _status: number = 200
    private _body: B = {} as any
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
        this.ExpressResponse.setHeader("Corelation-Id", this.corelationId)
    }

    body(body:B){
        this._body = body
        return this
    }

    status(status:number){
        this._status = status
        return this
    }

    submit(){
        if(this.ExpressResponse.headersSent){
            return
        }
        this.ExpressResponse
            .status(this._status)
            .send(this._body)
    }

    getBody(){
        return this._body
    }
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
import Express from "express"
import { Param } from "./Params";
import { Query } from "./Query";
import {Headers} from "./Headers"
import { Endpoint, HEADER, PARAM, QUERY } from "../Endpoint";
import { IRouter } from "../Router";
import { Method } from "../types";
import { _Properties } from "./_Properties";
import { Logger } from "../../Logger";

export class Request<
    H extends HEADER | undefined = {},
    P extends PARAM | undefined = {},
    Q extends QUERY | undefined = {},
    B extends any = {}
> {

    static Builder(){
        return new _RequestBuilder()
    }

    private readonly endpoint:Endpoint
    private readonly router:IRouter
    private readonly method: Method

    public readonly header: _Properties<H>
    public readonly param: _Properties<P>
    public readonly query: _Properties<Q>
    public readonly payload: B


    private readonly expressRequest: Express.Request
    public readonly corelationId: string
    public readonly timestamp: Date

    constructor(
        endpoint: Endpoint,
        router: IRouter,
        method: Method,
        expressRequest: Express.Request
    ){
        this.header = new Headers<H>(expressRequest)
        this.param = new Param<P>(expressRequest)
        this.query = new Query<Q>(expressRequest)
        this.payload = expressRequest.body as B

        this.endpoint = endpoint
        this.router = router
        this.method = method

        this.corelationId = crypto.randomUUID()
        this.timestamp = new Date()
        this.expressRequest = expressRequest
    }
}

class _RequestBuilder{
    private _endpoint?:Endpoint
    private _router?:IRouter
    private _method?: Method
    private _expressRequest?: Express.Request

    build(){
        if(!this._endpoint || !this._router || !this._method || !this._expressRequest){
            throw new Error(`Error while creating the request`)
        }
        return new Request(
            this._endpoint,
            this._router,
            this._method,
            this._expressRequest
        )
    }
    endpoint(e:Endpoint){
        this._endpoint = e
        return this
    }
    router(r:IRouter){
        this._router = r
        return this
    }
    method(m:Method){
        this._method = m
        return this
    }
    expressRequest(e:Express.Request){
        this._expressRequest = e
        return this
    }
}
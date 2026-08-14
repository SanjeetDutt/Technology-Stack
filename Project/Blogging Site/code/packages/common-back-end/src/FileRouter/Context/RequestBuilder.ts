import { Endpoint, IEndpoint } from "../Endpoint";
import { Server } from "../../Server";
import Express from "express"
import { Request } from "./Request";
import { error } from "next/dist/build/output/log";

class _RequestBuilder<
    B extends Endpoint.BODY = {},
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {}
>{

    private _server?: Server
    private _express?: Express.Request<P,B,Q>
    private _endpoint?: IEndpoint<B,P,Q,any>

    build(){
        if(!this._server){
            throw error("Server not found")
        }

        if(!this._express){
            throw new Error("Express not found in request builder")
        }

        return new Request<B,P,Q>(
            this._server,
            this._express,
            this._endpoint
        )

    }

    server(s: Server){
        this._server = s
        return this
    }

    express(e:Express.Request<P,B,Q>){
        this._express = e
        return this
    }

    endpoint(e: IEndpoint<B,P,Q,any>){
        this._endpoint = e
        return this
    }
}


export const RequestBuilder = <
    B extends Endpoint.BODY = {},
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {}
>()=> new _RequestBuilder<B,P,Q>()
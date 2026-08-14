import { Request } from "./Request";
import Express from "express"
import { Response } from "./Response";
import { Endpoint } from "../Endpoint";

class _ResponseBuilder<R extends Endpoint.RESPONSE = {}> {

    private _request?: Request<any, any, any>
    private _express?: Express.Response

    build(){
        if(!this._express){
            throw new Error("Express not found in the Response builder")
        }

        if(!this._request){
            throw new Error("Request object not found in the respose builder")
        }

        return new Response<R>(
            this._request,
            this._express
        )
    }

    request(r: Request<any, any, any>){
        this._request = r
        return this
    }

    express(e:Express.Response){
        this._express = e
        return this
    }
}

export const ResponseBuilder = <R extends Endpoint.RESPONSE = {}>()=> new _ResponseBuilder<R>()
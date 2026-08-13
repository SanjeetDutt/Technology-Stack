import { Server } from "../../Server";
import { IRouter } from "../Router";
import { Method, Path } from "../types";
import { IAuthentication } from "./IAuthentication";
import { IErrorBoundary } from "./IErrorBoundary";
import { IValidation } from "./IValidation";

export namespace Endpoint{
    export type BODY = any
    export type RESPONSE = any
    export type PARAMS = {[key: string]: string|number}
    export type QUERY = Partial<{[key:string]: string|number}> 
}

export interface IEndpoint<
    B extends Endpoint.BODY,
    P extends Endpoint.PARAMS,
    Q extends Endpoint.QUERY,
    R extends Endpoint.RESPONSE
>{
    getRouter(): IRouter
    getPath(): Path
    getMethod(): Method
    getAuthentication(): IAuthentication[]
    getValidation(): IValidation[]
    getErrorBoundary():IErrorBoundary|undefined
    register(server:Server):void
    call():void
    getRootErrorBoundary():IErrorBoundary|undefined
}
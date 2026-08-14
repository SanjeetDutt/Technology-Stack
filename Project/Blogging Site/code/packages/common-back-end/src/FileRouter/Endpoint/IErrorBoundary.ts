import { ServerError } from "../../Error";
import {Request, Response} from "../Context"
import { Endpoint } from "./IEndpoint";

export interface IErrorBoundary<
    B extends Endpoint.BODY,
    R extends Endpoint.RESPONSE,
    P extends Endpoint.PARAMS={},
    Q extends Endpoint.QUERY={},
>{
    errorBoundary(error?:ServerError,request?:Request<B,P,Q>,response?: Response<R>):Promise<void>|void
}
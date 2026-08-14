import { Endpoint } from "./IEndpoint";
import {Request, Response} from "../Context"

export interface IAuthentication<
    B extends Endpoint.BODY,
    R extends Endpoint.RESPONSE,
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {},
>{
    authentication(request?: Request<B,P,Q>, response?:Response<R>):Promise<void>|void
}
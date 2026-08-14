import { Endpoint } from "./IEndpoint";
import {Request, Response} from "../Context"
export interface IValidation<
    B extends Endpoint.BODY,
    R extends Endpoint.RESPONSE,
    P extends Endpoint.PARAMS={},
    Q extends Endpoint.QUERY={},
>{
    validation(request?:Request<B,P,Q>,response?: Response<R>):Promise<void>|void
}
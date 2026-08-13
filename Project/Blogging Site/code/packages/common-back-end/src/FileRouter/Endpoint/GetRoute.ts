import { Server } from "../../Server";
import { IRouter } from "../Router";
import {Endpoint} from "./IEndpoint"
import {AbstractEndpoint} from "./_Endpoint"
export abstract class GetRoute<
    R extends Endpoint.RESPONSE,
    P extends Endpoint.PARAMS = {},
    Q extends Endpoint.QUERY = {}
> extends AbstractEndpoint<{},P,Q,R>
{
    constructor(router: IRouter){
        super("GET",router)
    }

    register(server:Server){
        server.getExpress().get(this.getPath(), this.handleApplicationRequest(server))
    }
}
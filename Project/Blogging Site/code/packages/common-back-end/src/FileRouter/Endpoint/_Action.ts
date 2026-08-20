import { Logger } from "../../Logger";
import { Request, Response } from "../Context";
import { HEADER, PARAM, PAYLOAD, QUERY, RESPONSE } from "./types";

export interface _ActionConfiguration {
    payload: PAYLOAD,
    response: RESPONSE,
    param?: PARAM,
    query?: QUERY,
    header?: HEADER
}

export abstract class _Action<Config extends _ActionConfiguration>
{
    protected readonly request:Request<Config["header"], Config["param"], Config["query"], Config["payload"]>
    protected readonly response:Response<Config["response"]>
    protected readonly log:Logger

    constructor(request: Request, response:Response, logger:Logger){
        this.request = request
        this.response = response
        this.log = logger
    }
    
}
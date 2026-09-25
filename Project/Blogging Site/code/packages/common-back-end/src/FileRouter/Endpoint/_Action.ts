import { Logger } from "../../Logger";
import { Request, Response } from "../Context";
import { Catelog } from "../Router";
import { HEADER, PARAM, PAYLOAD, QUERY, RESPONSE } from "./types";

export interface ActionConfig {
    PAYLOAD: PAYLOAD,
    RESPONSE: RESPONSE,
    PARAM?: PARAM,
    QUERY?: QUERY,
    HEADER?: HEADER
}

export interface DefaultActionConfig extends ActionConfig{
    PAYLOAD:{}
    RESPONSE:{}
}

export abstract class _Action<Config extends ActionConfig>
{
    protected readonly request:Request<Config>
    protected readonly response:Response<Config>
    protected readonly log:Logger

    constructor(request: Request<Config>, response:Response<Config>, logger:Logger){
        this.request = request
        this.response = response
        this.log = logger
    }
}
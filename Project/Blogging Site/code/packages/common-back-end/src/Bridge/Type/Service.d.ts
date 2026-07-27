import { Auth, Bridge,QueryParams } from ".";

export namespace Service{
    export type Payload = any
    export type Response = any
    export type Context = any

    type Meta<
        PATH extends Bridge.Path,
        AUTH extends Response,
        CONTEXT extends Context = {}
    > = {
        params?: QueryParams.extractParams<PATH>
        method: Bridge.Method,
        auth?: AUTH,
        header?: Object,
        context?: CONTEXT
    }
    
    export type FN<
        PATH extends Bridge.Path,
        PLD extends Payload,
        RES extends Response,
        AUTH extends Response,
        CONTEXT extends Context
    > = (
        payload: PLD,
        meta?: Meta<PATH, AUTH, CONTEXT>
    ) => 
        Promise<RES>
    
    
    export type AUTH<
        PATH extends Bridge.Path,
        PLD extends Payload,
        CONTEXT extends Context
        > = (
            payload?: PLD,
            meta?: Meta<PATH, {}, CONTEXT>
        )=>
            Promise<AUTH>

}
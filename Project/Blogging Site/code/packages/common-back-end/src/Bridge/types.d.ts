import {Router as ExpressRouter, ErrorRequestHandler} from "express"
export namespace Bridge{
    export type Path = `/${string}`
    export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "QUERY"

    export type Params<P extends Path> = Router.RouteParameters<P>

    export type Response = Object
    export type Payload = Object
    export type Query = Object
    export type Auth = Object

    export type ServiceFn<
        PATH extends Path,
        RES extends Response,
        PLD extends Payload = {},
        // AUTH extends Auth = {}
    > = (props:{
        parameter: {},
        payload: PLD,
        query: {},
        method: Method,
        path: PATH
        // auth: AUTH
    })=>Promise<RES>

    export interface ICollection{
        addAction(a:IAction):ICollection
        router():ExpressRouter
        cors():any
    }

    export interface IController{
        getPath():Path
    }

    export type _export<
        P extends Bridge.Params<Bridge.Path>,
        PL extends Bridge.Payload,
        RS extends Bridge.Response
    > = (
            params?: P,
            payload?: PL
    )=>Promise<RS>

    export interface IAction<
        P extends Bridge.Params<Bridge.Path>,
        PL extends Bridge.Payload,
        RS extends Bridge.Response
    >{
        controller(c:IController):IAction<P,PL,RS>
        export():_export<P, PL, RS>
        express(router:ExpressRouter):void
    }

    export type ActionExpressFn<RES extends Response, PLD extends Payload, > =
        (r:ExpressRouter,url: Path, serviceFn:ServiceFn<RES, PLD>)=>void
}

namespace Router{
    type Params = {[key: string]: string}
    type Query = {[key: string]: string}

    //P = Prefix, S = Suffix, W=Whole Word
    type RemoveSuffix<W extends string, S extends string> =
        W extends `${infer P}${S}`? P : W

    type GetParamName<S extends string> =
        RemoveSuffix<S, `/${string}`>

    export type RouteParameters<Route extends Bridge.Path> =
        Route extends `${string}:${infer Rest}`
            ?
            &( // Extracting the first parameters
                GetParamName<Rest> extends never
                    ? Params
                    : {[P in GetParamName<Rest>]: string}
                )
            &(
            Rest extends `${GetParamName<Rest>}/${infer Other}`
                ? RouteParameters<`/${Other}`>
                : unknown
            )
            :{}

    type ExtractQueryObjectFromQueryString<Str extends string>=
        Str extends `${string}&${infer Rest}`
            ?
            :
    export type QueryParameters<Route extends Bridge.Path> =
        Route extends `${string}?${infer queryString}`
            ?
            :{}
}


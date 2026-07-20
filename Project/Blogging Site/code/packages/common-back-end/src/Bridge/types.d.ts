export namespace Bridge{
    export type Path = `/${string}`
    export type Method = "POST"
    export type Params<P extends Path> = Router.RouteParameters<P>
    export type Payload = Object
    export type Request<Params> = {
        params?: Params,
        path: Path,
        method: Method,
        payload?: Payload
        auth?: any
    }
    export type Response = Object
    export type ServiceFn<PL extends Payload, RS extends Response> = (p:PL, r:Request)=>Promise<RS>
}

namespace Router{
    export type Params = {[key: string]: string}
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
}


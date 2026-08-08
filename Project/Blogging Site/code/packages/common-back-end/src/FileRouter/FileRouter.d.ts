export namespace FileRouter {
    export type Path = `/${string}`
    export type Method = "POST" | "PATCH" | "DELETE" | "PUT" | "GET"

    export type MethodHandler = <Payload={}, Body={}>(request: Request<Payload>, response: Response<Body>)=>Promise<Body>| Body
    export type ErrorHandler = <Payload={}>(request: Request<Payload>, error: ServerError)=> Promise<any> | any
    export type StringObject<T = any> = {[key: string]: T}
    export type HeaderType = StringObject

    export interface Request<
        Payload = {}
    > extends Corelation, Headers{
        addParams(params: StringObject<string | number>)
        getParams(): StringObject<string|number>
        addQuery(query: Partial<StringObject<string|number>>)
        getQuery(): Partial<StringObject<string|number>>
        addPayload(payload: Payload)
        getPayload(): Payload
        logger: ILogging
    }

    export interface Response<
        Body = {}
    > extends Corelation, Headers{
        addBody(body: Body)
        getBody(): Body
        setStatus(status: number)
        getStatus(): number
    }
}

interface Corelation{
    getCorelationId(): string
}

interface Headers{
    addHeaders(header: FileRouter.HeaderType)
    getHeaders(): FileRouter.HeaderType
}

namespace Logger{
    export type description = string | Object | Array | number | undefined
    export type LogLevel = "INFO" | "LOG" | "ERROR" | "WARNING"
}
export interface ILogging{
    log(title: string, description?:Logger.description)
    error(title: string, description?: Logger.description)
    info(title: string, description?: Logger.description)
    warning(title: string, description?: Logger.description)
    flush(path: string)
}
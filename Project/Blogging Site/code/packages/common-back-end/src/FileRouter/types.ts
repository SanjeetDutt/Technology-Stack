import { Authentication, Endpoint, ErrorBoundry, Validation } from "./Endpoint";

export namespace FileRouter{
    export type Path = `/${string}`

    export type Method = "POST" | "PATCH" | "DELETE" | "PUT" | "GET"

    export enum FileName {
        AUTH="AUTH",
        VALIDATION = "VALIDATION",
        ERROR = "ERROR",

        POST = "POST",
        PUT = "PUT",
        PATH = "PATCH",
        DELETE = "DELETE",
        GET = "GET"
    }

    export interface EndpointExport{
        path: Path,
        method: Method,
        validation: Validation[],
        authentication: Authentication[],
        errorBoundary: ErrorBoundry | undefined
        endpoint: Endpoint
    }
}
import { Authentication, Endpoint, ErrorBoundry, Validation } from "./Endpoint";

export namespace FileRouter{
    export type Path = `/${string}`

    export type Method = "POST" | "PATCH" | "DELETE" | "PUT" | "GET"

    export enum FileName {
        AUTH="_AUTH",
        VALIDATION = "_VALIDATION",
        ERROR = "_ERROR",
        ROUTE = "ROUTE",
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
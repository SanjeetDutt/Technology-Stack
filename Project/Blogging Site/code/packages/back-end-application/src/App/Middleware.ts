import {ErrorBoundary, RouteConfig} from "common-back-end"

export type DefaultMiddlewareConfig = RouteConfig<{
    PAYLOAD:{},
    RESPONSE:{}
}>

export class DefaultMiddleware extends ErrorBoundary<DefaultMiddlewareConfig>
{
    errorBoundary(): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}
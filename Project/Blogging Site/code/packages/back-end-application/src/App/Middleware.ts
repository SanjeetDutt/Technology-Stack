import {ErrorBoundary, EndpointConfig} from "common-back-end"

export type DefaultMiddlewareConfig = EndpointConfig<{
    payload: {
        msg: string
    },
    response:{}
}>

export class DefaultMiddleware extends ErrorBoundary<DefaultMiddlewareConfig>
{
    errorBoundary(): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}
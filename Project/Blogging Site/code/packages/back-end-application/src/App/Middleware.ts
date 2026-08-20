import {ErrorBoundary} from "common-back-end"

export class DefaultMiddleware extends ErrorBoundary<{
    payload:{},
    response:{}
}>
{
    errorBoundary(): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}
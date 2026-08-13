import { IAuthentication, IEndpoint, IErrorBoundary, IValidation } from "../Endpoint";
import { Path } from "../types";

export interface IRouter{
    addChild(route: IRouter): IRouter
    getPath(): Path
    getRoot():IRouter

    addEndpoint(endpoint: IEndpoint<any, any, any, any>): IRouter

    getEndpoint(): IEndpoint<any, any, any, any>[]
    
    addValidation(validation: IValidation):void
    addAuthentication(authentication:IAuthentication):void
    addErrorBoundary(errorBoundary: IErrorBoundary | undefined): void

    getValidation(): IValidation[]
    getAuthentication(): IAuthentication[]
    getErrorBoundary(): IErrorBoundary | undefined
}
import { IAuthentication, IEndpoint, IErrorBoundary, IValidation } from "../Endpoint";
import { Path } from "../types";

export interface IRouter{
    addChild(route: IRouter): IRouter
    getPath(): Path
    getRoot():IRouter

    addEndpoint(endpoint: IEndpoint<any, any, any, any>): IRouter

    getEndpoint(): IEndpoint<any, any, any, any>[]
    
    addValidation(validation: IValidation<any, any, any, any>):void
    addAuthentication(authentication:IAuthentication<any, any, any, any>):void
    addErrorBoundary(errorBoundary: IErrorBoundary<any, any, any, any> | undefined): void

    getValidation(): IValidation<any, any, any, any>[]
    getAuthentication(): IAuthentication<any, any, any, any>[]
    getErrorBoundary(): IErrorBoundary<any, any, any, any> | undefined
}
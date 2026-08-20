import { Method, Path, SubClass } from "../types";
import {Authentication, Endpoint, ErrorBoundary, Validation} from "../Endpoint"
import {_Action} from "../Endpoint/_Action"

interface DefaultActionConfiguration{
    payload:{}
    response:{}
}

export interface IRouter{
    addChild(route: IRouter): IRouter
    getPath(): Path
    getRoot():IRouter

    addEndpoint(e: (Endpoint)): void
    getEndpoint(): (Endpoint)[]
    
    addValidation(validation: SubClass<Validation<DefaultActionConfiguration>>):void
    addAuthentication(authentication: SubClass<Authentication<DefaultActionConfiguration>>):void
    addErrorBoundary(errorBoundary: SubClass<ErrorBoundary<DefaultActionConfiguration>>): void

    getValidation(): SubClass<Validation<DefaultActionConfiguration>>[]
    getAuthentication(): SubClass<Authentication<DefaultActionConfiguration>>[]
    getErrorBoundary(): SubClass<ErrorBoundary<DefaultActionConfiguration>> | undefined
}
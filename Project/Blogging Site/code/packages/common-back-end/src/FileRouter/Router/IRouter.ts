import { Method, Path, SubClass } from "../types";
import {Authentication, Endpoint, ErrorBoundary, Validation} from "../Endpoint"
import { DefaultActionConfig } from "../Endpoint/_Action";
export interface IRouter{
    addChild(route: IRouter): IRouter
    getPath(): Path
    getRoot():IRouter

    addEndpoint(e: (Endpoint)): void
    getEndpoint(): (Endpoint)[]
    
    addValidation(validation: SubClass<Validation<DefaultActionConfig>>):void
    addAuthentication(authentication: SubClass<Authentication<DefaultActionConfig>>):void
    addErrorBoundary(errorBoundary: SubClass<ErrorBoundary<DefaultActionConfig>>): void

    getValidation(): SubClass<Validation<DefaultActionConfig>>[]
    getAuthentication(): SubClass<Authentication<DefaultActionConfig>>[]
    getErrorBoundary(): SubClass<ErrorBoundary<DefaultActionConfig>> | undefined
}
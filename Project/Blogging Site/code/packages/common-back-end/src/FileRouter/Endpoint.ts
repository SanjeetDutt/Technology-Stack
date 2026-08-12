import { ServerError } from "../Error";
import { Request } from "./Request";
import { Response } from "./Response";
import { IRouter } from "./Router";
import { FileRouter } from "./types";

/**
 * Endpoint
 * - End node in the Router tree
 * - Meta data - call
 */

export interface IEndpoint{
    getRouter(): IRouter
    getPath(): FileRouter.Path
    getMethod(): FileRouter.Method
    getAuthentication(): IAuthentication[]
    getValidation(): IValidation[]
    getErrorBoundary():IErrorBoundry|undefined
    call(request: Request, response: Response):void
}

abstract class AbstractEndpoint implements IEndpoint{
    protected readonly method: FileRouter.Method
    protected readonly router: IRouter
    
    constructor(method: FileRouter.Method, router: IRouter){
        this.method = method
        this.router = router
    }
    getAuthentication(): IAuthentication[] {
        //TODO: add route auth
        return this.router.getAuthentication()
    }
    getValidation(): IValidation[] {
        return this.router.getValidation()
    }
    getErrorBoundary(): IErrorBoundry|undefined {
        return this.router.getErrorBoundary()
    }

    getRouter(){
        return this.router
    }

    getPath(){
        return this.router.getPath()
    }

    getMethod(){
        return this.method
    }
    
    abstract call(request: Request, response: Response):void
}

export abstract class GetRoute extends AbstractEndpoint
{
    constructor(router: IRouter){
        super("GET",router)
    }
}
export abstract class PutRoute extends AbstractEndpoint
{
    constructor(router: IRouter){
        super("PUT", router)
    }
}
export abstract class PatchRoute extends AbstractEndpoint
{
    constructor(router: IRouter){
        super("PATCH", router)
    }
}
export abstract class PostRoute extends AbstractEndpoint
{
    constructor(router: IRouter){
        super("POST", router)
    }
}
export abstract class DeleteRoute extends AbstractEndpoint
{
    constructor(router: IRouter){
        super("DELETE", router)
    }
}


export interface IValidation
{
    validation(request: Request):void
}

export interface IAuthentication
{
    authentication(request:Request, response: Response):void
}

export interface IErrorBoundry
{
    errorBoundry(request: Request, response: Response, error: ServerError):void
}
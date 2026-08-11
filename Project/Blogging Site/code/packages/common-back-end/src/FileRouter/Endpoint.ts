import { ServerError } from "../Error";
import { Request } from "./Request";
import { Response } from "./Response";
import { Router } from "./Router";
import { FileRouter } from "./types";

/**
 * Endpoint
 * - End node in the Router tree
 * - Meta data - call
 */
export abstract class Endpoint{
    protected readonly path: FileRouter.Path
    protected readonly method: FileRouter.Method
    private parentRouter: Router|undefined
    
    constructor(method: FileRouter.Method, path: FileRouter.Path,){
        this.method = method
        this.path = path
    }

    getParrent(){
        return this.parentRouter
    }

    getPath(){
        return this.path
    }

    getMethod(){
        return this.method
    }

    addParentRoute(parent:Router){
        this.parentRouter = parent
    }
    
    abstract call(request: Request, response: Response):void
}

export interface Validation{
    validation(request: Request):void
}

export interface Authentication{
    authentication(request:Request, response: Response):void
}

export interface ErrorBoundry{
    errorBoundry(request: Request, response: Response, error: ServerError):void
}
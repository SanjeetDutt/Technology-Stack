/**
 * Router class
 * - define as a node of the tree
 * - Meta-data = path
 * - Children = Router / Endpoint
 */

import e from "cors";
import { Endpoint, Authentication, Validation, ErrorBoundry } from "./Endpoint";
import { FileRouter } from "./types";

export class Router{
    private readonly path: FileRouter.Path
    private authentication: Authentication|undefined
    private validation: Validation|undefined
    private errorBoundry: ErrorBoundry | undefined
    private parrentRouter: Router | undefined

    private readonly endpoints:  Endpoint[]
    private readonly childRoute : Router[]

    constructor(path: FileRouter.Path){
        this.path = path
        this.endpoints = []
        this.childRoute = []
    }

    addAuthentication(authentication:Authentication){
        this.authentication = authentication
    }

    addValidation(validation: Validation){
        this.validation = validation
    }

    addErrorBoundry(errorBoundry: ErrorBoundry){
        this.errorBoundry = errorBoundry
    }

    addEndpoint(endpoint: Endpoint){
        endpoint.addParentRoute(this)
        this.endpoints.push(endpoint)
    }

    addRouter(router:Router){
        this.childRoute.push(router)
        router.addParent(this)
    }

    addParent(parentRouter: Router){
        this.parrentRouter = parentRouter
    }

    getPath():FileRouter.Path{
        let parentRouter = this.parrentRouter?.getPath()
        if(!parentRouter){
            return this.path
        }

        if(parentRouter.endsWith("/")){
            return `${parentRouter}${this.path.slice(1)}`
        }

        return `${parentRouter}${this.path}`
        
    }

    getValidationStack():Validation[]{
        const stack: Validation[]=[]
        if(this.validation){
            stack.push(this.validation)
        }
        if(this.parrentRouter){
            stack.push(...this.parrentRouter.getValidationStack())
        }
        return stack
    }

    getAuthenticationStack():Authentication[]{
        const stack:Authentication[] =[]
        if(this.authentication){
            stack.push(this.authentication)
        }
        if(this.parrentRouter){
            stack.push(...this.parrentRouter.getAuthenticationStack())
        }
        return stack
    }

    getErrorBoundary():ErrorBoundry|undefined{
        if(this.errorBoundry){
            return this.errorBoundry
        }
        return this.parrentRouter?.getErrorBoundary()
    }

    // Return a list of all endpoints
    getAllEndpoints():FileRouter.EndpointExport[]{
        const endpoints: FileRouter.EndpointExport[] = [
            ...this.endpoints.map(e=>{
                const validationStack: Validation[] = []
                const authenticationStack: Authentication[]=[]
                if(e.getParrent()){
                    validationStack.push(...e.getParrent()!.getValidationStack())
                    authenticationStack.push(...e.getParrent()!.getAuthenticationStack())
                }

                if(isAuthentication(e)){
                    authenticationStack.push(e)
                }

                if(isValidation(e)){
                    validationStack.push(e)
                }

                return {
                    path: e.getPath(),
                    method: e.getMethod(),
                    validation:validationStack,
                    authentication:authenticationStack,
                    errorBoundary: isError(e) ? e : e.getParrent()?.getErrorBoundary(),
                    endpoint: e
                }
            })
        ]
        for(const childRoute of this.childRoute){
            endpoints.push(...childRoute.getAllEndpoints())
        }
        return endpoints
    }

}

function isAuthentication(obj:any):obj is Authentication{
    return(
        obj &&
        obj.authentication
    )
}

function isValidation(obj:any):obj is Validation{
    return(
        obj &&
        obj.validation
    )
}

function isError(obj:any):obj is ErrorBoundry{
    return(
        obj &&
        obj.errorBoundary
    )
}
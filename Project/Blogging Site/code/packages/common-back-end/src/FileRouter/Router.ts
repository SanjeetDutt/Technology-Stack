/**
 * Router class
 * - define as a node of the tree
 * - Meta-data = path
 * - Children = Router / Endpoint
 */

import { IAuthentication, IValidation, IErrorBoundry, IEndpoint } from "./Endpoint";
import { FileRouter } from "./types";

export interface IRouter{
    addChild(route: IRouter): IRouter
    getPath(): FileRouter.Path

    addEndpoint(endpoint: IEndpoint): IRouter

    getEndpoint(): IEndpoint[]
    
    addValidation(validation: IValidation):void
    addAuthentication(authentication:IAuthentication):void
    addErrorBoundary(errorBoundary: IErrorBoundry | undefined): void

    getValidation(): IValidation[]
    getAuthentication(): IAuthentication[]
    getErrorBoundary(): IErrorBoundry | undefined
}

export class Router implements IRouter{
    //Meta data
    private readonly path: FileRouter.Path

    // If parent is undefined them the router node is master node
    private readonly parrent: IRouter | undefined
    private readonly child : IRouter[]

    // GUARDS
    private readonly authentication: IAuthentication[]
    private readonly validation: IValidation[]
    private errorBoundry: IErrorBoundry | undefined

    // Enpoints
    private readonly endpoints:  IEndpoint[]
    

    constructor(path: FileRouter.Path, parent?: IRouter){
        this.path = this.extractPath(path, parent)
        this.parrent = parent
        this.endpoints = []
        this.child = []

        if(parent){
            parent.addChild(this)
        }

        this.authentication = [...parent?.getAuthentication() || []]
        this.validation = [...parent?.getValidation() || []]
        this.errorBoundry = parent?.getErrorBoundary()
    }

    private extractPath(path: FileRouter.Path, parent?: IRouter):FileRouter.Path{
        if(!parent){
            return path
        }

        const parentPath = parent.getPath()

        if(parentPath.endsWith("/")){
            return `${parentPath}${path.slice(1)}`
        }

        return `${parentPath}${path}`
    }

    addChild(route: IRouter):IRouter{
        this.child.push(route)
        return this
    }

    addGuard(_class: any):IRouter{
        return this
    }

    addEndpoint(endpoint: IEndpoint):IRouter{
        this.endpoints.push(endpoint)
        return this
    }

    getPath():FileRouter.Path{
        return this.path
    }

    addValidation(validation: IValidation){
        this.validation.push(validation)
    }

    addAuthentication(authentication:IAuthentication){
        this.authentication.push(authentication)
    }

    addErrorBoundary(eb: IErrorBoundry | undefined){
        this.errorBoundry = eb
    }

    getAuthentication(){
        return this.authentication
    }

    getErrorBoundary(){
        return this.errorBoundry
    }

    getValidation(){
        return this.validation
    }

    getEndpoint(){
        return[
            ... this.endpoints,
            ... this.child.map(c=>c.getEndpoint()).flat()
        ]
    }

}
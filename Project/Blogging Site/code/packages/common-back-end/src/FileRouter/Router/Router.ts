/**
 * Router class
 * - define as a node of the tree
 * - Meta-data = path
 * - Children = Router / Endpoint
 */

// import { IAuthentication, IValidation, IErrorBoundary, IEndpoint } from "../Endpoint";
import { Path, SubClass } from "../types";
import { IRouter } from "./IRouter";
import {Authentication, Endpoint, ErrorBoundary, Validation} from "../Endpoint"
import {_Action} from "../Endpoint/_Action"

interface DefaultActionConfiguration{
    payload: {}
    response:{}
}

export class Router implements IRouter{
    //Meta data
    private readonly path: Path

    // If parent is undefined them the router node is master node
    private readonly parrent: IRouter | undefined
    private readonly child : IRouter[]

    // // GUARDS
    private readonly authentication: SubClass<Authentication<DefaultActionConfiguration>>[]
    private readonly validation: SubClass<Validation<DefaultActionConfiguration>>[]
    private errorBoundry: SubClass<ErrorBoundary<DefaultActionConfiguration>> | undefined

    // // Enpoints
    private readonly endpoints: Endpoint[]
    

    constructor(path: Path, parent?: IRouter){
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

    getRoot():IRouter{
        if(this.parrent){
            return this.parrent.getRoot()
        }

        return this
    }

    private extractPath(path: Path, parent?: IRouter):Path{
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

    addEndpoint(endpoint: Endpoint):void{
        this.endpoints.push(endpoint)
        endpoint.addRouter(this)
    }

    getPath():Path{
        return this.path
    }

    addValidation(validation:SubClass<Validation<DefaultActionConfiguration>>){
        this.validation.push(validation)
    }

    addAuthentication(authentication:SubClass<Authentication<DefaultActionConfiguration>>){
        this.authentication.push(authentication)
    }

    addErrorBoundary(eb:SubClass<ErrorBoundary<DefaultActionConfiguration>>){
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

    getEndpoint():Endpoint[]{
        return[
            ... this.endpoints,
            ... this.child.map(c=>c.getEndpoint()).flat()
        ]
    }

}
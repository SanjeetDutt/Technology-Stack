import e from "cors";
import { Endpoint } from "./Endpoint";

export type Path = `/${string}`
export type Method = "POST" | "PATCH" | "DELETE" | "PUT" | "GET"
export class Router{
    private readonly path: Path;
    private readonly subRoutes: Router[]
    private authentication?: any
    private error?: any
    private endpoints:{[key in Method]?: any}

    constructor(path: Path){
        this.path = path
        this.subRoutes = []
        this.endpoints = {}
    }

    public addPath(path: Path){
        const subRoute = new Router(path)
        this.subRoutes.push(subRoute)
        return subRoute
    }

    public addAuth(fn: any){
        this.authentication = fn
    }

    public addMethod(method: Method, fn: any){
        this.endpoints[method] = fn
    }

    public addError(fn: any){
        this.error = fn
    }

    public getRoutes(parentPath?: Path, parentAuth?: any[], parentError?: any){
        const url:Path = parentPath && parentPath!=="/" ? `${parentPath}${this.path}` : this.path
        const authArray: any[] = [...parentAuth||[], this.authentication]
        const error:any = this.error || parentError

        let endpoints:Endpoint[] = []
        for(const [method, fn] of Object.entries(this.endpoints)){
            endpoints.push(new Endpoint(method as Method, url, authArray, error))
        }
        if(this.subRoutes){
            this.subRoutes.forEach(r=>{
                endpoints = [
                    ...endpoints,
                    ...r.getRoutes(
                        url,
                        authArray,
                        error
                    )
                ]
            })
        }
        return endpoints
    }
}
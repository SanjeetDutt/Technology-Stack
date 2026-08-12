import { ScanDrive } from "./Core";
import { IEndpoint } from "./Endpoint";
import { Router } from "./Router";
import { FileRouter } from "./types";

export async function LoadRouter(directory: string):Promise<IEndpoint[]>{
    const root = new Router("/")
    await ScanDrive(directory, root)
    const endpoints = root.getEndpoint()
    checkForDuplicateEndpoints(endpoints)
    return endpoints
}

export * from "./Endpoint"
export * from "./Request"
export * from "./Response"

function checkForDuplicateEndpoints(endpoints: IEndpoint[]){
    const endpointSet:{
        path: FileRouter.Path,
        method: FileRouter.Method
    }[] = []

    for(const endpoint of endpoints){
        const hasEndpointInSet = !!endpointSet.find(e=>(
            e.method === endpoint.getMethod() &&
            e.path === endpoint.getPath()
        ))
        if(hasEndpointInSet){
            throw new Error(`Duplicate endpoint found Method:${endpoint.getMethod()} Path:${endpoint.getPath()}`)
        }

        endpointSet.push({
            method: endpoint.getMethod(),
            path: endpoint.getPath()
        })
    }
}
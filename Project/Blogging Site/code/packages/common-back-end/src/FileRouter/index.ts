import { ScanDrive } from "./Core";
import { Router } from "./Router";
import { FileRouter } from "./types";

export async function LoadRouter(directory: string){
    const root = new Router("/")
    await ScanDrive(directory, root)
    const endpoints = root.getAllEndpoints()
    checkForDuplicateEndpoints(endpoints)
    return endpoints
}

export * from "./Endpoint"
export * from "./Request"
export * from "./Response"

function checkForDuplicateEndpoints(endpoints: FileRouter.EndpointExport[]){
    const endpointSet:{
        path: FileRouter.Path,
        method: FileRouter.Method
    }[] = []

    for(const endpoint of endpoints){
        const hasEndpointInSet = !!endpointSet.find(e=>(
            e.method === endpoint.method &&
            e.path === endpoint.path
        ))
        if(hasEndpointInSet){
            throw new Error(`Duplicate endpoint found Method:${endpoint.method} Path:${endpoint.path}`)
        }

        endpointSet.push({
            method: endpoint.method,
            path: endpoint.path
        })
    }
}
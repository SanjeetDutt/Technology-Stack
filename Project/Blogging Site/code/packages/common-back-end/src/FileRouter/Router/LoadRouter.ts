import { ScanDrive } from "../Core";
import { IEndpoint } from "../Endpoint";
import { Router } from "./Router";
import { Path, Method } from "../types";

export async function LoadRouter(directory: string):Promise<IEndpoint<any,any,any,any>[]>{
    const root = new Router("/")
    await ScanDrive(directory, root)
    const endpoints = root.getEndpoint()
    checkForDuplicateEndpoints(endpoints)
    return endpoints
}

function checkForDuplicateEndpoints(endpoints: IEndpoint<any,any,any,any>[]){
    const endpointSet:{
        path: Path,
        method: Method
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
import fs,{ Dirent } from "fs";
import { IRouter, Router } from "./Router";
import { Method, Path, SubClass } from "./types";
import path from "path";
import {Authentication, ErrorBoundary, Validation, POST, PATCH, PUT, DELETE, GET, Endpoint} from "./Endpoint"
import {_Action} from "./Endpoint/_Action"
import { _MethodAction } from "./Endpoint/Actions/_MethodAction";

export async function ScanDrive(dir: string, router: IRouter):Promise<void>{
    const contents = fs.readdirSync(dir, {withFileTypes: true})
    for(const content of contents){
        if(content.isDirectory()){
            await ScanDirectory(content, router)
        } else {
            await ScanFile(content, router)
        }
    }
}

// Directory Scanning Area
async function ScanDirectory(directory: Dirent<string>, router: IRouter){
    function stringStartsAndEndWith(str: string, start: string, end: string):boolean{
        return str.startsWith(start)
            && str.endsWith(end)
    }

    async function LoadSubRouteDirectory(dir: Dirent<string>, parentRoute:IRouter, childPath: Path){
        const subRouter = new Router(childPath, parentRoute)
        await ScanDrive(`${dir.parentPath}/${dir.name}`, subRouter)
    }
    // If directory name start with "(" and ends with ")"
    // Means it is a group directory
    // Group directry will group the router without adding path in the URL
    // Useful for adding auth, validation and error boundry for a group of routes
    if(stringStartsAndEndWith(directory.name, "(",")")){
        await LoadSubRouteDirectory(directory,router,"/")
    }

    // If directory name start with "[" and ends with "]"
    // Means it is a variable directory
    // Variable directry will group the router with adding a varaible path in the URL
    // Useful for adding params value
    else if(stringStartsAndEndWith(directory.name,"[","]")){
        const varName = `:${directory.name.slice(1,-1)}`
        await LoadSubRouteDirectory(directory,router,`/${varName}`)
    }

    // Else it means it is a simple directory
    // Will added the string (name of the directory) to the path
    else {
        await LoadSubRouteDirectory(directory,router,`/${directory.name}`)
    }
}

//File Scanning Area
async function ScanFile(file: Dirent<string>, router: IRouter){

    interface DefaultActionConfiguration {
        payload:{}
        response:{}
    }
    
    // If file ends with ROUTE.ts|.js then it is a route endpoint file
    if(_endsWith(file.name, "ROUTE") || _endsWith(file.name, "MIDDLEWARE")){
        const module = await _import(file)
        const endpoint = (method: Method, action: any)=>{
            return new Endpoint(
                method, 
                action as SubClass<_MethodAction<DefaultActionConfiguration>>,
                path.resolve(file.parentPath, file.name)
            )
        }
        for(const [key, value] of Object.entries(module)){
            switch(Object.getPrototypeOf(value).name){
                case Authentication.name:
                    router.addAuthentication(value as SubClass<Authentication<DefaultActionConfiguration>>)
                    break;
                case ErrorBoundary.name:
                    router.addErrorBoundary(value as SubClass<ErrorBoundary<DefaultActionConfiguration>>)
                    break;
                case Validation.name:
                    router.addValidation(value as SubClass<Validation<DefaultActionConfiguration>>)
                    break;
                case POST.name:
                    router.addEndpoint(endpoint("POST", value))
                    break;
                case PUT.name:
                    router.addEndpoint(endpoint("PUT", value))
                    break;
                case PATCH.name:
                    router.addEndpoint(endpoint("PATCH", value))
                    break;
                case GET.name:
                    router.addEndpoint(endpoint("GET", value))
                    break;
                case DELETE.name:
                    router.addEndpoint(endpoint("DELETE", value))
                    break;
                default:
                    console.error(`Method is not defined for ${key}, in file ${file.parentPath}/${file.name}`)
            }
            
        }
    }

    function _endsWith(fileName: string, enumVal: string){
        const keyword = enumVal.trim().toUpperCase()
        const regex = new RegExp(`${keyword}\\.(js|ts)$`,"i")
        return regex.test(fileName.trim().toUpperCase())
    }

    async function _import(file: Dirent<string>):Promise<any>{
        const _path = path.resolve(file.parentPath, file.name)

        try{
            return await import(_path) as any
        } catch(e){
            console.error("IMPORT FAILED : ", e)
            throw e
        }
    }
}


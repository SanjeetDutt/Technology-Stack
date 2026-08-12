import fs,{ Dirent } from "fs";
import { IRouter, Router } from "./Router";
import { FileRouter } from "./types";
import path from "path";
import { IAuthentication, IErrorBoundry, IEndpoint, IValidation } from "./Endpoint";

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

    async function LoadSubRouteDirectory(dir: Dirent<string>, parentRoute:IRouter, childPath: FileRouter.Path){
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
    function endsWith(fileName: string, enumVal: string){
        const keyword = enumVal.trim().toUpperCase()
        const regex = new RegExp(`${keyword}\\.(js|ts)$`,"i")
        return regex.test(fileName.trim().toUpperCase())
    }

    // If file ends with Route.ts or Route.js then it is a route endpoint file
    if(endsWith(file.name, "ROUTE")){
        const module = await importFile(file, router)
        if(isTypeOf<IEndpoint>(module,["call","getMethod","getPath","getRouter"])){
            router.addEndpoint(module as IEndpoint)
        }
    }

    // If file ends with Gurad.ts or Guard.js then it is a middleware file
    if(endsWith(file.name, "MIDDLEWARE")){
        const module = await importFile(file, router)
        if(isTypeOf<IValidation>(module,["validation"])) {
            router.addValidation(module as IValidation)
        }

        if(isTypeOf<IAuthentication>(module,["authentication"])) {
            router.addAuthentication(module as IAuthentication)
        }

        if(isTypeOf<IErrorBoundry>(module,["errorBoundry"])) {
            router.addErrorBoundary(module as IErrorBoundry)
        }

    }
}

async function importFile(file: Dirent<string>,router: IRouter):Promise<any>{
    const {parentPath, name} = file
    const absPath = path.resolve(parentPath, name)

    try{
        const module = (await import(absPath)) as any
        if(!module.default){
            throw new Error(`No default exports found for ${file.parentPath}/${file.name}`)
        }
        const _module = module.default
        return new _module(router) as any
    } catch(error){
        console.error("IMPORT FAILED : ", error)
        throw error
    }
}

function isTypeOf<I extends Object>(instance: any, keys: (keyof I)[]):boolean{
    if(!instance || typeof instance !== "object"){
        return false
    }
    return keys.every(key=>key in instance)
}
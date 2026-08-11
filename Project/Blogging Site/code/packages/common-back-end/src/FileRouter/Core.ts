import fs,{ Dirent } from "fs";
import { Router } from "./Router";
import { FileRouter } from "./types";
import path from "path";
import { LOG } from "./utility";

export async function ScanDrive(dir: string, router: Router):Promise<void>{
    LOG("[.  Scanning Drive ]", dir)
    const contents = getFolderContent(dir)
    for(const content of contents){
        if(content.isDirectory()){
            await ScanDirectory(content, router)
        } else {
            await ScanFile(content, router)
        }
    }
}

function getFolderContent(dir: string){
    return fs.readdirSync(dir, {
        withFileTypes: true
    })
}

// Directory Scanning Area
async function ScanDirectory(directory: Dirent<string>, router: Router){
    // If directory name start with "(" and ends with ")"
    // Means it is a group directory
    // Group directry will group the router without adding path in the URL
    // Useful for adding auth, validation and error boundry for a group of routes
    if(stringStartsAndEndWith(directory.name, "(",")")){
        await LoadGroupDirectory(directory, router)
    }

    // If directory name start with "[" and ends with "]"
    // Means it is a variable directory
    // Variable directry will group the router with adding a varaible path in the URL
    // Useful for adding params value
    else if(stringStartsAndEndWith(directory.name,"[","]")){
        await LoadVariableDirectory(directory, router)
    }

    // Else it means it is a simple directory
    // Will added the string (name of the directory) to the path
    else {
        await LoadDirectory(directory, router)
    }
}

function stringStartsAndEndWith(str: string, start: string, end: string):boolean{
    return str.startsWith(start)
        && str.endsWith(end)
}

async function LoadGroupDirectory(directory: Dirent<string>, router: Router): Promise<void>{
    const subRouter = new Router("/")
    router.addRouter(subRouter)
    await ScanDrive(`${directory.parentPath}/${directory.name}`, subRouter)
}

async function LoadVariableDirectory(directory: Dirent<string>, router: Router): Promise<void>{
    const varName = `:${directory.name.slice(1,-1)}`
    const subRouter = new Router(`/${varName}`)
    router.addRouter(subRouter)
    await ScanDrive(`${directory.parentPath}/${directory.name}`, subRouter)
}

async function LoadDirectory(directory: Dirent<string>, router: Router): Promise<void>{
    const subRouter = new Router(`/${directory.name}`)
    router.addRouter(subRouter)
    await ScanDrive(`${directory.parentPath}/${directory.name}`, subRouter)
}

//File Scanning Area
async function ScanFile(file: Dirent<string>, router: Router){
    if(isSame(file.name, FileRouter.FileName.AUTH)){
        await addAutheication(file, router)
    } 
    else if (isSame(file.name, FileRouter.FileName.VALIDATION)){
        await addValidation(file, router)
    }
    else if(isSame(file.name, FileRouter.FileName.ERROR)){
        await addErrorBoundry(file, router)
    }

    else if(isSame(file.name, FileRouter.FileName.GET)){
        await addMethod("GET",file, router)
    }
    else if(isSame(file.name, FileRouter.FileName.POST)){
        await addMethod("POST",file, router)
    }
    else if(isSame(file.name, FileRouter.FileName.PATH)){
        await addMethod("PATCH",file, router)
    }
    else if(isSame(file.name, FileRouter.FileName.PUT)){
        await addMethod("PUT",file, router)
    }
    else if(isSame(file.name, FileRouter.FileName.DELETE)){
        await addMethod("DELETE",file, router)
    }
}

function isSame(fileName: string, enumVal: string){
    return fileName.trim().toUpperCase().startsWith(enumVal.trim().toUpperCase()) 
}

async function addAutheication(file: Dirent<string>, router: Router){
    LOG("ADDING AUTH")
    const module = await importFile(file)
    if(classHasProperty(module, "authentication")){
        router.addAuthentication(new module())
    }
}

async function addValidation(file: Dirent<string>, router: Router){
    LOG("ADDING VALIDATION")
    const module = await importFile(file)
    if(classHasProperty(module, "validation")){
        router.addValidation(new module())
    }
}

async function addErrorBoundry(file: Dirent<string>, router: Router){
    LOG("ADDING ERROR")
    const module = await importFile(file)
    if(classHasProperty(module, "errorBoundry")){
        router.addErrorBoundry(new module())
    }
}

async function addMethod(method: FileRouter.Method ,file: Dirent<string>, router: Router){
    LOG("ADDING METHOD")
    const module = await importFile(file)
    if(classHasProperty(module, "call")){
        LOG("VALID METHOD")
        const endpoint = new module(method, router.getPath())
        router.addEndpoint(endpoint)
    }
}

async function importFile(file: Dirent<string>){
    const {parentPath, name} = file
    const absPath = path.resolve(parentPath, name)

    try{
        const module = (await import(absPath)) as any
        if(!module.default){
            console.error(`No default exports found for ${file.parentPath}/${file.name}`)
            return
        }
        return module.default
    } catch(error){
        console.error("IMPORT FAILED : ", error)
        throw error
    }
}

function classHasProperty(_class: any, propertyName: string):boolean{
    const check = !!Object.getOwnPropertyNames(_class.prototype).find(e=>e===propertyName)

    if(!check){
        throw new Error(`Class ${_class} doesnot have property ${propertyName}`)
    }

    return check
}

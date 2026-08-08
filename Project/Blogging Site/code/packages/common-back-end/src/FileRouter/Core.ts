import fs from "fs"
import { Router } from "./Router";
import {FileRouter} from "./FileRouter.d"
import { importFile, nameStartsAndEndWith } from "./utility";

function getFolderContent(dir: string){
    return fs.readdirSync(dir, {withFileTypes: true})
}

export async function DirectoryScan(routDir: string, router: Router):Promise<void>{
    const contents = getFolderContent(routDir)
    
    for (const content of contents){
        if(content.isDirectory()){
            if(nameStartsAndEndWith(content.name, "(", ")")){
                await LoadGroupDir(content, router)
            } else if(nameStartsAndEndWith(content.name, "[","]")){
                await LoadVariableDir(content, router)
            } else {
                await LoadDir(content, router)
            }
        } else {
            switch(content.name){
                case "AUTH.ts": await addAuth(content, router); break;
                case "VALIDATION.ts": await addValidation(content, router); break;
                case "ERROR.ts": await addError(content, router); break;
                
                case "POST.ts": await addMethod(content, "POST", router); break;
                case "PUT.ts": await addMethod(content, "PUT", router); break;
                case "PATCH": await addMethod(content, "PATCH", router); break;
                case "DELETE.ts": await addMethod(content, "DELETE", router); break;
                case "GET.ts": await addMethod(content, "GET", router); break;
            }
        }
    }
}

async function LoadGroupDir(content: fs.Dirent<string>, router: Router): Promise<void>{
    const subRoute = router.addPath("/")
    await DirectoryScan(`${content.parentPath}/${content.name}`, subRoute)
}

async function LoadVariableDir(content: fs.Dirent<string>, router: Router): Promise<void>{
    const varName = `:${content.name.slice(1,-1)}`
    const subRoute = router.addPath(`/${varName}`)
    await DirectoryScan(`${content.parentPath}/${content.name}`, subRoute)
}

async function LoadDir(content: fs.Dirent<string>, router: Router):Promise<void>{
    const subRoute = router.addPath(`/${content.name}`)
    await DirectoryScan(`${content.parentPath}/${content.name}`, subRoute)
}

async function addAuth(content: fs.Dirent<string>, router: Router){
    const module = await importFile(content)
    if(!module.default){
        throw new Error(`No default method found for Auth file ${content.parentPath}/${content.name}`)
    }
    router.addAuth(module.default)
}

async function addError(content: fs.Dirent<string>, router: Router){
    const module = await importFile(content)
    if(!module.default){
        throw new Error(`No default method found for Error file ${content.parentPath}/${content.name}`)
    }
    router.addError(module.default)
}

async function addValidation(content: fs.Dirent<string>, router: Router){
    const module = await importFile(content)
    if(!module.default){
        throw new Error(`No default method found for Auth file ${content.parentPath}/${content.name}`)
    }
    router.addValidation(module.default)
}

async function addMethod(content: fs.Dirent<string>, method: FileRouter.Method, router:Router){
    const module = await importFile(content)
    if(!module.default){
        throw new Error(`No default method found for route ${content.parentPath}/${content.name}`)
    }
    router.addMethod(
        method, 
        module.default, 
        module.AUTH ? module.AUTH : undefined,
        module.ERROR ? module.ERROR : undefined,
        module.VALIDATION ? module.VALIDATION : undefined
    )
}
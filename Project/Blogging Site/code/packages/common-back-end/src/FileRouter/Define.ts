import {FileRouter} from "./FileRouter"

export function defineRoute<
    Payload={}, 
    Body={}
> (fn:(req:FileRouter.Request<Payload>, res: FileRouter.Response<Body>)=>Promise<void> | void){
    return fn
}

export function defineAuth<
    Payload={}, 
    Body={}
> (fn:(req:FileRouter.Request<Payload>, res: FileRouter.Response<Body>)=>Promise<void> | void){
    return fn
}

export function defineValidation<
    Payload={}
>(fn:(req: FileRouter.Request<Payload>)=>Promise<void>|void){
    return fn
}

// Decorators to define name to the above methods
export function Name(name: string){

    return function(originalMethod: Function, context:ClassMethodDecoratorContext){

        function replacementMethod(this: any, ...args:any[]){
            return originalMethod.call(this, ...args)
        }

        (replacementMethod as any).name = name

        return replacementMethod
    }
}
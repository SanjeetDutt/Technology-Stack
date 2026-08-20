import Express from "express"
import { _StringNumberObject } from "../Endpoint";

export type PropertyObject<T extends _StringNumberObject | undefined> = {
    [key in keyof T]?: string | number
}

export abstract class _Properties<O extends _StringNumberObject | undefined>{

    private obj:PropertyObject<O>

    constructor(request: Express.Request){
        this.obj = this.getObjectFromRequest(request)
    }

    protected abstract getObjectFromRequest(request: Express.Request):PropertyObject<O>

    get<K extends keyof O>(name: K, defaultVal?: O[K] | undefined):O[K] | undefined{
        if(this.obj[name]){
            return this.obj[name] as O[K] | undefined
        }

        return defaultVal
    }

    set<K extends keyof O>(name: K, value?: O[K]):void{
        this.obj[name] = value as string | number | undefined
    }

    unset<K extends keyof O>(name: K):void{
        this.obj[name] = undefined
    }
}
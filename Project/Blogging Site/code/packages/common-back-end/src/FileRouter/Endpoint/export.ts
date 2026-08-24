import { IRouter } from "../Router";
import { Method, SubClass } from "../types";
import { _MethodAction } from "./Actions/_MethodAction";

export function exportEndpoint(method: Method, action: SubClass<_MethodAction<any>>, router: IRouter, location:string){
    return{
        method,
        url: router.getPath(),
        action,
        location
    }
}
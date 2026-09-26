import { POST, RouteConfig } from "common-back-end";
import { AllFlags } from "./typetest";
type PAYLOAD ={
    IS_INDIAN:boolean,
    extended:"YES"|"NO",
    ANOTHER_PROPS:{
        CHILD_PROPS:{
            GC_PROPS:{
                name: string,
                mobile: number,
                address:string,
                pin:number,
                email:`${string}@${string}.${string}`
            }
        }
    },
    // flags: AllFlags
}
type HomeRouteConfig = RouteConfig<{
    PAYLOAD:{}
    RESPONSE:{}
}>
export class HomeRoute extends POST<HomeRouteConfig>{
    execute(){}
}
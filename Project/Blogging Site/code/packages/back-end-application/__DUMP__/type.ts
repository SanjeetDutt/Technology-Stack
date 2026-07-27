import {RequestProps} from "../src/Controlers"
export type ServiceFunction<Req, Res, Prams extends Record<string, any> = {}> = (request:RequestProps<Req, Prams>)=>Promise<Res>
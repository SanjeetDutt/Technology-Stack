import {gatewaySchema} from "./Gateway.schema"
import {createGateway as _createGateway} from "common-front-end/src"
export function createGateway(){
    return _createGateway(gatewaySchema, {baseUrl:"http://localhost:3000"})
}
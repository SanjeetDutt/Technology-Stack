import { Endpoint } from "../Endpoint";
import { GatewayNode } from "./GatewayNode";

export const Gateway = {
    Register: (endpoints: Endpoint[]):GatewayNode=>{
        const parentNode = new GatewayNode()
        for(const endpoint of endpoints){
            parentNode.regesterEndpoint(endpoint)
        }
        return parentNode
    },
    Export:{
        JSON:(node:GatewayNode):string=>{
            const children = node.getObject()
            return  JSON.stringify(children, null, 4)
        }
    }
}
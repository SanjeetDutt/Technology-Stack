import { Endpoint } from "../Endpoint";
import { ActionConfig } from "../Endpoint/_Action";
import { Method } from "../types";
import { fetchProperties } from "./loadTS";

class GatewayChildNode{
    private children: {[key: string]:GatewayChildNode} = {}
    private method: {[key in Method]?:ActionConfig|undefined} = {}

    getChild(name:string):GatewayChildNode{
        if(!this.children[name]){
            this.children[name] = new GatewayChildNode()  
        }
        return this.children[name]
    }

    addMethod(method: Method, location:string, actionName: string){
        if(this.method[method]){
            throw new Error("Method already exists")
        }
        this.method[method] = fetchProperties(location, actionName)
    }
}

export class GatewayNode extends GatewayChildNode{
    regesterEndpoint(endpoint: Endpoint){
        const {method, url, location, actionName} = endpoint.getMetadata()
        const childNode = url.split("/").splice(1).reduce((previous:GatewayChildNode,current:string)=>{
            return previous.getChild(current)
        },this)
        childNode.addMethod(method,location, actionName)
    }
}


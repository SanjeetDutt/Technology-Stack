import { Endpoint } from "../Endpoint";
import { ActionConfig } from "../Endpoint/_Action";
import { Method } from "../types";
import { fetchProperties } from "./loadTS";

type AddMethodProps = {
    method: Method, 
    location:string, 
    actionName: string,
}

class GatewayChildNode{
    private children: {[key: string]:GatewayChildNode} = {}
    private method: {[key in Method]?:ActionConfig|undefined} = {}
    private readonly URL: string

    constructor(URL: string){
        this.URL = URL
    }

    getChild(name:string, url: string):GatewayChildNode{
        if(!this.children[name]){
            this.children[name] = new GatewayChildNode(url)  
        }
        return this.children[name]
    }

    
    addMethod({method, location, actionName}:AddMethodProps){
        if(this.method[method]){
            throw new Error("Method already exists")
        }
        this.method[method] = fetchProperties(location, actionName)
    }

    buildToExport(): Record<string, unknown>{
        const hasMethods = Object.keys(this.method).length > 0
        return {
            _URL: hasMethods ? this.URL : undefined,
            _METHOD: hasMethods ? this.method : undefined,
            ...(Object.fromEntries(
                Object.entries(this.children).map(([key, value])=> [key,value.buildToExport()]))
            )
        }
    }
}

export class GatewayNode extends GatewayChildNode{
    constructor(){
        super("")
    }
    regesterEndpoint(endpoint: Endpoint){
        const {method, url, location, actionName} = endpoint.getMetadata()
        const childNode = url.split("/").splice(1).reduce((previous:GatewayChildNode,current:string)=>{
            return previous.getChild(current, url)
        },this)
        childNode.addMethod({method,location,actionName})
    }

    
}


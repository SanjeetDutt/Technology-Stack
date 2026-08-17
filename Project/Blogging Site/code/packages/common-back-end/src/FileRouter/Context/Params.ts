import { Endpoint } from "../Endpoint";

export class Params<P extends Endpoint.PARAMS>{
    
    private readonly params:P

    constructor(params:P){
        this.params = params
    }
}
import { Endpoint } from "../Endpoint";

export class Query<Q extends Partial<Endpoint.QUERY>>{
    private readonly query: Q

    constructor(query:Q){
        this.query = query
    }
}
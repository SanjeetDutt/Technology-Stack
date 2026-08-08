import {Utility} from "common"
import { FileRouter, ILogging } from "./FileRouter";
import { Logging } from "./Logging";

type Params = FileRouter.StringObject<string | number>
type Query = Partial<FileRouter.StringObject<string|number>>

export class Request<
    Payload = {}
>
implements FileRouter.Request<Payload>{
    private readonly corelationId: string
    public readonly logger:ILogging
    private headers:FileRouter.HeaderType = {}
    private params: Params = {}
    private query: Query = {}
    private payload: Payload = {} as Payload
    

    constructor(){
        const corelationId = Utility.generateId()
        this.corelationId = corelationId
        this.logger = new Logging(corelationId)
    }
    
    addQuery(query: Query) {
        this.query = query
    }
    getQuery(): Partial<FileRouter.StringObject<string | number>> {
        return this.query
    }
    addPayload(payload: Payload) {
        this.payload = payload
    }
    getPayload(): Payload {
        return this.payload
    }

    addHeaders(headers:FileRouter.HeaderType ){
        this.headers = headers
        return this
    }

    getHeaders(){
        return this.headers
    }

    addParams(params: Params){
        this.params = params
    }

    getParams(): Params {
        return this.params
    }

    getCorelationId(){
        return this.corelationId
    }
}
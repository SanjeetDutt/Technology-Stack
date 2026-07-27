import { Collection } from "../Collection";
import { Controller } from "../Controller/Controller";
import {Bridge, Service, QueryParams} from "../Type"

export class Action<
    PATH extends Bridge.Path,
    PAYLOAD extends Service.Payload,
    RESPONSE extends Service.Response,
    AUTH extends Service.Response,
    CONTEXT extends Service.Context
> 
    implements Bridge.ICollectable
{
    private readonly path: PATH
    private readonly method: Bridge.Method
    private readonly serviceFn: Service.FN<PATH, PAYLOAD, RESPONSE, AUTH, CONTEXT>
    private readonly authFn: Service.AUTH<PATH, PAYLOAD, AUTH> | undefined
    private readonly validation: Service.FN<PATH, PAYLOAD, void, AUTH, CONTEXT> | undefined
    private readonly _context: Service.Context | undefined

    private _controller: Controller<any, any, any> | undefined

    constructor(
        method: Bridge.Method, 
        path: PATH, 
        serviceFn: Service.FN<PATH, PAYLOAD, RESPONSE, AUTH, CONTEXT>, 
        authFn: Service.AUTH<PATH, PAYLOAD, AUTH> | undefined,
        validation: Service.FN<PATH, PAYLOAD, void, AUTH, CONTEXT> | undefined,
        context: CONTEXT | undefined,
        controller: Controller<any, any, any>|undefined
    ){
        this.path = path
        this.method = method
        this.serviceFn = serviceFn
        this.authFn = authFn
        this.validation = validation
        this._context = context
        this._controller = controller
    }

    public export(){
        if(this._controller){
            this._controller?.addAction(this)
        }else{
            Collection.getInstance().add(this)
        }
        
        return async (payload: PAYLOAD, query: QueryParams.queryParam<PATH>)=>{
            return {} as RESPONSE
        }
    }

}
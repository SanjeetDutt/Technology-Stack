import { Controller } from "../Controller/Controller";
import {Bridge, Service} from "../Type"
import {Action} from "./Action"

export class ActionBuilder<
    PATH extends Bridge.Path,
    PAYLOAD extends Service.Payload = {},
    RESPONSE extends Service.Response = {},
    AUTH extends Service.Response = {},
    CONTEXT extends Service.Context = {}
>{
    private readonly path: PATH
    private readonly method: Bridge.Method
    private readonly serviceFn: Service.FN<PATH, PAYLOAD, RESPONSE, AUTH, CONTEXT> | undefined
    private readonly authFn: Service.AUTH<PATH, PAYLOAD, AUTH> | undefined
    private readonly validation: Service.FN<PATH, PAYLOAD, void, AUTH, CONTEXT> | undefined
    private readonly _context?: Service.Context

    private _controller?: Controller<any,any,any>

    constructor(
        method: Bridge.Method, 
        path: PATH, 
        serviceFn?: Service.FN<PATH, PAYLOAD, RESPONSE, AUTH, CONTEXT>, 
        authFn?: Service.AUTH<PATH, PAYLOAD, AUTH>,
        validation?: Service.FN<PATH, PAYLOAD, void, AUTH, CONTEXT>,
        context?: CONTEXT
    ){
        this.path = path
        this.method = method
        this.serviceFn = serviceFn
        this.authFn = authFn
        this.validation = validation
        this._context = context
    }

    public service <
        PLD extends Service.Payload,
        RES extends Service.Response
    >(serviceFn: Service.FN<PATH,PLD, RES, AUTH, CONTEXT>){
        return new ActionBuilder<PATH, PLD, RES, AUTH, CONTEXT>(
            this.method,
            this.path,
            serviceFn,
            this.authFn as unknown as Service.AUTH<PATH, PLD, AUTH>,
            this.validation as unknown as Service.FN<PATH,PLD, void, AUTH, CONTEXT>,
            this._context
        )
    }

    public auth<
        A extends Service.Response
    >(
        authFn: Service.AUTH<PATH, PAYLOAD, A>
    ){
        return new ActionBuilder<PATH, PAYLOAD, RESPONSE, A, CONTEXT>(
            this.method,
            this.path,
            this.serviceFn as unknown as Service.FN<PATH, PAYLOAD, RESPONSE, A, CONTEXT>,
            authFn,
            this.validation as unknown as Service.FN<PATH,PAYLOAD, void, A, CONTEXT>,
            this._context
        )
    }

    public controller(controller: Controller<any,any,any>){
        this._controller = controller
        return this
    }

    public validate<
        PLD extends Service.Payload
    >(fn: Service.FN<PATH, PLD, void, AUTH, CONTEXT>){
        return new ActionBuilder<PATH, PLD, RESPONSE, AUTH, CONTEXT>(
            this.method,
            this.path,
            this.serviceFn as unknown as Service.FN<PATH, PLD, RESPONSE, AUTH, CONTEXT>,
            this.authFn as unknown as Service.AUTH<PATH, PLD, AUTH>,
            fn,
            this._context
        )
    }

    public context<
        C extends Service.Context = CONTEXT
    >(context: C){
        return new ActionBuilder<PATH, PAYLOAD, RESPONSE, AUTH, C>(
            this.method,
            this.path,
            this.serviceFn as unknown as Service.FN<PATH, PAYLOAD, RESPONSE, AUTH, C>,
            this.authFn as unknown as Service.AUTH<PATH, PAYLOAD, AUTH>,
            this.validation as unknown as Service.FN<PATH,PAYLOAD, void, AUTH, C>,
            context
        )
    }

    public build(){
        //VALIDATION
        if(!this.serviceFn){
            throw Error("No service function added to the route " + this.path)
        }

        //INSTANCIATE NEW ACTION
        const action = new Action<
            PATH,
            PAYLOAD,
            RESPONSE,
            AUTH,
            CONTEXT
        >(
            this.method,
            this.path,
            this.serviceFn,
            this.authFn,
            this.validation,
            this._context,
            this._controller
        )

        // CALL EXPORT FUNCTION
        return action.export()
    }
}
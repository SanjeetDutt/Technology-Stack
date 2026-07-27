import { Action } from "../Action/Action";
import { Collection } from "../Collection";
import { Bridge, Service } from "../Type";

type AnyAction = Action<any, any, any, any, any>

export class Controller<
    PATH extends Bridge.Path,
    PAYLOAD extends Service.Payload = {},
    AUTH extends Service.Response = {}
> 
    implements Bridge.ICollectable
{
    private readonly path: PATH
    private readonly authFn: Service.AUTH<PATH, PAYLOAD, AUTH> | undefined
    private readonly masterController: Controller<any, any, any> | undefined
    
    private readonly actions: AnyAction[]

    constructor(
            path: PATH, 
            authFn?: Service.AUTH<PATH, PAYLOAD, AUTH>,
            masterController?: Controller<any,any,any>
        ){
        this.path = path
        this.authFn = authFn
        this.masterController = masterController

        this.actions = []
    }

    addAction(action:AnyAction){
        this.actions.push(action)
    }

    export(){
        Collection.getInstance().add(this)
        return this
    }
}
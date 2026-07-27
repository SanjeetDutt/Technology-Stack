import { Bridge, Service } from "../Type";
import { Controller } from "./Controller";

export class ControllerBuilder<
    PATH extends Bridge.Path,
    PAYLOAD extends Service.Payload = {},
    AUTH extends Service.Response = {}
>{
    private readonly path: PATH
    private readonly authFn: Service.AUTH<PATH, PAYLOAD, AUTH> | undefined
    private masterController: Controller<any, any, any> | undefined
    
    constructor(path: PATH, authFn?: Service.AUTH<PATH, PAYLOAD, AUTH>){
        this.path = path
        this.authFn = authFn
    }

    public auth<
        A extends Service.Response
    >(
        authFn: Service.AUTH<PATH, PAYLOAD, A>
    ){
        return new ControllerBuilder<PATH, PAYLOAD, A>(
            this.path,
            authFn
        )
    }

    public master(controller: Controller<any, any, any>){
        this.masterController = controller
        return this
    }

    public build(){
        const controller = new Controller<
            PATH, 
            PAYLOAD, 
            AUTH
        >(
            this.path, 
            this.authFn, 
            this.masterController
        )
        
        return controller.export()
    }
}
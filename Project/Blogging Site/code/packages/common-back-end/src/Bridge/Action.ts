import { Bridge } from './types';

class Action<
    PATH extends Bridge.Path,
    RES extends Bridge.Response,
    PLD extends Bridge.Payload
> {
    private readonly path: PATH
    private readonly method: Bridge.Method
    private readonly service: Bridge.ServiceFn<PATH, RES, PLD>
    private constructor(method: Bridge.Method,path: PATH, service: Bridge.ServiceFn<PATH, RES, PLD>) {
        this.path = path
        this.method = method
        this.service = service
    }

    public static CREATE<
        PATH extends Bridge.Path,
        RES extends Bridge.Response,
        PLD extends Bridge.Payload
    >(method: Bridge.Method, path:PATH, service: Bridge.ServiceFn<PATH, RES, PLD>){
        return new Action(method, path, service)
    }
}

export const POST = <
    PATH extends Bridge.Path,
    RES extends Bridge.Response,
    PLD extends Bridge.Payload
>(path: PATH, fn: Bridge.ServiceFn<PATH, RES, PLD>)=>
    Action.CREATE("POST",path, fn)



// USE
POST("/url", async ()=>{
    return {}
})
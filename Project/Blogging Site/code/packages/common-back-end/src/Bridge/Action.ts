import { Bridge, Router } from './types';
import { Collection } from './Collection';
import Express from 'express';

class Action<
    RES extends Bridge.Response,
    PAR extends Bridge.Params<Bridge.Path>,
    PLD extends Bridge.Payload,
    QUE extends Bridge.Query,
    AUTH extends Bridge.Auth
> implements Bridge.IAction<PAR,PLD,RES>{
    private readonly method: Bridge.Method
    private readonly path: Bridge.Path
    private readonly serviceFn: Bridge.ServiceFn<RES, PAR, PLD>
    private readonly collection:Bridge.ICollection
    private readonly actionExpressFn: Bridge.ActionExpressFn<RES,PLD>
    private _controller?: Bridge.IController

    private constructor(method: Bridge.Method, path: Bridge.Path, fn: Bridge.ServiceFn<RES,PLD>,actionExpressFn: Bridge.ActionExpressFn<PL,RS>) {
        this.method = method
        this.path = path
        this.serviceFn = fn
        this.actionExpressFn = actionExpressFn
        this.collection = Collection()
        this.collection.addAction(this)
    }

    public export(){
        const makeTheAPICall:Bridge._export<P, PL, RS> = async (params, payload)=>{
            // GET COLLECTION CONFIGURATION
            // GET CONTROLLER CONFIGURATION
            // MERGE THE CONFIGURATION
            // MAKE THE API CALL
            // THROW ERROR IF STATUS != 200
            // RETURN RESPONSE IF STATUS === 200
            return {} as RS
        }
        return makeTheAPICall
    }

    public express(router: Router) {
        this.actionExpressFn(router, this.getEndpoint(), this.serviceFn)
    }

    private getEndpoint():Bridge.Path{
        if(this._controller){
            return `${this._controller.getPath()}${this.path}`
        }
        else{
            return this.path
        }
    }

    static create <
        RES extends Bridge.Response,
        PAR extends Bridge.Params,
        PLD extends Bridge.Payload,
        QUE extends Bridge.Query,
        AUTH extends Bridge.Auth
    > (
        method: Bridge.Method,
        path: Bridge.Path,
        fn: Bridge.ServiceFn<RES, PAR, PLD, QUE, AUTH>,
        actionExpressFn: (
            r:Express.Router,
            url: Bridge.Path,
            fn: Bridge.ServiceFn<RES,PAR,PLD,QUE,AUTH>
        )=>void
    ) {
        type Parameters = Bridge.Params<PATH>
        return new Action<Parameters, Pl,Res>(method, path, fn,actionExpressFn)
    }

    public controller(controller: Bridge.IController):Bridge.IAction<P,PL,RS>{
        this._controller = controller
        return this
    }
}

export const GET = <P extends Bridge.Path, Res extends Bridge.Response>(p:P,f:Bridge.ServiceFn<{}, Res>) =>
    Action.create<P, {}, Res>("GET", p, f,(r, url, serviceFn)=>{
        r.get(url, serviceFn)
    })

export const POST = <
    RES extends Bridge.Response,
    PAR extends Bridge.Params,
    PLD extends Bridge.Payload,
    QUE extends Bridge.Query,
    AUTH extends Bridge.Auth
>(
    p:Bridge.Path,
    f:Bridge.ServiceFn<RES,PAR,PLD,QUE,AUTH>
) =>
    Action.create<RES, PAR, PLD, QUE, AUTH>("POST", p, f,(r, url, serviceFn)=>{
        r.post(url, serviceFn)
    })

export const PUT = <P extends Bridge.Path, Pl extends Bridge.Payload, Res extends Bridge.Response>(p:P,f:Bridge.ServiceFn<Pl, Res>) =>
    Action.create<P, Pl, Res>("PUT", p, f,(r, url, serviceFn)=>{
        r.put(url,serviceFn)
    })

export const PATCH = <P extends Bridge.Path, Pl extends Bridge.Payload, Res extends Bridge.Response>(p:P,f:Bridge.ServiceFn<Pl, Res>) =>
    Action.create<P, Pl, Res>("PATCH", p, f,(r, url, serviceFn)=>{
        r.patch(url, serviceFn)
    })

export const DELETE = <P extends Bridge.Path, Pl extends Bridge.Payload, Res extends Bridge.Response>(p:P,f:Bridge.ServiceFn<Pl, Res>) =>
    Action.create<P, Pl, Res>("DELETE", p, f,(r, url, serviceFn)=>{
        r.delete(url, serviceFn)
    })
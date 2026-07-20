import { Bridge } from './types';

class Action<
    P extends Bridge.Params<Bridge.Path>,
    PL extends Bridge.Payload,
    RS extends Bridge.Response
> {
    private readonly method: Bridge.Method
    private readonly path: Bridge.Path
    private readonly serviceFn: Bridge.ServiceFn<PL,RS>

    private constructor(method: Bridge.Method, path: Bridge.Path, fn: Bridge.ServiceFn<PL,RS>) {
        this.method = method
        this.path = path
        this.serviceFn = fn
    }

    private async makeTheAPICall(p:{
        params?:P,
        payload?: PL
    }):Promise<RS>{
        // GET COLLECTION CONFIGURATION
        // GET CONTROLLER CONFIGURATION
        // MERGE THE CONFIGURATION
        // MAKE THE API CALL
        // THROW ERROR IF STATUS != 200
        // RETURN RESPONSE IF STATUS === 200
        return {} as RS
    }

    public export(){
        return this.makeTheAPICall
    }

    static create<Path extends Bridge.Path, Pl extends Bridge.Payload, Res extends Bridge.Response>(method: Bridge.Method, path: Path, fn: Bridge.ServiceFn<Pl, Res>){
        type Parameters = Bridge.Params<Path>
        return new Action<Parameters, Pl,Res>(method, path, fn)
    }
}

export const POST = <P extends Bridge.Path, Pl extends Bridge.Payload, Res extends Bridge.Response>(p:P,f:Bridge.ServiceFn<Pl, Res>) =>
    Action.create<P, Pl, Res>("POST", p, f)

//====================DTO==================
class Payload{
    content: string
    constructor(c:string) {
        this.content = c
    }
}

class Response{
    status: string

    constructor(s:string) {
        this.status = s
    }
}
//=====================SERVICE======================
const fn: Bridge.ServiceFn<Payload, Response> = async ()=>{
    return {
        status:"SAB CHANGA SEE"
    }
}
//====================ROUTER======================
const test = POST("/get/:id/:id2/some/:someRootId",fn).export()


//=====================FRONT-END===============================
const callApi = async ()=>{
    const res = await test({
        params:{
            id:"",
            id2:"",
            someRootId:""
        },
        payload:{
            content:"This is a content"
        }
    })

}

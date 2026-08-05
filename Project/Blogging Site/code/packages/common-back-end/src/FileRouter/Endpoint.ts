import { Method, Path } from "./Router";

export class Endpoint{
    private readonly method: Method
    private readonly url: Path
    private readonly auth: any[] | undefined
    private readonly error: any | undefined

    constructor(method: Method, url: Path, auth?: any[], error?: any){
        this.method = method
        this.url = url
        this.auth = auth ? auth.filter(a=>a!==undefined) : []
        this.error = error
    }
}
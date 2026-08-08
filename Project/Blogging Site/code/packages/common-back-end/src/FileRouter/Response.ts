import { FileRouter } from "./FileRouter";

type Headers = FileRouter.HeaderType

export class Response<
    Body = {}
> implements FileRouter.Response<Body>{
    private readonly corelationId : string
    private body: Body = {} as Body
    private status : number = 200
    private headers: Headers = {}

    constructor(corelationId: string){
        this.corelationId = corelationId
    }
    addBody(body: Body) {
        this.body = body
    }
    getBody(): Body {
        return this.body
    }
    setStatus(status: number) {
        this.status=status
    }
    getStatus(): number {
        return this.status
    }
    getCorelationId(): string {
        return this.corelationId
    }
    addHeaders(header: FileRouter.HeaderType) {
        this.headers = header
    }
    getHeaders(): FileRouter.HeaderType {
        return this.headers
    }

}
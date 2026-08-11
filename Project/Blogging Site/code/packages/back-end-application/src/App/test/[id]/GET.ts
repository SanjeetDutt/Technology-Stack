import {Endpoint, Request, Response, Authentication} from "common-back-end"
export default class TestRoute3 extends Endpoint implements Authentication{
    call(request:Request, response:Response){}

    authentication(request:Request, response:Response){}
}
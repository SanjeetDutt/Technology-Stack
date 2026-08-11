import {Endpoint, Request, Response, Authentication} from "common-back-end"
export default class GetByTestId extends Endpoint implements Authentication{
    call(request:Request, response:Response){}

    authentication(request:Request, response:Response){}
}
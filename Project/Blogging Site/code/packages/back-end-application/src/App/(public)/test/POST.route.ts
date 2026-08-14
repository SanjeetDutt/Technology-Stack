import {PostRoute} from "common-back-end"
import {Request, Response} from "common-back-end"
interface Body{}
interface Res extends String{

}
export default class TestRoute extends PostRoute<Body,Res>{

    call(request: Request<Body>, response: Response<Res>): Promise<void> | void {
        response.submit("HELLO WORLD")
    }
}
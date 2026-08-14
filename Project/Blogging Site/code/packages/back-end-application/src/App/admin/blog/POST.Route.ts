import {PostRoute, Request, Response} from "common-back-end"

interface Boby {}
interface Res{}
export default class CreateNewBlog
extends PostRoute<Boby, Res>
{
    
    call(req:Request<Body>, res: Response<Res>){

    }
    
}
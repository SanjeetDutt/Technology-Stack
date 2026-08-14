import {PostRoute, Request, Response} from "common-back-end"

interface Body {}
interface Res{}
export default class CreateNewBlog
extends PostRoute<Body, Res>
{
    
    call(req:Request<Body>, res: Response<Res>){

    }
    
}
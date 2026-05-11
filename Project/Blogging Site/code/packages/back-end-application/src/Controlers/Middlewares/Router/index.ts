import {Router as ExpressRouter, Request, Response, NextFunction} from "express"
import {_ValidRequest} from "../../DTO/_ValidRequest";

type Path = `/${string}`
type Access = string[]
interface ParamReq<Req> {
	params:{
		[key:string]: string
	},
	body:Req
}
type RouterFn<Req extends _ValidRequest, Res> = (r:ParamReq<Req>)=>Promise<Res>

/*TODO:
* 2. Authentication
* 3. Fn implementation
*
* */

export class ApplicationRouter {

	private readonly router:ExpressRouter
	private readonly path:Path

	constructor(path:Path) {
		this.router = ExpressRouter()
		this.path = path
	}

	static Router(path:Path){
		return new ApplicationRouter(path);
	}

	public getRouter(){
		return this.router;
	}

	public getPath(){
		return this.path;
	}

	private authenticate(access:Access){
		return (request:Request, response:Response, next:NextFunction)=>{
			//todo: IMPL AUTH METHOD
			next()
		}
	}

	private executeRouterFn<Req extends _ValidRequest, Res>(fn:RouterFn<Req, Res>){
		return(req:Request,res:Response)=>{
			//todo: IMPL FN METHOD
			res.status(200).json({success:true});
		}
	}

	public post<Req extends _ValidRequest, Res>(path:Path, access:Access, fn:RouterFn<Req, Res>){
		this.router.post(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public get<Req extends _ValidRequest, Res>(path:Path, access:Access, fn:RouterFn<Req, Res>){
		this.router.get(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public put<Req extends _ValidRequest, Res>(path:Path, access:Access, fn:RouterFn<Req, Res>){
		this.router.put(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public patch<Req extends _ValidRequest, Res>(path:Path, access:Access, fn:RouterFn<Req, Res>){
		this.router.patch(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public delete<Req extends _ValidRequest, Res>(path:Path, access:Access, fn:RouterFn<Req, Res>){
		this.router.delete(path,this.authenticate(access), this.executeRouterFn(fn))
	}
}

export const Router = (path:Path)=> ApplicationRouter.Router(path)
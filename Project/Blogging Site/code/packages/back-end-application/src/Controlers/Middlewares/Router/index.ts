import {Router as ExpressRouter, Request, Response, NextFunction} from "express"

type Path = `/${string}`
type Access = string[]
type P = Record<string, any>
export interface RequestProps<Req, Params extends P> {
	params:Params,
	body:Req,
	request: Request
}
type RouterFn<Req, Res, Params extends P = {}> = (r:RequestProps<Req, Params>)=>Promise<Res>

/*TODO:
* 2. Authentication
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

	private executeRouterFn<Req, Res, Params extends P>(fn:RouterFn<Req, Res, Params>){
		return async (req:Request,res:Response)=>{
			const request = req.body as Req
			const params = req.params as Params

			const result = await fn({params:params, body:request, request: req})
			
			res.status(200).json(result);
		}
	}

	public post<Req, Res, Params extends P = {}>(path:Path, access:Access, fn:RouterFn<Req, Res, Params>){
		this.router.post(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public get<Req, Res, Params extends P = {}>(path:Path, access:Access, fn:RouterFn<Req, Res, Params>){
		this.router.get(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public put<Req, Res, Params extends P = {}>(path:Path, access:Access, fn:RouterFn<Req, Res, Params>){
		this.router.put(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public patch<Req, Res, Params extends P = {}>(path:Path, access:Access, fn:RouterFn<Req, Res, Params>){
		this.router.patch(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public delete<Req, Res, Params extends P = {}>(path:Path, access:Access, fn:RouterFn<Req, Res, Params>){
		this.router.delete(path,this.authenticate(access), this.executeRouterFn(fn))
	}
}

export const Router = (path:Path)=> ApplicationRouter.Router(path)
import {Router as ExpressRouter, Request, Response, NextFunction} from "express"

type Path = `/${string}`
type Access = string[]
type RouterFn = (r:any)=>any

export class ApplicationRouter {

	private router:ExpressRouter
	private path:Path

	constructor(path:Path) {
		// this.routes = []
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
			//todo: IMPL METHOD
			next()
		}
	}

	private executeRouterFn(fn:RouterFn){
		return(req:Request,res:Response)=>{
			//todo: IMPL METHOD
			res.status(200).json({success:true});
		}
	}

	public post(path:Path, access:Access, fn:RouterFn){
		this.router.post(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public get(path:Path, access:Access, fn:RouterFn){
		this.router.get(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public put(path:Path, access:Access, fn:RouterFn){
		this.router.put(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public patch(path:Path, access:Access, fn:RouterFn){
		this.router.patch(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public delete(path:Path, access:Access, fn:RouterFn){
		this.router.delete(path,this.authenticate(access), this.executeRouterFn(fn))
	}
}

export const Router = (path:Path)=> ApplicationRouter.Router(path)
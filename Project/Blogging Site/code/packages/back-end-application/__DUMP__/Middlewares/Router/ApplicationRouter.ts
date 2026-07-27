import {Router as ExpressRouter, Request, Response} from "express"
import {authenticateUserRequest, Permissions} from "./Authentication";
import {InternalServerError} from "../Error";
import {ServiceFunction} from "../../../Services/type";

export type Path = `/${string}`
export type Access = Permissions[]
type P = Record<string, any>
export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
export interface RequestProps<Req, Params extends P> {
	params:Params,
	body:Req,
	request: Request
}
type SFn = ServiceFunction<any, any, any>

export class ApplicationRouter {

	private readonly router:ExpressRouter
	private readonly path:Path
	private routes:{path:Path, method:Method, access:Access}[]

	constructor(path:Path) {
		this.router = ExpressRouter()
		this.path = path
		this.routes = []
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

	public getRoutes(){
		return this.routes
	}

	private authenticate(access?:Access){
		return authenticateUserRequest(access || [])
	}

	private executeRouterFn(fn?:SFn){
		return async (req:Request,res:Response)=>{
			const request = req.body
			const params = req.params

			if(!fn){
				return this.defaultRouterFn()
			}

			const result = await fn({params:params, body:request, request: req})

			res.status(200).json(result);
		}
	}

	private defaultRouterFn (){
		throw new InternalServerError("Method not implemented.");
	}

	private addRouting(method: Method, path:Path, access?:Access){
		this.routes.push({path:path, method:method, access:access||[]})
	}



	public post(path:Path, access?:Access, fn?:SFn){
		this.addRouting("POST",path, access)
		this.router.post(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public get(path:Path, access?:Access, fn?:SFn){
		this.addRouting("GET",path, access)
		this.router.get(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public put(path:Path, access?:Access, fn?:SFn){
		this.addRouting("PUT",path, access)
		this.router.put(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public patch(path:Path, access?:Access, fn?:SFn){
		this.addRouting("PATCH",path, access)
		this.router.patch(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public delete(path:Path, access?:Access, fn?:SFn){
		this.addRouting("DELETE",path, access)
		this.router.delete(path,this.authenticate(access), this.executeRouterFn(fn))
	}
}

export const Router = (path:Path)=> ApplicationRouter.Router(path)
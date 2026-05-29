import {Router as ExpressRouter, Request, Response} from "express"
import {authenticateUserRequest, Permissions} from "./Authentication";
import {InternalServerError} from "../Error";
import {ServiceFunction} from "../../../Services/type";

type Path = `/${string}`
type Access = Permissions[]
type P = Record<string, any>
export interface RequestProps<Req, Params extends P> {
	params:Params,
	body:Req,
	request: Request
}
type SFn = ServiceFunction<any, any, any>

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

	public post(path:Path, access?:Access, fn?:SFn){
		this.router.post(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public get(path:Path, access?:Access, fn?:SFn){
		this.router.get(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public put(path:Path, access?:Access, fn?:SFn){
		this.router.put(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public patch(path:Path, access?:Access, fn?:SFn){
		this.router.patch(path,this.authenticate(access), this.executeRouterFn(fn))
	}

	public delete(path:Path, access?:Access, fn?:SFn){
		this.router.delete(path,this.authenticate(access), this.executeRouterFn(fn))
	}
}

export const Router = (path:Path)=> ApplicationRouter.Router(path)
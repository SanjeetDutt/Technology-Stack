import {IRouterMatcher, Router} from "express";
import {_ValidRequest} from "../../DTO/_ValidRequest";

namespace ApplicationRouterNS {

	type RouterMethodFnRequest<R extends _ValidRequest> = {
		params:{
			[key: string]: string;
		}
		body: R
	}

	export type RouterFn<Req extends _ValidRequest, Res extends any> = (request:RouterMethodFnRequest<Req>)=>Promise<Res>

	export enum ACCESS{

	}
}


export const  ApplicationRouter = () => {

	const router = Router();

	const routerMethod = (routerMethod:IRouterMatcher<Router>)=>{
		return <Req extends _ValidRequest, Res>(path:string, access:ApplicationRouterNS.ACCESS[], fn:ApplicationRouterNS.RouterFn<Req, Res>)=>{
			routerMethod<Req>(path,()=>{
				console.log({path, access, fn})
			})
		}
	}

	return {
		router,
		get:routerMethod(router.get),
		post:routerMethod(router.post),
		put:routerMethod(router.put),
		patch:routerMethod(router.patch),
		delete:routerMethod(router.delete),
	}
}
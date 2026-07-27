import {Access, ApplicationRouter, Method, Path} from "./ApplicationRouter";
import * as repl from "node:repl";

type NameRouteValue = {
	method: Method,
	path: Path,
	access: Access,
	params: string[],
}
type NameRouteObject = {[key:string]:NameRouteValue}
export class APIRoute {
	private readonly routes:ApplicationRouter[]
	public readonly namedRoutes:Map<string, NameRouteValue>;

	constructor(routes:ApplicationRouter[]) {
		this.routes = routes
		this.namedRoutes = this.getNamedRouter(routes)
	}

	public getRoutes(){
		return this.namedRoutes
	}

	private getNamedRouter (routes:ApplicationRouter[]):Map<string, NameRouteValue> {
		const nameRoutes = new Map<string, NameRouteValue>()

		routes.forEach(controller => {
			controller.getRoutes().forEach(action=>{
				const {path, access, method} = action
				const name = this.generateNameRouterKey(path, access, method, controller.getPath())
				nameRoutes.set(name, {
					method, path, access, params: this.getParams(path)
				})
			})

		})

		return nameRoutes
	}

	private generateNameRouterKey (path: Path, access: Access, method: Method, baseUrl: Path){
		const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
		return `${method}${baseUrl}${path}`.toLowerCase().split(/[/:-]/).map(capitalize).join("")
	}

	private getParams(path: Path):string[]{
		return path.split("/").filter(s=>s.startsWith(":")).map(s=>s.slice(1))

	}


}

// public getRouteWithName(){
// 	const generateRouteName = (method: Method, path:Path) => {
// 		const _path = `${this.path.replace("/","")}${path}`
// 		const capitalized =(path: string)=> path.charAt(0).toUpperCase() + path.slice(1).toLowerCase();
// 		const removeSpecial = (path:string)=>path
// 		.replaceAll(":","")
// 		.replaceAll("-","")
// 		return [method, ..._path.split("/")].map(removeSpecial).map(capitalized).join("")
//
// 	}
// 	return this.routes.reduce<{[key: string]:any}>((obj, route)=>{
// 		const name = generateRouteName(route.method, route.path)
// 		obj[name] = {
// 			method: route.method,
// 			path: `${this.path}${route.path}`,
// 			access: route.access,
// 		}
// 		return obj
// 	},{})
// }

// private getNamedRouter (routes:ApplicationRouter[]):NameRouteObject {
// 	const nameRoutes = new Map<string>()
// 	return routes.reduce<NameRouteObject>((obj, curr)=>{
// 		const baseUrl = curr.getPath()
// 		const newRoute = curr.getRoutes().reduce<NameRouteObject>((obj, curr)=>{
// 			const {path, access, method} = curr
// 			const name = this.generateNameRouterKey(path, access, method, baseUrl)
// 			obj[name] = {
// 				method, path, access, params: this.getParams(path)
// 			}
// 			return obj;
// 		},{})
// 		return {...obj, ...newRoute}
// 	},{})
// }
import {Suspense} from "./Suspense"
import { type RouteObject } from 'react-router-dom';
import type { Router } from './Type';

export class RouterModule {
	private routes: Router.Object[];
	private routeObject: RouteObject[];
	private routerNamePathMap: Map<string, string> = new Map();

	constructor(routes: Router.Object[]) {
		this.routes = routes;
		this.routeObject = this.createRouteObject(routes);
	}

	private getPath(name: string, parentName?: string[]) {
		return '/' + [...(parentName || []), name].filter((p) => p !== 'index').join('/');
	}

	private getPathName(name: string, parentName?: string[]) {
		const path = this.getPath(name, parentName);
        //@ts-ignore: IDK why error coming
		return '_' + path.toUpperCase().substring(1).replaceAll('/', '_');
	}

	private addRouterNamePath(name: string, parentName?: string[]) {
		const path = this.getPath(name, parentName);
		const pathName = this.getPathName(name, parentName);
		this.routerNamePathMap.set(pathName, path);
	}

	private renderRouter(router: Router.Object, parentName?: string[]): RouteObject {
		const routerObject: RouteObject = {
			index: router.name === 'index'
		};

        routerObject.element = (
            <Suspense 
                fallback={router.loadingScreen}
                children={router.component}
                props={router.props}
                guard={router.guard}
                loader={router.beforeMount}
            />                
        )

        // error handling
        routerObject.errorElement = router.errorBoundary? router.errorBoundary(router.props) : undefined

		if (router.name !== 'index') {
			routerObject.path = router.name;
		}

		return routerObject;
	}

	private renderParentRouter(router: Router.Object, parentName?: string[]): RouteObject {
		const routerObject: RouteObject = this.renderRouter(router, parentName);
		routerObject.children = this.createRouteObject(router.children!, [...(parentName || []), router.name]);
		return routerObject;
	}

	private renderRootRouter(router: Router.Object, parentName?: string[]): RouteObject {
		const routerObject: RouteObject = this.renderRouter(router, parentName);
		(routerObject.id = this.getPathName(router.name, parentName)), this.addRouterNamePath(router.name, parentName);
		return routerObject;
	}

	private createRouteObject(routes: Router.Object[], parentName?: string[]): RouteObject[] {
		return routes.map((route) => {
			return !!route.children ? this.renderParentRouter(route, parentName) : this.renderRootRouter(route, parentName);
		});
	}

	public getRoutes(): RouteObject[] {
		return this.routeObject;
	}

	public getRouteNamePathMap(): { [key: string]: string } {
		return Object(this.routerNamePathMap);
	}
}

import { type RouteObject } from 'react-router-dom';

// type RouteMapType =

export const getNamedRoutesMap = (routes: RouteObject[]) => {
	const RouteMap: { [key: string]: string } = {};

	console.log(routes, RouteMap);

	return RouteMap;
};

const getNameMap = (routes: RouteObject[], routeMap: {}) => {};

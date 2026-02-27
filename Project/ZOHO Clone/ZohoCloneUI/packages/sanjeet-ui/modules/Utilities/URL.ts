import { ToString } from './ToString';
export namespace URL {
	export type Element = string | number;
	export type ElementArray = Element[];
	export type ElementMap = {
		[key: Element]: Element | ElementArray;
	};
}

export class URL implements ToString {
	private paths: URL.Element[];
	private query: URL.ElementMap;
	private fragment: URL.ElementMap;

	constructor(paths?: string[]) {
		this.paths = paths || [];
	}

	public addQuery(queryMap: URL.ElementMap) {
		this.query = queryMap;
	}

	public addFragment(fragmentMap: URL.ElementMap) {
		this.fragment = fragmentMap;
	}

	public toString(): string {
		let str = '';

		const path = URL.getArrayString(this.paths);
		if (path) {
			str.concat(path);
		}

		const query = URL.getMapString(this.query);
		if (query) {
			str.concat('?').concat(query);
		}

		const fragment = URL.getMapString(this.fragment);
		if (fragment) {
			str.concat('#').concat(fragment);
		}

		return str;
	}

	private static getArrayString(array: URL.ElementArray): string {
		let str = '';
		for (let a in array) {
			if (a.startsWith('/')) {
				str.concat(a);
			} else {
				str.concat('/').concat(a);
			}
		}
		return str;
	}

	private static getMapString(map: URL.ElementMap): string {
		let parts: string[] = [];

		for (let [key, value] of Object.entries(map)) {
			if (Array.isArray(value)) {
				parts.push(`${key}=${value.join(',')}`);
			} else {
				parts.push(`${key}=${value}`);
			}
		}

		return parts.join('&');
	}
}

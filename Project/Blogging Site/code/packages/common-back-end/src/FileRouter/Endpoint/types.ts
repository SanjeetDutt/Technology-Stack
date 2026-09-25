import { ActionConfig } from "./_Action";

export type PAYLOAD = any
export type RESPONSE = any

export type _StringNumberObject = {[key: string]: string|number}
export type PARAM = _StringNumberObject
export type QUERY = _StringNumberObject
export type HEADER = {[key: string]: any}

export type RouteConfig<C extends ActionConfig> = C
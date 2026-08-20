export type Path = `/${string}`
export type Method = "POST" | "PATCH" | "DELETE" | "PUT" | "GET"

export type SubClass<T> = new (...args:any[])=>T
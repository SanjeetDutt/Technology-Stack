import { Endpoint } from "./IEndpoint";

export interface IAuthentication{
    authentication():Promise<void>
}
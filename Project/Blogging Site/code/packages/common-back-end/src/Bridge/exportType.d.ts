import { Bridge } from './types';

export type _Payload = Bridge.Payload
export type _Response = Bridge.Response

export type ServiceFn<RS extends _Response, PL extends _Payload = {}> = Bridge.ServiceFn<PL, RS>
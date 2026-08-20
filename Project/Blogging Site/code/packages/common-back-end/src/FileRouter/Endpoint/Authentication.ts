import { _Action, _ActionConfiguration } from "./_Action";

export abstract class Authentication<AC extends _ActionConfiguration> extends _Action<AC> 
{
    abstract authenticate():void | Promise<void>
}
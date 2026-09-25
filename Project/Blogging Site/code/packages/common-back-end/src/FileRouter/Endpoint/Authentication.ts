import { _Action, ActionConfig } from "./_Action";

export abstract class Authentication<AC extends ActionConfig> extends _Action<AC> 
{
    abstract authenticate():void | Promise<void>
}
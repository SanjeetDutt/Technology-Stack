import { _ActionConfiguration } from "../_Action";
import { _MethodAction } from "./_MethodAction";

export abstract class DELETE<AC extends _ActionConfiguration> extends _MethodAction<AC>{
    abstract execute():void | Promise<void>
}
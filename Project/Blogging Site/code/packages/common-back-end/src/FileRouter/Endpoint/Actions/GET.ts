import { _ActionConfiguration } from "../_Action";
import { _MethodAction } from "./_MethodAction";

export abstract class GET<
    AC extends Omit<_ActionConfiguration,"payload">
> extends _MethodAction<AC&{payload:{}}>{
    abstract execute():void | Promise<void>
}
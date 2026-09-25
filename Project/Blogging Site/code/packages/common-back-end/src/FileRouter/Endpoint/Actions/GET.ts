import { ActionConfig } from "../_Action";
import { _MethodAction } from "./_MethodAction";

export abstract class GET<
    AC extends Omit<ActionConfig,"PAYLOAD">
> extends _MethodAction<AC&{PAYLOAD:{}}>{
    abstract execute():void | Promise<void>
}
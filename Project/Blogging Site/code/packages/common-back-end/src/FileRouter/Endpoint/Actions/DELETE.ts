import { ActionConfig } from "../_Action";
import { _MethodAction } from "./_MethodAction";

export abstract class DELETE<AC extends ActionConfig> extends _MethodAction<AC>{
    abstract execute():void | Promise<void>
}
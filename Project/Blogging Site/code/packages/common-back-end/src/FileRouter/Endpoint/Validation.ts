import { _Action, ActionConfig } from "./_Action";

export abstract class Validation<AC extends ActionConfig> extends _Action<AC>{
    abstract validate():void | Promise<void>
}
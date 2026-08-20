import { _Action, _ActionConfiguration } from "./_Action";

export abstract class Validation<AC extends _ActionConfiguration> extends _Action<AC>{
    abstract validate():void | Promise<void>
}
import { _Action, ActionConfig } from "./_Action";

export abstract class ErrorBoundary<AC extends ActionConfig> extends _Action<AC>{
    abstract errorBoundary():void | Promise<void>
}
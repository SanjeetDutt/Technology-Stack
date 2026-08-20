import { _Action, _ActionConfiguration } from "./_Action";

export abstract class ErrorBoundary<AC extends _ActionConfiguration> extends _Action<AC>{
    abstract errorBoundary():void | Promise<void>
}
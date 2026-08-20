import { _Action, _ActionConfiguration } from "../_Action";

export abstract class _MethodAction<AC extends _ActionConfiguration> extends _Action<AC>
{
    abstract execute(): void | Promise<void>
}
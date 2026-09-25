import { _Action, ActionConfig } from "../_Action";

export abstract class _MethodAction<AC extends ActionConfig> extends _Action<AC>
{
    abstract execute(): void | Promise<void>
}
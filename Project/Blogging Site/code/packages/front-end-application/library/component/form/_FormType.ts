import {_StateValue} from "./_StateValue";

export namespace _Form {
    export type StateKey = string
    export type State = Record<StateKey,_StateValue>
}
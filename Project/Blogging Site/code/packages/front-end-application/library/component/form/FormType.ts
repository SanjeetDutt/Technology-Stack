import {ReactNode} from "react";
import {_Form} from "./_FormType"

export namespace FormType{
    export type DefaultFormValueType = {
        [key: string] : string
    }
    export interface Props<T extends {} = DefaultFormValueType>{
        children: ReactNode,
        onSubmit: (value: T)=>void
        onError: (errorMessage: string[])=>void
        className?: string
    }

    export type Validity = <T=any>(value:T)=>true|string

    export type Get = <T=any>(name: string, defaultValue?: T)=>T

    export type Update = <T = any>(name: string, value:T)=>void

    export type Register = <T= any>(name: string, defaultValue?: T, validity?: Validity, isOptional?: boolean)=>void

    export type Submit = ()=>void

    export interface Context {
        value: _Form.State,
        register: Register
        get: Get
        update: Update
        submit: Submit
    }
}
import {createContext, FC, useContext, useState} from "react";
import {_StateValue} from "@/library/component/form/_StateValue";
import {FormType} from "./FormType"
import {_Form} from "./_FormType"

const FormContext = createContext<FormType.Context|null>(null)

export const Form:FC<FormType.Props> = (props)=>{

    const [value, setValue] = useState<_Form.State>({})

    // Function to register a variable in the Form store
    const register:FormType.Register = <T = any>(name:string, defaultValue?:T, validity?:FormType.Validity, isOptional?: boolean)=>{
        const stateValue = new _StateValue<T>({name, defaultValue, validation:validity, isOptional})

        setValue((previous)=>({
            ...previous,
            [name]: stateValue
        }))
    }

    const update:FormType.Update = <T=any>(name:string, value:T)=>{
        setValue((previous)=>{
            const state = previous[name]
            const newState = new _StateValue({name: state.name, defaultValue: state.defaultValue, isOptional:state.isOptional, validation:state.validation})
            newState.set(value)
            return {
                ...previous,
                [name]: newState
            }
        })
    }

    const submit:FormType.Submit = ()=>{
        const errorMessages:string[] = []
        Object.values(value).forEach(val=>{
            const validation = val.validate()
            if(validation !== true){
                if(val.value===null){
                    update(val.name, "")
                }
                errorMessages.push(validation)
            }
        })

        if(errorMessages.length === 0){
            const result:{[key: string]: any} = {}
            Object.values(value).forEach(val=>{
                result[val.name] = val.value
            })
            props.onSubmit(result)
        } else{
            props.onError(errorMessages)
        }
    }



    const get:FormType.Get = (name, defaultValue)=>{
        return value[name]?.value || defaultValue
    }

    return(
        <FormContext value={{value, update, submit, register, get }}>
            {props.children}
        </FormContext>
    )
}

export const useForm = ():(FormType.Context | null)=>{
    const context = useContext<FormType.Context|null>(FormContext)

    if(!context){
        console.error("Form element is not wrapper inside <Form/>")
        return null
    }

    return context
}
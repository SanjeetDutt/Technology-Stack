import React, {createContext, FC, useContext, useState} from "react";
import {_StateValue} from "@/library/component/form/_StateValue";
import {FormType} from "./FormType"
import {_Form} from "./_FormType"

const FormContext = createContext<FormType.Context|null>(null)

export const Form:FC<FormType.Props> = (props)=>{

    const [definition, setDefinition] = useState<_Form.State>({})

    const [value, setValue] = useState<{ [key: string]: any }>({})

    // Function to register a variable in the Form store
    const register:FormType.Register = <T = any>(name:string, defaultValue?:T, validity?:FormType.Validity, isOptional?: boolean)=>{
        setValue((previous)=>({
            ...previous,
            [name]: defaultValue === undefined ? null : defaultValue
        }))
        setDefinition(def=>({
            ...def,
            [name]: new _StateValue<T>({name, defaultValue, validation:validity, isOptional})
        }))
    }

    const update:FormType.Update = <T=any>(name:string, value:T)=>{
        setValue((previous)=>{
            return {
                ...previous,
                [name]: value
            }
        })
    }

    const submit:FormType.Submit = ()=>{
        const errorMessages:string[] = []
        Object.entries(value).forEach(([name, val])=>{
            const def = definition[name]
            if(def?.isOptional){
                return
            }
            const validation = def.validate(val)
            if(validation !== true){
                if(val === null){
                    update(name, "")
                }
                errorMessages.push(validation)
            }
        })

        if(errorMessages.length === 0){
            const result:{[key: string]: any} = {}
            Object.entries(value).forEach(([name, val])=>{
                result[name] = val
            })
            props.onSubmit(result)
        } else{
            props.onError(errorMessages)
        }
    }

    const get:FormType.Get = (name, defaultValue)=>{
        return value[name]?.value || defaultValue
    }

    const keyDownHandler = (key:string, isCtrl:boolean)=>{

        // Submit form is entre presses without ctrl key
        if(key === "Enter" && !isCtrl){
            submit()
        }
    }

    return(
        <FormContext value={{value, update, submit, register, get }}>
            <div className={props.className} onKeyDown={(e)=>keyDownHandler(e.key, e.ctrlKey)}>
                {props.children}
            </div>
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
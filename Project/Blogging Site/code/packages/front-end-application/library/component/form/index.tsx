"use client"

import {createContext, FC, ReactNode, useState, useContext} from "react"
import {mapObject} from "@/library/utility";

interface FormProps{
    children:ReactNode
    default?:{
        [key: string]: string
    },
    onSubmit?: (val: FormValue[])=>void,
    onError?: (val: FormValue[])=>void
}

interface FormValue {
    name: string,
    value: string,
    validity?: (val:string)=>boolean|string
}

type FormValueState = Record<string, FormValue>

type GetOrDefault = (name: string, defaultValue?: string|null )=>string|null

type UpdateValueFn = (name:string, value: string)=>void

type RegisterFn = (name: string, validity?:(val: string)=>string|boolean)=>void

interface FormContext {
    value: FormValueState
    updateValue: UpdateValueFn
    submitForm: ()=>void
    getOrDefault: GetOrDefault
    register: RegisterFn
}

const FormContext = createContext<FormContext|null>(null)

export const Form:FC<FormProps> = (props)=>{

    const defaultVal:FormValueState = mapObject<string, FormValue>(props.default||{}, (key, value)=>({
        name: key,
        value: value
    }))

    const [value, setValue] = useState<FormValueState>(defaultVal)

    const updateValue:UpdateValueFn = (name, value)=>{
        setValue((pre)=>{
            const validityFn = pre[name].validity
            return {
                ...pre,
                [name]:{
                    name,
                    value,
                    validityFn
                }
            }
        })
    }

    const submitForm = ()=>{
        // loop through the object and see any validation error
        const errorList = Object.values(value).filter(e=>{
            if(!e.validity){
                return true
            }

            const result = e.validity(e.value)

            return result !== true;


        })

        // if no validation error call onSubmit fn
        if(errorList.length ===0){
            props.onSubmit && props.onSubmit(Object.values(value))
        }
        // else class on error fn
        props.onError && props.onError(errorList)
    }

    const register:RegisterFn = (name, validity)=>{
        setValue((pre)=>{
            const value = pre[name]?.value || ""
            return{
                ...pre,
                [name]:{
                    name,value, validity
            }
            }
        })
    }

    const getOrDefault:GetOrDefault = (name, defaultValue)=>{
        return value[name] ? value[name].value : (defaultValue || null)
    }

    return(
        <FormContext value={{value, updateValue, submitForm, getOrDefault, register}}>
            {props.children}
        </FormContext>
    )
}

export const useForm = ()=>{
    const context = useContext<FormContext|null>(FormContext)

    if(!context){
        console.error("Form element is not wrapper inside <Form/>")
        const ret:FormContext = {
            value:{},
            updateValue:(name: string, value:string)=>{},
            submitForm:()=>{},
            getOrDefault:()=>null,
            register:()=>null
        }
        return ret
    }

    return context
}
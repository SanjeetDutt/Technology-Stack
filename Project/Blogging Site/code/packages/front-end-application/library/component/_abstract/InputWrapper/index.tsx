"use client"
/**
 * Input wrapper component:
 * Meant to reuse the following functionality across all the input fields
 * Show Label
 * Show input underline and highlight on focus or input
 * Validate the input
 * Show invalid icon and popup
 *
 */

import style from "./index.module.scss"
import React, {useEffect} from "react";
import {useDebouncedState} from "@/library/hook";
import {Warning} from "@/library/icon"
import {useForm} from "@component";

export interface DefaultInputProps{
    //-------------------   REQUIRED FIELDS     -------------------//
    label:string;
    name:string;

    //-------------------   REQUIRED HANDLERS   -------------------//


    //-------------------   OPTIONAL FIELDS     -------------------//
    placeholder?:string
    className?: string,

    //-------------------   OPTIONAL HANDLER    -------------------//
    onValueChange?:(value:string) => void;
    validation?: (value:string)=>string|boolean
    onFocus?: () => void,
    onBlur?: () => void,

}

type OnChange = (e:React.ChangeEvent<HTMLInputElement>)=>void

interface _InputChildProps extends Omit<DefaultInputProps, "onChange"|"validation"|"label">{
    id: string,
    onChange: OnChange,
    value:string
}

type InputWrapperProps = DefaultInputProps & {Input:(props:_InputChildProps)=>React.ReactElement}

export const InputWrapper: React.FC<InputWrapperProps> = (props)=>{

    const form = useForm();
    const defaultValue = form.getOrDefault(props.name, null)
    const [focused, setFocused] = React.useState<boolean>(false);
    const [value, setValue, current] = useDebouncedState<string|null>( defaultValue|| null)

    useEffect(()=>{
        form.register(props.name, props.validation)
    },[])

    const isValid = current!==null && props.validation && props.validation(current)===true
    const isValidOrNull = value ===null || isValid;

    const isFocused = focused || (current!==null && current!=="")

    const focusHandler=()=>{
        setFocused(true)
    }

    const blurHandler=()=>{
        setFocused(false)
    }

    const onChangeHandler:OnChange=(e)=>{
        const _value = e.target.value;
        setValue(_value)
        props.onValueChange && props.onValueChange(_value||"")
        form.updateValue(props.name, _value)
    }

    return(
        <div className={`${style.InputWrapper} ${props.className}`}>
            <Label {...props} isFocused={isFocused} />
            <div className="row-flex gap-sm">
                <Input {...props} onFocus={focusHandler} onBlur={blurHandler} onChange={onChangeHandler} current={current}/>
                {!isValidOrNull && (<Warning className="cursor-pointer" />)}
            </div>
            <Underline {...props} isFocused={isFocused} />

        </div>
    )
}

type _Input = InputWrapperProps & { onFocus?: () => void,
    onBlur?: () => void,
    onChange: OnChange,
    current?: string|null
}
const Input:React.FC<_Input>=(props)=>
    props.Input({
        name: props.name,
        id: props.name,
        className:"input",
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        onChange: props.onChange,
        value: props.current || "",
        placeholder:props.placeholder || "",
    })

const Label:React.FC<InputWrapperProps & {isFocused:boolean}> = (props)=> (
    <label htmlFor={props.name}
           className={`${style.InputWrapperLabel} ${props.isFocused ? style.InputWrapperLabelFocused : ''}`}
    >{props.label}</label>
)

const Underline:React.FC<InputWrapperProps & {isFocused:boolean}> = (props)=> (
    <div className={`${style.InputWrapperUnderline} ${props.isFocused ? style.InputWrapperUnderlineFocused : ''}`}></div>
)
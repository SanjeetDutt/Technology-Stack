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
import React from "react";
import {useDebouncedState} from "@/library/hook";
import {Warning} from "@/library/icon"

export interface DefaultInputProps{
    //-------------------   REQUIRED FIELDS     -------------------//
    label:string;
    name:string;

    //-------------------   REQUIRED HANDLERS   -------------------//


    //-------------------   OPTIONAL FIELDS     -------------------//
    value?: string|null
    placeholder?:string
    className?: string,

    //-------------------   OPTIONAL HANDLER    -------------------//
    onChange?:(value:string) => void;
    validation?: (value:string)=>string|boolean
    onFocus?: () => void,
    onBlur?: () => void,

}

interface _InputChildProps extends Omit<DefaultInputProps, "onChange"|"validation"|"label"|"value">{
    id: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=>void,
    value:string
}

type InputWrapperProps = DefaultInputProps & {Input:(props:_InputChildProps)=>React.ReactElement}

export const InputWrapper: React.FC<InputWrapperProps> = (props)=>{

    const [focused, setFocused] = React.useState<boolean>(false);
    const [value, setValue, current] = useDebouncedState<string|null>(props.value || null)

    const isValid = value!==null && props.validation && props.validation(value)
    const isValidOrNull = value ===null || isValid;

    const isFocused = focused || (value!==null && value!=="")

    const focusHandler=()=>{
        setFocused(true)
    }

    const blurHandler=()=>{
        setFocused(false)
    }

    const onChangeHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const _value = e.target.value;
        setValue(_value)
    }

    return(
        <div className={`${style.InputWrapper} ${props.className}`}>
            <label htmlFor={props.name}
                   className={`${style.InputWrapperLabel} ${isFocused ? style.InputWrapperLabelFocused : ''}`}
            >{props.label}</label>
            <div className="row-flex gap-sm">
                {props.Input({
                    name: props.name,
                    id: props.name,
                    className:"input",
                    onFocus: focusHandler,
                    onBlur: blurHandler,
                    onChange: onChangeHandler,
                    value: current || "",
                    placeholder:props.placeholder || "",
                })}
                {!isValidOrNull && (<Warning />)}
            </div>

            <div className={`${style.InputWrapperUnderline} ${isFocused ? style.InputWrapperUnderlineFocused : ''}`}></div>

        </div>
    )
}
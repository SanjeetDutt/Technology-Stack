"use client"

import React from "react";
import {DefaultInputProps, InputWrapper} from "../_abstract";

interface TextboxProps extends DefaultInputProps{}

export const Textbox:React.FC<TextboxProps> = (props)=>{
    return (
        <InputWrapper {...props}
                      className={`textbox ${props.className||''}`}
                      Input={(props)=><input type="text" {...props} />}
        />
    )
}
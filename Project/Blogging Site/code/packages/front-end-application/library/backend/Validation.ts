import {FormType} from "@component";

const validate = <T = any>( validationFn:(val:T)=>boolean, failMessage:string):FormType.Validity =>{
    // @ts-ignore
    return (value: T) => {
        const validationResult = validationFn(value)

        if (validationResult) {
            return true
        } else {
            return failMessage
        }
    }
}

//Regex to validate email address
const emailRegex =
    /^(([T extends any = any[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const validateEmail = validate<string>(e=>!!e && !!e.trim().toLowerCase().match(emailRegex), "Invalid email address")
export const validatePassword8Length = validate<string>(e=>!!e && e.length>8,"Password must be 8 character long")
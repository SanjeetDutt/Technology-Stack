const validateString = ( validationFn:(val:string|null)=>boolean, failMessage?:string):(value:string|null)=>boolean|string =>{
    return (value:string|null)=>{
        const validationResult = validationFn(value)

        if(validationResult){
            return true
        } else {
            if(failMessage){
                return failMessage
            } else {
                return false
            }
        }
    }
}

//Regex to validate email address
const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const validateEmail = validateString(e=>!!e && !!e.trim().toLowerCase().match(emailRegex), "Invalid email address")
export const validatePassword8Length = validateString(e=>!!e && e.length>8,"Password must be 8 character long")
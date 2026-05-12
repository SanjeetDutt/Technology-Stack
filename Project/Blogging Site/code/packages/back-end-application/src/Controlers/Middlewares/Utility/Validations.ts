import {ValidationError} from "../../index";

const VALIDATE = <T=any>(condition:(p:T)=>boolean, message:string, description?:string)=>{
	return (inputs:{[key:string]:T})=>{
		Object.entries(inputs).forEach(([name, value]) => {
			if(!condition(value)) {
				const parsedMessage = message.replace("$name", name).replace("$value", String(value))
				const parsedDescription = description && description.replace("$name", name).replace("$value", String(value))

				throw new ValidationError(parsedMessage, parsedDescription)
			}
		})
	}
}

//Regex to validate email address
const emailRegex =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


//---------------VALIDATION RULES--------------------//
export const notNull = VALIDATE(t=>t!==null, '$name cannot be null')
export const notEmpty = VALIDATE<string>(t=>t.trim()!=="", '$name cannot be empty string')
export const validEmail = VALIDATE<string>(t=>!!t.toLowerCase().match(emailRegex), 'Please enter valid email','Got $value')
export const validPassword8Length = VALIDATE<string>(t=>t.length>8,'Password must be 8 characters long')
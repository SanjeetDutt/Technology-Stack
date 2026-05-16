import {FormType} from "./FormType";

export class _StateValue<T = any> {
    readonly name: string
    value: T|null
    readonly defaultValue?: T
    readonly validation?: FormType.Validity
    readonly isOptional: boolean

    constructor(props:{name: string, defaultValue?:T, validation?: FormType.Validity, isOptional?: boolean}) {
        this.name = props.name
        this.value = props.defaultValue || null
        this.defaultValue = props.defaultValue
        this.validation = props.validation
        this.isOptional = props.isOptional !== false
    }

    validate(){
        if(this.isOptional || !this.validation){
            return true
        }
        if(!this.value){
            return "Please enter value in " + this.name
        }
        return this.validation(this.value)
    }

    set(value:T){
        this.value = value
    }
}
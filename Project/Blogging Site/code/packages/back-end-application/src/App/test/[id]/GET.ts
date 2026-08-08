import { defineRoute, defineAuth, Name, defineValidation } from "common-back-end";

interface Payload{}
interface Body{
    status: string,
    message: string
}


export default defineRoute<Payload, Body>((request, response)=>{
    response.addBody({
        status:"OK",
        message:"HELLO WORLD"
    })
})

export const AUTH = defineAuth<Payload, Body>((request, response)=>{
    console.log("EXECUTING AUTH FROM GET CALL")
})

export const VALIDATION = defineValidation((req)=>{
    console.log("FILE VALIDATION")
})

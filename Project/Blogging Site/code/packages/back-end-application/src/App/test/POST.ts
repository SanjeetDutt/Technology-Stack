import { defineRoute, defineAuth } from "common-back-end";

interface Payload{}
interface Body{}

export default defineRoute<Payload, Body>((request, response)=>{
    console.log("HELLO WORLD POST", request, response)
})


export const AUTH = defineAuth<Payload, Body>((request, response)=>{
    console.log("EXECUTING AUTH FROM PORT CALL")
})
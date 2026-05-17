"use client"

import {SignupLoginCard} from "../SignupLoginCard";
import {Form, Password, Textbox, SubmitButton} from "@component";
import {validateEmail, validatePassword8Length, LoginRequest} from "@backend"

export default function (props:PageProps<"/admin/login">) {
    const submitHandler = (e:{[key:string]:string})=>{
        console.log("SUBMIT")
        const request:LoginRequest = {
            email: e.email,
            password: e.password
        }
    }

    const errorHandler = (e:string[])=>{
        console.log("ERROR",e)
    }
    return (
        <SignupLoginCard title="Login to Account" subtitle="Please enter your email and password to continue.">
            <Form onSubmit={submitHandler} onError={errorHandler} className="column-flex gap-lg">
                <Textbox label="Email" name="email" defaultValue="sanjeetdutt@gmail.com" validation={validateEmail} isRequired={true}/>
                <Password label="Password" name="password" defaultValue="ABCdef123!@#" validation={validatePassword8Length} isRequired={true}/>
                <div className="row-flex justify-right">
                    <SubmitButton>Login</SubmitButton>
                </div>
            </Form>
        </SignupLoginCard>
    )
}
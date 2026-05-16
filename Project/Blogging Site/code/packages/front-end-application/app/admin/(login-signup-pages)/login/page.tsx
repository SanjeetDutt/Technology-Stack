"use client"

import {SignupLoginCard} from "../SignupLoginCard";
import {Form, Password, Textbox, SubmitButton} from "@component";
import {validateEmail, validatePassword8Length} from "@backend"

export default function (props:PageProps<"/admin/login">) {
    const submitHandler = (e:{[key:string]:string})=>{
        console.log("SUBMIT", e)
    }

    const errorHandler = (e:string[])=>{
        console.log("ERROR",e)
    }
    return (
        <SignupLoginCard title="Login to Account" subtitle="Please enter your email and password to continue.">
            <Form onSubmit={submitHandler} onError={errorHandler}>
                <Textbox label="Email" name="email" validation={validateEmail} isRequired={true}/>
                <Password label="Password" name="password" validation={validatePassword8Length} isRequired={true}/>
                <div className="row-flex justify-right">
                    <SubmitButton>Login</SubmitButton>
                </div>
            </Form>
        </SignupLoginCard>
    )
}
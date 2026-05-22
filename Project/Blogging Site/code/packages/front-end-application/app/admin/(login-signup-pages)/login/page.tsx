"use client"

import {SignupLoginCard} from "../SignupLoginCard";
import {Form, Password, Textbox, SubmitButton} from "@component";
import {validateEmail, validatePassword8Length} from "@backend"
import {userLogin} from "@/library/backend/API";

export default function (props:PageProps<"/admin/login">) {

    const submitHandler = async (e:{[key:string]:string})=>{
        const response = await userLogin(e.email, e.password)
        console.log(response)

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
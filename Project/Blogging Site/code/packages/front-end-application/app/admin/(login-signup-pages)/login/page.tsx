"use client"

import {SignupLoginCard} from "../SignupLoginCard";
import {Form, Password, Textbox} from "@component";

const emailValidation = (email: string):boolean|string => false
const passwordValidation = (password:string) => true

export default function (props:PageProps<"/admin/login">) {

    return (
        <SignupLoginCard title="Login to Account" subtitle="Please enter your email and password to continue.">
            <Form>
                <Textbox label="Email" name="email" validation={emailValidation} />
                <Password label="Password" name="password" validation={passwordValidation}/>
                <button>Submit</button>
            </Form>
        </SignupLoginCard>
    )
}
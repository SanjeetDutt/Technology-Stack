"use client"

import {SignupLoginCard} from "../SignupLoginCard";
import {Form, Password, Textbox, SubmitButton} from "@component";
import {validateEmail, validatePassword8Length} from "@backend"

export default function (props:PageProps<"/admin/login">) {
    return (
        <SignupLoginCard title="Login to Account" subtitle="Please enter your email and password to continue.">
            <Form>
                <Textbox label="Email" name="email" validation={validateEmail} />
                <Password label="Password" name="password" validation={validatePassword8Length}/>
                <div className="row-flex justify-right">
                    <SubmitButton>Login</SubmitButton>
                </div>
            </Form>
        </SignupLoginCard>
    )
}
"use client"

import {SignupLoginCard} from "../SignupLoginCard";
import {Password, Textbox} from "@component";

const emailValidator = (email: string) => false

export default function (props:PageProps<"/admin/login">) {

    return (
        <SignupLoginCard title="Login to Account"
                         subtitle="Please enter your email and password to continue."
        >
            <Textbox label="Email" name="email" validation={emailValidator} />
            <Password label="Password" name="password"/>
            <button>Submit</button>
        </SignupLoginCard>
    )
}
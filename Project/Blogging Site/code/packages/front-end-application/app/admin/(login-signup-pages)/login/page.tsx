"use client"

import {SignupLoginCard} from "../SignupLoginCard";
import {Form, Password, Textbox, SubmitButton} from "@component";
import {validateEmail, validatePassword8Length, API} from "@backend"
import {useAuth} from "@store";
import {useRouter} from "next/navigation"
export default function (props:PageProps<"/admin/login">) {
    const {setToken, token} = useAuth()!
    const router = useRouter()
    const submitHandler = async (e:{[key:string]:string})=>{
        const response = await API.user.login(e.email, e.password)
        if(response && response.token){
            setToken(response.token)
            router.push("/admin/dashboard")
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
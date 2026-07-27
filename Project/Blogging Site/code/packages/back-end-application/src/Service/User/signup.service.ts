import { UserDTO } from "@/DTO";

export const Signup = async (request: UserDTO.SignupRequest):Promise<UserDTO.SignupResponse>=>{

    return {
        status:"success"
    }
}

Signup.validation = async (r: UserDTO.SignupRequest): Promise<void>=>{}

export const Login = async(request: UserDTO.LoginRequest): Promise<UserDTO.LoginResponse>=>{

    return {
        status:"Success",
        token:"",
        type:"Bearer"
    }
}

Login.validation = async(r: UserDTO.LoginRequest):Promise<void>=>{}
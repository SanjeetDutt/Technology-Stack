export namespace UserDTO{

    export interface SignupRequest{
        name: string
        email: string
        password: string
    }

    export interface SignupResponse{
        status: "success" | "failure"
    }

    export interface LoginRequest {
        email: string
        password: string
    }

    type LoginSuccessResponse = {
        status:"Success",
        token: string,
        type: string
    }
    type LoginErrorResponse = {
        status: "faliure",
        message: string
    }
    export type LoginResponse =
        | LoginSuccessResponse
        | LoginErrorResponse
}
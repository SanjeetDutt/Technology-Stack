import {createGlobalStore} from "@/library/store/utility";
import {JWTDecode} from "@/library/utility";

interface JWT{
    name: string|null,
    email:string|null,
    permissions: string[] | null
}

interface AuthState {
    token: string|null,
    type: "Bearer"|null,
    jwt: JWT | null
}

interface AuthFunction{
    setToken: (token: string)=>void
    logout:()=>void
}

const store = createGlobalStore<AuthState, AuthFunction>((set)=>({
    token: null,
    type: null,
    jwt: null,
    setToken:(token:string)=>{
        set(pre=>{

            const decodedToken = JWTDecode<JWT>(token)

            if(!decodedToken){
                throw new Error("Invalid token received.")
            }

            return {
                ...pre,
                token: token,
                jwt: decodedToken
            }
        })
    },
    logout:()=>{
        set(pre=>({
            ...pre,
            token: null,
            jwt: null,
            type: null
        }))
    }
}),{
    name:"Authentication"
})

export const AuthProvider = store.Provider
export const useAuth = store.useStore
import {createGlobalStore} from "@/library/store/utility";

interface AuthState {
    token: string|null,
    type: "Bearer"|null
}

interface AuthFunction{
    setToken: (token: string)=>void
}

const store = createGlobalStore<AuthState, AuthFunction>((set)=>({
    token: null,
    type: null,
    setToken:(token:string)=>{
        set(pre=>({
            ...pre,
            token: token
        }))
    }
}),{
    name:"Authentication"
})

export const AuthProvider = store.Provider
export const useAuth = store.useStore
import { Outlet } from "sanjeet-ui"

export const AnotherDummy:(p:{text:string})=>React.ReactNode = ({text})=>{
    return (
        <div>
            <h1>ERROR IN {text}</h1>
            <Outlet/>
        </div>
    )
}
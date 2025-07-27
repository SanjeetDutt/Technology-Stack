import { useEffect } from "react";
import { Outlet } from "sanjeet-ui"

interface DummyProps {
    text: string
}
export const ErrorDummy:React.FC<DummyProps> = (p)=>{
    console.log(p);

    useEffect(()=>{

        throw new Error("TESTING ERROR");
        
    })
    
    return (
        <div>
            <h1>{p.text}</h1>
            <Outlet/>
        </div>
    )
}

export const DummyLoader = ()=>{

    return (
        <h5>LOADING.....</h5>
    )
}
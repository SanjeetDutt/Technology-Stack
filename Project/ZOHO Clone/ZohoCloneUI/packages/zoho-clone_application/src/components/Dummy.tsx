import { Outlet } from "sanjeet-ui"

interface DummyProps {
    text: string
}
export const Dummy:React.FC<DummyProps> = (p)=>{
    console.log(p);
    
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
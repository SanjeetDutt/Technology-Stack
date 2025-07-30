import { FetchAPI, Outlet } from "sanjeet-ui"
import type { LoaderFunction } from "sanjeet-ui/modules/router/Suspense";

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
        <h5>I am dummy loader LOADING.....</h5>
    )
}

const API = FetchAPI.create({
    baseURL: 'https://dummyjson.com',
    timeoutMS: 5000,
    headers: {
        contentType: 'JSON',
        authorization: 'BEARER TOKEN_HERE'
    }
});

export const DummyBeforeMount:LoaderFunction = async ()=>{
    return API.get("products") as any
}
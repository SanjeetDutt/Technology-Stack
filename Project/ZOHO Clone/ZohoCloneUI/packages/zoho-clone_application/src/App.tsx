import { BrowserRouteProvider, RouterModule } from "sanjeet-ui"
import { AnotherDummy, DummyLoader } from "./components"
// import { ThemeSlice } from "./stores/Theme"

const router = new RouterModule([
    {
        name:"index",
        component: import("./components/Dummy").then(d=>({default:d.Dummy})),
        loader: <DummyLoader/>,
        errorBoundary: AnotherDummy,
        props:{
            text:"Hello world"
        }
    },
    {
        name:"zoho-clone",
        component: import("./components/Dummy").then(d=>({default:d.Dummy})),
        loader: <DummyLoader/>,
        errorBoundary: AnotherDummy,
        props:{
            text:"Zoho CLONE"
        },
        children:[
            {
                name:"index",
                component: import("./components/Dummy").then(d=>({default:d.Dummy})),
                props:{
                    text:"ZOHO Login"
                }
            },
            {
                name:"super-admin",
                component: import("./components/Dummy").then(d=>({default:d.Dummy})),
                children:[
                    {
                        name:"index",
                        component: import("./components/Dummy").then(d=>({default:d.Dummy})),
                    },{
                        name:"enroll",
                        component: import("./components/Dummy").then(d=>({default:d.Dummy})),
                    }
                ]
            },
            {
                name:"admin",
                component: import("./components/Dummy").then(d=>({default:d.Dummy})),
                errorBoundary: AnotherDummy,
                props:{
                    text:"ZOHO CLONE ADMIN APP"
                },
                children:[
                    {
                        name:"index",
                        component: import("./components/ErrorDummy").then(d=>({default:d.ErrorDummy})),
                    }
                ]
            },
            {
                name:"user",
                component: import("./components/Dummy").then(d=>({default:d.Dummy})),
                children:[
                    {
                        name:"index",
                        component: import("./components/Dummy").then(d=>({default:d.Dummy})),
                    }
                ]
            }
        ]
    },
    {
        name:"invitation/:id",
        component: import("./components/Dummy").then(d=>({default:d.Dummy})),
    }
])


export const App = () =>  {
    // const theme = useSlice(ThemeSlice)

    // console.log(router.getRouteNamePathMap());
    

    return (
        <BrowserRouteProvider router={router}/>
    )
}
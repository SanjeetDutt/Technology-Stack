import React, { type ComponentType, useEffect, useState } from "react"

//TODO: pass the router and all store object in it
export type LoaderFunction = <T=any>()=>Promise<T>
//TODO: pass the router and all store object in it
export type GuardFunction = ()=>boolean | string

interface SuspenseProps extends LazyComponentProps{
    guard?: GuardFunction,
    loader?: LoaderFunction
}

interface LazyComponentProps extends LazyLoadingProps {
    children: Promise<{default: ComponentType<any>}>
    props?:{
        [key: string]: any
    }
}

interface LazyLoadingProps {
    fallback?: React.ReactNode,
}

export const Suspense = (props: SuspenseProps)=>{

    // component will be show loading if
    // guard or loader value is set
    // until loader values finishes
    const [isLoading, setLoading] = useState<boolean>(!!props.loader)
    const [response, setResponse] = useState<any>(null)
    const [guardCheck, setGuardCheck] = useState<boolean>(!props.guard)
    

    useEffect(()=>{
        if(!!props.guard){
            const gardValue =  props.guard()
            if(typeof gardValue === "string"){
                // Redirect the user to url. for now setting to guard check to false
                //TODO: develop the feature
                setGuardCheck(false)
            } else {
                setGuardCheck(gardValue)
            }
        }

    },[props.guard])

    useEffect(()=>{
        if(!!props.loader){
            //We can pass the complete store to the loader function so that user can extract the value to make API call.
            //We can pass the complete router params ,query, session store, cache value as well of operations
            //Loader can throw error as well which we can catch and show the error screen. Handle from React router and error boundary
            //on completion of loader, show the lazy loading component
            props.loader()
                .catch(e=>{throw e})
                .then(r=>{
                    setResponse(r)
                    setLoading(false)
                })

        }
    },[props.loader])  

    const Component = React.lazy(()=>props.children)

    const Loader = <LazyLoading fallback={props.fallback}/>

    console.log({isLoading, guardCheck, props});
    

    return(
        <React.Suspense fallback={Loader}>
            {!!isLoading && Loader}
            {!isLoading && <>
                {!guardCheck && <p>Content Blocked</p>}
                {!!guardCheck && (
                    <Component 
                        {...response} {...props.props} 
                    />                    
                )}
            </>}
            
        </React.Suspense>
    )
}

const LazyLoading = (props: LazyLoadingProps)=>{

    if(props.fallback){
        return props.fallback
    } else {
        return "Loading..."
    }
}
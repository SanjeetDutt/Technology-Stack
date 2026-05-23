"use client"

import {StoreApi, useStore, createStore, create} from "zustand"
import {persist, createJSONStorage} from "zustand/middleware"
import React, {useState} from "react";
import Cookies from "js-cookie"

type State = {
    [key: string]: any;
}

type Action = {
    // @ts-ignore
    [key: any]: (...args:any[])=>void;
}


type StateCreatorFn<state extends State,action extends Action> = (
    set:{(partial: ((state & action) | Partial<state & action> | ((state: (state & action)) => ((state & action) | Partial<state & action>))), replace?: false): void},
    get:()=>(state & action),
    store:StoreApi<state&action>
)=>state & action

interface GlobalStoreOptions {
    name: string
    expiresDay?: number
}

function _createStore<state extends State, action extends Action>(stateCreateFn: StateCreatorFn<state, action>, options?: GlobalStoreOptions)
{
    if(!options){
        return createStore<state&action>((set,get, store)=>stateCreateFn(set, get, store))
    }

    return create(
        persist<state&action>((set, get, store)=>stateCreateFn(set, get, store),
            {
                name: options.name,
                storage:createJSONStorage(()=>({
                    getItem: (name)=>Cookies.get(name) || null,
                    setItem: (name, value)=>Cookies.set(name, value, {
                        expires: options?.expiresDay,
                        path:"/"
                    }),
                    removeItem: (name)=> {
                        Cookies.remove(name)
                        return null
                    }
                }))
            }
        )
    )

}

export function createGlobalStore<state extends State,action extends Action> (stateCreateFn:StateCreatorFn<state, action>, options?: GlobalStoreOptions){

    const Context = React.createContext<null | StoreApi<state & action>>(null);

    const Provider = ({children}:{children:React.ReactNode})=>{

        const [_store] = useState(()=>_createStore<state, action>(stateCreateFn, options));

        return <Context.Provider value={_store}>{children}</Context.Provider>;

    }

    const useMyStore = ():state&action=>{
        const store = React.useContext(Context);

        if(!store){
            throw new Error("useStore must be used within the context");
        }

        return useStore(store, selector=>selector);
    }


    return {Provider, useStore:useMyStore};
}
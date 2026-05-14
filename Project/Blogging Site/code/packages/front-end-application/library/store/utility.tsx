"use client"

import {StoreApi, useStore, createStore} from "zustand"
import React, {useState} from "react";

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

export function createGlobalStore<state extends State,action extends Action> (stateCreateFn:StateCreatorFn<state, action>){

    const Context = React.createContext<null | StoreApi<state & action>>(null);

    const Provider = ({children}:{children:React.ReactNode})=>{

        const [_store] = useState(()=>createStore<state&action>((set,get, store)=>stateCreateFn(set, get, store)));

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
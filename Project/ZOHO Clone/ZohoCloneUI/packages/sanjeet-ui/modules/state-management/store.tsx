import React from "react";
import {Provider} from "react-redux"
import {configureStore, type Reducer} from "@reduxjs/toolkit"
import {type Slice} from "./createSlice"

export const Store = (props:{slices:Slice<any>[], children: React.ReactNode}):React.ReactNode=>{

     const reducers:{
        [key: string]:Reducer<any>
    } = {}

    props.slices.forEach(slice=>{
        reducers[slice.name] = slice.reducers
    })

    console.log({reducers});
    

    const store = configureStore({
        reducer: reducers
    })

    return <Provider store={store}>
        {props.children}
    </Provider>
}

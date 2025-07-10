import React from "react";
import {Provider} from "react-redux"
import {configureStore, type Reducer} from "@reduxjs/toolkit"
import {type CreateSlice, type Slice} from "./types"

export const Store = <S, M extends Slice.MethodObject<S>, C extends Slice.ComputedObject<S>>(props:{slices:CreateSlice.Returns<S,M,C>[], children: React.ReactNode}):React.ReactNode=>{

     const reducers:{
        [key: string]:Reducer<any>
    } = {}

    props.slices.forEach(slice=>{
        reducers[slice.name] = slice.reducers
    })

    const store = configureStore({
        reducer: reducers
    })

    return <Provider store={store}>
        {props.children}
    </Provider>
}

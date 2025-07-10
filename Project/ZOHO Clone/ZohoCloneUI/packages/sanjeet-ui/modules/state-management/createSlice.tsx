import * as ReduxToolkit from "@reduxjs/toolkit"
import type {CreateSlice, Slice, StringObject} from "./types"

export const createSlice:CreateSlice.Function = (props) =>{

    //Create own name
    const name = ReduxToolkit.nanoid()

    const slice = ReduxToolkit.createSlice({
        name,
        initialState: props.state,
        reducers: createReducers(props.method)
    })

    return {
        name: name,
        actions:slice.actions,
        reducers:slice.reducer,
        ...props
    }
}

const createReducers = <S,>(methods?: Slice.MethodObject<S>)=>{
    if(!methods){
        return {}
    }

    const reducerMap = new Map()

    for(let key of Object.keys(methods)){
        reducerMap.set(key, (state: S, {payload}:{payload:any[]})=>{
            console.log({methods, key, payload, state});
            
            methods[key](...payload)(state)
        })
    }

    return Object.fromEntries(reducerMap)

}

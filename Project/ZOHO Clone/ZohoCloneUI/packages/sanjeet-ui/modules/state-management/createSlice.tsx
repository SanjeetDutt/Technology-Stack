import * as ReduxToolkit from "@reduxjs/toolkit"

export type Computed<S> = (state:S) => any
export type ComputedObject<S> = {
    [key:string] : Computed<S>
}

export type Method<S> = (payload:any) => (s:S) => void
export type MethodObject<S> = {
    [key:string] : Method<S>
}

export type CreateSliceProps<S,M extends MethodObject<S> , C extends ComputedObject<S>> = {
    state : S,
    method : M,
    computed : C
};

export type Slice<S,M extends MethodObject<S>,C extends ComputedObject<S>> = {
    name: string,
    reducers: ReduxToolkit.Reducer<S>,
    actions: ReduxToolkit.CaseReducerActions<{[key: string]:any},string>
} & CreateSliceProps<S,M,C>


export type createSlice = 
    <   S,
        M extends MethodObject<S>,
        C extends ComputedObject<S>
    > (props:CreateSliceProps<S,M,C>) => Slice<S,M,C>

export const createSlice:createSlice = (props) => {
    
    //Create own name
    const name = ReduxToolkit.nanoid()
    
    const reducerResult:{[key:string]:any} = {}
    const reducers = Object.keys(props.method).reduce((result, key)=>{
        result[key] = (state:any,{payload}:{payload:any})=>{
            props.method[key](payload)(state)
        }
        return result
    },reducerResult)


    // Create a redux toolkit slice
    const reduxSlice = ReduxToolkit.createSlice({
        name: name,
        initialState: props.state,
        reducers,
        //TODO: Will think about extra reducer later
        extraReducers: (builder)=>{

        }
    })
    
    //Export all data points
    return {
        name: name,
        actions: reduxSlice.actions,
        reducers: reduxSlice.reducer,
        ...props
    }
}

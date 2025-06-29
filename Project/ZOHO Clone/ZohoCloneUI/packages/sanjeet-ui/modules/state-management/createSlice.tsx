import * as ReduxToolkit from "@reduxjs/toolkit"


type SliceComputed<T> = <R,>(state:T)=>R

type CreateSliceProps<T> = {
    state:T,
    method?:{
        [key: string]: <P,>(state:T,p:{payload:P})=>void
    },
    computed?:{
        [key: string]: SliceComputed<T>
    }
};

export type Slice<T> = {
    name: string,
    reducers: ReduxToolkit.Reducer<T>

    state: T
    methods?:{
        [key: string]: <P,>(state:T,p:{payload:P})=>void
    },
    computed?:{
        [key: string]: <R,>(state:T)=>R
    }
}

type createSlice = <T>(props:CreateSliceProps<T>)=>Slice<T>

export const createSlice:createSlice = (props) => {
    
    //Create own name
    const name = ReduxToolkit.nanoid()
    
    // Create a redux toolkit slice
    const reduxSlice = ReduxToolkit.createSlice({
        name: name,
        initialState: props.state,

         //TODO: ADD REDUCER AND EXTRA REDUCER BASED ON METHODS
        reducers:{},
        extraReducers: (builder)=>{

        }
    })
    
    //Export all data points
    return {
        name: name,
        reducers: reduxSlice.reducer,
        state: props.state,
        methods:props.method,
        computed:props.computed
    }
}


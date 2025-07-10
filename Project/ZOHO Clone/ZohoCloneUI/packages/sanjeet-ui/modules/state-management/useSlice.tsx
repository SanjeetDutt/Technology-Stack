import { useMemo } from "react"
import * as ReactRedux from "react-redux"
import {type CreateSlice, type Slice, type UseSlice} from "./types"


export const useSlice:UseSlice.Function = <S, M extends Slice.MethodObject<S>, C extends Slice.ComputedObject<S>>(props:CreateSlice.Returns<S,M,C>) => {
    const dispatch = ReactRedux.useDispatch()
    
    const data = ReactRedux.useSelector<any,any>(state => state[props.name])

    const computedResult = useMemo(()=>{
        
        if(!props.computed){
            return {} as UseSlice.Computed<S, C>
        }

        const result = new Map<string, UseSlice.Computed<S,C>>()

        Object.entries(props.computed).forEach(([key, value])=>{
            result.set(key, value(data))
        })

        return Object.fromEntries(result) as UseSlice.Computed<S, C>

    },[data])
    
    const methodResult = useMemo(()=>{

        if(!props.method){
            return {} as UseSlice.Method<S,M>
        }

        const result = new Map()

        for(let key of Object.keys(props.method)){
            const action = props.actions[key]

            if(action){
                result.set(key, (...payload: any) => {
                    //@ts-ignore
                    dispatch(props.actions[key](payload))
                })
            }
            
        }

        return Object.fromEntries(result)
        
    },[])
    
    return {
        data,
        method:methodResult,
        computed: computedResult
    }

}
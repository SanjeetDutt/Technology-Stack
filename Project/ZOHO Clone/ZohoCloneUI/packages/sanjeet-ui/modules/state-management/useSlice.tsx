import { useMemo } from "react"
import {type ComputedObject, type MethodObject, type Slice} from "."
import * as ReactRedux from "react-redux"

export const useSlice = <S,M extends MethodObject<S>,C extends ComputedObject<S>>({name, computed, method,actions}:Slice<S,M,C>):{
    data: S,
    method:{
        [i in keyof M]: (payload:Parameters<M[i]>[0])=>void
    },
    computed:{
        [i in keyof C]:ReturnType<C[i]>
    }
} => {
    const dispatch = ReactRedux.useDispatch()
    const data = ReactRedux.useSelector<any,any>(state => state[name])

    const computedResult = useMemo(()=>{
        const result:{[key:string]:any} = {}
        return Object.keys(computed).reduce((map, key)=>{
            
            map[key] = computed[key](data)
            return map
        },result) as {[i in keyof C] : ReturnType<C[i]>}
    },[data])
    
    const methodResult = useMemo(()=>{
        const result : {[key:string]:any} = {}

        return Object.keys(method).reduce((map, key)=>{
            map[key] = (payload:any)=>{
                //@ts-ignore
                dispatch(actions[key](payload))
            }
            return map
        },result) as {[i in keyof M] : (payload:any)=>void}
    },[])
    
    return {
        data,
        method:methodResult,
        computed: computedResult
    }

}
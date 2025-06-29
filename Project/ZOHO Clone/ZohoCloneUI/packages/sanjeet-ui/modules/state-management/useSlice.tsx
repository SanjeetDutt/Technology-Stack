import {type Slice} from "."
import * as ReactRedux from "react-redux"


export const useSlice = <T,>({name, state, methods, computed}:Slice<T>):{
    data: T,
    methods:{},
    computed:{}
} => {
    const dispatch = ReactRedux.useDispatch()
    const data = ReactRedux.useSelector<any,any>(state => state[name])
    
    return {
        data,
        methods:{},
        computed:{}
    }

}
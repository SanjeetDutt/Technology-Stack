
import { createSlice, useSlice, Store } from "sanjeet-ui"

// type slice1 = {
//     title: string
// }

// const setTitle = (state,{payload})=>{
//     console.log(state,payload);
    
// }

const slice1 = createSlice({
	state: {
        title:"Hello world",
        subTitle:"How are you?"
    },
    method:{
        setTitle: ()=>{}
    },
    computed:{
        getUpperCaseTitle: (state) => {
            
        }
    }
});

export const StateManagementTest = ()=>{
    
    return (
        <Store slices={[slice1]}>
            <Content />
        </Store>
    )
}

const Content = ()=>{
    const s1 = useSlice(slice1)
    console.log(s1.data.subTitle);
    

    const btnHandler = ()=>{
        // s1.methods.setTitle("BTN CLICKED")
    }


    return(
        <div>
            <h1>{s1.data.title}</h1>
            <button onClick={btnHandler}>PRESS ME</button>
        </div>
        
    )
}
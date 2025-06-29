
import { createSlice, useSlice, Store } from "sanjeet-ui"

const slice1 = createSlice({
    state: {
        title: "Hello world",
        subTitle: "How are you?"
    },
    method: {
        setTitle: (title) => (state)=>{
            state.title = state.title + title
        }
    },
     computed:{
        uppercaseTitle: (state) => {
            return String(state.title).toUpperCase()
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
    console.log(s1.method.setTitle);
    

    const btnHandler = ()=>{
        s1.method.setTitle(" -")
    }


    return(
        <div>
            <h1>{s1.computed.uppercaseTitle}</h1>
            <h2>{s1.data.title}</h2>
            <button onClick={btnHandler}>PRESS ME</button>
        </div>
        
    )
}
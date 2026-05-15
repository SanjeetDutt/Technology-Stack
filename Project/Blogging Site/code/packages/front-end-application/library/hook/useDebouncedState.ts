"use client"
import {useEffect, useState} from "react"

type UseDebouncedState = <T=any>(defaultValue:T, timeMS?:number)=>([value:T, (newValue:T)=>void, currentValue:T])


export const useDebouncedState:UseDebouncedState = <T = any>(defaultValue:T, timeMS:number=500) => {
    const [current, setCurrent] = useState<T>(defaultValue)
    const [value, setValue] = useState<T>(defaultValue)
    const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue)

    const setNewValue = (newVal:T)=>{
        setValue(newVal)
        setCurrent(newVal)
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, timeMS)

        return ()=>{
            clearTimeout(timer)
        }
    },[value, timeMS])

    return [debouncedValue, setNewValue, current]
}
export function LOG(...args:any[]){
    const isLoggingEnable = false

    if(isLoggingEnable){
        console.log(...args)
    }
}
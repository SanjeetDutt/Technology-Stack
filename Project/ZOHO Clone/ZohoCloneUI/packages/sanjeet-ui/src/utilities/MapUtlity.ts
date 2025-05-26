
// @ts-ignore
export const getValueFromMap = (map, key, defaultValue=undefined)=>{
    // @ts-ignore
    if(!!map & !!key && !!map[key]){
        return map[key];
    } else {
        return defaultValue;
    }
}
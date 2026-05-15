export const mapObject = <FROM = any, TO = any>(obj:{}, fn:(key: string, value: FROM)=>TO)=>{
    return Object.fromEntries<TO>(
        Object.entries<FROM>(obj)
            .map(
                ([key, value])=>[key, fn(key, value)]
            )
    )
}
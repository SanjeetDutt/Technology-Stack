import {Bridge} from "."

export namespace QueryParams{
    // Setting default type
    type value = string | number
    type Obj<S extends string> = {
        [key in S]: value
    }

    type extractParams<P extends Bridge.Path> = 
        P extends `${string}:${infer REST}`
            ? REST extends `${infer VAR}/${infer NEXT}`
                ?
                    &Obj<VAR>
                    &extractParams<`/${NEXT}`>
                : REST extends `${infer VAR}?${infer NEXT}`
                    ? Obj<VAR>
                    : Obj<REST>
            : {}
            
    type extractQuery<P extends Bridge.Path> = 
        P extends `${string}?${infer REST}`
            ? REST extends `${infer VAR}?${infer NEXT}`
                ? 
                    &Obj<VAR>
                    &extractQuery<`/?${NEXT}`>
                : Obj<REST>
            : {}

    export type queryParam<P extends Bridge.Path> =
        & extractParams<P>
        & Partial<extractQuery<P>>
}

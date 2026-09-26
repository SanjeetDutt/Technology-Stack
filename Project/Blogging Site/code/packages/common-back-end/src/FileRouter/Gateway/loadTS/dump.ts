const PropertyResolvers:{[key: string]: ResolverFn}={
    "PRIMITIVE": ({typeStr})=>{
        const primitiveDataType = ["string", "number", "boolean", "true", "false", "any", "unknown", "never", "void", "null", "undefined"]
        if(primitiveDataType.includes(typeStr)){
            return typeStr
        }
    },
    "LITERAL":({typeStr, type})=>{
        if(type.isLiteral()){
            return {typeStr}
        }
        if( type.getFlags()
            & (
                ts.TypeFlags.BooleanLiteral
                | ts.TypeFlags.StringLiteral
                | ts.TypeFlags.NumberLiteral
            )){
            return typeStr
        }
    },
    "TEMPLATE_LITERAL":({type})=>{
        if(type.getFlags() & (
            ts.TypeFlags.TemplateLiteral
        )){
            return "TEMPLATE"
        }
    },
    "BUILT_IN_SYMBOLS":({type,symbol})=>{
        const name = symbol?.getName()
        if(symbol && name && ["Date", "Buffer", "RegExp", "Promise", "Function"].includes(name)){
            return name
        }
    },
    "FUNCTIONS":({type, typeStr})=>{
        if(type.getCallSignatures().length > 0){
            return {
                type:"FUNCTION",
                signature: typeStr
            }
        }
    },
    "ARRAY":({type, checker, symbol})=>{
        //T[]
        const ArrayType = type.getNumberIndexType()
        if(ArrayType){
            return{
                type: "Array",
                child: resolveTS(ArrayType, checker)
            }
        }

        //Array<>
        if(symbol && symbol.getName() === "Array"){
            const args = (type as ts.TypeReference).typeArguments
            if(args && args[0]){
                return{
                    type :"ARRAY",
                    child:resolveTS(args[0], checker)
                }
            }
        }
    },
    
}

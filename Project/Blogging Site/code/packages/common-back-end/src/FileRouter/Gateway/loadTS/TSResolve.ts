import ts from "typescript";
import { PropertyResolverFn } from "./PropertyResolverFn";
import * as PR from "./PropertyResolverFn"

export function resolveTS (type: ts.Type, checker:ts.TypeChecker){
    const typeStr = checker.typeToString(type)
    const flag = type.getFlags()
    const resolverFn = propertyResolver[flag]

    if(resolverFn){
        return resolverFn!({type, typeString:typeStr, checker, flag})
    }

    // Might be a bitmask values, decode it and use it
    const decodedFlags = decodeBitMask(flag)
    if(decodedFlags.length > 0){
        const resolverFn = propertyResolver[decodedFlags[0]!]
        return resolverFn!({type, typeString:typeStr, checker, flag})
    }

    console.error("RESOLVE NOT FOUND", flag)

    return typeStr
}

const find:(name:string)=>PropertyResolverFn = (name)=>{
    return ()=>({
        "NOT_FOUND_RESOLVER":name
    })
}

const decodeBitMask = (flag: number):ts.TypeFlags[]=>
    Object.entries(ts.TypeFlags)
        .filter(([, value])=>
            typeof value === "number"
            && (value & (value - 1)) === 0
            && (flag & value) === value
        )
        .map(([name,value])=>{
            return value as ts.TypeFlags
        })

const propertyResolver:{[key in ts.TypeFlags]?:PropertyResolverFn}={
    //Primitive data type
    [ts.TypeFlags.Any]:PR.PrimitiveResolver,
    [ts.TypeFlags.Unknown]:PR.PrimitiveResolver,
    [ts.TypeFlags.Undefined]:PR.PrimitiveResolver,
    [ts.TypeFlags.Null]:PR.PrimitiveResolver,
    [ts.TypeFlags.Void]:PR.PrimitiveResolver,
    [ts.TypeFlags.String]:PR.PrimitiveResolver,
    [ts.TypeFlags.Number]:PR.PrimitiveResolver,
    [ts.TypeFlags.BigInt]:PR.PrimitiveResolver,
    [ts.TypeFlags.Boolean]:PR.PrimitiveResolver,
    [ts.TypeFlags.ESSymbol]:PR.PrimitiveResolver,
    //Literals
    [ts.TypeFlags.StringLiteral]:PR.StringLiteral,
    [ts.TypeFlags.NumberLiteral]:PR.NumberLiteral,
    [ts.TypeFlags.BigIntLiteral]:PR.BigIntLiteral,
    [ts.TypeFlags.BooleanLiteral]:PR.BooleanLiteral,
    //Symbol
    [ts.TypeFlags.UniqueESSymbol]:PR.UniqueSymbolResolver,
    //Enum
    [ts.TypeFlags.EnumLiteral]:PR.EnumLiteralResolver,
    [ts.TypeFlags.Enum]:PR.EnumLiteralResolver,
    //Special
    [ts.TypeFlags.NonPrimitive]:PR.NonPrimitiveResolver,
    [ts.TypeFlags.Never]:PR.NeverResolver,
    //Object
    [ts.TypeFlags.Object]:PR.ObjectResolve,
    //Template
    [ts.TypeFlags.TemplateLiteral]:PR.TemplateLiteral,
    //Union
    [ts.TypeFlags.Union]:PR.UnionResolver,
    //Intersection
    [ts.TypeFlags.Intersection]:PR.ObjectResolve,
}




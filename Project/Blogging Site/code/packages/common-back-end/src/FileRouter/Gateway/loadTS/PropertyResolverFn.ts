import ts from "typescript";
import { resolveTS } from "./TSResolve";

type params = {
    type:ts.Type, 
    checker:ts.TypeChecker, 
    typeString:string,
    flag: ts.TypeFlags | ts.SymbolFlags
}
export type PropertyResolverFn<R={}> = (p:params)=>void|R

namespace ResolveRetun{
    export type ANY = 
        | PRIMITIVE
        | LITERAL
        | OBJECT
        | TEMPLATE
        | NEVER
        | UNIQUE_SYMBOL
        | ENUM_LITERAL
        | STRING_LITERAL
        | NUMBER_LITERAL
        | BIG_INT_LITERAL
        | BOOLEAN_LITERAL
        | NON_PRIMITIVE

    export type ANY_N_UNION = ANY | UNION

    type R_OBJ<T extends string, val extends any = string> = {
        [key in T]: val
    }

    export type OBJECT ={
        [key: string]: ANY_N_UNION | "unknown"
    }

    type _ENUM_OBJ = {
        name: string,
        value: string | number | undefined
    }

    export type UNION = R_OBJ<"_UNION", ANY[]> | ANY
    export type PRIMITIVE = R_OBJ<"_PRIMITIVE">
    export type LITERAL=R_OBJ<"_LITERAL">
    export type TEMPLATE = R_OBJ<"_TEMPLATE">
    export type NEVER = R_OBJ<"_NEVER">
    export type UNIQUE_SYMBOL = R_OBJ<"_UNIQUE_SYMBOL">
    export type NON_PRIMITIVE = R_OBJ<"_NON_PRIMITIVE">
    export type ENUM_LITERAL = R_OBJ<"_ENUM_LITERAL", _ENUM_OBJ> | {}

    export type FN_LITERAL<T> = 
    | R_OBJ<"_ENUM_LITERAL", _ENUM_OBJ>
    | {[key in keyof T]: string}

    export type STRING_LITERAL = FN_LITERAL<"_STRING_LITERAL">
    export type NUMBER_LITERAL = FN_LITERAL<"_NUMBER_LITERAL">
    export type BIG_INT_LITERAL = FN_LITERAL<"_BIG_INT_LITERAL">
    export type BOOLEAN_LITERAL = FN_LITERAL<"_BOOLEAN_LITERAL">
}

const fixDoubleQuotes = (str?:string)=>{
    if(!str || typeof str !== "string"){
        return str
    }
    return str.replaceAll(`"`,``).trim()
}

export const PrimitiveResolver:PropertyResolverFn<ResolveRetun.PRIMITIVE> = ({typeString})=>{
    return {
        "_PRIMITIVE": typeString
    }
}

export const LiteralResolver:PropertyResolverFn<ResolveRetun.LITERAL> = ({typeString})=>{
    return {
        "_LITERAL": typeString
    }
}

export const UnionResolver: PropertyResolverFn<ResolveRetun.UNION> = ({type, typeString, checker})=>{
    if(!type.isUnion()){
        return {
            "_PRIMITIVE": typeString
        }
    }
    
    if(typeString === "boolean"){
        return {
            "_PRIMITIVE": typeString
        }
    }

    const unionType = type as ts.UnionType
    const types = unionType.types.filter(t=>!(t.getFlags() & ts.TypeFlags.Undefined))

    if(types.length === 1){
        return resolveTS(types[0]!, checker) as ResolveRetun.ANY
    }

    return {
        "_UNION":types.map(t=>resolveTS(t, checker) as ResolveRetun.ANY)
    }
}

export const ObjectResolve:PropertyResolverFn<ResolveRetun.OBJECT>=({type, flag, checker})=>{ 
    const props = type.getProperties()
    if(props.length ==0) return
    const result:Record<string,any> = {}
    for(const prop of props){
        if(flag === ts.SymbolFlags.Method) continue

        const propDeclaration = prop.valueDeclaration || prop.declarations?.[0]
        const propType = propDeclaration
            ? checker.getTypeOfSymbolAtLocation(prop, propDeclaration)
            : checker.getTypeOfSymbol(prop)
        result[prop.getName()] = propType
            ? resolveTS(propType, checker)
            : "unknown"
    }
    return result
}

export const TemplateLiteral:PropertyResolverFn<ResolveRetun.TEMPLATE> = ({type, typeString})=>{
    return {
        "_TEMPLATE": typeString
    }
}

export const NeverResolver:PropertyResolverFn<ResolveRetun.NEVER> = ({type, typeString})=>{
    return{
        "_NEVER":typeString
    }
}

export const UniqueSymbolResolver:PropertyResolverFn<ResolveRetun.UNIQUE_SYMBOL> = ({typeString})=>{
    return{
        "_UNIQUE_SYMBOL": typeString
    }
}

export const EnumLiteralResolver:PropertyResolverFn<ResolveRetun.ENUM_LITERAL> = ({type, checker})=>{
    const symbol = type.getSymbol()
    if(!symbol){
        return {}
    }
    const declaration = symbol.declarations?.find(ts.isEnumDeclaration)
    if(!declaration){
        return{}
    }

    return {
        "_ENUM_LITERAL":{
            name: symbol.getName(),
            value: declaration.members.map((member=>({
                name: member.name.getText(),
                value:fixDoubleQuotes(member.initializer?.getText())
            })))
        }
    }
}

const LiteralCheck = <T extends string>({typeString, type, flag, checker}:params, label:T):ResolveRetun.FN_LITERAL<T>=>{
    const symbol = type.getSymbol()
    if(symbol && (flag & ts.TypeFlags.EnumLiteral)){
        const declaration = symbol.valueDeclaration
        const value = declaration && ts.isEnumMember(declaration)
            ? checker.getConstantValue(declaration)
            : undefined
        return {
            "_ENUM_LITERAL": {
                name: symbol.getName(),
                value
            }
        }
    } else {
        return {
            [label]: fixDoubleQuotes(typeString)
        } as {
            [key in keyof T]: string
        }
    }
    
}

export const StringLiteral: PropertyResolverFn<ResolveRetun.STRING_LITERAL> = (p)=>LiteralCheck(p,"_STRING_LITERAL")

export const NumberLiteral: PropertyResolverFn<ResolveRetun.NUMBER_LITERAL> = (p)=>LiteralCheck(p,"_NUMBER_LITERAL")

export const BigIntLiteral: PropertyResolverFn<ResolveRetun.BIG_INT_LITERAL> = (p)=>LiteralCheck(p,"_BIG_INT_LITERAL")

export const BooleanLiteral: PropertyResolverFn<ResolveRetun.BOOLEAN_LITERAL> = (p)=>LiteralCheck(p,"_BOOLEAN_LITERAL")

export const NonPrimitiveResolver: PropertyResolverFn<ResolveRetun.NON_PRIMITIVE> = ({typeString})=>{
    return{
        "_NON_PRIMITIVE": typeString
    }
}
import ts from "typescript";
import { createProgram, fetchTSSourceFile } from "./utility";
import { resolveTS } from "./TSResolve";

export const fetchProperties = (path: string, targetClass: string)=>{
    const program = createProgram(path)
    const checker = program.getTypeChecker()
    const sourceFile = fetchTSSourceFile(path, program)

    let resultData

    function visit(node: ts.Node){
        ts.forEachChild(node, visit)
        if( false
            || !ts.isClassDeclaration(node)
            || node.name?.text !== targetClass
            || !node.heritageClauses
        ){
            return
        }
        for(const clause of node.heritageClauses){
            const typeExpr = clause.types[0]!
            if( false 
                || clause.token !== ts.SyntaxKind.ExtendsKeyword
                || !typeExpr.typeArguments 
                || typeExpr.typeArguments.length <1
            ){
                continue
            }

            const genericNode = typeExpr.typeArguments[0]!
            const tsType = checker.getTypeFromTypeNode(genericNode)
            resultData = resolveTS(tsType, checker)
        }
    }
    visit(sourceFile)
    return resultData
}
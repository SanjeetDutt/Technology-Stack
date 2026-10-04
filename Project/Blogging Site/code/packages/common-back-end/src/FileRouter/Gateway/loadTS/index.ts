import ts from "typescript";
import { createProgram, fetchTSSourceFile } from "./utility";
import { getJSDoc, resolveTS } from "./TSResolve";

/**
 * Fetching the properties of individual Action class
 */
export const fetchProperties = (path: string, targetClass: string)=>{
    const program = createProgram(path)
    const checker = program.getTypeChecker()
    const sourceFile = fetchTSSourceFile(path, program)

    let resultData:Record<string,any>|undefined

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
            resultData = resolveTS(tsType, checker) as Record<string, any>
            const commentsAndTags = ts.getJSDocCommentsAndTags(node)
            if(commentsAndTags && commentsAndTags.length >0){
                const object = commentsAndTags[0]
                const description = object?.comment
                if(description){
                    resultData["description"] = description
                }
            }
        }
    }
    visit(sourceFile)
    return resultData
}
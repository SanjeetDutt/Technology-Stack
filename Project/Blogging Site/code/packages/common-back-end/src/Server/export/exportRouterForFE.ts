import { Router } from "../../FileRouter";
import {mkdir, writeFile, readFile} from "fs/promises"
import {dirname} from "path"
import * as ts from "typescript"

export async function exportRouterForFE (router: Router, location:string){
    const data = router.getEndpoint().map(endpoint=>{
        const {action, location, url} = endpoint.export()
        const properties = getPropertiesFromActionClass(location, action.name)
        return {
            url: url,
            ...properties.properties
        }
    })
    await saveContentToFile(location, JSON.stringify(data, null, 2))
    console.log("EXPORT COMPLETE")
}

function getPropertiesFromActionClass(entryFilePath: string, targetClassName: string) {
  
    const program = createProgram(entryFilePath);
    const checker = program.getTypeChecker();
    const sourceFile = fetchSourceFile(entryFilePath, program)

    let resultData = { 
    targetClass: targetClassName, 
    parentClass: "", 
    genericType: "", 
    properties: {} as Record<string, any>
  };

    function visit(node: ts.Node) {
        if (ts.isClassDeclaration(node) && node.name?.text === targetClassName) {
            if (node.heritageClauses) {
                for (const clause of node.heritageClauses) {
                    if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
                        const typeExpr = clause.types[0]!;
                        resultData.parentClass = typeExpr.expression.getText(sourceFile!);

                        if (typeExpr.typeArguments && typeExpr.typeArguments.length > 0) {
                            const genericNode = typeExpr.typeArguments[0]!;
                            resultData.genericType = genericNode.getText(sourceFile!);

                            // Get the fully resolved semantic type (merges natively across physical files)
                            const tsType = checker.getTypeFromTypeNode(genericNode);
                            resultData.properties = resolveTypeToJSON(tsType, checker);
                        }
                    }
                }
            }
        }
        ts.forEachChild(node, visit);
    }

  visit(sourceFile);
  return resultData;
}

function createProgram (path: string){
    return ts.createProgram(
        [path],{
            target: ts.ScriptTarget.Latest,
            moduleResolution: ts.ModuleResolutionKind.Bundler,
            esModuleInterop: true,
        }
    )
}

function fetchSourceFile (path: string, program: ts.Program){
    const sourceFile = program.getSourceFile(path);
    if (!sourceFile) {
        throw new Error(`Could not find or parse file: ${path}`);
    }
    return sourceFile
}

function extractJSDoc(checker: ts.TypeChecker, symbol?: ts.Symbol) {
    if (!symbol) return { description: "", tags: {} };

    // Get the main JSDoc description
    const description = ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();
    
    // Get JSDoc tags (like @default, @deprecated, etc.)
    const tags: Record<string, string> = {};
    for (const tag of symbol.getJsDocTags(checker)) {
      tags[tag.name] = ts.displayPartsToString(tag.text).trim();
    }

    return { description, tags };
}

function resolveTypeToJSON(type: ts.Type, checker:ts.TypeChecker, symbol?: ts.Symbol): any {
    const typeStr = checker.typeToString(type);
    const {description, tags} = extractJSDoc(checker, symbol)

    const getDescription = (value: string)=> value === "" ? undefined : value
    const getTags = (value: object) => Object.keys(value).length === 0 ? undefined : value

    if(Object.keys(tags).includes("private")){
        return null
    }

    // Stop recursion for primitives, unions, or arrays
    if (["string", "number", "boolean", "any"].includes(typeStr)) {
        return {
            type:typeStr, 
            description: getDescription(description),
            tags: getTags(tags)
        };
    }

    if(typeStr.includes("[]") || type.isUnion()){
        console.log(typeStr)
        return {
            type:typeStr, 
            description: getDescription(description),
            tags: getTags(tags)
        };
    }

    const props = type.getProperties();
    if (props.length === 0) return {
        type:"Object", 
        description: getDescription(description),
        tags: getTags(tags)
    };

    // Recursively parse nested object properties
    const result: Record<string, any> = {};
    for (const prop of props) {
      const propDecl = prop.valueDeclaration || prop.declarations?.[0];
      if (propDecl) {
        const propType = checker.getTypeOfSymbolAtLocation(prop, propDecl);
        const value = resolveTypeToJSON(propType,checker, prop);
        if(value){
            result[prop.getName()] = value
        }
        
      }
    }
    return {
        type: "Object",
        description: getDescription(description), 
        tags: getTags(tags),
        ...result
    };
}


async function saveContentToFile (path: string, content: string){
    try{
        const dir = dirname(path)
        await mkdir(dir,{recursive: true})
        await writeFile(path, content, "utf-8")
    } catch(e){
        console.error("Error occured while writing a content to file", e)
    }
}
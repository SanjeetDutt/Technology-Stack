import { Router } from "../../FileRouter";
import {mkdir, writeFile, readFile} from "fs/promises"
import {dirname} from "path"
import * as ts from "typescript"
import {execute} from "./test"

const scriptTarget = ts.ScriptTarget.ES2022
const compilerOption = {target: scriptTarget}
const defaultHost: ts.CompilerHost = {
            ...ts.createCompilerHost(compilerOption),
        }

export async function exportRouterForFE (router: Router, location:string){
//     execute()
// }

// async function original(router: Router, location:string){
    for(const endpoint of router.getEndpoint()){
        const {action, method, url, location} = endpoint.export()
        // const rawCode = await readFile(location, "utf-8")
        // const tempFileName = `${method}_${url}.ts`
        // const code = ts.createSourceFile(tempFileName,rawCode,scriptTarget,true)
        // const host:ts.CompilerHost = {
        //     ...defaultHost,
        //     getSourceFile:(name)=> {
        //         if(name === tempFileName){
        //             return code
        //         }
        //         console.log(name)

        //         return undefined
        //     },
        // }
        // const programe = ts.createProgram([tempFileName], compilerOption, host)
        // const checker = programe.getTypeChecker()

        const data = getFullyMergedGenericProperties(location, action.name)

        console.log(data)
    }

    saveContentToFile(location, JSON.stringify("", null, 4))
}

function getFullyMergedGenericProperties(entryFilePath: string, targetClassName: string) {
  // 1. Create a Program reading from the physical file system
  // We use NodeJs module resolution so it correctly follows imports across files
  const program = ts.createProgram([entryFilePath], {
    target: ts.ScriptTarget.Latest,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    esModuleInterop: true,
  });

  const checker = program.getTypeChecker();
  
  // 2. Fetch the AST for the entry point file
  const sourceFile = program.getSourceFile(entryFilePath);
  if (!sourceFile) {
    throw new Error(`Could not find or parse file: ${entryFilePath}`);
  }

  let resultData = { 
    targetClass: targetClassName, 
    parentClass: "", 
    genericType: "", 
    properties: {} as Record<string, any>
  };

  // 3. Recursive helper to map a resolved TypeScript Type to JSON
  function resolveTypeToJSON(type: ts.Type): any {
    const typeStr = checker.typeToString(type);

    // Stop recursion for primitives, unions, or arrays
    if (["string", "number", "boolean", "any"].includes(typeStr) || typeStr.includes("[]") || type.isUnion()) {
      return typeStr;
    }

    const props = type.getProperties();
    if (props.length === 0) return typeStr;

    // Recursively parse nested object properties
    const result: Record<string, any> = {};
    for (const prop of props) {
      const propDecl = prop.valueDeclaration || prop.declarations?.[0];
      if (propDecl) {
        const propType = checker.getTypeOfSymbolAtLocation(prop, propDecl);
        result[prop.getName()] = resolveTypeToJSON(propType);
      }
    }
    return result;
  }

  // 4. Traverse AST to find the class and extract the merged type
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
              resultData.properties = resolveTypeToJSON(tsType);
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


async function saveContentToFile (path: string, content: string){
    try{
        // console.log(path, content)
        // const dir = dirname(path)
        // await mkdir(dir,{recursive: true})
        // await writeFile(path, content, "utf-8")
    } catch(e){
        console.error("Error occured while writing a content to file", e)
    }
}
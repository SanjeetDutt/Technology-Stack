import * as ts from "typescript";

function getFullyMergedGenericProperties(targetClassName: string) {
  // 1. Mock a virtual file system with your files
  const files: Record<string, string> = {
    "/main.ts": `
      import { POST, EndpointConfig } from "./common-back-end";
      import { AdminBlogConfig } from "./AdminBlog.middleware";

      export type Configuration = EndpointConfig<{
          payload: { message: string },
          response: { message: string },
          param: { id: string },
          query: { offset: number, limit: number, sort: string },
      }> & AdminBlogConfig;

      export class CreateNewBlog extends POST<Configuration> {
          async execute() { }
      }
    `,
    "/AdminBlog.middleware.ts": `
      export type AdminBlogConfig = {
          requireAuth: boolean;
          adminRole: "superadmin" | "editor";
      };
    `,
    "/common-back-end.ts": `
      // Mocking the utility types so the compiler understands them
      export type EndpointConfig<T> = T;
      export class POST<T> {}
    `
  };

  // 2. Create an in-memory Compiler Host
  const compilerOptions: ts.CompilerOptions = { target: ts.ScriptTarget.Latest };
  const compilerHost = ts.createCompilerHost(compilerOptions);
  compilerHost.getSourceFile = (fileName) => {
    console.log(fileName)
    return files[fileName] 
      ? ts.createSourceFile(fileName, files[fileName], ts.ScriptTarget.Latest) 
      : undefined;
  };
  compilerHost.fileExists = (fileName) => !!files[fileName];

  // 3. Create the Program and get the TypeChecker
  const program = ts.createProgram(["/main.ts"], compilerOptions, compilerHost);
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile("/main.ts")!;

  let resultData = { targetClass: targetClassName, parentClass: "", genericType: "", properties: {} };

  // 4. Recursive helper to map a resolved TypeScript Type to JSON
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

  // 5. Traverse AST to find the class and extract the merged type
  function visit(node: ts.Node) {
    if (ts.isClassDeclaration(node) && node.name?.text === targetClassName) {
      if (node.heritageClauses) {
        for (const clause of node.heritageClauses) {
          if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
            const typeExpr = clause.types[0]!;
            resultData.parentClass = typeExpr.expression.getText(sourceFile);

            if (typeExpr.typeArguments && typeExpr.typeArguments.length > 0) {
              const genericNode = typeExpr.typeArguments[0]!;
              resultData.genericType = genericNode.getText(sourceFile);

              // Get the fully resolved semantic type (this does the merging natively)
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

// Execute the function
export const execute = ()=>
    console.log(JSON.stringify(getFullyMergedGenericProperties("CreateNewBlog"), null, 2));
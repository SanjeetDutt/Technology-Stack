import ts from "typescript";

const CONSTANT = {
    target:  ts.ScriptTarget.Latest,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    esModuleInterop: true,
}

export function createProgram(path: string){
    return ts.createProgram([path],{
        target: CONSTANT.target,
        moduleResolution: CONSTANT.moduleResolution,
        esModuleInterop: CONSTANT.esModuleInterop
    })
}

export function fetchTSSourceFile (path: string, program:ts.Program){
    const sourceFile = program.getSourceFile(path)

    if(!sourceFile){
        throw new Error(`Could not find or parse file: ${path}`)
    }

    return sourceFile
}
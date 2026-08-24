// schema-generator.ts
import * as ts from "typescript";
import * as fs from "fs";

export function generateSimpleSchema(filePath: string, targetInterface: string) {
  // 1. Create a TypeScript program to parse the file
  const program = ts.createProgram([filePath], { strict: true });
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
    throw new Error(`Could not find or parse file: ${filePath}`);
  }

  // 2. Prepare the base JSON Schema structure
  const schema: any = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: targetInterface,
    type: "object",
    properties: {},
    required: [],
  };


  // If no required properties, remove the array to keep schema clean
  if (schema.required.length === 0) delete schema.required;

  return schema;
}
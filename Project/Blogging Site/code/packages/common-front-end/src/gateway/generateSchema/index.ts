import { generateSchemaSource } from "./generateSchemaSource";
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
export function generateSchema (inputFileLocation: string, outputFileLocation: string){
    const source = generateSchemaSource(
        JSON.parse(
            readFileSync(
                resolve(inputFileLocation), "utf8"
            )
        )
    )
    mkdirSync(dirname(resolve(outputFileLocation)), {recursive: true})
    writeFileSync(resolve(outputFileLocation), source)
    console.log(`Generated schema file at ${outputFileLocation}`)
}
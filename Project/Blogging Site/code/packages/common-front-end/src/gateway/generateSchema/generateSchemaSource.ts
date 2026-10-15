import { collectEndpointType } from "./collectEndpointType";
import { isObject } from "./utility";

const DEFAULT_PARSER_IMPORT = '../types/schema-parser';

export function generateSchemaSource(json: unknown):string{
    if(!isObject(json)){
        throw new Error('Invalid Schema Json is provided.')
    }

    return `
/* AUTO-GENERATED SCRIPT. DO NOT EDIT. */
import type {ParseSchema} from 'common-front-end/src';
export const gatewaySchema = ${JSON.stringify(json, null, 4)} as const;
export type GatewaySchema = typeof gatewaySchema;
/*--------ENDPOINT TYPE START----------*/
${collectEndpointType(json)} 
/*--------ENDPOINT TYPE END----------*/`
}
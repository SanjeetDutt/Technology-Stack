import {JsonObject, isObject, typeName} from "./utility"

/** Sections exported as standalone types. Query is always partial. */
const SECTIONS = [
  { key: 'PAYLOAD', suffix: 'Payload', partial: false },
  { key: 'HEADER', suffix: 'Header', partial: false },
  { key: 'QUERY', suffix: 'Query', partial: true },
] as const;

export function collectEndpointType(root: JsonObject): string{
    const lines: string[] = []
    const used = new Map<string, string>()

    const visit = (node:JsonObject, path: string[]):void=>{
        for(const [key, value] of Object.entries(node)){
            if (key === '_METHOD' && isObject(value)) {
                emitMethods(node, value, path);
            } else if (!key.startsWith('_') && isObject(value)) {
                visit(value, [...path, key]);
            }
        }
    }

    const emitMethods = (node: JsonObject, methods: JsonObject, path:string[]): void=>{
        const access = path.map((key) => `[${JSON.stringify(key)}]`).join('');

        for (const [method, endpoint] of Object.entries(methods)) {
            if (!isObject(endpoint)) continue;

            for (const { key, suffix, partial } of SECTIONS) {
                if (!(key in endpoint)) continue;

                const name = typeName(path, method, suffix);
                const reference = `GatewaySchema${access}["_METHOD"][${JSON.stringify(method)}][${JSON.stringify(key)}]`;
                const previous = used.get(name);
                if (previous !== undefined) {
                throw new Error(`Type name collision: "${name}" is produced by both ${previous} and ${reference}`);
                }
                used.set(name, reference);

                const parsed = `ParseSchema<${reference}>`;
                lines.push(
                `/** ${method} ${String(node._URL ?? path.join('/'))} - ${suffix.toLowerCase()} */`,
                `export type ${name} = ${partial ? `Partial<${parsed}>` : parsed};`,
                '',
                );
            }
        }
    }

    visit(root,[])
    return lines.join('\n')
}
export type JsonObject = Record<string, unknown>;

export const isObject = (value: unknown): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const toPascal = (text: string): string =>
  text
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

export const segmentName = (key: string): string =>
  key.startsWith(':') ? `By${toPascal(key.slice(1))}` : toPascal(key);

export function typeName (path: string[], method: string, suffix: string):string{
    const name = `${path.map(segmentName).join('')}${toPascal(method.toLowerCase())}${suffix}`;
  return /^[0-9]/.test(name) ? `_${name}` : name;
}
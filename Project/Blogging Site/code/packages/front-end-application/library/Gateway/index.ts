import GatewayJSON from "./Gateway.json";
import { writeFileSync } from "node:fs";

// const [, , input = "schema.json", output = "schema.ts"] = process.argv;
const output = "schema.ts"
const json = GatewayJSON;

const str = (v: unknown): string | undefined => (typeof v === "string" ? v : undefined);

/** Builds a JSDoc block for any object that carries a description, tags or URL. */
function jsdoc(value: unknown, pad: string): string {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  const o = value as Record<string, unknown>;

  const description = str(o._DESCRIPTION) ?? str(o.description);
  const rawTags = o._TAGS ?? o.tags;
  const tags = Array.isArray(rawTags) ? rawTags.filter((t): t is string => typeof t === "string") : [];
  const url = str(o._URL);
  if (!description && !tags.length && !url) return "";

  const lines: string[] = [];
  if (description) lines.push(...description.replace(/\*\//g, "*\\/").split("\n"));
  if (description && (url || tags.length)) lines.push("");
  if (url) lines.push(`@url ${url}`);
  for (const t of tags) lines.push(`@tag ${t}`);

  const body = lines.map((l) => `${pad} * ${l}`.trimEnd()).join("\n");
  return `${pad}/**\n${body}\n${pad} */\n`;
}

function serialize(value: unknown, depth: number): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((v) => serialize(v, depth)).join(", ")}]`;

  const entries = Object.entries(value);
  if (!entries.length) return "{}";

  const pad = "  ".repeat(depth + 1);
  const body = entries
    .map(([k, v]) => `${jsdoc(v, pad)}${pad}${JSON.stringify(k)}: ${serialize(v, depth + 1)},`)
    .join("\n");
  return `{\n${body}\n${"  ".repeat(depth)}}`;
}

writeFileSync(
  output,
  `// AUTO-GENERATED from GatewayJSON. Do not edit.\nexport const schema = ${serialize(json, 0)} as const;\n`,
);
console.log(`Wrote ${output}`);
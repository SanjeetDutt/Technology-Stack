/**
 * Type-level parser for the exported gateway JSON.
 *
 * It converts schema nodes such as `{ "_PRIMITIVE": "string" }` or
 * `{ "_UNION": [...] }` into the real TypeScript types they describe.
 * Nothing here exists at runtime: it is pure type information.
 *
 * NOTE: it only works on *literal* types, so the JSON must be consumed via the
 * generated `as const` module (see scripts/generate-gateway-schema.ts).
 */

/** Flattens intersections so hovers/errors show one readable object type. */
export type Simplify<T> = { [K in keyof T]: T[K] } & {};

export type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => void : never
) extends (arg: infer I) => void
  ? I
  : never;

interface PrimitiveMap {
  any: any;
  unknown: unknown;
  undefined: undefined;
  null: null;
  void: void;
  string: string;
  number: number;
  bigint: bigint;
  boolean: boolean;
  symbol: symbol;
}

/* ---------------------------- template literals --------------------------- */

type TemplatePlaceholder<P extends string> = P extends 'number'
  ? number
  : P extends 'bigint'
    ? bigint
    : P extends 'boolean'
      ? boolean
      : string;

/** "ABC${string}" -> `ABC${string}` */
type ParseTemplateBody<S extends string> =
  S extends `${infer Head}\${${infer Placeholder}}${infer Rest}`
    ? `${Head}${TemplatePlaceholder<Placeholder>}${ParseTemplateBody<Rest>}`
    : S;

/** "`ABC${string}`" -> strips the surrounding backticks first. */
type ParseTemplate<S extends string> = S extends `\`${infer Body}\``
  ? ParseTemplateBody<Body>
  : string;

/* ---------------------------------- enums --------------------------------- */

/** An enum is exposed as the union of its member values. */
type ParseEnum<E> = E extends {
  readonly value: readonly { readonly value: infer V }[];
}
  ? V
  : E extends { readonly value: infer V }
    ? V
    : never;

/* --------------------------------- objects -------------------------------- */

/** Property keys = keys whose value is an object (skips `description: "..."`). */
type PropertyKeys<T> = {
  [K in keyof T]-?: T[K] extends object ? K : never;
}[keyof T];

type OptionalPropertyKeys<T> = {
  [K in PropertyKeys<T>]: T[K] extends { readonly optional: true } ? K : never;
}[PropertyKeys<T>];

type ParseObject<T> = Simplify<
  {
    -readonly [K in Exclude<
      PropertyKeys<T>,
      OptionalPropertyKeys<T>
    >]: ParseSchema<T[K]>;
  } & {
    -readonly [K in OptionalPropertyKeys<T>]?: ParseSchema<T[K]>;
  }
>;

/* ---------------------------------- entry --------------------------------- */

/**
 * Converts one schema node (leaf marker or nested object) into a TS type.
 *
 * NOTE: the exporter emits TypeScript intersections as `_UNION`; they are
 * parsed as unions here, exactly as the JSON states.
 */
export type ParseSchema<T> = T extends { readonly _PRIMITIVE: infer P }
  ? P extends keyof PrimitiveMap
    ? PrimitiveMap[P]
    : unknown
  : T extends { readonly _STRING_LITERAL: infer S extends string }
    ? S
    : T extends { readonly _NUMBER_LITERAL: `${infer N extends number}` }
      ? N
      : T extends { readonly _BIG_INT_LITERAL: `${infer B extends bigint}n` }
        ? B
        : T extends { readonly _BOOLEAN_LITERAL: `${infer B extends boolean}` }
          ? B
          : T extends { readonly _UNIQUE_SYMBOL: string }
            ? symbol
            : T extends { readonly _ENUM_LITERAL: infer E }
              ? ParseEnum<E>
              : T extends { readonly _NEVER: string }
                ? never
                : T extends { readonly _NON_PRIMITIVE: string }
                  ? object
                  : T extends { readonly _UNION: readonly unknown[] }
                    ? ParseSchema<T['_UNION'][number]>
                    : T extends { readonly _TEMPLATE: infer S extends string }
                      ? ParseTemplate<S>
                      : ParseObject<T>;

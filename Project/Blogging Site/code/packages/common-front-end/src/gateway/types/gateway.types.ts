import type {
  ParseSchema,
  Simplify,
  UnionToIntersection,
} from './schema-parser';

export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

/** Raw (untyped) shape of one node of the exported JSON. */
export interface SchemaNode {
  readonly _URL?: string;
  readonly _METHOD?: { readonly [method: string]: EndpointSchema };
  readonly [key: string]: unknown;
}

export interface EndpointSchema {
  readonly PAYLOAD?: object;
  readonly RESPONSE?: object;
  readonly PARAM?: object;
  readonly QUERY?: object;
  readonly HEADER?: object;
  readonly description?: string;
}

/* ------------------------------ leaf functions ----------------------------- */

type OptionalIfEmpty<K extends string, V> = {} extends V
  ? { [P in K]?: V }
  : { [P in K]: V };

type Section<K extends string, E, S extends string> = S extends keyof E
  ? OptionalIfEmpty<K, ParseSchema<E[S]>>
  : unknown;

/** Headers are always optional per call: they may come from `config()`. */
type HeaderSection<E> = 'HEADER' extends keyof E
  ? { header?: Partial<ParseSchema<E['HEADER']>> }
  : unknown;

export type EndpointArgs<E> = Simplify<
  HeaderSection<E> & Section<'payload', E, 'PAYLOAD'> & Section<'query', E, 'QUERY'>
>;

export type EndpointResponse<E> = 'RESPONSE' extends keyof E
  ? ParseSchema<E['RESPONSE']>
  : unknown;

export type EndpointFn<E> = (
  ...args: {} extends EndpointArgs<E>
    ? [args?: EndpointArgs<E>]
    : [args: EndpointArgs<E>]
) => Promise<EndpointResponse<E>>;

/* ---------------------------------- config --------------------------------- */

type HeaderOf<E> = 'HEADER' extends keyof E ? ParseSchema<E['HEADER']> : never;

type MethodsOf<T> = T extends { readonly _METHOD: infer M } ? M : {};

type ChildKeys<T> = Exclude<Extract<keyof T, string>, `_${string}`>;

/** Union of every header object used by any endpoint at or below `T`. */
type SubtreeHeaders<T> =
  | { [M in keyof MethodsOf<T>]: HeaderOf<MethodsOf<T>[M]> }[keyof MethodsOf<T>]
  | { [K in ChildKeys<T>]: SubtreeHeaders<T[K]> }[ChildKeys<T>];

export type ConfigOptions<T> = {
  header: Partial<UnionToIntersection<SubtreeHeaders<T>>>;
};

export interface Configurable<T> {
  /**
   * Sets default headers for every endpoint at or below this node.
   * Merge order (last wins): ancestors' config -> this config -> per-call header.
   * Pass `undefined` as a value to remove a previously configured header.
   */
  config(options: ConfigOptions<T>): void;
}

/* ----------------------------------- nodes --------------------------------- */

export type PathParamValue = string | number;

type ParamKey = `:${string}`;

export type ParamFn<T> = ((value: PathParamValue) => GatewayNode<T>) &
  Configurable<T>;

export type GatewayNode<T> = Configurable<T> & {
  [M in keyof MethodsOf<T> & HttpMethod]: EndpointFn<MethodsOf<T>[M]>;
} & {
  [K in ChildKeys<T>]: K extends ParamKey ? ParamFn<T[K]> : GatewayNode<T[K]>;
};

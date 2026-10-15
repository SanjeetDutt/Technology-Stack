import type {
  ParseSchema,
  Simplify,
  UnionToIntersection,
} from './index';

export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE';

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

/** Every query parameter is optional. */
type QuerySection<E> = 'QUERY' extends keyof E
  ? { query?: Partial<ParseSchema<E['QUERY']>> }
  : unknown;

/** Headers are always optional per call: they may come from `config()`. */
type HeaderSection<E> = 'HEADER' extends keyof E
  ? { header?: Partial<ParseSchema<E['HEADER']>> }
  : unknown;

export type EndpointArgs<E> = Simplify<
  HeaderSection<E> & Section<'payload', E, 'PAYLOAD'> & QuerySection<E>
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

type NamedChildKeys<T> = Exclude<ChildKeys<T>, ParamKey>;
type ParamKeys<T> = Extract<ChildKeys<T>, ParamKey>;

/**
 * A node with a ":param" child is itself callable: `api.blog(45)` returns the
 * node of "/blog/:id". Nodes without a ":param" child are not callable.
 */
export type ParamCall<T> = [ParamKeys<T>] extends [never]
  ? unknown
  : (value: PathParamValue) => GatewayNode<T[ParamKeys<T> & keyof T]>;

export type GatewayNode<T> = Configurable<T> & {
  [M in keyof MethodsOf<T> & HttpMethod]: EndpointFn<MethodsOf<T>[M]>;
} & {
  [K in NamedChildKeys<T>]: GatewayNode<T[K]>;
} & ParamCall<T>;

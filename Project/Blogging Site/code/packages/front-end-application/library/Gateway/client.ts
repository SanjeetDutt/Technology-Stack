/* ------------------------------------------------------------------ */
/* Type-level transformation                                           */
/* ------------------------------------------------------------------ */

type PrimitiveMap = {
  string: string;
  number: number;
  boolean: boolean;
  null: null;
  any: any;
};

type QueryValue = string | number | boolean | null | undefined;

type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** Child definition wins over parent definition on key conflicts. */
type Merge<A, B> = Omit<A, keyof B> & B;

type FieldType<F> =
  F extends { readonly _PRIMITIVE: infer P }
    ? P extends keyof PrimitiveMap ? PrimitiveMap[P] : unknown
    : F extends object
      ? Fields<F>
      : unknown;

/**
 * { name: {_PRIMITIVE: "string"} } -> { name: string }
 * Only the key is filtered (never renamed) so JSDoc on schema keys is preserved.
 * Non-object entries (stray metadata strings) are ignored.
 */
type Fields<S> = Prettify<
  {
    [K in keyof S as S[K] extends object
      ? S[K] extends { readonly _OPTIONAL: true } ? never : K
      : never]: FieldType<S[K]>;
  } & {
    [K in keyof S as S[K] extends object
      ? S[K] extends { readonly _OPTIONAL: true } ? K : never
      : never]?: FieldType<S[K]>;
  }
>;

/** Header schema declared on a node (`_HEADER`) or a method (`HEADER`). */
type NodeHeader<N> = N extends { readonly _HEADER: infer X } ? X : {};
type MethodHeader<M> = M extends { readonly HEADER: infer X } ? X : {};

/** No header fields -> no `header` key. All optional -> `header?`. Otherwise required. */
type HeaderArg<H> = [keyof H] extends [never]
  ? {}
  : {} extends Fields<H>
    ? { header?: Fields<H> }
    : { header: Fields<H> };

type CallArgs<M, H> = Prettify<
  HeaderArg<Merge<H, MethodHeader<M>>> &
  ("PARAM" extends keyof M ? { param: Fields<M["PARAM"]> } : {}) &
  { query?: "QUERY" extends keyof M ? Fields<M["QUERY"]> : Record<string, QueryValue> } &
  ("PAYLOAD" extends keyof M ? { payload: Fields<M["PAYLOAD"]> } : {})
>;

type ResponseType<M> = M extends { readonly RESPONSE: infer R } ? Fields<R> : unknown;

type Endpoint<M, H> = {} extends CallArgs<M, H>
  ? (args?: CallArgs<M, H>) => Promise<ResponseType<M>>
  : (args: CallArgs<M, H>) => Promise<ResponseType<M>>;

type Reserved = "_URL" | "_METHOD" | "_HEADER" | "_DESCRIPTION" | "_TAGS";

/** H = accumulated header schema inherited from ancestors. */
type Client<N, H = {}> = Build<N, Merge<H, NodeHeader<N>>>;

type Build<N, H> =
  (N extends { readonly _METHOD: infer M }
    ? { [K in keyof M]: Endpoint<M[K], H> }
    : {}) &
  { [K in keyof N as K extends Reserved ? never : K]: Client<N[K], H> };

/* ------------------------------------------------------------------ */
/* Runtime implementation                                              */
/* ------------------------------------------------------------------ */

export interface ClientOptions {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  fetch?: typeof fetch;
}

interface RuntimeArgs {
  header?: Record<string, unknown>;
  param?: Record<string, unknown>;
  query?: Record<string, unknown>;
  payload?: unknown;
}

const RESERVED = new Set<string>(["_URL", "_METHOD", "_HEADER", "_DESCRIPTION", "_TAGS"]);

function makeEndpoint(urlTemplate: string, method: string, opts: ClientOptions) {
  return async (args: RuntimeArgs = {}) => {
    const path = urlTemplate.replace(/:([A-Za-z0-9_]+)/g, (_, name: string) => {
      const value = args.param?.[name];
      if (value === undefined) throw new Error(`Missing path param "${name}" for ${urlTemplate}`);
      return encodeURIComponent(String(value));
    });

    const search = new URLSearchParams();
    for (const [k, v] of Object.entries(args.query ?? {})) {
      if (v !== undefined && v !== null) search.append(k, String(v));
    }
    const qs = search.toString();
    const url = `${opts.baseUrl ?? ""}${path}${qs ? `?${qs}` : ""}`;

    const headers: Record<string, string> = { ...opts.defaultHeaders };
    for (const [k, v] of Object.entries(args.header ?? {})) {
      if (v !== undefined) headers[k] = String(v);
    }
    const hasBody = args.payload !== undefined && method !== "GET" && method !== "HEAD";
    if (hasBody) headers["Content-Type"] ??= "application/json";

    const res = await (opts.fetch ?? fetch)(url, {
      method,
      headers,
      body: hasBody ? JSON.stringify(args.payload) : undefined,
    });

    if (!res.ok) {
      throw Object.assign(new Error(`${method} ${url} failed: ${res.status}`), { response: res });
    }
    const type = res.headers.get("content-type") ?? "";
    return type.includes("application/json") ? res.json() : res.text();
  };
}

function build(node: any, opts: ClientOptions): any {
  const out: any = {};

  if (node._METHOD) {
    if (typeof node._URL !== "string") throw new Error("A node with _METHOD must define _URL");
    for (const method of Object.keys(node._METHOD)) {
      out[method] = makeEndpoint(node._URL, method, opts);
    }
  }
  for (const [key, child] of Object.entries(node)) {
    if (!RESERVED.has(key)) out[key] = build(child, opts);
  }
  return out;
}

export function createClient<const T extends Record<string, unknown>>(
  schema: T,
  options: ClientOptions = {},
): Client<T> {
  return build(schema, options);
}
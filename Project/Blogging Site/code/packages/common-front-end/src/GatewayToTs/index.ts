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

type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** Converts one field definition into a TS type. */
type FieldType<F> =
  F extends { readonly _PRIMITIVE: infer P }
    ? P extends keyof PrimitiveMap ? PrimitiveMap[P] : unknown
    : F extends object
      ? Fields<F>               // nested object
      : unknown;

/** Converts { name: {_PRIMITIVE: "string"}, ... } into { name: string, ... }.
 *  A field with `_OPTIONAL: true` becomes an optional property. */
type Fields<S> = Prettify<
  { [K in keyof S as S[K] extends { readonly _OPTIONAL: true } ? never : K]: FieldType<S[K]> } &
  { [K in keyof S as S[K] extends { readonly _OPTIONAL: true } ? K : never]?: FieldType<S[K]> }
>;

/** Builds the argument object only from sections that exist in the schema. */
type CallArgs<M> = Prettify<
  ("HEADER"  extends keyof M ? { header:  Fields<M["HEADER"]>  } : {}) &
  ("PARAM"   extends keyof M ? { param:   Fields<M["PARAM"]>   } : {}) &
  ("QUERY"   extends keyof M ? { query:   Fields<M["QUERY"]>   } : {}) &
  ("PAYLOAD" extends keyof M ? { payload: Fields<M["PAYLOAD"]> } : {})
>;

type ResponseType<M> = M extends { readonly RESPONSE: infer R } ? Fields<R> : unknown;

/** The async leaf function. If no args are required, the argument is optional. */
type Endpoint<M> = {} extends CallArgs<M>
  ? (args?: CallArgs<M>) => Promise<ResponseType<M>>
  : (args: CallArgs<M>) => Promise<ResponseType<M>>;

type Reserved = "_URL" | "_METHOD";

/** Recursively maps the schema tree into the client tree. */
type Client<N> =
  (N extends { readonly _METHOD: infer M }
    ? { [HttpMethod in keyof M]: Endpoint<M[HttpMethod]> }
    : {}) &
  { [K in keyof N as K extends Reserved ? never : K]: Client<N[K]> };

/* ------------------------------------------------------------------ */
/* Runtime implementation                                              */
/* ------------------------------------------------------------------ */

export interface ClientOptions {
  baseUrl?: string;
  /** Headers added to every request. */
  defaultHeaders?: Record<string, string>;
  /** Custom fetch (useful for tests / Node polyfills). */
  fetch?: typeof fetch;
}

interface RuntimeArgs {
  header?: Record<string, unknown>;
  param?: Record<string, unknown>;
  query?: Record<string, unknown> | undefined;
  payload?: unknown;
}

function makeEndpoint(urlTemplate: string, method: string, opts: ClientOptions) {
  return async (args: RuntimeArgs = {}) => {
    // 1. Path params  (/admin/blog/:id -> /admin/blog/123)
    const path = urlTemplate.replace(/:([A-Za-z0-9_]+)/g, (_, name: string) => {
      const value = args.param?.[name];
      if (value === undefined) throw new Error(`Missing path param "${name}" for ${urlTemplate}`);
      return encodeURIComponent(String(value));
    });

    // 2. Query string
    const search = new URLSearchParams();
    for (const [k, v] of Object.entries(args.query ?? {})) {
      if (v !== undefined && v !== null) search.append(k, String(v));
    }
    const qs = search.toString();
    const url = `${opts.baseUrl ?? ""}${path}${qs ? `?${qs}` : ""}`;

    // 3. Headers + body
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
  for (const [key, value] of Object.entries(node)) {
    if (key === "_URL") continue;
    if (key === "_METHOD") {
      for (const method of Object.keys(value as object)) {
        out[method] = makeEndpoint(node._URL, method, opts);
      }
      continue;
    }
    out[key] = build(value, opts);
  }
  return out;
}

export function createClient<const T extends Record<string, unknown>>(
  schema: T,
  options: ClientOptions = {},
): Client<T> {
  return build(schema, options);
}
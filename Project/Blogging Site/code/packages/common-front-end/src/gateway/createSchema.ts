import { createHttpClient, type HttpClient, type HttpClientOptions } from './runtime/http-client';
import { createHeaderScope, type HeaderScope } from './runtime/scope';
import type { PathParams } from './runtime/url';
import type { EndpointSchema, GatewayNode, PathParamValue, SchemaNode } from './types/gateway.types';

export type GatewayOptions = HttpClientOptions;

interface BuildContext {
  http: HttpClient;
  scope: HeaderScope;
  params: PathParams;
}

interface CallArgs {
  header?: Record<string, string | undefined>;
  payload?: unknown;
  query?: object;
}

type ConfigArgs = { header: Record<string, string | undefined> };

const isParamKey = (key: string) => key.startsWith(':');
const isChildKey = (key: string) => !key.startsWith('_') && !isParamKey(key);

/**
 * defineProperty (instead of assignment) so a child key such as "name" or
 * "length" can shadow the built-in, read-only properties of a function.
 */
function define(target: object, key: string, value: unknown): void {
  Object.defineProperty(target, key, { value, enumerable: true, writable: true, configurable: true });
}

function createEndpointFn(
  method: string,
  endpoint: EndpointSchema,
  node: SchemaNode,
  { http, scope, params }: BuildContext,
) {
  return (args: CallArgs = {}) =>
    http.execute({
      method,
      urlTemplate: node._URL ?? '',
      params,
      endpoint,
      configuredHeaders: scope.resolve(),
      ...args,
    });
}

/** `api.blog(45)` -> node of "/blog/:id" with { id: "45" } bound. */
function createParamCaller(key: string, child: SchemaNode, ctx: BuildContext) {
  const paramName = key.slice(1);

  return (value: PathParamValue): object => {
    const valid = typeof value === 'number' ? Number.isFinite(value) : typeof value === 'string' && value !== '';
    if (!valid) {
      throw new TypeError(`Path param "${paramName}" must be a non-empty string or a finite number`);
    }
    return buildNode(child, {
      http: ctx.http,
      scope: createHeaderScope(ctx.scope),
      params: { ...ctx.params, [paramName]: String(value) },
    });
  };
}

function buildNode(node: SchemaNode, ctx: BuildContext): object {
  const paramKeys = Object.keys(node).filter(isParamKey);
  if (paramKeys.length > 1) {
    throw new Error(`Ambiguous path params under "${node._URL ?? ''}": ${paramKeys.join(', ')}`);
  }

  const [paramKey] = paramKeys;
  const target: object =
    paramKey === undefined ? {} : createParamCaller(paramKey, node[paramKey] as SchemaNode, ctx);

  define(target, 'config', ({ header }: ConfigArgs) => ctx.scope.set(header));

  for (const [method, endpoint] of Object.entries(node._METHOD ?? {})) {
    define(target, method, createEndpointFn(method, endpoint, node, ctx));
  }

  for (const [key, child] of Object.entries(node)) {
    if (!isChildKey(key)) continue;
    define(target, key, buildNode(child as SchemaNode, { ...ctx, scope: createHeaderScope(ctx.scope) }));
  }

  return target;
}

/**
 * Builds the nested API client from the exported gateway schema.
 *
 * @example
 * const api = createGateway(gatewaySchema, { baseUrl: 'https://api.example.com' });
 * api.admin.config({ header: { authorization: `Bearer ${token}` } });
 * await api.admin.blog(42).POST({ payload: { message: 'hi' }, query: { limit: 10 } });
 */
export function createGateway<const S extends SchemaNode>(
  schema: S,
  options: GatewayOptions = {},
): GatewayNode<S> {
  return buildNode(schema, {
    http: createHttpClient(options),
    scope: createHeaderScope(),
    params: {},
  }) as GatewayNode<S>;
}

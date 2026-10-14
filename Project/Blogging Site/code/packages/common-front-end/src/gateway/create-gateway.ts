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

const isChildKey = (key: string) => !key.startsWith('_');
const isParamKey = (key: string) => key.startsWith(':');

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

function createParamFn(key: string, child: SchemaNode, ctx: BuildContext) {
  const paramName = key.slice(1);
  // Shared by every value of this param: api.blog[":id"].config(...)
  const paramScope = createHeaderScope(ctx.scope);

  const fn = (value: PathParamValue) => {
    if (typeof value === 'number' ? !Number.isFinite(value) : typeof value !== 'string' || value === '') {
      throw new TypeError(`Path param "${paramName}" must be a non-empty string or a finite number`);
    }
    return buildNode(child, {
      http: ctx.http,
      scope: createHeaderScope(paramScope),
      params: { ...ctx.params, [paramName]: String(value) },
    });
  };

  return Object.assign(fn, {
    config: ({ header }: { header: Record<string, string | undefined> }) => paramScope.set(header),
  });
}

function buildNode(node: SchemaNode, ctx: BuildContext): Record<string, unknown> {
  const result: Record<string, unknown> = {
    config: ({ header }: { header: Record<string, string | undefined> }) => ctx.scope.set(header),
  };

  for (const [method, endpoint] of Object.entries(node._METHOD ?? {})) {
    result[method] = createEndpointFn(method, endpoint, node, ctx);
  }

  for (const [key, child] of Object.entries(node)) {
    if (!isChildKey(key)) continue;
    result[key] = isParamKey(key)
      ? createParamFn(key, child as SchemaNode, ctx)
      : buildNode(child as SchemaNode, { ...ctx, scope: createHeaderScope(ctx.scope) });
  }

  return result;
}

/**
 * Builds the nested API client from the exported gateway schema.
 *
 * @example
 * const api = createGateway(gatewaySchema, { baseUrl: 'https://api.example.com' });
 * api.admin.config({ header: { authorization: `Bearer ${token}` } });
 * await api.admin.blog[':id'](42).POST({ payload: { message: 'hi' }, query: { limit: 10 } });
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

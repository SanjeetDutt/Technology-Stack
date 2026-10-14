import { ApiError, RequestValidationError } from './errors';
import { buildQueryString, joinBaseUrl, resolvePath, type PathParams } from './url';
import type { EndpointSchema } from '../types/gateway.types';

export interface HttpClientOptions {
  /** Prepended to every path, e.g. "https://api.example.com". Default: "". */
  baseUrl?: string;
  /** Custom fetch (tests, SSR, interceptors). Default: global fetch. */
  fetch?: typeof fetch;
}

export interface EndpointRequest {
  method: string;
  /** URL template from the JSON, e.g. "/admin/blog/:id". */
  urlTemplate: string;
  params: PathParams;
  endpoint: EndpointSchema;
  /** Headers resolved from the config() chain. */
  configuredHeaders: Record<string, string>;
  header?: Record<string, string | undefined>;
  payload?: unknown;
  query?: object;
}

export interface HttpClient {
  execute(request: EndpointRequest): Promise<unknown>;
}

const BODYLESS_METHODS = new Set(['GET', 'HEAD']);
const NO_CONTENT_STATUSES = new Set([204, 205]);

/** JSON.stringify cannot serialize bigint; send it as a string instead. */
const jsonReplacer = (_key: string, value: unknown) =>
  typeof value === 'bigint' ? value.toString() : value;

function buildHeaders(request: EndpointRequest): Headers {
  // `Headers` is case-insensitive, so "Authorization" and "authorization" merge.
  const headers = new Headers();
  for (const source of [request.configuredHeaders, request.header ?? {}]) {
    for (const [name, value] of Object.entries(source)) {
      if (value !== undefined) headers.set(name, value);
    }
  }

  const missing = Object.entries(request.endpoint.HEADER ?? {})
    .filter(([name, schema]) => !(schema as { optional?: boolean }).optional && !headers.has(name))
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new RequestValidationError(
      `Missing required header(s) for ${request.method} ${request.urlTemplate}: ${missing.join(', ')}. ` +
        'Pass them per call or via config().',
    );
  }
  return headers;
}

async function parseBody(response: Response): Promise<unknown> {
  if (NO_CONTENT_STATUSES.has(response.status)) return undefined;

  const text = await response.text();
  if (text === '') return undefined;

  const isJson = response.headers.get('content-type')?.includes('json');
  if (!isJson) return text;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function createHttpClient(options: HttpClientOptions = {}): HttpClient {
  const { baseUrl = '' } = options;

  return {
    async execute(request) {
      const method = request.method.toUpperCase();
      const headers = buildHeaders(request);

      const hasPayload = request.payload !== undefined;
      if (hasPayload && BODYLESS_METHODS.has(method)) {
        throw new RequestValidationError(`${method} requests cannot have a payload`);
      }

      let body: string | undefined;
      if (hasPayload) {
        body = JSON.stringify(request.payload, jsonReplacer);
        if (!headers.has('content-type')) headers.set('content-type', 'application/json');
      }

      const url =
        joinBaseUrl(baseUrl, resolvePath(request.urlTemplate, request.params)) +
        buildQueryString(request.query);

      // Resolved lazily so a fetch polyfill/mocks installed later still apply.
      const fetchImpl = options.fetch ?? globalThis.fetch;
      const response = await fetchImpl(url, { method, headers, body });
      const data = await parseBody(response);

      if (!response.ok) {
        throw new ApiError(response.status, response.statusText, method, url, data);
      }
      return data;
    },
  };
}

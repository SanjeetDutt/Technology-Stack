import { RequestValidationError } from './errors';

export type PathParams = Readonly<Record<string, string>>;

/** "/admin/blog/:id" + { id: "7" } -> "/admin/blog/7" (values are URI-encoded). */
export function resolvePath(template: string, params: PathParams): string {
  return template.replace(/:([A-Za-z0-9_]+)/g, (_match, name: string) => {
    const value = params[name];
    if (value === undefined) {
      throw new RequestValidationError(
        `Missing path param "${name}" for "${template}"`,
      );
    }
    return encodeURIComponent(value);
  });
}

/** Builds "?a=1&b=2". `undefined`/`null` are skipped, arrays are repeated keys. */
export function buildQueryString(query: object | undefined): string {
  if (!query) return '';

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    const values: unknown[] = Array.isArray(value) ? value : [value];
    for (const item of values) {
      if (item !== undefined && item !== null) search.append(key, String(item));
    }
  }

  const serialized = search.toString();
  return serialized ? `?${serialized}` : '';
}

export function joinBaseUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/+$/, '')}${path}`;
}

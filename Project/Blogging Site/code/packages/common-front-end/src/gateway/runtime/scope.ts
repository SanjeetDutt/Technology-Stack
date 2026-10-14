/**
 * Holds the headers configured on one node. Scopes form a chain so a child
 * node inherits its ancestors' headers, and a later `config()` call on an
 * ancestor is still picked up (headers are resolved at call time).
 */
export interface HeaderScope {
  set(headers: Readonly<Record<string, string | undefined>>): void;
  resolve(): Record<string, string>;
}

export function createHeaderScope(parent?: HeaderScope): HeaderScope {
  const own = new Map<string, string>();

  return {
    set(headers) {
      for (const [name, value] of Object.entries(headers)) {
        if (value === undefined) own.delete(name);
        else own.set(name, value);
      }
    },
    resolve() {
      return { ...parent?.resolve(), ...Object.fromEntries(own) };
    },
  };
}

import * as ts from "typescript"

export function resolveTypeToJSON(type: ts.Type, depth = 0,checker:ts.TypeChecker): any {
  const typeString = checker.typeToString(type);

  // Safety against infinite recursion for self-referencing types (e.g., Tree nodes)
  if (depth > 100) return "..." + typeString;

  // 1. Primitive & Literal types (Stop recursion)
  const isPrimitive = ["string", "number", "boolean", "any", "unknown", "never", "void", "null", "undefined"].includes(typeString);
  const isLiteral = type.isLiteral() || (type.getFlags() & (ts.TypeFlags.BooleanLiteral | ts.TypeFlags.StringLiteral | ts.TypeFlags.NumberLiteral)) !== 0;
  if (isPrimitive || isLiteral) {
    return {
        type: [typeString],
        isOptional: false
    };
  }

  // 2. Built-in objects & Functions (Stop recursion to prevent exploding methods)
  const symbol = type.getSymbol();
  if (symbol) {
    const name = symbol.getName();
    if (["Date", "Buffer", "RegExp", "Promise", "Function"].includes(name)) {
      return name;
    }
  }
  if (type.getCallSignatures().length > 0) {
    return typeString; // Keep function signatures as strings
  }

  // 3. Arrays
  // `getNumberIndexType` extracts the element type of arrays (the T inside T[])
  const arrayElementType = type.getNumberIndexType();
  if (arrayElementType) {
    return [resolveTypeToJSON(arrayElementType, depth + 1, checker)]; // Wrap in Array bracket
  }

  // Fallback for explicit generic Arrays if the above misses (e.g., Array<T>)
  if (symbol && symbol.getName() === "Array") {
    const typeArguments = (type as ts.TypeReference).typeArguments;
    if (typeArguments && typeArguments[0]) {
      return [resolveTypeToJSON(typeArguments[0], depth + 1,checker)];
    }
  }

  // 4. Unions (e.g., Optional fields, or "TEL" | "Mobile")
  if (type.isUnion()) {
    // Filter out 'undefined' to cleanly unwrap optional properties (e.g., `phone?: {...}`)
    const actualTypes = type.types.filter(t => !(t.getFlags() & ts.TypeFlags.Undefined));
    
    if (actualTypes[0]) {
      // It was just `Type | undefined`, so unwrap and parse the inner type deeply
      return resolveTypeToJSON(actualTypes[0], depth + 1,checker);
    }

    // If it's a simple union of primitives (e.g., "TEL" | "Mobile"), keep it as a string
    const allPrimitives = actualTypes.every(t => 
      t.isLiteral() || 
      (t.getFlags() & (ts.TypeFlags.String | ts.TypeFlags.Number | ts.TypeFlags.Boolean | ts.TypeFlags.Null)) !== 0
    );
    
    if (allPrimitives) {
      return typeString; 
    }

    // Complex unions (e.g., ObjectA | ObjectB) get mapped into an array-like structure
    return {
      $union: actualTypes.map(t => resolveTypeToJSON(t, depth + 1,checker))
    };
  }

  // 5. Objects / Intersections
  const props = type.getProperties();
  if (props.length > 0) {
    const result: Record<string, any> = {};
    for (const prop of props) {
      // Ignore class methods inside configuration objects
      if (prop.getFlags() & ts.SymbolFlags.Method) continue;

      let propType: ts.Type | undefined;
      
      // Safely resolve the property's underlying type
      const propDecl = prop.valueDeclaration || prop.declarations?.[0];
      if (propDecl) {
        propType = checker.getTypeOfSymbolAtLocation(prop, propDecl);
      } else {
        // Fallback for properties synthesized by mapped types or intersections
        propType = checker.getTypeOfSymbol(prop);
      }

      if (propType) {
        result[prop.getName()] = resolveTypeToJSON(propType, depth + 1,checker);
      } else {
        result[prop.getName()] = "unknown";
      }
    }
    return result;
  }

  // Fallback catch-all
  return typeString;
}

function extractJSDoc(checker: ts.TypeChecker, symbol?: ts.Symbol) {
    if (!symbol) return { description: "", tags: {} };

    // Get the main JSDoc description
    const description = ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();
    
    // Get JSDoc tags (like @default, @deprecated, etc.)
    const tags: Record<string, string> = {};
    for (const tag of symbol.getJsDocTags(checker)) {
      tags[tag.name] = ts.displayPartsToString(tag.text).trim();
    }

    return { description, tags };
}
declare const UNIQUE_ID: unique symbol;

enum Status {
  Pending = "PENDING",
  Done = "DONE",
}

interface User {
  username: string;
  name:string
  address:{
    addr1:string,
    addr2:string,
    addr3:string
    city:{
        name: string,
        state: string,
        code: string,
        pipn: number
    }
  }
}

export type AllFlags = {
  // Primitive
  anyFlag: any;                           // Any
  unknownFlag: unknown;                   // Unknown
  undefinedFlag: undefined;               // Undefined
  nullFlag: null;                         // Null
  voidFlag: void;                         // Void
  stringFlag: string;                     // String
  numberFlag: number;                     // Number
  bigintFlag: bigint;                     // BigInt
  booleanFlag: boolean;                   // Boolean
  symbolFlag: symbol;                     // ESSymbol

  // Literals
  stringLiteralFlag: "hello";             // StringLiteral
  numberLiteralFlag: 42;                  // NumberLiteral
  bigintLiteralFlag: 42n;                 // BigIntLiteral
  booleanLiteralFlag: true;               // BooleanLiteral

  // Symbols
  uniqueSymbolFlag: typeof UNIQUE_ID;     // UniqueESSymbol

  // Enums
  enumFlag: Status;                       // Enum
  enumLiteralFlag: Status.Pending;        // EnumLiteral

  // Special
    neverFlag: never;                       // Never
  nonPrimitiveFlag: object;               // NonPrimitive

  // Type Parameter
  typeParameterFlag: Box<string>;         // contains TypeParameter
  objectFlag: User;                       // Object

  // keyof
  indexFlag: keyof User;                  // Index

  // Template Literal
  templateLiteralFlag: `ABC${string}`;    // TemplateLiteral

  // String Mapping
  stringMappingFlag: Uppercase<"abc">;    // StringMapping

  // Indexed Access
  indexedAccessFlag: User["address"];        // IndexedAccess

  // Conditional
  conditionalFlag: IsString<string>;      // Conditional

  // Union
  unionFlag: string | number;             // Union

  // Intersection
intersectionFlag:
    { id: string, dob: `${number}-${number}-${number}` } |
    { age: number };                      // Intersection
};

type Box<T> = {
  value: T;
};

type IsString<T> =
  T extends string ? true : false;

  const a:object = {

  }
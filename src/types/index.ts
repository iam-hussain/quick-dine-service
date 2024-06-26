import { JWTPayloadSpec } from "@elysiajs/jwt";

export declare const StatusMap: {
  readonly Continue: 100;
  readonly "Switching Protocols": 101;
  readonly Processing: 102;
  readonly "Early Hints": 103;
  readonly OK: 200;
  readonly Created: 201;
  readonly Accepted: 202;
  readonly "Non-Authoritative Information": 203;
  readonly "No Content": 204;
  readonly "Reset Content": 205;
  readonly "Partial Content": 206;
  readonly "Multi-Status": 207;
  readonly "Already Reported": 208;
  readonly "Multiple Choices": 300;
  readonly "Moved Permanently": 301;
  readonly Found: 302;
  readonly "See Other": 303;
  readonly "Not Modified": 304;
  readonly "Temporary Redirect": 307;
  readonly "Permanent Redirect": 308;
  readonly "Bad Request": 400;
  readonly Unauthorized: 401;
  readonly "Payment Required": 402;
  readonly Forbidden: 403;
  readonly "Not Found": 404;
  readonly "Method Not Allowed": 405;
  readonly "Not Acceptable": 406;
  readonly "Proxy Authentication Required": 407;
  readonly "Request Timeout": 408;
  readonly Conflict: 409;
  readonly Gone: 410;
  readonly "Length Required": 411;
  readonly "Precondition Failed": 412;
  readonly "Payload Too Large": 413;
  readonly "URI Too Long": 414;
  readonly "Unsupported Media Type": 415;
  readonly "Range Not Satisfiable": 416;
  readonly "Expectation Failed": 417;
  readonly "I'm a teapot": 418;
  readonly "Misdirected Request": 421;
  readonly "Unprocessable Content": 422;
  readonly Locked: 423;
  readonly "Failed Dependency": 424;
  readonly "Too Early": 425;
  readonly "Upgrade Required": 426;
  readonly "Precondition Required": 428;
  readonly "Too Many Requests": 429;
  readonly "Request Header Fields Too Large": 431;
  readonly "Unavailable For Legal Reasons": 451;
  readonly "Internal Server Error": 500;
  readonly "Not Implemented": 501;
  readonly "Bad Gateway": 502;
  readonly "Service Unavailable": 503;
  readonly "Gateway Timeout": 504;
  readonly "HTTP Version Not Supported": 505;
  readonly "Variant Also Negotiates": 506;
  readonly "Insufficient Storage": 507;
  readonly "Loop Detected": 508;
  readonly "Not Extended": 510;
  readonly "Network Authentication Required": 511;
};
export type HTTPStatusName = keyof typeof StatusMap;

export type JWT_OBJECT = {
  username: string;
  id: string;
  store: string;
  type: "BUSINESS" | "PERSONAL";
};

export type HandlerProps = {
  headers: Record<string, string | undefined>;
  token: {
    value: string | null;
    decoded: JWT_OBJECT;
    hasToken: Boolean;
    tokenType: "BUSINESS" | "PERSONAL" | "";
    isBusinessUser: Boolean;
    hasStore: Boolean;
  };
  set: {
    status?: number | HTTPStatusName;
  };
  jwt: {
    readonly sign: (
      morePayload: Record<string, string | number> & JWTPayloadSpec
    ) => Promise<string>;
    readonly verify: (
      jwt?: string | undefined
    ) => Promise<false | (Record<string, string | number> & JWTPayloadSpec)>;
  };
};

type CALC_VALUE_TYPE = "VALUE" | "PERCENTAGE" | "VALUE_COUNT";

export type StoreAdditionalType = {
  table: {
    key: string;
    name: string;
    printName: string;
    position: number;
  }[];
  tax: {
    key: string;
    name: string;
    printName: string;
    value: number;
    position: number;
    type: CALC_VALUE_TYPE;
  }[];
  discounts: {
    key: string;
    name: string;
    printName: string;
    value: number;
    type: CALC_VALUE_TYPE;
  }[];
  packing: {
    value: number;
    type: CALC_VALUE_TYPE;
  };
  delivery: {
    value: number;
    type: CALC_VALUE_TYPE;
  };
};

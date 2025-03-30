import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = NodeTextDecoder as unknown as {
  new (label?: string, options?: TextDecoderOptions): TextDecoder;
  prototype: TextDecoder;
};

if (typeof global.fetch === "undefined") {
  const fetch = require("node-fetch");
global.fetch = fetch;
global.Response = fetch.Response;
global.Request = fetch.Request;
global.Headers = fetch.Headers;
}

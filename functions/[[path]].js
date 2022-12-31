var __create = Object.create
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __esm = (fn, res) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res
  }
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    )
  }
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true })
}
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        })
  }
  return to
}
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod,
  )
)
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod)

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict"
    exports.parse = parse2
    exports.serialize = serialize2
    var decode = decodeURIComponent
    var encode = encodeURIComponent
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/
    function parse2(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string")
      }
      var obj = {}
      var opt = options || {}
      var pairs = str.split(";")
      var dec = opt.decode || decode
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i]
        var index = pair.indexOf("=")
        if (index < 0) {
          continue
        }
        var key = pair.substring(0, index).trim()
        if (void 0 == obj[key]) {
          var val = pair.substring(index + 1, pair.length).trim()
          if (val[0] === '"') {
            val = val.slice(1, -1)
          }
          obj[key] = tryDecode(val, dec)
        }
      }
      return obj
    }
    function serialize2(name, val, options) {
      var opt = options || {}
      var enc = opt.encode || encode
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid")
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid")
      }
      var value = enc(val)
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid")
      }
      var str = name + "=" + value
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid")
        }
        str += "; Max-Age=" + Math.floor(maxAge)
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid")
        }
        str += "; Domain=" + opt.domain
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid")
        }
        str += "; Path=" + opt.path
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid")
        }
        str += "; Expires=" + opt.expires.toUTCString()
      }
      if (opt.httpOnly) {
        str += "; HttpOnly"
      }
      if (opt.secure) {
        str += "; Secure"
      }
      if (opt.sameSite) {
        var sameSite =
          typeof opt.sameSite === "string"
            ? opt.sameSite.toLowerCase()
            : opt.sameSite
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict"
            break
          case "lax":
            str += "; SameSite=Lax"
            break
          case "strict":
            str += "; SameSite=Strict"
            break
          case "none":
            str += "; SameSite=None"
            break
          default:
            throw new TypeError("option sameSite is invalid")
        }
      }
      return str
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str)
      } catch (e) {
        return str
      }
    }
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/warnings.js
function warnOnce(condition, message) {
  if (!condition && !alreadyWarned[message]) {
    alreadyWarned[message] = true
    console.warn(message)
  }
}
var alreadyWarned
var init_warnings = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/warnings.js"() {
    alreadyWarned = {}
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/cookies.js
async function encodeCookieValue(sign, value, secrets) {
  let encoded = encodeData(value)
  if (secrets.length > 0) {
    encoded = await sign(encoded, secrets[0])
  }
  return encoded
}
async function decodeCookieValue(unsign, value, secrets) {
  if (secrets.length > 0) {
    for (let secret of secrets) {
      let unsignedValue = await unsign(value, secret)
      if (unsignedValue !== false) {
        return decodeData(unsignedValue)
      }
    }
    return null
  }
  return decodeData(value)
}
function encodeData(value) {
  return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))))
}
function decodeData(value) {
  try {
    return JSON.parse(decodeURIComponent(myEscape(atob(value))))
  } catch (error) {
    return {}
  }
}
function myEscape(value) {
  let str = value.toString()
  let result = ""
  let index = 0
  let chr, code
  while (index < str.length) {
    chr = str.charAt(index++)
    if (/[\w*+\-./@]/.exec(chr)) {
      result += chr
    } else {
      code = chr.charCodeAt(0)
      if (code < 256) {
        result += "%" + hex(code, 2)
      } else {
        result += "%u" + hex(code, 4).toUpperCase()
      }
    }
  }
  return result
}
function hex(code, length) {
  let result = code.toString(16)
  while (result.length < length) result = "0" + result
  return result
}
function myUnescape(value) {
  let str = value.toString()
  let result = ""
  let index = 0
  let chr, part
  while (index < str.length) {
    chr = str.charAt(index++)
    if (chr === "%") {
      if (str.charAt(index) === "u") {
        part = str.slice(index + 1, index + 5)
        if (/^[\da-f]{4}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16))
          index += 5
          continue
        }
      } else {
        part = str.slice(index, index + 2)
        if (/^[\da-f]{2}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16))
          index += 2
          continue
        }
      }
    }
    result += chr
  }
  return result
}
function warnOnceAboutExpiresCookie(name, expires) {
  warnOnce(
    !expires,
    `The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`,
  )
}
var import_cookie, createCookieFactory, isCookie
var init_cookies = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/cookies.js"() {
    import_cookie = __toESM(require_cookie())
    init_warnings()
    createCookieFactory =
      ({ sign, unsign }) =>
      (name, cookieOptions = {}) => {
        let { secrets, ...options } = {
          secrets: [],
          path: "/",
          sameSite: "lax",
          ...cookieOptions,
        }
        warnOnceAboutExpiresCookie(name, options.expires)
        return {
          get name() {
            return name
          },
          get isSigned() {
            return secrets.length > 0
          },
          get expires() {
            return typeof options.maxAge !== "undefined"
              ? new Date(Date.now() + options.maxAge * 1e3)
              : options.expires
          },
          async parse(cookieHeader, parseOptions) {
            if (!cookieHeader) return null
            let cookies = (0, import_cookie.parse)(cookieHeader, {
              ...options,
              ...parseOptions,
            })
            return name in cookies
              ? cookies[name] === ""
                ? ""
                : await decodeCookieValue(unsign, cookies[name], secrets)
              : null
          },
          async serialize(value, serializeOptions) {
            return (0, import_cookie.serialize)(
              name,
              value === "" ? "" : await encodeCookieValue(sign, value, secrets),
              {
                ...options,
                ...serializeOptions,
              },
            )
          },
        }
      }
    isCookie = (object) => {
      return (
        object != null &&
        typeof object.name === "string" &&
        typeof object.isSigned === "boolean" &&
        typeof object.parse === "function" &&
        typeof object.serialize === "function"
      )
    }
  },
})

// node_modules/@web3-storage/multipart-parser/esm/src/utils.js
function stringToArray(s) {
  const utf8 = unescape(encodeURIComponent(s))
  return Uint8Array.from(utf8, (_, i) => utf8.charCodeAt(i))
}
function arrayToString(a) {
  const utf8 = String.fromCharCode.apply(null, a)
  return decodeURIComponent(escape(utf8))
}
function mergeArrays(...arrays) {
  const out = new Uint8Array(
    arrays.reduce((total, arr) => total + arr.length, 0),
  )
  let offset = 0
  for (const arr of arrays) {
    out.set(arr, offset)
    offset += arr.length
  }
  return out
}
function arraysEqual(a, b) {
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}
var init_utils = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/utils.js"() {},
})

// node_modules/@web3-storage/multipart-parser/esm/src/search.js
function coerce(a) {
  if (a instanceof Uint8Array) {
    return (index) => a[index]
  }
  return a
}
function jsmemcmp(buf1, pos1, buf2, pos2, len) {
  const fn1 = coerce(buf1)
  const fn2 = coerce(buf2)
  for (let i = 0; i < len; ++i) {
    if (fn1(pos1 + i) !== fn2(pos2 + i)) {
      return false
    }
  }
  return true
}
function createOccurenceTable(s) {
  const table = new Array(256).fill(s.length)
  if (s.length > 1) {
    for (let i = 0; i < s.length - 1; i++) {
      table[s[i]] = s.length - 1 - i
    }
  }
  return table
}
var MATCH, StreamSearch, ReadableStreamSearch, EOQ, QueueableStreamSearch
var init_search = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/search.js"() {
    init_utils()
    MATCH = Symbol("Match")
    StreamSearch = class {
      constructor(needle) {
        this._lookbehind = new Uint8Array()
        if (typeof needle === "string") {
          this._needle = needle = stringToArray(needle)
        } else {
          this._needle = needle
        }
        this._lastChar = needle[needle.length - 1]
        this._occ = createOccurenceTable(needle)
      }
      feed(chunk) {
        let pos = 0
        let tokens
        const allTokens = []
        while (pos !== chunk.length) {
          ;[pos, ...tokens] = this._feed(chunk, pos)
          allTokens.push(...tokens)
        }
        return allTokens
      }
      end() {
        const tail = this._lookbehind
        this._lookbehind = new Uint8Array()
        return tail
      }
      _feed(data, bufPos) {
        const tokens = []
        let pos = -this._lookbehind.length
        if (pos < 0) {
          while (pos < 0 && pos <= data.length - this._needle.length) {
            const ch = this._charAt(data, pos + this._needle.length - 1)
            if (
              ch === this._lastChar &&
              this._memcmp(data, pos, this._needle.length - 1)
            ) {
              if (pos > -this._lookbehind.length) {
                tokens.push(
                  this._lookbehind.slice(0, this._lookbehind.length + pos),
                )
              }
              tokens.push(MATCH)
              this._lookbehind = new Uint8Array()
              return [pos + this._needle.length, ...tokens]
            } else {
              pos += this._occ[ch]
            }
          }
          if (pos < 0) {
            while (pos < 0 && !this._memcmp(data, pos, data.length - pos)) {
              pos++
            }
          }
          if (pos >= 0) {
            tokens.push(this._lookbehind)
            this._lookbehind = new Uint8Array()
          } else {
            const bytesToCutOff = this._lookbehind.length + pos
            if (bytesToCutOff > 0) {
              tokens.push(this._lookbehind.slice(0, bytesToCutOff))
              this._lookbehind = this._lookbehind.slice(bytesToCutOff)
            }
            this._lookbehind = Uint8Array.from(
              new Array(this._lookbehind.length + data.length),
              (_, i) => this._charAt(data, i - this._lookbehind.length),
            )
            return [data.length, ...tokens]
          }
        }
        pos += bufPos
        while (pos <= data.length - this._needle.length) {
          const ch = data[pos + this._needle.length - 1]
          if (
            ch === this._lastChar &&
            data[pos] === this._needle[0] &&
            jsmemcmp(this._needle, 0, data, pos, this._needle.length - 1)
          ) {
            if (pos > bufPos) {
              tokens.push(data.slice(bufPos, pos))
            }
            tokens.push(MATCH)
            return [pos + this._needle.length, ...tokens]
          } else {
            pos += this._occ[ch]
          }
        }
        if (pos < data.length) {
          while (
            pos < data.length &&
            (data[pos] !== this._needle[0] ||
              !jsmemcmp(data, pos, this._needle, 0, data.length - pos))
          ) {
            ++pos
          }
          if (pos < data.length) {
            this._lookbehind = data.slice(pos)
          }
        }
        if (pos > 0) {
          tokens.push(data.slice(bufPos, pos < data.length ? pos : data.length))
        }
        return [data.length, ...tokens]
      }
      _charAt(data, pos) {
        if (pos < 0) {
          return this._lookbehind[this._lookbehind.length + pos]
        }
        return data[pos]
      }
      _memcmp(data, pos, len) {
        return jsmemcmp(
          this._charAt.bind(this, data),
          pos,
          this._needle,
          0,
          len,
        )
      }
    }
    ReadableStreamSearch = class {
      constructor(needle, _readableStream) {
        this._readableStream = _readableStream
        this._search = new StreamSearch(needle)
      }
      async *[Symbol.asyncIterator]() {
        const reader = this._readableStream.getReader()
        try {
          while (true) {
            const result = await reader.read()
            if (result.done) {
              break
            }
            yield* this._search.feed(result.value)
          }
          const tail = this._search.end()
          if (tail.length) {
            yield tail
          }
        } finally {
          reader.releaseLock()
        }
      }
    }
    EOQ = Symbol("End of Queue")
    QueueableStreamSearch = class {
      constructor(needle) {
        this._chunksQueue = []
        this._closed = false
        this._search = new StreamSearch(needle)
      }
      push(...chunks) {
        if (this._closed) {
          throw new Error("cannot call push after close")
        }
        this._chunksQueue.push(...chunks)
        if (this._notify) {
          this._notify()
        }
      }
      close() {
        if (this._closed) {
          throw new Error("close was already called")
        }
        this._closed = true
        this._chunksQueue.push(EOQ)
        if (this._notify) {
          this._notify()
        }
      }
      async *[Symbol.asyncIterator]() {
        while (true) {
          let chunk
          while (!(chunk = this._chunksQueue.shift())) {
            await new Promise((resolve) => (this._notify = resolve))
            this._notify = void 0
          }
          if (chunk === EOQ) {
            break
          }
          yield* this._search.feed(chunk)
        }
        const tail = this._search.end()
        if (tail.length) {
          yield tail
        }
      }
    }
  },
})

// node_modules/@web3-storage/multipart-parser/esm/src/index.js
function parseContentDisposition(header) {
  const parts = header.split(";").map((part) => part.trim())
  if (parts.shift() !== "form-data") {
    throw new Error(
      'malformed content-disposition header: missing "form-data" in `' +
        JSON.stringify(parts) +
        "`",
    )
  }
  const out = {}
  for (const part of parts) {
    const kv = part.split("=", 2)
    if (kv.length !== 2) {
      throw new Error(
        "malformed content-disposition header: key-value pair not found - " +
          part +
          " in `" +
          header +
          "`",
      )
    }
    const [name, value] = kv
    if (value[0] === '"' && value[value.length - 1] === '"') {
      out[name] = value.slice(1, -1).replace(/\\"/g, '"')
    } else if (value[0] !== '"' && value[value.length - 1] !== '"') {
      out[name] = value
    } else if (
      (value[0] === '"' && value[value.length - 1] !== '"') ||
      (value[0] !== '"' && value[value.length - 1] === '"')
    ) {
      throw new Error(
        "malformed content-disposition header: mismatched quotations in `" +
          header +
          "`",
      )
    }
  }
  if (!out.name) {
    throw new Error(
      "malformed content-disposition header: missing field name in `" +
        header +
        "`",
    )
  }
  return out
}
function parsePartHeaders(lines) {
  const entries = []
  let disposition = false
  let line
  while (typeof (line = lines.shift()) !== "undefined") {
    const colon = line.indexOf(":")
    if (colon === -1) {
      throw new Error("malformed multipart-form header: missing colon")
    }
    const header = line.slice(0, colon).trim().toLowerCase()
    const value = line.slice(colon + 1).trim()
    switch (header) {
      case "content-disposition":
        disposition = true
        entries.push(...Object.entries(parseContentDisposition(value)))
        break
      case "content-type":
        entries.push(["contentType", value])
    }
  }
  if (!disposition) {
    throw new Error(
      "malformed multipart-form header: missing content-disposition",
    )
  }
  return Object.fromEntries(entries)
}
async function readHeaderLines(it, needle) {
  let firstChunk = true
  let lastTokenWasMatch = false
  const headerLines = [[]]
  const crlfSearch = new StreamSearch(CRLF)
  for (;;) {
    const result = await it.next()
    if (result.done) {
      throw new Error("malformed multipart-form data: unexpected end of stream")
    }
    if (
      firstChunk &&
      result.value !== MATCH &&
      arraysEqual(result.value.slice(0, 2), dash)
    ) {
      return [void 0, new Uint8Array()]
    }
    let chunk
    if (result.value !== MATCH) {
      chunk = result.value
    } else if (!lastTokenWasMatch) {
      chunk = needle
    } else {
      throw new Error("malformed multipart-form data: unexpected boundary")
    }
    if (!chunk.length) {
      continue
    }
    if (firstChunk) {
      firstChunk = false
    }
    const tokens = crlfSearch.feed(chunk)
    for (const [i, token] of tokens.entries()) {
      const isMatch = token === MATCH
      if (!isMatch && !token.length) {
        continue
      }
      if (lastTokenWasMatch && isMatch) {
        tokens.push(crlfSearch.end())
        return [
          headerLines
            .filter((chunks) => chunks.length)
            .map(mergeArrays2)
            .map(arrayToString),
          mergeArrays(
            ...tokens
              .slice(i + 1)
              .map((token2) => (token2 === MATCH ? CRLF : token2)),
          ),
        ]
      }
      if ((lastTokenWasMatch = isMatch)) {
        headerLines.push([])
      } else {
        headerLines[headerLines.length - 1].push(token)
      }
    }
  }
}
async function* streamMultipart(body, boundary) {
  const needle = mergeArrays(dash, stringToArray(boundary))
  const it = new ReadableStreamSearch(needle, body)[Symbol.asyncIterator]()
  for (;;) {
    const result = await it.next()
    if (result.done) {
      return
    }
    if (result.value === MATCH) {
      break
    }
  }
  const crlfSearch = new StreamSearch(CRLF)
  for (;;) {
    let feedChunk = function (chunk) {
      const chunks = []
      for (const token of crlfSearch.feed(chunk)) {
        if (trailingCRLF) {
          chunks.push(CRLF)
        }
        if (!(trailingCRLF = token === MATCH)) {
          chunks.push(token)
        }
      }
      return mergeArrays(...chunks)
    }
    const [headerLines, tail] = await readHeaderLines(it, needle)
    if (!headerLines) {
      return
    }
    async function nextToken() {
      const result = await it.next()
      if (result.done) {
        throw new Error(
          "malformed multipart-form data: unexpected end of stream",
        )
      }
      return result
    }
    let trailingCRLF = false
    let done = false
    async function nextChunk() {
      const result = await nextToken()
      let chunk
      if (result.value !== MATCH) {
        chunk = result.value
      } else if (!trailingCRLF) {
        chunk = CRLF
      } else {
        done = true
        return { value: crlfSearch.end() }
      }
      return { value: feedChunk(chunk) }
    }
    const bufferedChunks = [{ value: feedChunk(tail) }]
    yield {
      ...parsePartHeaders(headerLines),
      data: {
        [Symbol.asyncIterator]() {
          return this
        },
        async next() {
          for (;;) {
            const result = bufferedChunks.shift()
            if (!result) {
              break
            }
            if (result.value.length > 0) {
              return result
            }
          }
          for (;;) {
            if (done) {
              return {
                done,
                value: void 0,
              }
            }
            const result = await nextChunk()
            if (result.value.length > 0) {
              return result
            }
          }
        },
      },
    }
    while (!done) {
      bufferedChunks.push(await nextChunk())
    }
  }
}
var mergeArrays2, dash, CRLF
var init_src = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/index.js"() {
    init_search()
    init_utils()
    mergeArrays2 = Function.prototype.apply.bind(mergeArrays, void 0)
    dash = stringToArray("--")
    CRLF = stringToArray("\r\n")
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/formData.js
function composeUploadHandlers(...handlers) {
  return async (part) => {
    for (let handler of handlers) {
      let value = await handler(part)
      if (typeof value !== "undefined" && value !== null) {
        return value
      }
    }
    return void 0
  }
}
async function parseMultipartFormData(request, uploadHandler) {
  let contentType = request.headers.get("Content-Type") || ""
  let [type, boundary] = contentType.split(/\s*;\s*boundary=/)
  if (!request.body || !boundary || type !== "multipart/form-data") {
    throw new TypeError("Could not parse content as FormData.")
  }
  let formData = new FormData()
  let parts = streamMultipart(request.body, boundary)
  for await (let part of parts) {
    if (part.done) break
    if (typeof part.filename === "string") {
      part.filename = part.filename.split(/[/\\]/).pop()
    }
    let value = await uploadHandler(part)
    if (typeof value !== "undefined" && value !== null) {
      formData.append(part.name, value)
    }
  }
  return formData
}
var init_formData = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/formData.js"() {
    init_src()
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/responses.js
function isResponse(value) {
  return (
    value != null &&
    typeof value.status === "number" &&
    typeof value.statusText === "string" &&
    typeof value.headers === "object" &&
    typeof value.body !== "undefined"
  )
}
function isRedirectResponse(response) {
  return redirectStatusCodes.has(response.status)
}
var json, redirect, redirectStatusCodes
var init_responses = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/responses.js"() {
    json = (data, init = {}) => {
      let responseInit =
        typeof init === "number"
          ? {
              status: init,
            }
          : init
      let headers = new Headers(responseInit.headers)
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json; charset=utf-8")
      }
      return new Response(JSON.stringify(data), {
        ...responseInit,
        headers,
      })
    }
    redirect = (url, init = 302) => {
      let responseInit = init
      if (typeof responseInit === "number") {
        responseInit = {
          status: responseInit,
        }
      } else if (typeof responseInit.status === "undefined") {
        responseInit.status = 302
      }
      let headers = new Headers(responseInit.headers)
      headers.set("Location", url)
      return new Response(null, {
        ...responseInit,
        headers,
      })
    }
    redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308])
  },
})

// node_modules/@remix-run/router/dist/router.js
function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i]
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
        return target
      }
  return _extends.apply(this, arguments)
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message)
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8)
}
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null
  }
  let location = _extends(
    {
      pathname: typeof current === "string" ? current : current.pathname,
      search: "",
      hash: "",
    },
    typeof to === "string" ? parsePath(to) : to,
    {
      state,
      key: (to && to.key) || key || createKey(),
    },
  )
  return location
}
function createPath(_ref) {
  let { pathname = "/", search = "", hash = "" } = _ref
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash
  return pathname
}
function parsePath(path) {
  let parsedPath = {}
  if (path) {
    let hashIndex = path.indexOf("#")
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex)
      path = path.substr(0, hashIndex)
    }
    let searchIndex = path.indexOf("?")
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex)
      path = path.substr(0, searchIndex)
    }
    if (path) {
      parsedPath.pathname = path
    }
  }
  return parsedPath
}
function isIndexRoute(route) {
  return route.index === true
}
function convertRoutesToDataRoutes(routes2, parentPath, allIds) {
  if (parentPath === void 0) {
    parentPath = []
  }
  if (allIds === void 0) {
    allIds = /* @__PURE__ */ new Set()
  }
  return routes2.map((route, index) => {
    let treePath = [...parentPath, index]
    let id = typeof route.id === "string" ? route.id : treePath.join("-")
    invariant(
      route.index !== true || !route.children,
      "Cannot specify children on an index route",
    )
    invariant(
      !allIds.has(id),
      'Found a route id collision on id "' +
        id +
        `".  Route id's must be globally unique within Data Router usages`,
    )
    allIds.add(id)
    if (isIndexRoute(route)) {
      let indexRoute = _extends({}, route, {
        id,
      })
      return indexRoute
    } else {
      let pathOrLayoutRoute = _extends({}, route, {
        id,
        children: route.children
          ? convertRoutesToDataRoutes(route.children, treePath, allIds)
          : void 0,
      })
      return pathOrLayoutRoute
    }
  })
}
function matchRoutes(routes2, locationArg, basename) {
  if (basename === void 0) {
    basename = "/"
  }
  let location =
    typeof locationArg === "string" ? parsePath(locationArg) : locationArg
  let pathname = stripBasename(location.pathname || "/", basename)
  if (pathname == null) {
    return null
  }
  let branches = flattenRoutes(routes2)
  rankRouteBranches(branches)
  let matches = null
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], safelyDecodeURI(pathname))
  }
  return matches
}
function flattenRoutes(routes2, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = []
  }
  if (parentsMeta === void 0) {
    parentsMeta = []
  }
  if (parentPath === void 0) {
    parentPath = ""
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta2 = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route,
    }
    if (meta2.relativePath.startsWith("/")) {
      invariant(
        meta2.relativePath.startsWith(parentPath),
        'Absolute route path "' +
          meta2.relativePath +
          '" nested under path ' +
          ('"' + parentPath + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      )
      meta2.relativePath = meta2.relativePath.slice(parentPath.length)
    }
    let path = joinPaths([parentPath, meta2.relativePath])
    let routesMeta = parentsMeta.concat(meta2)
    if (route.children && route.children.length > 0) {
      invariant(
        route.index !== true,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + path + '".'),
      )
      flattenRoutes(route.children, branches, routesMeta, path)
    }
    if (route.path == null && !route.index) {
      return
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta,
    })
  }
  routes2.forEach((route, index) => {
    var _route$path
    if (
      route.path === "" ||
      !((_route$path = route.path) != null && _route$path.includes("?"))
    ) {
      flattenRoute(route, index)
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded)
      }
    }
  })
  return branches
}
function explodeOptionalSegments(path) {
  let segments = path.split("/")
  if (segments.length === 0) return []
  let [first, ...rest] = segments
  let isOptional = first.endsWith("?")
  let required = first.replace(/\?$/, "")
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required]
  }
  let restExploded = explodeOptionalSegments(rest.join("/"))
  let result = []
  result.push(
    ...restExploded.map((subpath) =>
      subpath === "" ? required : [required, subpath].join("/"),
    ),
  )
  if (isOptional) {
    result.push(...restExploded)
  }
  return result.map((exploded) =>
    path.startsWith("/") && exploded === "" ? "/" : exploded,
  )
}
function rankRouteBranches(branches) {
  branches.sort((a, b) =>
    a.score !== b.score
      ? b.score - a.score
      : compareIndexes(
          a.routesMeta.map((meta2) => meta2.childrenIndex),
          b.routesMeta.map((meta2) => meta2.childrenIndex),
        ),
  )
}
function computeScore(path, index) {
  let segments = path.split("/")
  let initialScore = segments.length
  if (segments.some(isSplat)) {
    initialScore += splatPenalty
  }
  if (index) {
    initialScore += indexRouteValue
  }
  return segments
    .filter((s) => !isSplat(s))
    .reduce(
      (score, segment) =>
        score +
        (paramRe.test(segment)
          ? dynamicSegmentValue
          : segment === ""
          ? emptySegmentValue
          : staticSegmentValue),
      initialScore,
    )
}
function compareIndexes(a, b) {
  let siblings =
    a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i])
  return siblings ? a[a.length - 1] - b[b.length - 1] : 0
}
function matchRouteBranch(branch, pathname) {
  let { routesMeta } = branch
  let matchedParams = {}
  let matchedPathname = "/"
  let matches = []
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta2 = routesMeta[i]
    let end = i === routesMeta.length - 1
    let remainingPathname =
      matchedPathname === "/"
        ? pathname
        : pathname.slice(matchedPathname.length) || "/"
    let match = matchPath(
      {
        path: meta2.relativePath,
        caseSensitive: meta2.caseSensitive,
        end,
      },
      remainingPathname,
    )
    if (!match) return null
    Object.assign(matchedParams, match.params)
    let route = meta2.route
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase]),
      ),
      route,
    })
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase])
    }
  }
  return matches
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true,
    }
  }
  let [matcher, paramNames] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end,
  )
  let match = pathname.match(matcher)
  if (!match) return null
  let matchedPathname = match[0]
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1")
  let captureGroups = match.slice(1)
  let params = paramNames.reduce((memo, paramName, index) => {
    if (paramName === "*") {
      let splatValue = captureGroups[index] || ""
      pathnameBase = matchedPathname
        .slice(0, matchedPathname.length - splatValue.length)
        .replace(/(.)\/+$/, "$1")
    }
    memo[paramName] = safelyDecodeURIComponent(
      captureGroups[index] || "",
      paramName,
    )
    return memo
  }, {})
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern,
  }
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false
  }
  if (end === void 0) {
    end = true
  }
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    'Route path "' +
      path +
      '" will be treated as if it were ' +
      ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') +
      "always follow a `/` in the pattern. To get rid of this warning, " +
      ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'),
  )
  let paramNames = []
  let regexpSource =
    "^" +
    path
      .replace(/\/*\*?$/, "")
      .replace(/^\/*/, "/")
      .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&")
      .replace(/\/:(\w+)/g, (_, paramName) => {
        paramNames.push(paramName)
        return "/([^\\/]+)"
      })
  if (path.endsWith("*")) {
    paramNames.push("*")
    regexpSource +=
      path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"
  } else if (end) {
    regexpSource += "\\/*$"
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))"
  } else;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i")
  return [matcher, paramNames]
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value)
  } catch (error) {
    warning(
      false,
      'The URL path "' +
        value +
        '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
        ("encoding (" + error + ")."),
    )
    return value
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value)
  } catch (error) {
    warning(
      false,
      'The value for the URL param "' +
        paramName +
        '" will not be decoded because' +
        (' the string "' +
          value +
          '" is a malformed URL segment. This is probably') +
        (" due to a bad percent encoding (" + error + ")."),
    )
    return value
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null
  }
  let startIndex = basename.endsWith("/")
    ? basename.length - 1
    : basename.length
  let nextChar = pathname.charAt(startIndex)
  if (nextChar && nextChar !== "/") {
    return null
  }
  return pathname.slice(startIndex) || "/"
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message)
    try {
      throw new Error(message)
    } catch (e) {}
  }
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/"
  }
  let {
    pathname: toPathname,
    search = "",
    hash = "",
  } = typeof to === "string" ? parsePath(to) : to
  let pathname = toPathname
    ? toPathname.startsWith("/")
      ? toPathname
      : resolvePathname(toPathname, fromPathname)
    : fromPathname
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash),
  }
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/")
  let relativeSegments = relativePath.split("/")
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop()
    } else if (segment !== ".") {
      segments.push(segment)
    }
  })
  return segments.length > 1 ? segments.join("/") : "/"
}
function getInvalidPathError(char, field, dest, path) {
  return (
    "Cannot include a '" +
    char +
    "' character in a manually specified " +
    ("`to." +
      field +
      "` field [" +
      JSON.stringify(path) +
      "].  Please separate it out to the ") +
    ("`to." +
      dest +
      "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  )
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) =>
      index === 0 || (match.route.path && match.route.path.length > 0),
  )
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false
  }
  let to
  if (typeof toArg === "string") {
    to = parsePath(toArg)
  } else {
    to = _extends({}, toArg)
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to),
    )
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to),
    )
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to),
    )
  }
  let isEmptyPath = toArg === "" || to.pathname === ""
  let toPathname = isEmptyPath ? "/" : to.pathname
  let from
  if (isPathRelative || toPathname == null) {
    from = locationPathname
  } else {
    let routePathnameIndex = routePathnames.length - 1
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/")
      while (toSegments[0] === "..") {
        toSegments.shift()
        routePathnameIndex -= 1
      }
      to.pathname = toSegments.join("/")
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/"
  }
  let path = resolvePath(to, from)
  let hasExplicitTrailingSlash =
    toPathname && toPathname !== "/" && toPathname.endsWith("/")
  let hasCurrentTrailingSlash =
    (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/")
  if (
    !path.pathname.endsWith("/") &&
    (hasExplicitTrailingSlash || hasCurrentTrailingSlash)
  ) {
    path.pathname += "/"
  }
  return path
}
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value)) {
    return value
  }
  if (value._error) {
    throw value._error
  }
  return value._data
}
function isRouteErrorResponse(e) {
  return e instanceof ErrorResponse
}
function unstable_createStaticHandler(routes2, opts) {
  invariant(
    routes2.length > 0,
    "You must provide a non-empty routes array to unstable_createStaticHandler",
  )
  let dataRoutes = convertRoutesToDataRoutes(routes2)
  let basename = (opts ? opts.basename : null) || "/"
  async function query(request, _temp) {
    let { requestContext } = _temp === void 0 ? {} : _temp
    let url = new URL(request.url)
    let method = request.method.toLowerCase()
    let location = createLocation("", createPath(url), null, "default")
    let matches = matchRoutes(dataRoutes, location, basename)
    if (!isValidMethod(method) && method !== "head") {
      let error = getInternalRouterError(405, {
        method,
      })
      let { matches: methodNotAllowedMatches, route } =
        getShortCircuitMatches(dataRoutes)
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error,
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
      }
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname,
      })
      let { matches: notFoundMatches, route } =
        getShortCircuitMatches(dataRoutes)
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error,
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
      }
    }
    let result = await queryImpl(request, location, matches, requestContext)
    if (isResponse2(result)) {
      return result
    }
    return _extends(
      {
        location,
        basename,
      },
      result,
    )
  }
  async function queryRoute(request, _temp2) {
    let { routeId, requestContext } = _temp2 === void 0 ? {} : _temp2
    let url = new URL(request.url)
    let method = request.method.toLowerCase()
    let location = createLocation("", createPath(url), null, "default")
    let matches = matchRoutes(dataRoutes, location, basename)
    if (!isValidMethod(method) && method !== "head") {
      throw getInternalRouterError(405, {
        method,
      })
    } else if (!matches) {
      throw getInternalRouterError(404, {
        pathname: location.pathname,
      })
    }
    let match = routeId
      ? matches.find((m) => m.route.id === routeId)
      : getTargetMatch(matches, location)
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId,
      })
    } else if (!match) {
      throw getInternalRouterError(404, {
        pathname: location.pathname,
      })
    }
    let result = await queryImpl(
      request,
      location,
      matches,
      requestContext,
      match,
    )
    if (isResponse2(result)) {
      return result
    }
    let error = result.errors ? Object.values(result.errors)[0] : void 0
    if (error !== void 0) {
      throw error
    }
    let routeData = [result.actionData, result.loaderData].find((v) => v)
    return Object.values(routeData || {})[0]
  }
  async function queryImpl(
    request,
    location,
    matches,
    requestContext,
    routeMatch,
  ) {
    invariant(
      request.signal,
      "query()/queryRoute() requests must contain an AbortController signal",
    )
    try {
      if (isMutationMethod(request.method.toLowerCase())) {
        let result2 = await submit(
          request,
          matches,
          routeMatch || getTargetMatch(matches, location),
          requestContext,
          routeMatch != null,
        )
        return result2
      }
      let result = await loadRouteData(
        request,
        matches,
        requestContext,
        routeMatch,
      )
      return isResponse2(result)
        ? result
        : _extends({}, result, {
            actionData: null,
            actionHeaders: {},
          })
    } catch (e) {
      if (isQueryRouteResponse(e)) {
        if (e.type === ResultType.error && !isRedirectResponse2(e.response)) {
          throw e.response
        }
        return e.response
      }
      if (isRedirectResponse2(e)) {
        return e
      }
      throw e
    }
  }
  async function submit(
    request,
    matches,
    actionMatch,
    requestContext,
    isRouteRequest,
  ) {
    let result
    if (!actionMatch.route.action) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id,
      })
      if (isRouteRequest) {
        throw error
      }
      result = {
        type: ResultType.error,
        error,
      }
    } else {
      result = await callLoaderOrAction(
        "action",
        request,
        actionMatch,
        matches,
        basename,
        true,
        isRouteRequest,
        requestContext,
      )
      if (request.signal.aborted) {
        let method = isRouteRequest ? "queryRoute" : "query"
        throw new Error(method + "() call aborted")
      }
    }
    if (isRedirectResult(result)) {
      throw new Response(null, {
        status: result.status,
        headers: {
          Location: result.location,
        },
      })
    }
    if (isDeferredResult(result)) {
      throw new Error("defer() is not supported in actions")
    }
    if (isRouteRequest) {
      if (isErrorResult(result)) {
        throw result.error
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data,
        },
        errors: null,
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
      }
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id)
      let context2 = await loadRouteData(
        request,
        matches,
        requestContext,
        void 0,
        {
          [boundaryMatch.route.id]: result.error,
        },
      )
      return _extends({}, context2, {
        statusCode: isRouteErrorResponse(result.error)
          ? result.error.status
          : 500,
        actionData: null,
        actionHeaders: _extends(
          {},
          result.headers
            ? {
                [actionMatch.route.id]: result.headers,
              }
            : {},
        ),
      })
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal,
    })
    let context = await loadRouteData(loaderRequest, matches, requestContext)
    return _extends(
      {},
      context,
      result.statusCode
        ? {
            statusCode: result.statusCode,
          }
        : {},
      {
        actionData: {
          [actionMatch.route.id]: result.data,
        },
        actionHeaders: _extends(
          {},
          result.headers
            ? {
                [actionMatch.route.id]: result.headers,
              }
            : {},
        ),
      },
    )
  }
  async function loadRouteData(
    request,
    matches,
    requestContext,
    routeMatch,
    pendingActionError,
  ) {
    let isRouteRequest = routeMatch != null
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id,
      })
    }
    let requestMatches = routeMatch
      ? [routeMatch]
      : getLoaderMatchesUntilBoundary(
          matches,
          Object.keys(pendingActionError || {})[0],
        )
    let matchesToLoad = requestMatches.filter((m) => m.route.loader)
    if (matchesToLoad.length === 0) {
      return {
        matches,
        loaderData: {},
        errors: pendingActionError || null,
        statusCode: 200,
        loaderHeaders: {},
      }
    }
    let results = await Promise.all([
      ...matchesToLoad.map((match) =>
        callLoaderOrAction(
          "loader",
          request,
          match,
          matches,
          basename,
          true,
          isRouteRequest,
          requestContext,
        ),
      ),
    ])
    if (request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query"
      throw new Error(method + "() call aborted")
    }
    results.forEach((result) => {
      if (isDeferredResult(result)) {
        result.deferredData.cancel()
      }
    })
    let context = processRouteLoaderData(
      matches,
      matchesToLoad,
      results,
      pendingActionError,
    )
    return _extends({}, context, {
      matches,
    })
  }
  return {
    dataRoutes,
    query,
    queryRoute,
  }
}
function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches
  if (boundaryId) {
    let index = matches.findIndex((m) => m.route.id === boundaryId)
    if (index >= 0) {
      boundaryMatches = matches.slice(0, index)
    }
  }
  return boundaryMatches
}
async function callLoaderOrAction(
  type,
  request,
  match,
  matches,
  basename,
  isStaticRequest,
  isRouteRequest,
  requestContext,
) {
  if (basename === void 0) {
    basename = "/"
  }
  if (isStaticRequest === void 0) {
    isStaticRequest = false
  }
  if (isRouteRequest === void 0) {
    isRouteRequest = false
  }
  let resultType
  let result
  let reject
  let abortPromise = new Promise((_, r) => (reject = r))
  let onReject = () => reject()
  request.signal.addEventListener("abort", onReject)
  try {
    let handler = match.route[type]
    invariant(
      handler,
      "Could not find the " +
        type +
        ' to run on the "' +
        match.route.id +
        '" route',
    )
    result = await Promise.race([
      handler({
        request,
        params: match.params,
        context: requestContext,
      }),
      abortPromise,
    ])
    invariant(
      result !== void 0,
      "You defined " +
        (type === "action" ? "an action" : "a loader") +
        " for route " +
        ('"' +
          match.route.id +
          "\" but didn't return anything from your `" +
          type +
          "` ") +
        "function. Please return a value or `null`.",
    )
  } catch (e) {
    resultType = ResultType.error
    result = e
  } finally {
    request.signal.removeEventListener("abort", onReject)
  }
  if (isResponse2(result)) {
    let status = result.status
    if (redirectStatusCodes2.has(status)) {
      let location = result.headers.get("Location")
      invariant(
        location,
        "Redirects returned/thrown from loaders/actions must have a Location header",
      )
      let isAbsolute =
        /^[a-z+]+:\/\//i.test(location) || location.startsWith("//")
      if (!isAbsolute) {
        let activeMatches = matches.slice(0, matches.indexOf(match) + 1)
        let routePathnames = getPathContributingMatches(activeMatches).map(
          (match2) => match2.pathnameBase,
        )
        let resolvedLocation = resolveTo(
          location,
          routePathnames,
          new URL(request.url).pathname,
        )
        invariant(
          createPath(resolvedLocation),
          "Unable to resolve redirect location: " + location,
        )
        if (basename) {
          let path = resolvedLocation.pathname
          resolvedLocation.pathname =
            path === "/" ? basename : joinPaths([basename, path])
        }
        location = createPath(resolvedLocation)
      }
      if (isStaticRequest) {
        result.headers.set("Location", location)
        throw result
      }
      return {
        type: ResultType.redirect,
        status,
        location,
        revalidate: result.headers.get("X-Remix-Revalidate") !== null,
      }
    }
    if (isRouteRequest) {
      throw {
        type: resultType || ResultType.data,
        response: result,
      }
    }
    let data
    let contentType = result.headers.get("Content-Type")
    if (contentType && contentType.startsWith("application/json")) {
      data = await result.json()
    } else {
      data = await result.text()
    }
    if (resultType === ResultType.error) {
      return {
        type: resultType,
        error: new ErrorResponse(status, result.statusText, data),
        headers: result.headers,
      }
    }
    return {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers,
    }
  }
  if (resultType === ResultType.error) {
    return {
      type: resultType,
      error: result,
    }
  }
  if (result instanceof DeferredData) {
    return {
      type: ResultType.deferred,
      deferredData: result,
    }
  }
  return {
    type: ResultType.data,
    data: result,
  }
}
function processRouteLoaderData(
  matches,
  matchesToLoad,
  results,
  pendingError,
  activeDeferreds,
) {
  let loaderData = {}
  let errors = null
  let statusCode
  let foundError = false
  let loaderHeaders = {}
  results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id
    invariant(
      !isRedirectResult(result),
      "Cannot handle redirect results in processLoaderData",
    )
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, id)
      let error = result.error
      if (pendingError) {
        error = Object.values(pendingError)[0]
        pendingError = void 0
      }
      errors = errors || {}
      if (errors[boundaryMatch.route.id] == null) {
        errors[boundaryMatch.route.id] = error
      }
      if (!foundError) {
        foundError = true
        statusCode = isRouteErrorResponse(result.error)
          ? result.error.status
          : 500
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers
      }
    } else if (isDeferredResult(result)) {
      activeDeferreds && activeDeferreds.set(id, result.deferredData)
      loaderData[id] = result.deferredData.data
    } else {
      loaderData[id] = result.data
      if (
        result.statusCode != null &&
        result.statusCode !== 200 &&
        !foundError
      ) {
        statusCode = result.statusCode
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers
      }
    }
  })
  if (pendingError) {
    errors = pendingError
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders,
  }
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId
    ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1)
    : [...matches]
  return (
    eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) ||
    matches[0]
  )
}
function getShortCircuitMatches(routes2) {
  let route = routes2.find((r) => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__",
  }
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route,
      },
    ],
    route,
  }
}
function getInternalRouterError(status, _temp3) {
  let { pathname, routeId, method } = _temp3 === void 0 ? {} : _temp3
  let statusText = "Unknown Server Error"
  let errorMessage = "Unknown @remix-run/router error"
  if (status === 400) {
    statusText = "Bad Request"
    if (method && pathname && routeId) {
      errorMessage =
        "You made a " +
        method +
        ' request to "' +
        pathname +
        '" but ' +
        ('did not provide a `loader` for route "' + routeId + '", ') +
        "so there is no way to handle the request."
    } else {
      errorMessage = "Cannot submit binary form data using GET"
    }
  } else if (status === 403) {
    statusText = "Forbidden"
    errorMessage =
      'Route "' + routeId + '" does not match URL "' + pathname + '"'
  } else if (status === 404) {
    statusText = "Not Found"
    errorMessage = 'No route matches URL "' + pathname + '"'
  } else if (status === 405) {
    statusText = "Method Not Allowed"
    if (method && pathname && routeId) {
      errorMessage =
        "You made a " +
        method.toUpperCase() +
        ' request to "' +
        pathname +
        '" but ' +
        ('did not provide an `action` for route "' + routeId + '", ') +
        "so there is no way to handle the request."
    } else if (method) {
      errorMessage = 'Invalid request method "' + method.toUpperCase() + '"'
    }
  }
  return new ErrorResponse(
    status || 500,
    statusText,
    new Error(errorMessage),
    true,
  )
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred
}
function isErrorResult(result) {
  return result.type === ResultType.error
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect
}
function isResponse2(value) {
  return (
    value != null &&
    typeof value.status === "number" &&
    typeof value.statusText === "string" &&
    typeof value.headers === "object" &&
    typeof value.body !== "undefined"
  )
}
function isRedirectResponse2(result) {
  if (!isResponse2(result)) {
    return false
  }
  let status = result.status
  let location = result.headers.get("Location")
  return status >= 300 && status <= 399 && location != null
}
function isQueryRouteResponse(obj) {
  return (
    obj &&
    isResponse2(obj.response) &&
    (obj.type === ResultType.data || ResultType.error)
  )
}
function isValidMethod(method) {
  return validRequestMethods.has(method)
}
function isMutationMethod(method) {
  return validMutationMethods.has(method)
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "")
}
function getTargetMatch(matches, location) {
  let search =
    typeof location === "string" ? parsePath(location).search : location.search
  if (
    matches[matches.length - 1].route.index &&
    hasNakedIndexQuery(search || "")
  ) {
    return matches[matches.length - 1]
  }
  let pathMatches = getPathContributingMatches(matches)
  return pathMatches[pathMatches.length - 1]
}
var Action,
  ResultType,
  paramRe,
  dynamicSegmentValue,
  indexRouteValue,
  emptySegmentValue,
  staticSegmentValue,
  splatPenalty,
  isSplat,
  joinPaths,
  normalizePathname,
  normalizeSearch,
  normalizeHash,
  AbortedDeferredError,
  DeferredData,
  ErrorResponse,
  validMutationMethodsArr,
  validMutationMethods,
  validRequestMethodsArr,
  validRequestMethods,
  redirectStatusCodes2,
  isBrowser
var init_router = __esm({
  "node_modules/@remix-run/router/dist/router.js"() {
    ;(function (Action2) {
      Action2["Pop"] = "POP"
      Action2["Push"] = "PUSH"
      Action2["Replace"] = "REPLACE"
    })(Action || (Action = {}))
    ;(function (ResultType2) {
      ResultType2["data"] = "data"
      ResultType2["deferred"] = "deferred"
      ResultType2["redirect"] = "redirect"
      ResultType2["error"] = "error"
    })(ResultType || (ResultType = {}))
    paramRe = /^:\w+$/
    dynamicSegmentValue = 3
    indexRouteValue = 2
    emptySegmentValue = 1
    staticSegmentValue = 10
    splatPenalty = -2
    isSplat = (s) => s === "*"
    joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/")
    normalizePathname = (pathname) =>
      pathname.replace(/\/+$/, "").replace(/^\/*/, "/")
    normalizeSearch = (search) =>
      !search || search === "?"
        ? ""
        : search.startsWith("?")
        ? search
        : "?" + search
    normalizeHash = (hash) =>
      !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash
    AbortedDeferredError = class extends Error {}
    DeferredData = class {
      constructor(data) {
        this.pendingKeys = /* @__PURE__ */ new Set()
        this.subscriber = void 0
        invariant(
          data && typeof data === "object" && !Array.isArray(data),
          "defer() only accepts plain objects",
        )
        let reject
        this.abortPromise = new Promise((_, r) => (reject = r))
        this.controller = new AbortController()
        let onAbort = () =>
          reject(new AbortedDeferredError("Deferred data aborted"))
        this.unlistenAbortSignal = () =>
          this.controller.signal.removeEventListener("abort", onAbort)
        this.controller.signal.addEventListener("abort", onAbort)
        this.data = Object.entries(data).reduce((acc, _ref) => {
          let [key, value] = _ref
          return Object.assign(acc, {
            [key]: this.trackPromise(key, value),
          })
        }, {})
      }
      trackPromise(key, value) {
        if (!(value instanceof Promise)) {
          return value
        }
        this.pendingKeys.add(key)
        let promise = Promise.race([value, this.abortPromise]).then(
          (data) => this.onSettle(promise, key, null, data),
          (error) => this.onSettle(promise, key, error),
        )
        promise.catch(() => {})
        Object.defineProperty(promise, "_tracked", {
          get: () => true,
        })
        return promise
      }
      onSettle(promise, key, error, data) {
        if (
          this.controller.signal.aborted &&
          error instanceof AbortedDeferredError
        ) {
          this.unlistenAbortSignal()
          Object.defineProperty(promise, "_error", {
            get: () => error,
          })
          return Promise.reject(error)
        }
        this.pendingKeys.delete(key)
        if (this.done) {
          this.unlistenAbortSignal()
        }
        const subscriber = this.subscriber
        if (error) {
          Object.defineProperty(promise, "_error", {
            get: () => error,
          })
          subscriber && subscriber(false)
          return Promise.reject(error)
        }
        Object.defineProperty(promise, "_data", {
          get: () => data,
        })
        subscriber && subscriber(false)
        return data
      }
      subscribe(fn) {
        this.subscriber = fn
      }
      cancel() {
        this.controller.abort()
        this.pendingKeys.forEach((v, k) => this.pendingKeys.delete(k))
        let subscriber = this.subscriber
        subscriber && subscriber(true)
      }
      async resolveData(signal) {
        let aborted = false
        if (!this.done) {
          let onAbort = () => this.cancel()
          signal.addEventListener("abort", onAbort)
          aborted = await new Promise((resolve) => {
            this.subscribe((aborted2) => {
              signal.removeEventListener("abort", onAbort)
              if (aborted2 || this.done) {
                resolve(aborted2)
              }
            })
          })
        }
        return aborted
      }
      get done() {
        return this.pendingKeys.size === 0
      }
      get unwrappedData() {
        invariant(
          this.data !== null && this.done,
          "Can only unwrap data on initialized and settled deferreds",
        )
        return Object.entries(this.data).reduce((acc, _ref2) => {
          let [key, value] = _ref2
          return Object.assign(acc, {
            [key]: unwrapTrackedPromise(value),
          })
        }, {})
      }
    }
    ErrorResponse = class {
      constructor(status, statusText, data, internal) {
        if (internal === void 0) {
          internal = false
        }
        this.status = status
        this.statusText = statusText || ""
        this.internal = internal
        if (data instanceof Error) {
          this.data = data.toString()
          this.error = data
        } else {
          this.data = data
        }
      }
    }
    validMutationMethodsArr = ["post", "put", "patch", "delete"]
    validMutationMethods = new Set(validMutationMethodsArr)
    validRequestMethodsArr = ["get", ...validMutationMethodsArr]
    validRequestMethods = new Set(validRequestMethodsArr)
    redirectStatusCodes2 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308])
    isBrowser =
      typeof window !== "undefined" &&
      typeof window.document !== "undefined" &&
      typeof window.document.createElement !== "undefined"
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/entry.js
function createEntryMatches(matches, routes2) {
  return matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: routes2[match.route.id],
  }))
}
function createEntryRouteModules(manifest) {
  return Object.keys(manifest).reduce((memo, routeId) => {
    memo[routeId] = manifest[routeId].module
    return memo
  }, {})
}
var init_entry = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/entry.js"() {},
})

// node_modules/@remix-run/server-runtime/dist/esm/errors.js
async function serializeError(error) {
  return {
    message: error.message,
    stack: error.stack,
  }
}
var init_errors = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/errors.js"() {},
})

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict"
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false,
    }
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim()
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString)
      var nameValuePairStr = parts.shift()
      var parsed = parseNameValuePair(nameValuePairStr)
      var name = parsed.name
      var value = parsed.value
      options = options
        ? Object.assign({}, defaultParseOptions, options)
        : defaultParseOptions
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" +
            value +
            "'. Set options.decodeValues to false to disable this feature.",
          e,
        )
      }
      var cookie = {
        name,
        value,
      }
      parts.forEach(function (part) {
        var sides = part.split("=")
        var key = sides.shift().trimLeft().toLowerCase()
        var value2 = sides.join("=")
        if (key === "expires") {
          cookie.expires = new Date(value2)
        } else if (key === "max-age") {
          cookie.maxAge = parseInt(value2, 10)
        } else if (key === "secure") {
          cookie.secure = true
        } else if (key === "httponly") {
          cookie.httpOnly = true
        } else if (key === "samesite") {
          cookie.sameSite = value2
        } else {
          cookie[key] = value2
        }
      })
      return cookie
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = ""
      var value = ""
      var nameValueArr = nameValuePairStr.split("=")
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift()
        value = nameValueArr.join("=")
      } else {
        value = nameValuePairStr
      }
      return { name, value }
    }
    function parse2(input, options) {
      options = options
        ? Object.assign({}, defaultParseOptions, options)
        : defaultParseOptions
      if (!input) {
        if (!options.map) {
          return []
        } else {
          return {}
        }
      }
      if (input.headers && input.headers["set-cookie"]) {
        input = input.headers["set-cookie"]
      } else if (input.headers) {
        var sch =
          input.headers[
            Object.keys(input.headers).find(function (key) {
              return key.toLowerCase() === "set-cookie"
            })
          ]
        if (!sch && input.headers.cookie && !options.silent) {
          console.warn(
            "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.",
          )
        }
        input = sch
      }
      if (!Array.isArray(input)) {
        input = [input]
      }
      options = options
        ? Object.assign({}, defaultParseOptions, options)
        : defaultParseOptions
      if (!options.map) {
        return input.filter(isNonEmptyString).map(function (str) {
          return parseString(str, options)
        })
      } else {
        var cookies = {}
        return input.filter(isNonEmptyString).reduce(function (cookies2, str) {
          var cookie = parseString(str, options)
          cookies2[cookie.name] = cookie
          return cookies2
        }, cookies)
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString
      }
      if (typeof cookiesString !== "string") {
        return []
      }
      var cookiesStrings = []
      var pos = 0
      var start
      var ch
      var lastComma
      var nextStart
      var cookiesSeparatorFound
      function skipWhitespace() {
        while (
          pos < cookiesString.length &&
          /\s/.test(cookiesString.charAt(pos))
        ) {
          pos += 1
        }
        return pos < cookiesString.length
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos)
        return ch !== "=" && ch !== ";" && ch !== ","
      }
      while (pos < cookiesString.length) {
        start = pos
        cookiesSeparatorFound = false
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos)
          if (ch === ",") {
            lastComma = pos
            pos += 1
            skipWhitespace()
            nextStart = pos
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1
            }
            if (
              pos < cookiesString.length &&
              cookiesString.charAt(pos) === "="
            ) {
              cookiesSeparatorFound = true
              pos = nextStart
              cookiesStrings.push(cookiesString.substring(start, lastComma))
              start = pos
            } else {
              pos = lastComma + 1
            }
          } else {
            pos += 1
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(
            cookiesString.substring(start, cookiesString.length),
          )
        }
      }
      return cookiesStrings
    }
    module.exports = parse2
    module.exports.parse = parse2
    module.exports.parseString = parseString
    module.exports.splitCookiesString = splitCookiesString2
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/headers.js
function getDocumentHeadersRR(build, context, matches) {
  return matches.reduce((parentHeaders, match, index) => {
    var _context$loaderHeader, _context$actionHeader
    let { id } = match.route
    let routeModule = build.routes[id].module
    let loaderHeaders =
      ((_context$loaderHeader = context.loaderHeaders) === null ||
      _context$loaderHeader === void 0
        ? void 0
        : _context$loaderHeader[id]) || new Headers()
    let actionHeaders =
      ((_context$actionHeader = context.actionHeaders) === null ||
      _context$actionHeader === void 0
        ? void 0
        : _context$actionHeader[id]) || new Headers()
    let headers = new Headers(
      routeModule.headers
        ? typeof routeModule.headers === "function"
          ? routeModule.headers({
              loaderHeaders,
              parentHeaders,
              actionHeaders,
            })
          : routeModule.headers
        : void 0,
    )
    prependCookies(actionHeaders, headers)
    prependCookies(loaderHeaders, headers)
    prependCookies(parentHeaders, headers)
    return headers
  }, new Headers())
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie")
  if (parentSetCookieString) {
    let cookies = (0, import_set_cookie_parser.splitCookiesString)(
      parentSetCookieString,
    )
    cookies.forEach((cookie) => {
      childHeaders.append("Set-Cookie", cookie)
    })
  }
}
var import_set_cookie_parser
var init_headers = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/headers.js"() {
    import_set_cookie_parser = __toESM(require_set_cookie())
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/invariant.js
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    console.error(
      "The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new",
    )
    throw new Error(message)
  }
}
var init_invariant = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/invariant.js"() {},
})

// node_modules/@remix-run/server-runtime/dist/esm/mode.js
function isServerMode(value) {
  return (
    value === ServerMode.Development ||
    value === ServerMode.Production ||
    value === ServerMode.Test
  )
}
var ServerMode
var init_mode = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/mode.js"() {
    ;(function (ServerMode2) {
      ServerMode2["Development"] = "development"
      ServerMode2["Production"] = "production"
      ServerMode2["Test"] = "test"
    })(ServerMode || (ServerMode = {}))
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js
function matchServerRoutes(routes2, pathname) {
  let matches = matchRoutes(routes2, pathname)
  if (!matches) return null
  return matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route,
  }))
}
var init_routeMatching = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js"() {
    init_router()
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/data.js
async function callRouteActionRR({
  loadContext,
  action,
  params,
  request,
  routeId,
}) {
  let result = await action({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params,
  })
  if (result === void 0) {
    throw new Error(
      `You defined an action for route "${routeId}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`,
    )
  }
  return isResponse(result) ? result : json(result)
}
async function callRouteLoaderRR({
  loadContext,
  loader,
  params,
  request,
  routeId,
}) {
  let result = await loader({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params,
  })
  if (result === void 0) {
    throw new Error(
      `You defined a loader for route "${routeId}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`,
    )
  }
  return isResponse(result) ? result : json(result)
}
function stripIndexParam(request) {
  let url = new URL(request.url)
  let indexValues = url.searchParams.getAll("index")
  url.searchParams.delete("index")
  let indexValuesToKeep = []
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue)
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep)
  }
  return new Request(url.href, request)
}
function stripDataParam(request) {
  let url = new URL(request.url)
  url.searchParams.delete("_data")
  return new Request(url.href, request)
}
var init_data = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/data.js"() {
    init_responses()
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/routes.js
function createRoutes(manifest, parentId) {
  return Object.entries(manifest)
    .filter(([, route]) => route.parentId === parentId)
    .map(([id, route]) => ({
      ...route,
      children: createRoutes(manifest, id),
    }))
}
function createStaticHandlerDataRoutes(manifest, parentId) {
  return Object.values(manifest)
    .filter((route) => route.parentId === parentId)
    .map((route) => {
      let commonRoute = {
        hasErrorBoundary:
          route.id === "root" ||
          route.module.CatchBoundary != null ||
          route.module.ErrorBoundary != null,
        id: route.id,
        path: route.path,
        loader: route.module.loader
          ? (args) =>
              callRouteLoaderRR({
                request: args.request,
                params: args.params,
                loadContext: args.context,
                loader: route.module.loader,
                routeId: route.id,
              })
          : void 0,
        action: route.module.action
          ? (args) =>
              callRouteActionRR({
                request: args.request,
                params: args.params,
                loadContext: args.context,
                action: route.module.action,
                routeId: route.id,
              })
          : void 0,
        handle: route.module.handle,
        shouldRevalidate: () => true,
      }
      return route.index
        ? {
            index: true,
            ...commonRoute,
          }
        : {
            caseSensitive: route.caseSensitive,
            children: createStaticHandlerDataRoutes(manifest, route.id),
            ...commonRoute,
          }
    })
}
var init_routes = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/routes.js"() {
    init_data()
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/markup.js
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match])
}
var ESCAPE_LOOKUP, ESCAPE_REGEX
var init_markup = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/markup.js"() {
    ESCAPE_LOOKUP = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029",
    }
    ESCAPE_REGEX = /[&><\u2028\u2029]/g
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js
function createServerHandoffString(serverHandoff) {
  return escapeHtml(JSON.stringify(serverHandoff))
}
var init_serverHandoff = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js"() {
    init_markup()
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/server.js
async function handleDataRequestRR(
  serverMode,
  staticHandler,
  routeId,
  request,
  loadContext,
) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext,
    })
    if (isRedirectResponse(response)) {
      let headers = new Headers(response.headers)
      headers.set("X-Remix-Redirect", headers.get("Location"))
      headers.delete("Location")
      if (response.headers.get("Set-Cookie") !== null) {
        headers.set("X-Remix-Revalidate", "yes")
      }
      return new Response(null, {
        status: 204,
        headers,
      })
    }
    return response
  } catch (error) {
    if (isResponse(error)) {
      error.headers.set("X-Remix-Catch", "yes")
      return error
    }
    let status = 500
    let errorInstance = error
    if (isRouteErrorResponse(error)) {
      status = error.status
      errorInstance = error.error || errorInstance
    }
    if (serverMode !== ServerMode.Test && !request.signal.aborted) {
      console.error(errorInstance)
    }
    if (
      serverMode === ServerMode.Development &&
      errorInstance instanceof Error
    ) {
      return errorBoundaryError(errorInstance, status)
    }
    return errorBoundaryError(new Error("Unexpected Server Error"), status)
  }
}
function findParentBoundary(routes2, routeId, error) {
  let route = routes2[routeId] || routes2["root"]
  let isCatch =
    isRouteErrorResponse(error) && (!error.error || error.status === 404)
  if (
    (isCatch && route.module.CatchBoundary) ||
    (!isCatch && route.module.ErrorBoundary) ||
    !route.parentId
  ) {
    return route.id
  }
  return findParentBoundary(routes2, route.parentId, error)
}
function differentiateCatchVersusErrorBoundaries(build, context) {
  if (!context.errors) {
    return
  }
  let errors = {}
  for (let routeId of Object.keys(context.errors)) {
    let error = context.errors[routeId]
    let handlingRouteId = findParentBoundary(build.routes, routeId, error)
    errors[handlingRouteId] = error
  }
  context.errors = errors
}
async function handleDocumentRequestRR(
  serverMode,
  build,
  staticHandler,
  request,
  loadContext,
) {
  let context
  try {
    context = await staticHandler.query(request, {
      requestContext: loadContext,
    })
  } catch (error) {
    if (!request.signal.aborted && serverMode !== ServerMode.Test) {
      console.error(error)
    }
    return new Response(null, {
      status: 500,
    })
  }
  if (isResponse(context)) {
    return context
  }
  differentiateCatchVersusErrorBoundaries(build, context)
  let appState = {
    trackBoundaries: true,
    trackCatchBoundaries: true,
    catchBoundaryRouteId: null,
    renderBoundaryRouteId: null,
    loaderBoundaryRouteId: null,
  }
  for (let match of context.matches) {
    var _context$errors, _build$routes$id, _build$routes$id2
    let route = match.route
    let id = route.id
    let error =
      (_context$errors = context.errors) === null || _context$errors === void 0
        ? void 0
        : _context$errors[id]
    let hasCatchBoundary =
      ((_build$routes$id = build.routes[id]) === null ||
      _build$routes$id === void 0
        ? void 0
        : _build$routes$id.module.CatchBoundary) != null
    let hasErrorBoundary =
      ((_build$routes$id2 = build.routes[id]) === null ||
      _build$routes$id2 === void 0
        ? void 0
        : _build$routes$id2.module.ErrorBoundary) != null
    if (!error) {
      continue
    } else if (isRouteErrorResponse(error)) {
      if (error.internal && error.error && error.status !== 404) {
        if (hasErrorBoundary) {
          appState.loaderBoundaryRouteId = id
        }
        appState.trackBoundaries = false
        appState.error = await serializeError(error.error)
        if (
          error.status === 405 &&
          error.error.message.includes("Invalid request method")
        ) {
          context.matches = []
        }
        break
      }
      if (hasCatchBoundary) {
        appState.catchBoundaryRouteId = id
      }
      appState.trackCatchBoundaries = false
      appState.catch = {
        data:
          error.error && error.status === 404
            ? error.error.message
            : error.data,
        status: error.status,
        statusText: error.statusText,
      }
      break
    } else {
      if (hasErrorBoundary) {
        appState.loaderBoundaryRouteId = id
      }
      appState.trackBoundaries = false
      appState.error = await serializeError(error)
      break
    }
  }
  let renderableMatches = getRenderableMatches(context.matches, appState)
  if (!renderableMatches) {
    var _root$module
    renderableMatches = []
    let root = staticHandler.dataRoutes[0]
    if (
      root !== null &&
      root !== void 0 &&
      (_root$module = root.module) !== null &&
      _root$module !== void 0 &&
      _root$module.CatchBoundary
    ) {
      appState.catchBoundaryRouteId = "root"
      renderableMatches.push({
        params: {},
        pathname: "",
        route: staticHandler.dataRoutes[0],
      })
    }
  }
  let headers = getDocumentHeadersRR(build, context, renderableMatches)
  let serverHandoff = {
    actionData: context.actionData || void 0,
    appState,
    matches: createEntryMatches(renderableMatches, build.assets.routes),
    routeData: context.loaderData || {},
    future: build.future,
  }
  let entryContext = {
    ...serverHandoff,
    manifest: build.assets,
    routeModules: createEntryRouteModules(build.routes),
    serverHandoffString: createServerHandoffString(serverHandoff),
  }
  let handleDocumentRequestParameters = [
    request,
    context.statusCode,
    headers,
    entryContext,
  ]
  let handleDocumentRequestFunction = build.entry.module.default
  try {
    return await handleDocumentRequestFunction(
      ...handleDocumentRequestParameters,
    )
  } catch (error) {
    handleDocumentRequestParameters[1] = 500
    appState.trackBoundaries = false
    appState.error = await serializeError(error)
    entryContext.serverHandoffString = createServerHandoffString(serverHandoff)
    try {
      return await handleDocumentRequestFunction(
        ...handleDocumentRequestParameters,
      )
    } catch (error2) {
      return returnLastResortErrorResponse(error2, serverMode)
    }
  }
}
async function handleResourceRequestRR(
  serverMode,
  staticHandler,
  routeId,
  request,
  loadContext,
) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext,
    })
    invariant2(
      isResponse(response),
      "Expected a Response to be returned from queryRoute",
    )
    return response
  } catch (error) {
    if (isResponse(error)) {
      error.headers.set("X-Remix-Catch", "yes")
      return error
    }
    return returnLastResortErrorResponse(error, serverMode)
  }
}
async function errorBoundaryError(error, status) {
  return json(await serializeError(error), {
    status,
    headers: {
      "X-Remix-Error": "yes",
    },
  })
}
function getRenderableMatches(matches, appState) {
  if (!matches) {
    return null
  }
  if (!appState.catch && !appState.error) {
    return matches
  }
  let lastRenderableIndex = -1
  matches.forEach((match, index) => {
    let id = match.route.id
    if (
      appState.renderBoundaryRouteId === id ||
      appState.loaderBoundaryRouteId === id ||
      appState.catchBoundaryRouteId === id
    ) {
      lastRenderableIndex = index
    }
  })
  return matches.slice(0, lastRenderableIndex + 1)
}
function returnLastResortErrorResponse(error, serverMode) {
  if (serverMode !== ServerMode.Test) {
    console.error(error)
  }
  let message = "Unexpected Server Error"
  if (serverMode !== ServerMode.Production) {
    message += `

${String(error)}`
  }
  return new Response(message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
var createRequestHandler
var init_server = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/server.js"() {
    init_router()
    init_entry()
    init_errors()
    init_headers()
    init_invariant()
    init_mode()
    init_routeMatching()
    init_routes()
    init_responses()
    init_serverHandoff()
    createRequestHandler = (build, mode) => {
      let routes2 = createRoutes(build.routes)
      let dataRoutes = createStaticHandlerDataRoutes(build.routes)
      let serverMode = isServerMode(mode) ? mode : ServerMode.Production
      let staticHandler = unstable_createStaticHandler(dataRoutes)
      return async function requestHandler(request, loadContext = {}) {
        let url = new URL(request.url)
        let matches = matchServerRoutes(routes2, url.pathname)
        let response
        if (url.searchParams.has("_data")) {
          let routeId = url.searchParams.get("_data")
          response = await handleDataRequestRR(
            serverMode,
            staticHandler,
            routeId,
            request,
            loadContext,
          )
          if (build.entry.module.handleDataRequest) {
            let match = matches.find((match2) => match2.route.id == routeId)
            response = await build.entry.module.handleDataRequest(response, {
              context: loadContext,
              params: match.params,
              request,
            })
          }
        } else if (
          matches &&
          matches[matches.length - 1].route.module.default == null
        ) {
          response = await handleResourceRequestRR(
            serverMode,
            staticHandler,
            matches.slice(-1)[0].route.id,
            request,
            loadContext,
          )
        } else {
          response = await handleDocumentRequestRR(
            serverMode,
            build,
            staticHandler,
            request,
            loadContext,
          )
        }
        if (request.method === "HEAD") {
          return new Response(null, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
          })
        }
        return response
      }
    }
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/sessions.js
function flash(name) {
  return `__flash_${name}__`
}
function warnOnceAboutSigningSessionCookie(cookie) {
  warnOnce(
    cookie.isSigned,
    `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/api/remix#signing-cookies for more information.`,
  )
}
var createSession, isSession, createSessionStorageFactory
var init_sessions = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions.js"() {
    init_cookies()
    init_warnings()
    createSession = (initialData = {}, id = "") => {
      let map = new Map(Object.entries(initialData))
      return {
        get id() {
          return id
        },
        get data() {
          return Object.fromEntries(map)
        },
        has(name) {
          return map.has(name) || map.has(flash(name))
        },
        get(name) {
          if (map.has(name)) return map.get(name)
          let flashName = flash(name)
          if (map.has(flashName)) {
            let value = map.get(flashName)
            map.delete(flashName)
            return value
          }
          return void 0
        },
        set(name, value) {
          map.set(name, value)
        },
        flash(name, value) {
          map.set(flash(name), value)
        },
        unset(name) {
          map.delete(name)
        },
      }
    }
    isSession = (object) => {
      return (
        object != null &&
        typeof object.id === "string" &&
        typeof object.data !== "undefined" &&
        typeof object.has === "function" &&
        typeof object.get === "function" &&
        typeof object.set === "function" &&
        typeof object.flash === "function" &&
        typeof object.unset === "function"
      )
    }
    createSessionStorageFactory =
      (createCookie) =>
      ({ cookie: cookieArg, createData, readData, updateData, deleteData }) => {
        let cookie = isCookie(cookieArg)
          ? cookieArg
          : createCookie(
              (cookieArg === null || cookieArg === void 0
                ? void 0
                : cookieArg.name) || "__session",
              cookieArg,
            )
        warnOnceAboutSigningSessionCookie(cookie)
        return {
          async getSession(cookieHeader, options) {
            let id = cookieHeader && (await cookie.parse(cookieHeader, options))
            let data = id && (await readData(id))
            return createSession(data || {}, id || "")
          },
          async commitSession(session, options) {
            let { id, data } = session
            if (id) {
              await updateData(id, data, cookie.expires)
            } else {
              id = await createData(data, cookie.expires)
            }
            return cookie.serialize(id, options)
          },
          async destroySession(session, options) {
            await deleteData(session.id)
            return cookie.serialize("", {
              ...options,
              expires: new Date(0),
            })
          },
        }
      }
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js
var createCookieSessionStorageFactory
var init_cookieStorage = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js"() {
    init_cookies()
    init_sessions()
    createCookieSessionStorageFactory =
      (createCookie) =>
      ({ cookie: cookieArg } = {}) => {
        let cookie = isCookie(cookieArg)
          ? cookieArg
          : createCookie(
              (cookieArg === null || cookieArg === void 0
                ? void 0
                : cookieArg.name) || "__session",
              cookieArg,
            )
        warnOnceAboutSigningSessionCookie(cookie)
        return {
          async getSession(cookieHeader, options) {
            return createSession(
              (cookieHeader && (await cookie.parse(cookieHeader, options))) ||
                {},
            )
          },
          async commitSession(session, options) {
            let serializedCookie = await cookie.serialize(session.data, options)
            if (serializedCookie.length > 4096) {
              throw new Error(
                "Cookie length will exceed browser maximum. Length: " +
                  serializedCookie.length,
              )
            }
            return serializedCookie
          },
          async destroySession(_session, options) {
            return cookie.serialize("", {
              ...options,
              expires: new Date(0),
            })
          },
        }
      }
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js
var createMemorySessionStorageFactory
var init_memoryStorage = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js"() {
    createMemorySessionStorageFactory =
      (createSessionStorage) =>
      ({ cookie } = {}) => {
        let uniqueId = 0
        let map = /* @__PURE__ */ new Map()
        return createSessionStorage({
          cookie,
          async createData(data, expires) {
            let id = (++uniqueId).toString()
            map.set(id, {
              data,
              expires,
            })
            return id
          },
          async readData(id) {
            if (map.has(id)) {
              let { data, expires } = map.get(id)
              if (!expires || expires > new Date()) {
                return data
              }
              if (expires) map.delete(id)
            }
            return null
          },
          async updateData(id, data, expires) {
            map.set(id, {
              data,
              expires,
            })
          },
          async deleteData(id) {
            map.delete(id)
          },
        })
      }
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/upload/errors.js
var MaxPartSizeExceededError
var init_errors2 = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/upload/errors.js"() {
    MaxPartSizeExceededError = class extends Error {
      constructor(field, maxBytes) {
        super(`Field "${field}" exceeded upload size of ${maxBytes} bytes.`)
        this.field = field
        this.maxBytes = maxBytes
      }
    }
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js
function createMemoryUploadHandler({ filter, maxPartSize = 3e6 } = {}) {
  return async ({ filename, contentType, name, data }) => {
    if (
      filter &&
      !(await filter({
        filename,
        contentType,
        name,
      }))
    ) {
      return void 0
    }
    let size = 0
    let chunks = []
    for await (let chunk of data) {
      size += chunk.byteLength
      if (size > maxPartSize) {
        throw new MaxPartSizeExceededError(name, maxPartSize)
      }
      chunks.push(chunk)
    }
    if (typeof filename === "string") {
      return new File(chunks, filename, {
        type: contentType,
      })
    }
    return await new Blob(chunks, {
      type: contentType,
    }).text()
  }
}
var init_memoryUploadHandler = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js"() {
    init_errors2()
  },
})

// node_modules/@remix-run/server-runtime/dist/esm/index.js
var esm_exports = {}
__export(esm_exports, {
  MaxPartSizeExceededError: () => MaxPartSizeExceededError,
  createCookieFactory: () => createCookieFactory,
  createCookieSessionStorageFactory: () => createCookieSessionStorageFactory,
  createMemorySessionStorageFactory: () => createMemorySessionStorageFactory,
  createRequestHandler: () => createRequestHandler,
  createSession: () => createSession,
  createSessionStorageFactory: () => createSessionStorageFactory,
  isCookie: () => isCookie,
  isSession: () => isSession,
  json: () => json,
  redirect: () => redirect,
  unstable_composeUploadHandlers: () => composeUploadHandlers,
  unstable_createMemoryUploadHandler: () => createMemoryUploadHandler,
  unstable_parseMultipartFormData: () => parseMultipartFormData,
})
var init_esm = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/index.js"() {
    init_cookies()
    init_formData()
    init_responses()
    init_server()
    init_sessions()
    init_cookieStorage()
    init_memoryStorage()
    init_memoryUploadHandler()
    init_errors2()
  },
})

// node_modules/@remix-run/cloudflare/dist/crypto.js
var require_crypto = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/crypto.js"(exports) {
    "use strict"
    Object.defineProperty(exports, "__esModule", { value: true })
    var encoder = new TextEncoder()
    var sign = async (value, secret) => {
      let key = await createKey2(secret, ["sign"])
      let data = encoder.encode(value)
      let signature = await crypto.subtle.sign("HMAC", key, data)
      let hash = btoa(
        String.fromCharCode(...new Uint8Array(signature)),
      ).replace(/=+$/, "")
      return value + "." + hash
    }
    var unsign = async (signed, secret) => {
      let index = signed.lastIndexOf(".")
      let value = signed.slice(0, index)
      let hash = signed.slice(index + 1)
      let key = await createKey2(secret, ["verify"])
      let data = encoder.encode(value)
      let signature = byteStringToUint8Array(atob(hash))
      let valid = await crypto.subtle.verify("HMAC", key, signature, data)
      return valid ? value : false
    }
    async function createKey2(secret, usages) {
      let key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        {
          name: "HMAC",
          hash: "SHA-256",
        },
        false,
        usages,
      )
      return key
    }
    function byteStringToUint8Array(byteString) {
      let array = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        array[i] = byteString.charCodeAt(i)
      }
      return array
    }
    exports.sign = sign
    exports.unsign = unsign
  },
})

// node_modules/@remix-run/cloudflare/dist/implementations.js
var require_implementations = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/implementations.js"(exports) {
    "use strict"
    Object.defineProperty(exports, "__esModule", { value: true })
    var serverRuntime = (init_esm(), __toCommonJS(esm_exports))
    var crypto2 = require_crypto()
    var createCookie = serverRuntime.createCookieFactory({
      sign: crypto2.sign,
      unsign: crypto2.unsign,
    })
    var createCookieSessionStorage =
      serverRuntime.createCookieSessionStorageFactory(createCookie)
    var createSessionStorage =
      serverRuntime.createSessionStorageFactory(createCookie)
    var createMemorySessionStorage =
      serverRuntime.createMemorySessionStorageFactory(createSessionStorage)
    exports.createCookie = createCookie
    exports.createCookieSessionStorage = createCookieSessionStorage
    exports.createMemorySessionStorage = createMemorySessionStorage
    exports.createSessionStorage = createSessionStorage
  },
})

// node_modules/@remix-run/cloudflare/dist/sessions/cloudflareKVSessionStorage.js
var require_cloudflareKVSessionStorage = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/sessions/cloudflareKVSessionStorage.js"(
    exports,
  ) {
    "use strict"
    Object.defineProperty(exports, "__esModule", { value: true })
    var implementations = require_implementations()
    function createCloudflareKVSessionStorage({ cookie, kv }) {
      return implementations.createSessionStorage({
        cookie,
        async createData(data, expires) {
          while (true) {
            let randomBytes = new Uint8Array(8)
            crypto.getRandomValues(randomBytes)
            let id = [...randomBytes]
              .map((x) => x.toString(16).padStart(2, "0"))
              .join("")
            if (await kv.get(id, "json")) {
              continue
            }
            await kv.put(id, JSON.stringify(data), {
              expiration: expires
                ? Math.round(expires.getTime() / 1e3)
                : void 0,
            })
            return id
          }
        },
        async readData(id) {
          let session = await kv.get(id)
          if (!session) {
            return null
          }
          return JSON.parse(session)
        },
        async updateData(id, data, expires) {
          await kv.put(id, JSON.stringify(data), {
            expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0,
          })
        },
        async deleteData(id) {
          await kv.delete(id)
        },
      })
    }
    exports.createCloudflareKVSessionStorage = createCloudflareKVSessionStorage
  },
})

// node_modules/@remix-run/cloudflare/dist/index.js
var require_dist = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/index.js"(exports) {
    "use strict"
    Object.defineProperty(exports, "__esModule", { value: true })
    var cloudflareKVSessionStorage = require_cloudflareKVSessionStorage()
    var implementations = require_implementations()
    var serverRuntime = (init_esm(), __toCommonJS(esm_exports))
    exports.createCloudflareKVSessionStorage =
      cloudflareKVSessionStorage.createCloudflareKVSessionStorage
    exports.createCookie = implementations.createCookie
    exports.createCookieSessionStorage =
      implementations.createCookieSessionStorage
    exports.createMemorySessionStorage =
      implementations.createMemorySessionStorage
    exports.createSessionStorage = implementations.createSessionStorage
    Object.defineProperty(exports, "MaxPartSizeExceededError", {
      enumerable: true,
      get: function () {
        return serverRuntime.MaxPartSizeExceededError
      },
    })
    Object.defineProperty(exports, "createRequestHandler", {
      enumerable: true,
      get: function () {
        return serverRuntime.createRequestHandler
      },
    })
    Object.defineProperty(exports, "createSession", {
      enumerable: true,
      get: function () {
        return serverRuntime.createSession
      },
    })
    Object.defineProperty(exports, "isCookie", {
      enumerable: true,
      get: function () {
        return serverRuntime.isCookie
      },
    })
    Object.defineProperty(exports, "isSession", {
      enumerable: true,
      get: function () {
        return serverRuntime.isSession
      },
    })
    Object.defineProperty(exports, "json", {
      enumerable: true,
      get: function () {
        return serverRuntime.json
      },
    })
    Object.defineProperty(exports, "redirect", {
      enumerable: true,
      get: function () {
        return serverRuntime.redirect
      },
    })
    Object.defineProperty(exports, "unstable_composeUploadHandlers", {
      enumerable: true,
      get: function () {
        return serverRuntime.unstable_composeUploadHandlers
      },
    })
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: true,
      get: function () {
        return serverRuntime.unstable_createMemoryUploadHandler
      },
    })
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: true,
      get: function () {
        return serverRuntime.unstable_parseMultipartFormData
      },
    })
  },
})

// node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict"
    var l = Symbol.for("react.element")
    var n = Symbol.for("react.portal")
    var p = Symbol.for("react.fragment")
    var q = Symbol.for("react.strict_mode")
    var r = Symbol.for("react.profiler")
    var t = Symbol.for("react.provider")
    var u = Symbol.for("react.context")
    var v = Symbol.for("react.forward_ref")
    var w = Symbol.for("react.suspense")
    var x = Symbol.for("react.memo")
    var y = Symbol.for("react.lazy")
    var z = Symbol.iterator
    function A(a) {
      if (null === a || "object" !== typeof a) return null
      a = (z && a[z]) || a["@@iterator"]
      return "function" === typeof a ? a : null
    }
    var B = {
      isMounted: function () {
        return false
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    }
    var C = Object.assign
    var D = {}
    function E(a, b, e) {
      this.props = a
      this.context = b
      this.refs = D
      this.updater = e || B
    }
    E.prototype.isReactComponent = {}
    E.prototype.setState = function (a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        )
      this.updater.enqueueSetState(this, a, b, "setState")
    }
    E.prototype.forceUpdate = function (a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate")
    }
    function F() {}
    F.prototype = E.prototype
    function G(a, b, e) {
      this.props = a
      this.context = b
      this.refs = D
      this.updater = e || B
    }
    var H = (G.prototype = new F())
    H.constructor = G
    C(H, E.prototype)
    H.isPureReactComponent = true
    var I = Array.isArray
    var J = Object.prototype.hasOwnProperty
    var K = { current: null }
    var L = { key: true, ref: true, __self: true, __source: true }
    function M(a, b, e) {
      var d,
        c = {},
        k = null,
        h = null
      if (null != b)
        for (d in (void 0 !== b.ref && (h = b.ref),
        void 0 !== b.key && (k = "" + b.key),
        b))
          J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d])
      var g = arguments.length - 2
      if (1 === g) c.children = e
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2]
        c.children = f
      }
      if (a && a.defaultProps)
        for (d in ((g = a.defaultProps), g)) void 0 === c[d] && (c[d] = g[d])
      return {
        $$typeof: l,
        type: a,
        key: k,
        ref: h,
        props: c,
        _owner: K.current,
      }
    }
    function N(a, b) {
      return {
        $$typeof: l,
        type: a.type,
        key: b,
        ref: a.ref,
        props: a.props,
        _owner: a._owner,
      }
    }
    function O(a) {
      return "object" === typeof a && null !== a && a.$$typeof === l
    }
    function escape2(a) {
      var b = { "=": "=0", ":": "=2" }
      return (
        "$" +
        a.replace(/[=:]/g, function (a2) {
          return b[a2]
        })
      )
    }
    var P = /\/+/g
    function Q(a, b) {
      return "object" === typeof a && null !== a && null != a.key
        ? escape2("" + a.key)
        : b.toString(36)
    }
    function R(a, b, e, d, c) {
      var k = typeof a
      if ("undefined" === k || "boolean" === k) a = null
      var h = false
      if (null === a) h = true
      else
        switch (k) {
          case "string":
          case "number":
            h = true
            break
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true
            }
        }
      if (h)
        return (
          (h = a),
          (c = c(h)),
          (a = "" === d ? "." + Q(h, 0) : d),
          I(c)
            ? ((e = ""),
              null != a && (e = a.replace(P, "$&/") + "/"),
              R(c, b, e, "", function (a2) {
                return a2
              }))
            : null != c &&
              (O(c) &&
                (c = N(
                  c,
                  e +
                    (!c.key || (h && h.key === c.key)
                      ? ""
                      : ("" + c.key).replace(P, "$&/") + "/") +
                    a,
                )),
              b.push(c)),
          1
        )
      h = 0
      d = "" === d ? "." : d + ":"
      if (I(a))
        for (var g = 0; g < a.length; g++) {
          k = a[g]
          var f = d + Q(k, g)
          h += R(k, b, e, f, c)
        }
      else if (((f = A(a)), "function" === typeof f))
        for (a = f.call(a), g = 0; !(k = a.next()).done; )
          (k = k.value), (f = d + Q(k, g++)), (h += R(k, b, e, f, c))
      else if ("object" === k)
        throw (
          ((b = String(a)),
          Error(
            "Objects are not valid as a React child (found: " +
              ("[object Object]" === b
                ? "object with keys {" + Object.keys(a).join(", ") + "}"
                : b) +
              "). If you meant to render a collection of children, use an array instead.",
          ))
        )
      return h
    }
    function S(a, b, e) {
      if (null == a) return a
      var d = [],
        c = 0
      R(a, d, "", "", function (a2) {
        return b.call(e, a2, c++)
      })
      return d
    }
    function T(a) {
      if (-1 === a._status) {
        var b = a._result
        b = b()
        b.then(
          function (b2) {
            if (0 === a._status || -1 === a._status)
              (a._status = 1), (a._result = b2)
          },
          function (b2) {
            if (0 === a._status || -1 === a._status)
              (a._status = 2), (a._result = b2)
          },
        )
        ;-1 === a._status && ((a._status = 0), (a._result = b))
      }
      if (1 === a._status) return a._result.default
      throw a._result
    }
    var U = { current: null }
    var V = { transition: null }
    var W = {
      ReactCurrentDispatcher: U,
      ReactCurrentBatchConfig: V,
      ReactCurrentOwner: K,
    }
    exports.Children = {
      map: S,
      forEach: function (a, b, e) {
        S(
          a,
          function () {
            b.apply(this, arguments)
          },
          e,
        )
      },
      count: function (a) {
        var b = 0
        S(a, function () {
          b++
        })
        return b
      },
      toArray: function (a) {
        return (
          S(a, function (a2) {
            return a2
          }) || []
        )
      },
      only: function (a) {
        if (!O(a))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          )
        return a
      },
    }
    exports.Component = E
    exports.Fragment = p
    exports.Profiler = r
    exports.PureComponent = G
    exports.StrictMode = q
    exports.Suspense = w
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W
    exports.cloneElement = function (a, b, e) {
      if (null === a || void 0 === a)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            a +
            ".",
        )
      var d = C({}, a.props),
        c = a.key,
        k = a.ref,
        h = a._owner
      if (null != b) {
        void 0 !== b.ref && ((k = b.ref), (h = K.current))
        void 0 !== b.key && (c = "" + b.key)
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps
        for (f in b)
          J.call(b, f) &&
            !L.hasOwnProperty(f) &&
            (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f])
      }
      var f = arguments.length - 2
      if (1 === f) d.children = e
      else if (1 < f) {
        g = Array(f)
        for (var m = 0; m < f; m++) g[m] = arguments[m + 2]
        d.children = g
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h }
    }
    exports.createContext = function (a) {
      a = {
        $$typeof: u,
        _currentValue: a,
        _currentValue2: a,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null,
      }
      a.Provider = { $$typeof: t, _context: a }
      return (a.Consumer = a)
    }
    exports.createElement = M
    exports.createFactory = function (a) {
      var b = M.bind(null, a)
      b.type = a
      return b
    }
    exports.createRef = function () {
      return { current: null }
    }
    exports.forwardRef = function (a) {
      return { $$typeof: v, render: a }
    }
    exports.isValidElement = O
    exports.lazy = function (a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T }
    }
    exports.memo = function (a, b) {
      return { $$typeof: x, type: a, compare: void 0 === b ? null : b }
    }
    exports.startTransition = function (a) {
      var b = V.transition
      V.transition = {}
      try {
        a()
      } finally {
        V.transition = b
      }
    }
    exports.unstable_act = function () {
      throw Error("act(...) is not supported in production builds of React.")
    }
    exports.useCallback = function (a, b) {
      return U.current.useCallback(a, b)
    }
    exports.useContext = function (a) {
      return U.current.useContext(a)
    }
    exports.useDebugValue = function () {}
    exports.useDeferredValue = function (a) {
      return U.current.useDeferredValue(a)
    }
    exports.useEffect = function (a, b) {
      return U.current.useEffect(a, b)
    }
    exports.useId = function () {
      return U.current.useId()
    }
    exports.useImperativeHandle = function (a, b, e) {
      return U.current.useImperativeHandle(a, b, e)
    }
    exports.useInsertionEffect = function (a, b) {
      return U.current.useInsertionEffect(a, b)
    }
    exports.useLayoutEffect = function (a, b) {
      return U.current.useLayoutEffect(a, b)
    }
    exports.useMemo = function (a, b) {
      return U.current.useMemo(a, b)
    }
    exports.useReducer = function (a, b, e) {
      return U.current.useReducer(a, b, e)
    }
    exports.useRef = function (a) {
      return U.current.useRef(a)
    }
    exports.useState = function (a) {
      return U.current.useState(a)
    }
    exports.useSyncExternalStore = function (a, b, e) {
      return U.current.useSyncExternalStore(a, b, e)
    }
    exports.useTransition = function () {
      return U.current.useTransition()
    }
    exports.version = "18.2.0"
  },
})

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict"
    if (true) {
      module.exports = require_react_production_min()
    } else {
      module.exports = null
    }
  },
})

// node_modules/react-dom/cjs/react-dom-server-legacy.browser.production.min.js
var require_react_dom_server_legacy_browser_production_min = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server-legacy.browser.production.min.js"(
    exports,
  ) {
    "use strict"
    var aa = require_react()
    function l(a) {
      for (
        var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a,
          c = 1;
        c < arguments.length;
        c++
      )
        b += "&args[]=" + encodeURIComponent(arguments[c])
      return (
        "Minified React error #" +
        a +
        "; visit " +
        b +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      )
    }
    var p = Object.prototype.hasOwnProperty
    var fa =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
    var ha = {}
    var ia = {}
    function ja(a) {
      if (p.call(ia, a)) return true
      if (p.call(ha, a)) return false
      if (fa.test(a)) return (ia[a] = true)
      ha[a] = true
      return false
    }
    function r(a, b, c, d, f, e, g) {
      this.acceptsBooleans = 2 === b || 3 === b || 4 === b
      this.attributeName = d
      this.attributeNamespace = f
      this.mustUseProperty = c
      this.propertyName = a
      this.type = b
      this.sanitizeURL = e
      this.removeEmptyString = g
    }
    var t = {}
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function (a) {
        t[a] = new r(a, 0, false, a, null, false, false)
      })
    ;[
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (a) {
      var b = a[0]
      t[b] = new r(b, 1, false, a[1], null, false, false)
    })
    ;["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
      a,
    ) {
      t[a] = new r(a, 2, false, a.toLowerCase(), null, false, false)
    })
    ;[
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (a) {
      t[a] = new r(a, 2, false, a, null, false, false)
    })
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (a) {
        t[a] = new r(a, 3, false, a.toLowerCase(), null, false, false)
      })
    ;["checked", "multiple", "muted", "selected"].forEach(function (a) {
      t[a] = new r(a, 3, true, a, null, false, false)
    })
    ;["capture", "download"].forEach(function (a) {
      t[a] = new r(a, 4, false, a, null, false, false)
    })
    ;["cols", "rows", "size", "span"].forEach(function (a) {
      t[a] = new r(a, 6, false, a, null, false, false)
    })
    ;["rowSpan", "start"].forEach(function (a) {
      t[a] = new r(a, 5, false, a.toLowerCase(), null, false, false)
    })
    var ka = /[\-:]([a-z])/g
    function la(a) {
      return a[1].toUpperCase()
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function (a) {
        var b = a.replace(ka, la)
        t[b] = new r(b, 1, false, a, null, false, false)
      })
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (a) {
        var b = a.replace(ka, la)
        t[b] = new r(
          b,
          1,
          false,
          a,
          "http://www.w3.org/1999/xlink",
          false,
          false,
        )
      })
    ;["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
      var b = a.replace(ka, la)
      t[b] = new r(
        b,
        1,
        false,
        a,
        "http://www.w3.org/XML/1998/namespace",
        false,
        false,
      )
    })
    ;["tabIndex", "crossOrigin"].forEach(function (a) {
      t[a] = new r(a, 1, false, a.toLowerCase(), null, false, false)
    })
    t.xlinkHref = new r(
      "xlinkHref",
      1,
      false,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      true,
      false,
    )
    ;["src", "href", "action", "formAction"].forEach(function (a) {
      t[a] = new r(a, 1, false, a.toLowerCase(), null, true, true)
    })
    var u = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true,
    }
    var ma = ["Webkit", "ms", "Moz", "O"]
    Object.keys(u).forEach(function (a) {
      ma.forEach(function (b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1)
        u[b] = u[a]
      })
    })
    var na = /["'&<>]/
    function v(a) {
      if ("boolean" === typeof a || "number" === typeof a) return "" + a
      a = "" + a
      var b = na.exec(a)
      if (b) {
        var c = "",
          d,
          f = 0
        for (d = b.index; d < a.length; d++) {
          switch (a.charCodeAt(d)) {
            case 34:
              b = "&quot;"
              break
            case 38:
              b = "&amp;"
              break
            case 39:
              b = "&#x27;"
              break
            case 60:
              b = "&lt;"
              break
            case 62:
              b = "&gt;"
              break
            default:
              continue
          }
          f !== d && (c += a.substring(f, d))
          f = d + 1
          c += b
        }
        a = f !== d ? c + a.substring(f, d) : c
      }
      return a
    }
    var oa = /([A-Z])/g
    var pa = /^ms-/
    var qa = Array.isArray
    function w(a, b) {
      return { insertionMode: a, selectedValue: b }
    }
    function ra(a, b, c) {
      switch (b) {
        case "select":
          return w(1, null != c.value ? c.value : c.defaultValue)
        case "svg":
          return w(2, null)
        case "math":
          return w(3, null)
        case "foreignObject":
          return w(1, null)
        case "table":
          return w(4, null)
        case "thead":
        case "tbody":
        case "tfoot":
          return w(5, null)
        case "colgroup":
          return w(7, null)
        case "tr":
          return w(6, null)
      }
      return 4 <= a.insertionMode || 0 === a.insertionMode ? w(1, null) : a
    }
    var sa = /* @__PURE__ */ new Map()
    function ta(a, b, c) {
      if ("object" !== typeof c) throw Error(l(62))
      b = true
      for (var d in c)
        if (p.call(c, d)) {
          var f = c[d]
          if (null != f && "boolean" !== typeof f && "" !== f) {
            if (0 === d.indexOf("--")) {
              var e = v(d)
              f = v(("" + f).trim())
            } else {
              e = d
              var g = sa.get(e)
              void 0 !== g
                ? (e = g)
                : ((g = v(
                    e.replace(oa, "-$1").toLowerCase().replace(pa, "-ms-"),
                  )),
                  sa.set(e, g),
                  (e = g))
              f =
                "number" === typeof f
                  ? 0 === f || p.call(u, d)
                    ? "" + f
                    : f + "px"
                  : v(("" + f).trim())
            }
            b
              ? ((b = false), a.push(' style="', e, ":", f))
              : a.push(";", e, ":", f)
          }
        }
      b || a.push('"')
    }
    function x(a, b, c, d) {
      switch (c) {
        case "style":
          ta(a, b, d)
          return
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return
      }
      if (
        !(2 < c.length) ||
        ("o" !== c[0] && "O" !== c[0]) ||
        ("n" !== c[1] && "N" !== c[1])
      ) {
        if (((b = t.hasOwnProperty(c) ? t[c] : null), null !== b)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return
            case "boolean":
              if (!b.acceptsBooleans) return
          }
          c = b.attributeName
          switch (b.type) {
            case 3:
              d && a.push(" ", c, '=""')
              break
            case 4:
              true === d
                ? a.push(" ", c, '=""')
                : false !== d && a.push(" ", c, '="', v(d), '"')
              break
            case 5:
              isNaN(d) || a.push(" ", c, '="', v(d), '"')
              break
            case 6:
              !isNaN(d) && 1 <= d && a.push(" ", c, '="', v(d), '"')
              break
            default:
              b.sanitizeURL && (d = "" + d), a.push(" ", c, '="', v(d), '"')
          }
        } else if (ja(c)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return
            case "boolean":
              if (
                ((b = c.toLowerCase().slice(0, 5)),
                "data-" !== b && "aria-" !== b)
              )
                return
          }
          a.push(" ", c, '="', v(d), '"')
        }
      }
    }
    function y(a, b, c) {
      if (null != b) {
        if (null != c) throw Error(l(60))
        if ("object" !== typeof b || !("__html" in b)) throw Error(l(61))
        b = b.__html
        null !== b && void 0 !== b && a.push("" + b)
      }
    }
    function ua(a) {
      var b = ""
      aa.Children.forEach(a, function (a2) {
        null != a2 && (b += a2)
      })
      return b
    }
    function va(a, b, c, d) {
      a.push(A(c))
      var f = (c = null),
        e
      for (e in b)
        if (p.call(b, e)) {
          var g = b[e]
          if (null != g)
            switch (e) {
              case "children":
                c = g
                break
              case "dangerouslySetInnerHTML":
                f = g
                break
              default:
                x(a, d, e, g)
            }
        }
      a.push(">")
      y(a, f, c)
      return "string" === typeof c ? (a.push(v(c)), null) : c
    }
    var wa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/
    var xa = /* @__PURE__ */ new Map()
    function A(a) {
      var b = xa.get(a)
      if (void 0 === b) {
        if (!wa.test(a)) throw Error(l(65, a))
        b = "<" + a
        xa.set(a, b)
      }
      return b
    }
    function ya(a, b, c, d, f) {
      switch (b) {
        case "select":
          a.push(A("select"))
          var e = null,
            g = null
          for (n in c)
            if (p.call(c, n)) {
              var h = c[n]
              if (null != h)
                switch (n) {
                  case "children":
                    e = h
                    break
                  case "dangerouslySetInnerHTML":
                    g = h
                    break
                  case "defaultValue":
                  case "value":
                    break
                  default:
                    x(a, d, n, h)
                }
            }
          a.push(">")
          y(a, g, e)
          return e
        case "option":
          g = f.selectedValue
          a.push(A("option"))
          var k = (h = null),
            m = null
          var n = null
          for (e in c)
            if (p.call(c, e)) {
              var q = c[e]
              if (null != q)
                switch (e) {
                  case "children":
                    h = q
                    break
                  case "selected":
                    m = q
                    break
                  case "dangerouslySetInnerHTML":
                    n = q
                    break
                  case "value":
                    k = q
                  default:
                    x(a, d, e, q)
                }
            }
          if (null != g)
            if (((c = null !== k ? "" + k : ua(h)), qa(g)))
              for (d = 0; d < g.length; d++) {
                if ("" + g[d] === c) {
                  a.push(' selected=""')
                  break
                }
              }
            else "" + g === c && a.push(' selected=""')
          else m && a.push(' selected=""')
          a.push(">")
          y(a, n, h)
          return h
        case "textarea":
          a.push(A("textarea"))
          n = g = e = null
          for (h in c)
            if (p.call(c, h) && ((k = c[h]), null != k))
              switch (h) {
                case "children":
                  n = k
                  break
                case "value":
                  e = k
                  break
                case "defaultValue":
                  g = k
                  break
                case "dangerouslySetInnerHTML":
                  throw Error(l(91))
                default:
                  x(a, d, h, k)
              }
          null === e && null !== g && (e = g)
          a.push(">")
          if (null != n) {
            if (null != e) throw Error(l(92))
            if (qa(n) && 1 < n.length) throw Error(l(93))
            e = "" + n
          }
          "string" === typeof e && "\n" === e[0] && a.push("\n")
          null !== e && a.push(v("" + e))
          return null
        case "input":
          a.push(A("input"))
          k = n = h = e = null
          for (g in c)
            if (p.call(c, g) && ((m = c[g]), null != m))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(399, "input"))
                case "defaultChecked":
                  k = m
                  break
                case "defaultValue":
                  h = m
                  break
                case "checked":
                  n = m
                  break
                case "value":
                  e = m
                  break
                default:
                  x(a, d, g, m)
              }
          null !== n
            ? x(a, d, "checked", n)
            : null !== k && x(a, d, "checked", k)
          null !== e ? x(a, d, "value", e) : null !== h && x(a, d, "value", h)
          a.push("/>")
          return null
        case "menuitem":
          a.push(A("menuitem"))
          for (var C in c)
            if (p.call(c, C) && ((e = c[C]), null != e))
              switch (C) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(400))
                default:
                  x(a, d, C, e)
              }
          a.push(">")
          return null
        case "title":
          a.push(A("title"))
          e = null
          for (q in c)
            if (p.call(c, q) && ((g = c[q]), null != g))
              switch (q) {
                case "children":
                  e = g
                  break
                case "dangerouslySetInnerHTML":
                  throw Error(l(434))
                default:
                  x(a, d, q, g)
              }
          a.push(">")
          return e
        case "listing":
        case "pre":
          a.push(A(b))
          g = e = null
          for (k in c)
            if (p.call(c, k) && ((h = c[k]), null != h))
              switch (k) {
                case "children":
                  e = h
                  break
                case "dangerouslySetInnerHTML":
                  g = h
                  break
                default:
                  x(a, d, k, h)
              }
          a.push(">")
          if (null != g) {
            if (null != e) throw Error(l(60))
            if ("object" !== typeof g || !("__html" in g)) throw Error(l(61))
            c = g.__html
            null !== c &&
              void 0 !== c &&
              ("string" === typeof c && 0 < c.length && "\n" === c[0]
                ? a.push("\n", c)
                : a.push("" + c))
          }
          "string" === typeof e && "\n" === e[0] && a.push("\n")
          return e
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          a.push(A(b))
          for (var D in c)
            if (p.call(c, D) && ((e = c[D]), null != e))
              switch (D) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(399, b))
                default:
                  x(a, d, D, e)
              }
          a.push("/>")
          return null
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return va(a, c, b, d)
        case "html":
          return (
            0 === f.insertionMode && a.push("<!DOCTYPE html>"), va(a, c, b, d)
          )
        default:
          if (-1 === b.indexOf("-") && "string" !== typeof c.is)
            return va(a, c, b, d)
          a.push(A(b))
          g = e = null
          for (m in c)
            if (p.call(c, m) && ((h = c[m]), null != h))
              switch (m) {
                case "children":
                  e = h
                  break
                case "dangerouslySetInnerHTML":
                  g = h
                  break
                case "style":
                  ta(a, d, h)
                  break
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  break
                default:
                  ja(m) &&
                    "function" !== typeof h &&
                    "symbol" !== typeof h &&
                    a.push(" ", m, '="', v(h), '"')
              }
          a.push(">")
          y(a, g, e)
          return e
      }
    }
    function za(a, b, c) {
      a.push('<!--$?--><template id="')
      if (null === c) throw Error(l(395))
      a.push(c)
      return a.push('"></template>')
    }
    function Aa(a, b, c, d) {
      switch (c.insertionMode) {
        case 0:
        case 1:
          return (
            a.push('<div hidden id="'),
            a.push(b.segmentPrefix),
            (b = d.toString(16)),
            a.push(b),
            a.push('">')
          )
        case 2:
          return (
            a.push('<svg aria-hidden="true" style="display:none" id="'),
            a.push(b.segmentPrefix),
            (b = d.toString(16)),
            a.push(b),
            a.push('">')
          )
        case 3:
          return (
            a.push('<math aria-hidden="true" style="display:none" id="'),
            a.push(b.segmentPrefix),
            (b = d.toString(16)),
            a.push(b),
            a.push('">')
          )
        case 4:
          return (
            a.push('<table hidden id="'),
            a.push(b.segmentPrefix),
            (b = d.toString(16)),
            a.push(b),
            a.push('">')
          )
        case 5:
          return (
            a.push('<table hidden><tbody id="'),
            a.push(b.segmentPrefix),
            (b = d.toString(16)),
            a.push(b),
            a.push('">')
          )
        case 6:
          return (
            a.push('<table hidden><tr id="'),
            a.push(b.segmentPrefix),
            (b = d.toString(16)),
            a.push(b),
            a.push('">')
          )
        case 7:
          return (
            a.push('<table hidden><colgroup id="'),
            a.push(b.segmentPrefix),
            (b = d.toString(16)),
            a.push(b),
            a.push('">')
          )
        default:
          throw Error(l(397))
      }
    }
    function Ba(a, b) {
      switch (b.insertionMode) {
        case 0:
        case 1:
          return a.push("</div>")
        case 2:
          return a.push("</svg>")
        case 3:
          return a.push("</math>")
        case 4:
          return a.push("</table>")
        case 5:
          return a.push("</tbody></table>")
        case 6:
          return a.push("</tr></table>")
        case 7:
          return a.push("</colgroup></table>")
        default:
          throw Error(l(397))
      }
    }
    var Ca = /[<\u2028\u2029]/g
    function Da(a) {
      return JSON.stringify(a).replace(Ca, function (a2) {
        switch (a2) {
          case "<":
            return "\\u003c"
          case "\u2028":
            return "\\u2028"
          case "\u2029":
            return "\\u2029"
          default:
            throw Error(
              "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React",
            )
        }
      })
    }
    function Ea(a, b) {
      b = void 0 === b ? "" : b
      return {
        bootstrapChunks: [],
        startInlineScript: "<script>",
        placeholderPrefix: b + "P:",
        segmentPrefix: b + "S:",
        boundaryPrefix: b + "B:",
        idPrefix: b,
        nextSuspenseID: 0,
        sentCompleteSegmentFunction: false,
        sentCompleteBoundaryFunction: false,
        sentClientRenderFunction: false,
        generateStaticMarkup: a,
      }
    }
    function Fa(a, b, c, d) {
      if (c.generateStaticMarkup) return a.push(v(b)), false
      "" === b ? (a = d) : (d && a.push("<!-- -->"), a.push(v(b)), (a = true))
      return a
    }
    var B = Object.assign
    var Ga = Symbol.for("react.element")
    var Ha = Symbol.for("react.portal")
    var Ia = Symbol.for("react.fragment")
    var Ja = Symbol.for("react.strict_mode")
    var Ka = Symbol.for("react.profiler")
    var La = Symbol.for("react.provider")
    var Ma = Symbol.for("react.context")
    var Na = Symbol.for("react.forward_ref")
    var Oa = Symbol.for("react.suspense")
    var Pa = Symbol.for("react.suspense_list")
    var Qa = Symbol.for("react.memo")
    var Ra = Symbol.for("react.lazy")
    var Sa = Symbol.for("react.scope")
    var Ta = Symbol.for("react.debug_trace_mode")
    var Ua = Symbol.for("react.legacy_hidden")
    var Va = Symbol.for("react.default_value")
    var Wa = Symbol.iterator
    function Xa(a) {
      if (null == a) return null
      if ("function" === typeof a) return a.displayName || a.name || null
      if ("string" === typeof a) return a
      switch (a) {
        case Ia:
          return "Fragment"
        case Ha:
          return "Portal"
        case Ka:
          return "Profiler"
        case Ja:
          return "StrictMode"
        case Oa:
          return "Suspense"
        case Pa:
          return "SuspenseList"
      }
      if ("object" === typeof a)
        switch (a.$$typeof) {
          case Ma:
            return (a.displayName || "Context") + ".Consumer"
          case La:
            return (a._context.displayName || "Context") + ".Provider"
          case Na:
            var b = a.render
            a = a.displayName
            a ||
              ((a = b.displayName || b.name || ""),
              (a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef"))
            return a
          case Qa:
            return (
              (b = a.displayName || null), null !== b ? b : Xa(a.type) || "Memo"
            )
          case Ra:
            b = a._payload
            a = a._init
            try {
              return Xa(a(b))
            } catch (c) {}
        }
      return null
    }
    var Ya = {}
    function Za(a, b) {
      a = a.contextTypes
      if (!a) return Ya
      var c = {},
        d
      for (d in a) c[d] = b[d]
      return c
    }
    var E = null
    function F(a, b) {
      if (a !== b) {
        a.context._currentValue2 = a.parentValue
        a = a.parent
        var c = b.parent
        if (null === a) {
          if (null !== c) throw Error(l(401))
        } else {
          if (null === c) throw Error(l(401))
          F(a, c)
        }
        b.context._currentValue2 = b.value
      }
    }
    function $a(a) {
      a.context._currentValue2 = a.parentValue
      a = a.parent
      null !== a && $a(a)
    }
    function ab(a) {
      var b = a.parent
      null !== b && ab(b)
      a.context._currentValue2 = a.value
    }
    function bb(a, b) {
      a.context._currentValue2 = a.parentValue
      a = a.parent
      if (null === a) throw Error(l(402))
      a.depth === b.depth ? F(a, b) : bb(a, b)
    }
    function cb(a, b) {
      var c = b.parent
      if (null === c) throw Error(l(402))
      a.depth === c.depth ? F(a, c) : cb(a, c)
      b.context._currentValue2 = b.value
    }
    function G(a) {
      var b = E
      b !== a &&
        (null === b
          ? ab(a)
          : null === a
          ? $a(b)
          : b.depth === a.depth
          ? F(b, a)
          : b.depth > a.depth
          ? bb(b, a)
          : cb(b, a),
        (E = a))
    }
    var db = {
      isMounted: function () {
        return false
      },
      enqueueSetState: function (a, b) {
        a = a._reactInternals
        null !== a.queue && a.queue.push(b)
      },
      enqueueReplaceState: function (a, b) {
        a = a._reactInternals
        a.replace = true
        a.queue = [b]
      },
      enqueueForceUpdate: function () {},
    }
    function eb(a, b, c, d) {
      var f = void 0 !== a.state ? a.state : null
      a.updater = db
      a.props = c
      a.state = f
      var e = { queue: [], replace: false }
      a._reactInternals = e
      var g = b.contextType
      a.context = "object" === typeof g && null !== g ? g._currentValue2 : d
      g = b.getDerivedStateFromProps
      "function" === typeof g &&
        ((g = g(c, f)),
        (f = null === g || void 0 === g ? f : B({}, f, g)),
        (a.state = f))
      if (
        "function" !== typeof b.getDerivedStateFromProps &&
        "function" !== typeof a.getSnapshotBeforeUpdate &&
        ("function" === typeof a.UNSAFE_componentWillMount ||
          "function" === typeof a.componentWillMount)
      )
        if (
          ((b = a.state),
          "function" === typeof a.componentWillMount && a.componentWillMount(),
          "function" === typeof a.UNSAFE_componentWillMount &&
            a.UNSAFE_componentWillMount(),
          b !== a.state && db.enqueueReplaceState(a, a.state, null),
          null !== e.queue && 0 < e.queue.length)
        )
          if (
            ((b = e.queue),
            (g = e.replace),
            (e.queue = null),
            (e.replace = false),
            g && 1 === b.length)
          )
            a.state = b[0]
          else {
            e = g ? b[0] : a.state
            f = true
            for (g = g ? 1 : 0; g < b.length; g++) {
              var h = b[g]
              h = "function" === typeof h ? h.call(a, e, c, d) : h
              null != h && (f ? ((f = false), (e = B({}, e, h))) : B(e, h))
            }
            a.state = e
          }
        else e.queue = null
    }
    var fb = { id: 1, overflow: "" }
    function gb(a, b, c) {
      var d = a.id
      a = a.overflow
      var f = 32 - H(d) - 1
      d &= ~(1 << f)
      c += 1
      var e = 32 - H(b) + f
      if (30 < e) {
        var g = f - (f % 5)
        e = (d & ((1 << g) - 1)).toString(32)
        d >>= g
        f -= g
        return { id: (1 << (32 - H(b) + f)) | (c << f) | d, overflow: e + a }
      }
      return { id: (1 << e) | (c << f) | d, overflow: a }
    }
    var H = Math.clz32 ? Math.clz32 : hb
    var ib = Math.log
    var jb = Math.LN2
    function hb(a) {
      a >>>= 0
      return 0 === a ? 32 : (31 - ((ib(a) / jb) | 0)) | 0
    }
    function kb(a, b) {
      return (a === b && (0 !== a || 1 / a === 1 / b)) || (a !== a && b !== b)
    }
    var lb = "function" === typeof Object.is ? Object.is : kb
    var I = null
    var ob = null
    var J = null
    var K = null
    var L = false
    var M = false
    var N = 0
    var O = null
    var P = 0
    function Q() {
      if (null === I) throw Error(l(321))
      return I
    }
    function pb() {
      if (0 < P) throw Error(l(312))
      return { memoizedState: null, queue: null, next: null }
    }
    function qb() {
      null === K
        ? null === J
          ? ((L = false), (J = K = pb()))
          : ((L = true), (K = J))
        : null === K.next
        ? ((L = false), (K = K.next = pb()))
        : ((L = true), (K = K.next))
      return K
    }
    function rb() {
      ob = I = null
      M = false
      J = null
      P = 0
      K = O = null
    }
    function sb(a, b) {
      return "function" === typeof b ? b(a) : b
    }
    function tb(a, b, c) {
      I = Q()
      K = qb()
      if (L) {
        var d = K.queue
        b = d.dispatch
        if (null !== O && ((c = O.get(d)), void 0 !== c)) {
          O.delete(d)
          d = K.memoizedState
          do (d = a(d, c.action)), (c = c.next)
          while (null !== c)
          K.memoizedState = d
          return [d, b]
        }
        return [K.memoizedState, b]
      }
      a =
        a === sb ? ("function" === typeof b ? b() : b) : void 0 !== c ? c(b) : b
      K.memoizedState = a
      a = K.queue = { last: null, dispatch: null }
      a = a.dispatch = ub.bind(null, I, a)
      return [K.memoizedState, a]
    }
    function vb(a, b) {
      I = Q()
      K = qb()
      b = void 0 === b ? null : b
      if (null !== K) {
        var c = K.memoizedState
        if (null !== c && null !== b) {
          var d = c[1]
          a: if (null === d) d = false
          else {
            for (var f = 0; f < d.length && f < b.length; f++)
              if (!lb(b[f], d[f])) {
                d = false
                break a
              }
            d = true
          }
          if (d) return c[0]
        }
      }
      a = a()
      K.memoizedState = [a, b]
      return a
    }
    function ub(a, b, c) {
      if (25 <= P) throw Error(l(301))
      if (a === I)
        if (
          ((M = true),
          (a = { action: c, next: null }),
          null === O && (O = /* @__PURE__ */ new Map()),
          (c = O.get(b)),
          void 0 === c)
        )
          O.set(b, a)
        else {
          for (b = c; null !== b.next; ) b = b.next
          b.next = a
        }
    }
    function wb() {
      throw Error(l(394))
    }
    function R() {}
    var xb = {
      readContext: function (a) {
        return a._currentValue2
      },
      useContext: function (a) {
        Q()
        return a._currentValue2
      },
      useMemo: vb,
      useReducer: tb,
      useRef: function (a) {
        I = Q()
        K = qb()
        var b = K.memoizedState
        return null === b ? ((a = { current: a }), (K.memoizedState = a)) : b
      },
      useState: function (a) {
        return tb(sb, a)
      },
      useInsertionEffect: R,
      useLayoutEffect: function () {},
      useCallback: function (a, b) {
        return vb(function () {
          return a
        }, b)
      },
      useImperativeHandle: R,
      useEffect: R,
      useDebugValue: R,
      useDeferredValue: function (a) {
        Q()
        return a
      },
      useTransition: function () {
        Q()
        return [false, wb]
      },
      useId: function () {
        var a = ob.treeContext
        var b = a.overflow
        a = a.id
        a = (a & ~(1 << (32 - H(a) - 1))).toString(32) + b
        var c = S
        if (null === c) throw Error(l(404))
        b = N++
        a = ":" + c.idPrefix + "R" + a
        0 < b && (a += "H" + b.toString(32))
        return a + ":"
      },
      useMutableSource: function (a, b) {
        Q()
        return b(a._source)
      },
      useSyncExternalStore: function (a, b, c) {
        if (void 0 === c) throw Error(l(407))
        return c()
      },
    }
    var S = null
    var yb =
      aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentDispatcher
    function zb(a) {
      console.error(a)
      return null
    }
    function T() {}
    function Ab(a, b, c, d, f, e, g, h, k) {
      var m = [],
        n = /* @__PURE__ */ new Set()
      b = {
        destination: null,
        responseState: b,
        progressiveChunkSize: void 0 === d ? 12800 : d,
        status: 0,
        fatalError: null,
        nextSegmentId: 0,
        allPendingTasks: 0,
        pendingRootTasks: 0,
        completedRootSegment: null,
        abortableTasks: n,
        pingedTasks: m,
        clientRenderedBoundaries: [],
        completedBoundaries: [],
        partialBoundaries: [],
        onError: void 0 === f ? zb : f,
        onAllReady: void 0 === e ? T : e,
        onShellReady: void 0 === g ? T : g,
        onShellError: void 0 === h ? T : h,
        onFatalError: void 0 === k ? T : k,
      }
      c = U(b, 0, null, c, false, false)
      c.parentFlushed = true
      a = Bb(b, a, null, c, n, Ya, null, fb)
      m.push(a)
      return b
    }
    function Bb(a, b, c, d, f, e, g, h) {
      a.allPendingTasks++
      null === c ? a.pendingRootTasks++ : c.pendingTasks++
      var k = {
        node: b,
        ping: function () {
          var b2 = a.pingedTasks
          b2.push(k)
          1 === b2.length && Cb(a)
        },
        blockedBoundary: c,
        blockedSegment: d,
        abortSet: f,
        legacyContext: e,
        context: g,
        treeContext: h,
      }
      f.add(k)
      return k
    }
    function U(a, b, c, d, f, e) {
      return {
        status: 0,
        id: -1,
        index: b,
        parentFlushed: false,
        chunks: [],
        children: [],
        formatContext: d,
        boundary: c,
        lastPushedText: f,
        textEmbedded: e,
      }
    }
    function V(a, b) {
      a = a.onError(b)
      if (null != a && "string" !== typeof a)
        throw Error(
          'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
            typeof a +
            '" instead',
        )
      return a
    }
    function W(a, b) {
      var c = a.onShellError
      c(b)
      c = a.onFatalError
      c(b)
      null !== a.destination
        ? ((a.status = 2), a.destination.destroy(b))
        : ((a.status = 1), (a.fatalError = b))
    }
    function Db(a, b, c, d, f) {
      I = {}
      ob = b
      N = 0
      for (a = c(d, f); M; )
        (M = false), (N = 0), (P += 1), (K = null), (a = c(d, f))
      rb()
      return a
    }
    function Eb(a, b, c, d) {
      var f = c.render(),
        e = d.childContextTypes
      if (null !== e && void 0 !== e) {
        var g = b.legacyContext
        if ("function" !== typeof c.getChildContext) d = g
        else {
          c = c.getChildContext()
          for (var h in c)
            if (!(h in e)) throw Error(l(108, Xa(d) || "Unknown", h))
          d = B({}, g, c)
        }
        b.legacyContext = d
        X(a, b, f)
        b.legacyContext = g
      } else X(a, b, f)
    }
    function Fb(a, b) {
      if (a && a.defaultProps) {
        b = B({}, b)
        a = a.defaultProps
        for (var c in a) void 0 === b[c] && (b[c] = a[c])
        return b
      }
      return b
    }
    function Gb(a, b, c, d, f) {
      if ("function" === typeof c)
        if (c.prototype && c.prototype.isReactComponent) {
          f = Za(c, b.legacyContext)
          var e = c.contextType
          e = new c(
            d,
            "object" === typeof e && null !== e ? e._currentValue2 : f,
          )
          eb(e, c, d, f)
          Eb(a, b, e, c)
        } else {
          e = Za(c, b.legacyContext)
          f = Db(a, b, c, d, e)
          var g = 0 !== N
          if (
            "object" === typeof f &&
            null !== f &&
            "function" === typeof f.render &&
            void 0 === f.$$typeof
          )
            eb(f, c, d, e), Eb(a, b, f, c)
          else if (g) {
            d = b.treeContext
            b.treeContext = gb(d, 1, 0)
            try {
              X(a, b, f)
            } finally {
              b.treeContext = d
            }
          } else X(a, b, f)
        }
      else if ("string" === typeof c) {
        f = b.blockedSegment
        e = ya(f.chunks, c, d, a.responseState, f.formatContext)
        f.lastPushedText = false
        g = f.formatContext
        f.formatContext = ra(g, c, d)
        Hb(a, b, e)
        f.formatContext = g
        switch (c) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break
          default:
            f.chunks.push("</", c, ">")
        }
        f.lastPushedText = false
      } else {
        switch (c) {
          case Ua:
          case Ta:
          case Ja:
          case Ka:
          case Ia:
            X(a, b, d.children)
            return
          case Pa:
            X(a, b, d.children)
            return
          case Sa:
            throw Error(l(343))
          case Oa:
            a: {
              c = b.blockedBoundary
              f = b.blockedSegment
              e = d.fallback
              d = d.children
              g = /* @__PURE__ */ new Set()
              var h = {
                  id: null,
                  rootSegmentID: -1,
                  parentFlushed: false,
                  pendingTasks: 0,
                  forceClientRender: false,
                  completedSegments: [],
                  byteSize: 0,
                  fallbackAbortableTasks: g,
                  errorDigest: null,
                },
                k = U(a, f.chunks.length, h, f.formatContext, false, false)
              f.children.push(k)
              f.lastPushedText = false
              var m = U(a, 0, null, f.formatContext, false, false)
              m.parentFlushed = true
              b.blockedBoundary = h
              b.blockedSegment = m
              try {
                if (
                  (Hb(a, b, d),
                  a.responseState.generateStaticMarkup ||
                    (m.lastPushedText &&
                      m.textEmbedded &&
                      m.chunks.push("<!-- -->")),
                  (m.status = 1),
                  Y(h, m),
                  0 === h.pendingTasks)
                )
                  break a
              } catch (n) {
                ;(m.status = 4),
                  (h.forceClientRender = true),
                  (h.errorDigest = V(a, n))
              } finally {
                ;(b.blockedBoundary = c), (b.blockedSegment = f)
              }
              b = Bb(a, e, c, k, g, b.legacyContext, b.context, b.treeContext)
              a.pingedTasks.push(b)
            }
            return
        }
        if ("object" === typeof c && null !== c)
          switch (c.$$typeof) {
            case Na:
              d = Db(a, b, c.render, d, f)
              if (0 !== N) {
                c = b.treeContext
                b.treeContext = gb(c, 1, 0)
                try {
                  X(a, b, d)
                } finally {
                  b.treeContext = c
                }
              } else X(a, b, d)
              return
            case Qa:
              c = c.type
              d = Fb(c, d)
              Gb(a, b, c, d, f)
              return
            case La:
              f = d.children
              c = c._context
              d = d.value
              e = c._currentValue2
              c._currentValue2 = d
              g = E
              E = d = {
                parent: g,
                depth: null === g ? 0 : g.depth + 1,
                context: c,
                parentValue: e,
                value: d,
              }
              b.context = d
              X(a, b, f)
              a = E
              if (null === a) throw Error(l(403))
              d = a.parentValue
              a.context._currentValue2 = d === Va ? a.context._defaultValue : d
              a = E = a.parent
              b.context = a
              return
            case Ma:
              d = d.children
              d = d(c._currentValue2)
              X(a, b, d)
              return
            case Ra:
              f = c._init
              c = f(c._payload)
              d = Fb(c, d)
              Gb(a, b, c, d, void 0)
              return
          }
        throw Error(l(130, null == c ? c : typeof c, ""))
      }
    }
    function X(a, b, c) {
      b.node = c
      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case Ga:
            Gb(a, b, c.type, c.props, c.ref)
            return
          case Ha:
            throw Error(l(257))
          case Ra:
            var d = c._init
            c = d(c._payload)
            X(a, b, c)
            return
        }
        if (qa(c)) {
          Ib(a, b, c)
          return
        }
        null === c || "object" !== typeof c
          ? (d = null)
          : ((d = (Wa && c[Wa]) || c["@@iterator"]),
            (d = "function" === typeof d ? d : null))
        if (d && (d = d.call(c))) {
          c = d.next()
          if (!c.done) {
            var f = []
            do f.push(c.value), (c = d.next())
            while (!c.done)
            Ib(a, b, f)
          }
          return
        }
        a = Object.prototype.toString.call(c)
        throw Error(
          l(
            31,
            "[object Object]" === a
              ? "object with keys {" + Object.keys(c).join(", ") + "}"
              : a,
          ),
        )
      }
      "string" === typeof c
        ? ((d = b.blockedSegment),
          (d.lastPushedText = Fa(
            b.blockedSegment.chunks,
            c,
            a.responseState,
            d.lastPushedText,
          )))
        : "number" === typeof c &&
          ((d = b.blockedSegment),
          (d.lastPushedText = Fa(
            b.blockedSegment.chunks,
            "" + c,
            a.responseState,
            d.lastPushedText,
          )))
    }
    function Ib(a, b, c) {
      for (var d = c.length, f = 0; f < d; f++) {
        var e = b.treeContext
        b.treeContext = gb(e, d, f)
        try {
          Hb(a, b, c[f])
        } finally {
          b.treeContext = e
        }
      }
    }
    function Hb(a, b, c) {
      var d = b.blockedSegment.formatContext,
        f = b.legacyContext,
        e = b.context
      try {
        return X(a, b, c)
      } catch (k) {
        if (
          (rb(),
          "object" === typeof k && null !== k && "function" === typeof k.then)
        ) {
          c = k
          var g = b.blockedSegment,
            h = U(
              a,
              g.chunks.length,
              null,
              g.formatContext,
              g.lastPushedText,
              true,
            )
          g.children.push(h)
          g.lastPushedText = false
          a = Bb(
            a,
            b.node,
            b.blockedBoundary,
            h,
            b.abortSet,
            b.legacyContext,
            b.context,
            b.treeContext,
          ).ping
          c.then(a, a)
          b.blockedSegment.formatContext = d
          b.legacyContext = f
          b.context = e
          G(e)
        } else
          throw (
            ((b.blockedSegment.formatContext = d),
            (b.legacyContext = f),
            (b.context = e),
            G(e),
            k)
          )
      }
    }
    function Jb(a) {
      var b = a.blockedBoundary
      a = a.blockedSegment
      a.status = 3
      Kb(this, b, a)
    }
    function Lb(a, b, c) {
      var d = a.blockedBoundary
      a.blockedSegment.status = 3
      null === d
        ? (b.allPendingTasks--,
          2 !== b.status &&
            ((b.status = 2),
            null !== b.destination && b.destination.push(null)))
        : (d.pendingTasks--,
          d.forceClientRender ||
            ((d.forceClientRender = true),
            (a = void 0 === c ? Error(l(432)) : c),
            (d.errorDigest = b.onError(a)),
            d.parentFlushed && b.clientRenderedBoundaries.push(d)),
          d.fallbackAbortableTasks.forEach(function (a2) {
            return Lb(a2, b, c)
          }),
          d.fallbackAbortableTasks.clear(),
          b.allPendingTasks--,
          0 === b.allPendingTasks && ((d = b.onAllReady), d()))
    }
    function Y(a, b) {
      if (
        0 === b.chunks.length &&
        1 === b.children.length &&
        null === b.children[0].boundary
      ) {
        var c = b.children[0]
        c.id = b.id
        c.parentFlushed = true
        1 === c.status && Y(a, c)
      } else a.completedSegments.push(b)
    }
    function Kb(a, b, c) {
      if (null === b) {
        if (c.parentFlushed) {
          if (null !== a.completedRootSegment) throw Error(l(389))
          a.completedRootSegment = c
        }
        a.pendingRootTasks--
        0 === a.pendingRootTasks &&
          ((a.onShellError = T), (b = a.onShellReady), b())
      } else
        b.pendingTasks--,
          b.forceClientRender ||
            (0 === b.pendingTasks
              ? (c.parentFlushed && 1 === c.status && Y(b, c),
                b.parentFlushed && a.completedBoundaries.push(b),
                b.fallbackAbortableTasks.forEach(Jb, a),
                b.fallbackAbortableTasks.clear())
              : c.parentFlushed &&
                1 === c.status &&
                (Y(b, c),
                1 === b.completedSegments.length &&
                  b.parentFlushed &&
                  a.partialBoundaries.push(b)))
      a.allPendingTasks--
      0 === a.allPendingTasks && ((a = a.onAllReady), a())
    }
    function Cb(a) {
      if (2 !== a.status) {
        var b = E,
          c = yb.current
        yb.current = xb
        var d = S
        S = a.responseState
        try {
          var f = a.pingedTasks,
            e
          for (e = 0; e < f.length; e++) {
            var g = f[e]
            var h = a,
              k = g.blockedSegment
            if (0 === k.status) {
              G(g.context)
              try {
                X(h, g, g.node),
                  h.responseState.generateStaticMarkup ||
                    (k.lastPushedText &&
                      k.textEmbedded &&
                      k.chunks.push("<!-- -->")),
                  g.abortSet.delete(g),
                  (k.status = 1),
                  Kb(h, g.blockedBoundary, k)
              } catch (z) {
                if (
                  (rb(),
                  "object" === typeof z &&
                    null !== z &&
                    "function" === typeof z.then)
                ) {
                  var m = g.ping
                  z.then(m, m)
                } else {
                  g.abortSet.delete(g)
                  k.status = 4
                  var n = g.blockedBoundary,
                    q = z,
                    C = V(h, q)
                  null === n
                    ? W(h, q)
                    : (n.pendingTasks--,
                      n.forceClientRender ||
                        ((n.forceClientRender = true),
                        (n.errorDigest = C),
                        n.parentFlushed && h.clientRenderedBoundaries.push(n)))
                  h.allPendingTasks--
                  if (0 === h.allPendingTasks) {
                    var D = h.onAllReady
                    D()
                  }
                }
              } finally {
              }
            }
          }
          f.splice(0, e)
          null !== a.destination && Mb(a, a.destination)
        } catch (z) {
          V(a, z), W(a, z)
        } finally {
          ;(S = d), (yb.current = c), c === xb && G(b)
        }
      }
    }
    function Z(a, b, c) {
      c.parentFlushed = true
      switch (c.status) {
        case 0:
          var d = (c.id = a.nextSegmentId++)
          c.lastPushedText = false
          c.textEmbedded = false
          a = a.responseState
          b.push('<template id="')
          b.push(a.placeholderPrefix)
          a = d.toString(16)
          b.push(a)
          return b.push('"></template>')
        case 1:
          c.status = 2
          var f = true
          d = c.chunks
          var e = 0
          c = c.children
          for (var g = 0; g < c.length; g++) {
            for (f = c[g]; e < f.index; e++) b.push(d[e])
            f = Nb(a, b, f)
          }
          for (; e < d.length - 1; e++) b.push(d[e])
          e < d.length && (f = b.push(d[e]))
          return f
        default:
          throw Error(l(390))
      }
    }
    function Nb(a, b, c) {
      var d = c.boundary
      if (null === d) return Z(a, b, c)
      d.parentFlushed = true
      if (d.forceClientRender)
        return (
          a.responseState.generateStaticMarkup ||
            ((d = d.errorDigest),
            b.push("<!--$!-->"),
            b.push("<template"),
            d && (b.push(' data-dgst="'), (d = v(d)), b.push(d), b.push('"')),
            b.push("></template>")),
          Z(a, b, c),
          (a = a.responseState.generateStaticMarkup
            ? true
            : b.push("<!--/$-->")),
          a
        )
      if (0 < d.pendingTasks) {
        d.rootSegmentID = a.nextSegmentId++
        0 < d.completedSegments.length && a.partialBoundaries.push(d)
        var f = a.responseState
        var e = f.nextSuspenseID++
        f = f.boundaryPrefix + e.toString(16)
        d = d.id = f
        za(b, a.responseState, d)
        Z(a, b, c)
        return b.push("<!--/$-->")
      }
      if (d.byteSize > a.progressiveChunkSize)
        return (
          (d.rootSegmentID = a.nextSegmentId++),
          a.completedBoundaries.push(d),
          za(b, a.responseState, d.id),
          Z(a, b, c),
          b.push("<!--/$-->")
        )
      a.responseState.generateStaticMarkup || b.push("<!--$-->")
      c = d.completedSegments
      if (1 !== c.length) throw Error(l(391))
      Nb(a, b, c[0])
      a = a.responseState.generateStaticMarkup ? true : b.push("<!--/$-->")
      return a
    }
    function Ob(a, b, c) {
      Aa(b, a.responseState, c.formatContext, c.id)
      Nb(a, b, c)
      return Ba(b, c.formatContext)
    }
    function Pb(a, b, c) {
      for (var d = c.completedSegments, f = 0; f < d.length; f++)
        Qb(a, b, c, d[f])
      d.length = 0
      a = a.responseState
      d = c.id
      c = c.rootSegmentID
      b.push(a.startInlineScript)
      a.sentCompleteBoundaryFunction
        ? b.push('$RC("')
        : ((a.sentCompleteBoundaryFunction = true),
          b.push(
            'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("',
          ))
      if (null === d) throw Error(l(395))
      c = c.toString(16)
      b.push(d)
      b.push('","')
      b.push(a.segmentPrefix)
      b.push(c)
      return b.push('")</script>')
    }
    function Qb(a, b, c, d) {
      if (2 === d.status) return true
      var f = d.id
      if (-1 === f) {
        if (-1 === (d.id = c.rootSegmentID)) throw Error(l(392))
        return Ob(a, b, d)
      }
      Ob(a, b, d)
      a = a.responseState
      b.push(a.startInlineScript)
      a.sentCompleteSegmentFunction
        ? b.push('$RS("')
        : ((a.sentCompleteSegmentFunction = true),
          b.push(
            'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("',
          ))
      b.push(a.segmentPrefix)
      f = f.toString(16)
      b.push(f)
      b.push('","')
      b.push(a.placeholderPrefix)
      b.push(f)
      return b.push('")</script>')
    }
    function Mb(a, b) {
      try {
        var c = a.completedRootSegment
        if (null !== c && 0 === a.pendingRootTasks) {
          Nb(a, b, c)
          a.completedRootSegment = null
          var d = a.responseState.bootstrapChunks
          for (c = 0; c < d.length - 1; c++) b.push(d[c])
          c < d.length && b.push(d[c])
        }
        var f = a.clientRenderedBoundaries,
          e
        for (e = 0; e < f.length; e++) {
          var g = f[e]
          d = b
          var h = a.responseState,
            k = g.id,
            m = g.errorDigest,
            n = g.errorMessage,
            q = g.errorComponentStack
          d.push(h.startInlineScript)
          h.sentClientRenderFunction
            ? d.push('$RX("')
            : ((h.sentClientRenderFunction = true),
              d.push(
                'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("',
              ))
          if (null === k) throw Error(l(395))
          d.push(k)
          d.push('"')
          if (m || n || q) {
            d.push(",")
            var C = Da(m || "")
            d.push(C)
          }
          if (n || q) {
            d.push(",")
            var D = Da(n || "")
            d.push(D)
          }
          if (q) {
            d.push(",")
            var z = Da(q)
            d.push(z)
          }
          if (!d.push(")</script>")) {
            a.destination = null
            e++
            f.splice(0, e)
            return
          }
        }
        f.splice(0, e)
        var ba = a.completedBoundaries
        for (e = 0; e < ba.length; e++)
          if (!Pb(a, b, ba[e])) {
            a.destination = null
            e++
            ba.splice(0, e)
            return
          }
        ba.splice(0, e)
        var ca = a.partialBoundaries
        for (e = 0; e < ca.length; e++) {
          var mb = ca[e]
          a: {
            f = a
            g = b
            var da = mb.completedSegments
            for (h = 0; h < da.length; h++)
              if (!Qb(f, g, mb, da[h])) {
                h++
                da.splice(0, h)
                var nb = false
                break a
              }
            da.splice(0, h)
            nb = true
          }
          if (!nb) {
            a.destination = null
            e++
            ca.splice(0, e)
            return
          }
        }
        ca.splice(0, e)
        var ea = a.completedBoundaries
        for (e = 0; e < ea.length; e++)
          if (!Pb(a, b, ea[e])) {
            a.destination = null
            e++
            ea.splice(0, e)
            return
          }
        ea.splice(0, e)
      } finally {
        0 === a.allPendingTasks &&
          0 === a.pingedTasks.length &&
          0 === a.clientRenderedBoundaries.length &&
          0 === a.completedBoundaries.length &&
          b.push(null)
      }
    }
    function Rb(a, b) {
      try {
        var c = a.abortableTasks
        c.forEach(function (c2) {
          return Lb(c2, a, b)
        })
        c.clear()
        null !== a.destination && Mb(a, a.destination)
      } catch (d) {
        V(a, d), W(a, d)
      }
    }
    function Sb() {}
    function Tb(a, b, c, d) {
      var f = false,
        e = null,
        g = "",
        h = {
          push: function (a2) {
            null !== a2 && (g += a2)
            return true
          },
          destroy: function (a2) {
            f = true
            e = a2
          },
        },
        k = false
      a = Ab(
        a,
        Ea(c, b ? b.identifierPrefix : void 0),
        { insertionMode: 1, selectedValue: null },
        Infinity,
        Sb,
        void 0,
        function () {
          k = true
        },
        void 0,
        void 0,
      )
      Cb(a)
      Rb(a, d)
      if (1 === a.status) (a.status = 2), h.destroy(a.fatalError)
      else if (2 !== a.status && null === a.destination) {
        a.destination = h
        try {
          Mb(a, h)
        } catch (m) {
          V(a, m), W(a, m)
        }
      }
      if (f) throw e
      if (!k) throw Error(l(426))
      return g
    }
    exports.renderToNodeStream = function () {
      throw Error(l(207))
    }
    exports.renderToStaticMarkup = function (a, b) {
      return Tb(
        a,
        b,
        true,
        'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server',
      )
    }
    exports.renderToStaticNodeStream = function () {
      throw Error(l(208))
    }
    exports.renderToString = function (a, b) {
      return Tb(
        a,
        b,
        false,
        'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server',
      )
    }
    exports.version = "18.2.0"
  },
})

// node_modules/react-dom/cjs/react-dom-server.browser.production.min.js
var require_react_dom_server_browser_production_min = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.browser.production.min.js"(
    exports,
  ) {
    "use strict"
    var aa = require_react()
    function k(a) {
      for (
        var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a,
          c = 1;
        c < arguments.length;
        c++
      )
        b += "&args[]=" + encodeURIComponent(arguments[c])
      return (
        "Minified React error #" +
        a +
        "; visit " +
        b +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      )
    }
    var l = null
    var n = 0
    function p(a, b) {
      if (0 !== b.length)
        if (512 < b.length)
          0 < n &&
            (a.enqueue(new Uint8Array(l.buffer, 0, n)),
            (l = new Uint8Array(512)),
            (n = 0)),
            a.enqueue(b)
        else {
          var c = l.length - n
          c < b.length &&
            (0 === c
              ? a.enqueue(l)
              : (l.set(b.subarray(0, c), n), a.enqueue(l), (b = b.subarray(c))),
            (l = new Uint8Array(512)),
            (n = 0))
          l.set(b, n)
          n += b.length
        }
    }
    function t(a, b) {
      p(a, b)
      return true
    }
    function ba(a) {
      l &&
        0 < n &&
        (a.enqueue(new Uint8Array(l.buffer, 0, n)), (l = null), (n = 0))
    }
    var ca = new TextEncoder()
    function u(a) {
      return ca.encode(a)
    }
    function w(a) {
      return ca.encode(a)
    }
    function da(a, b) {
      "function" === typeof a.error ? a.error(b) : a.close()
    }
    var x = Object.prototype.hasOwnProperty
    var ea =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
    var fa = {}
    var ha = {}
    function ia(a) {
      if (x.call(ha, a)) return true
      if (x.call(fa, a)) return false
      if (ea.test(a)) return (ha[a] = true)
      fa[a] = true
      return false
    }
    function y(a, b, c, d, f, e, g) {
      this.acceptsBooleans = 2 === b || 3 === b || 4 === b
      this.attributeName = d
      this.attributeNamespace = f
      this.mustUseProperty = c
      this.propertyName = a
      this.type = b
      this.sanitizeURL = e
      this.removeEmptyString = g
    }
    var z = {}
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function (a) {
        z[a] = new y(a, 0, false, a, null, false, false)
      })
    ;[
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (a) {
      var b = a[0]
      z[b] = new y(b, 1, false, a[1], null, false, false)
    })
    ;["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
      a,
    ) {
      z[a] = new y(a, 2, false, a.toLowerCase(), null, false, false)
    })
    ;[
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (a) {
      z[a] = new y(a, 2, false, a, null, false, false)
    })
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (a) {
        z[a] = new y(a, 3, false, a.toLowerCase(), null, false, false)
      })
    ;["checked", "multiple", "muted", "selected"].forEach(function (a) {
      z[a] = new y(a, 3, true, a, null, false, false)
    })
    ;["capture", "download"].forEach(function (a) {
      z[a] = new y(a, 4, false, a, null, false, false)
    })
    ;["cols", "rows", "size", "span"].forEach(function (a) {
      z[a] = new y(a, 6, false, a, null, false, false)
    })
    ;["rowSpan", "start"].forEach(function (a) {
      z[a] = new y(a, 5, false, a.toLowerCase(), null, false, false)
    })
    var ja = /[\-:]([a-z])/g
    function ka(a) {
      return a[1].toUpperCase()
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function (a) {
        var b = a.replace(ja, ka)
        z[b] = new y(b, 1, false, a, null, false, false)
      })
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (a) {
        var b = a.replace(ja, ka)
        z[b] = new y(
          b,
          1,
          false,
          a,
          "http://www.w3.org/1999/xlink",
          false,
          false,
        )
      })
    ;["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
      var b = a.replace(ja, ka)
      z[b] = new y(
        b,
        1,
        false,
        a,
        "http://www.w3.org/XML/1998/namespace",
        false,
        false,
      )
    })
    ;["tabIndex", "crossOrigin"].forEach(function (a) {
      z[a] = new y(a, 1, false, a.toLowerCase(), null, false, false)
    })
    z.xlinkHref = new y(
      "xlinkHref",
      1,
      false,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      true,
      false,
    )
    ;["src", "href", "action", "formAction"].forEach(function (a) {
      z[a] = new y(a, 1, false, a.toLowerCase(), null, true, true)
    })
    var B = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true,
    }
    var la = ["Webkit", "ms", "Moz", "O"]
    Object.keys(B).forEach(function (a) {
      la.forEach(function (b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1)
        B[b] = B[a]
      })
    })
    var oa = /["'&<>]/
    function C(a) {
      if ("boolean" === typeof a || "number" === typeof a) return "" + a
      a = "" + a
      var b = oa.exec(a)
      if (b) {
        var c = "",
          d,
          f = 0
        for (d = b.index; d < a.length; d++) {
          switch (a.charCodeAt(d)) {
            case 34:
              b = "&quot;"
              break
            case 38:
              b = "&amp;"
              break
            case 39:
              b = "&#x27;"
              break
            case 60:
              b = "&lt;"
              break
            case 62:
              b = "&gt;"
              break
            default:
              continue
          }
          f !== d && (c += a.substring(f, d))
          f = d + 1
          c += b
        }
        a = f !== d ? c + a.substring(f, d) : c
      }
      return a
    }
    var pa = /([A-Z])/g
    var qa = /^ms-/
    var ra = Array.isArray
    var sa = w("<script>")
    var ta = w("</script>")
    var ua = w('<script src="')
    var va = w('<script type="module" src="')
    var wa = w('" async=""></script>')
    var xa = /(<\/|<)(s)(cript)/gi
    function ya(a, b, c, d) {
      return "" + b + ("s" === c ? "\\u0073" : "\\u0053") + d
    }
    function za(a, b, c, d, f) {
      a = void 0 === a ? "" : a
      b = void 0 === b ? sa : w('<script nonce="' + C(b) + '">')
      var e = []
      void 0 !== c && e.push(b, u(("" + c).replace(xa, ya)), ta)
      if (void 0 !== d)
        for (c = 0; c < d.length; c++) e.push(ua, u(C(d[c])), wa)
      if (void 0 !== f)
        for (d = 0; d < f.length; d++) e.push(va, u(C(f[d])), wa)
      return {
        bootstrapChunks: e,
        startInlineScript: b,
        placeholderPrefix: w(a + "P:"),
        segmentPrefix: w(a + "S:"),
        boundaryPrefix: a + "B:",
        idPrefix: a,
        nextSuspenseID: 0,
        sentCompleteSegmentFunction: false,
        sentCompleteBoundaryFunction: false,
        sentClientRenderFunction: false,
      }
    }
    function D(a, b) {
      return { insertionMode: a, selectedValue: b }
    }
    function Aa(a) {
      return D(
        "http://www.w3.org/2000/svg" === a
          ? 2
          : "http://www.w3.org/1998/Math/MathML" === a
          ? 3
          : 0,
        null,
      )
    }
    function Ba(a, b, c) {
      switch (b) {
        case "select":
          return D(1, null != c.value ? c.value : c.defaultValue)
        case "svg":
          return D(2, null)
        case "math":
          return D(3, null)
        case "foreignObject":
          return D(1, null)
        case "table":
          return D(4, null)
        case "thead":
        case "tbody":
        case "tfoot":
          return D(5, null)
        case "colgroup":
          return D(7, null)
        case "tr":
          return D(6, null)
      }
      return 4 <= a.insertionMode || 0 === a.insertionMode ? D(1, null) : a
    }
    var Ca = w("<!-- -->")
    function Da(a, b, c, d) {
      if ("" === b) return d
      d && a.push(Ca)
      a.push(u(C(b)))
      return true
    }
    var Ea = /* @__PURE__ */ new Map()
    var Fa = w(' style="')
    var Ga = w(":")
    var Ha = w(";")
    function Ia(a, b, c) {
      if ("object" !== typeof c) throw Error(k(62))
      b = true
      for (var d in c)
        if (x.call(c, d)) {
          var f = c[d]
          if (null != f && "boolean" !== typeof f && "" !== f) {
            if (0 === d.indexOf("--")) {
              var e = u(C(d))
              f = u(C(("" + f).trim()))
            } else {
              e = d
              var g = Ea.get(e)
              void 0 !== g
                ? (e = g)
                : ((g = w(
                    C(e.replace(pa, "-$1").toLowerCase().replace(qa, "-ms-")),
                  )),
                  Ea.set(e, g),
                  (e = g))
              f =
                "number" === typeof f
                  ? 0 === f || x.call(B, d)
                    ? u("" + f)
                    : u(f + "px")
                  : u(C(("" + f).trim()))
            }
            b ? ((b = false), a.push(Fa, e, Ga, f)) : a.push(Ha, e, Ga, f)
          }
        }
      b || a.push(E)
    }
    var H = w(" ")
    var I = w('="')
    var E = w('"')
    var Ja = w('=""')
    function J(a, b, c, d) {
      switch (c) {
        case "style":
          Ia(a, b, d)
          return
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return
      }
      if (
        !(2 < c.length) ||
        ("o" !== c[0] && "O" !== c[0]) ||
        ("n" !== c[1] && "N" !== c[1])
      ) {
        if (((b = z.hasOwnProperty(c) ? z[c] : null), null !== b)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return
            case "boolean":
              if (!b.acceptsBooleans) return
          }
          c = u(b.attributeName)
          switch (b.type) {
            case 3:
              d && a.push(H, c, Ja)
              break
            case 4:
              true === d
                ? a.push(H, c, Ja)
                : false !== d && a.push(H, c, I, u(C(d)), E)
              break
            case 5:
              isNaN(d) || a.push(H, c, I, u(C(d)), E)
              break
            case 6:
              !isNaN(d) && 1 <= d && a.push(H, c, I, u(C(d)), E)
              break
            default:
              b.sanitizeURL && (d = "" + d), a.push(H, c, I, u(C(d)), E)
          }
        } else if (ia(c)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return
            case "boolean":
              if (
                ((b = c.toLowerCase().slice(0, 5)),
                "data-" !== b && "aria-" !== b)
              )
                return
          }
          a.push(H, u(c), I, u(C(d)), E)
        }
      }
    }
    var K = w(">")
    var Ka = w("/>")
    function L(a, b, c) {
      if (null != b) {
        if (null != c) throw Error(k(60))
        if ("object" !== typeof b || !("__html" in b)) throw Error(k(61))
        b = b.__html
        null !== b && void 0 !== b && a.push(u("" + b))
      }
    }
    function La(a) {
      var b = ""
      aa.Children.forEach(a, function (a2) {
        null != a2 && (b += a2)
      })
      return b
    }
    var Ma = w(' selected=""')
    function Na(a, b, c, d) {
      a.push(M(c))
      var f = (c = null),
        e
      for (e in b)
        if (x.call(b, e)) {
          var g = b[e]
          if (null != g)
            switch (e) {
              case "children":
                c = g
                break
              case "dangerouslySetInnerHTML":
                f = g
                break
              default:
                J(a, d, e, g)
            }
        }
      a.push(K)
      L(a, f, c)
      return "string" === typeof c ? (a.push(u(C(c))), null) : c
    }
    var Oa = w("\n")
    var Pa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/
    var Qa = /* @__PURE__ */ new Map()
    function M(a) {
      var b = Qa.get(a)
      if (void 0 === b) {
        if (!Pa.test(a)) throw Error(k(65, a))
        b = w("<" + a)
        Qa.set(a, b)
      }
      return b
    }
    var Ra = w("<!DOCTYPE html>")
    function Sa(a, b, c, d, f) {
      switch (b) {
        case "select":
          a.push(M("select"))
          var e = null,
            g = null
          for (r in c)
            if (x.call(c, r)) {
              var h = c[r]
              if (null != h)
                switch (r) {
                  case "children":
                    e = h
                    break
                  case "dangerouslySetInnerHTML":
                    g = h
                    break
                  case "defaultValue":
                  case "value":
                    break
                  default:
                    J(a, d, r, h)
                }
            }
          a.push(K)
          L(a, g, e)
          return e
        case "option":
          g = f.selectedValue
          a.push(M("option"))
          var m = (h = null),
            q = null
          var r = null
          for (e in c)
            if (x.call(c, e)) {
              var v = c[e]
              if (null != v)
                switch (e) {
                  case "children":
                    h = v
                    break
                  case "selected":
                    q = v
                    break
                  case "dangerouslySetInnerHTML":
                    r = v
                    break
                  case "value":
                    m = v
                  default:
                    J(a, d, e, v)
                }
            }
          if (null != g)
            if (((c = null !== m ? "" + m : La(h)), ra(g)))
              for (d = 0; d < g.length; d++) {
                if ("" + g[d] === c) {
                  a.push(Ma)
                  break
                }
              }
            else "" + g === c && a.push(Ma)
          else q && a.push(Ma)
          a.push(K)
          L(a, r, h)
          return h
        case "textarea":
          a.push(M("textarea"))
          r = g = e = null
          for (h in c)
            if (x.call(c, h) && ((m = c[h]), null != m))
              switch (h) {
                case "children":
                  r = m
                  break
                case "value":
                  e = m
                  break
                case "defaultValue":
                  g = m
                  break
                case "dangerouslySetInnerHTML":
                  throw Error(k(91))
                default:
                  J(a, d, h, m)
              }
          null === e && null !== g && (e = g)
          a.push(K)
          if (null != r) {
            if (null != e) throw Error(k(92))
            if (ra(r) && 1 < r.length) throw Error(k(93))
            e = "" + r
          }
          "string" === typeof e && "\n" === e[0] && a.push(Oa)
          null !== e && a.push(u(C("" + e)))
          return null
        case "input":
          a.push(M("input"))
          m = r = h = e = null
          for (g in c)
            if (x.call(c, g) && ((q = c[g]), null != q))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(k(399, "input"))
                case "defaultChecked":
                  m = q
                  break
                case "defaultValue":
                  h = q
                  break
                case "checked":
                  r = q
                  break
                case "value":
                  e = q
                  break
                default:
                  J(a, d, g, q)
              }
          null !== r
            ? J(a, d, "checked", r)
            : null !== m && J(a, d, "checked", m)
          null !== e ? J(a, d, "value", e) : null !== h && J(a, d, "value", h)
          a.push(Ka)
          return null
        case "menuitem":
          a.push(M("menuitem"))
          for (var A in c)
            if (x.call(c, A) && ((e = c[A]), null != e))
              switch (A) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(k(400))
                default:
                  J(a, d, A, e)
              }
          a.push(K)
          return null
        case "title":
          a.push(M("title"))
          e = null
          for (v in c)
            if (x.call(c, v) && ((g = c[v]), null != g))
              switch (v) {
                case "children":
                  e = g
                  break
                case "dangerouslySetInnerHTML":
                  throw Error(k(434))
                default:
                  J(a, d, v, g)
              }
          a.push(K)
          return e
        case "listing":
        case "pre":
          a.push(M(b))
          g = e = null
          for (m in c)
            if (x.call(c, m) && ((h = c[m]), null != h))
              switch (m) {
                case "children":
                  e = h
                  break
                case "dangerouslySetInnerHTML":
                  g = h
                  break
                default:
                  J(a, d, m, h)
              }
          a.push(K)
          if (null != g) {
            if (null != e) throw Error(k(60))
            if ("object" !== typeof g || !("__html" in g)) throw Error(k(61))
            c = g.__html
            null !== c &&
              void 0 !== c &&
              ("string" === typeof c && 0 < c.length && "\n" === c[0]
                ? a.push(Oa, u(c))
                : a.push(u("" + c)))
          }
          "string" === typeof e && "\n" === e[0] && a.push(Oa)
          return e
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          a.push(M(b))
          for (var F in c)
            if (x.call(c, F) && ((e = c[F]), null != e))
              switch (F) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(k(399, b))
                default:
                  J(a, d, F, e)
              }
          a.push(Ka)
          return null
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return Na(a, c, b, d)
        case "html":
          return 0 === f.insertionMode && a.push(Ra), Na(a, c, b, d)
        default:
          if (-1 === b.indexOf("-") && "string" !== typeof c.is)
            return Na(a, c, b, d)
          a.push(M(b))
          g = e = null
          for (q in c)
            if (x.call(c, q) && ((h = c[q]), null != h))
              switch (q) {
                case "children":
                  e = h
                  break
                case "dangerouslySetInnerHTML":
                  g = h
                  break
                case "style":
                  Ia(a, d, h)
                  break
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  break
                default:
                  ia(q) &&
                    "function" !== typeof h &&
                    "symbol" !== typeof h &&
                    a.push(H, u(q), I, u(C(h)), E)
              }
          a.push(K)
          L(a, g, e)
          return e
      }
    }
    var Ta = w("</")
    var Ua = w(">")
    var Va = w('<template id="')
    var Wa = w('"></template>')
    var Xa = w("<!--$-->")
    var Ya = w('<!--$?--><template id="')
    var Za = w('"></template>')
    var $a = w("<!--$!-->")
    var ab = w("<!--/$-->")
    var bb = w("<template")
    var cb = w('"')
    var db = w(' data-dgst="')
    w(' data-msg="')
    w(' data-stck="')
    var eb = w("></template>")
    function fb(a, b, c) {
      p(a, Ya)
      if (null === c) throw Error(k(395))
      p(a, c)
      return t(a, Za)
    }
    var gb = w('<div hidden id="')
    var hb = w('">')
    var ib = w("</div>")
    var jb = w('<svg aria-hidden="true" style="display:none" id="')
    var kb = w('">')
    var lb = w("</svg>")
    var mb = w('<math aria-hidden="true" style="display:none" id="')
    var nb = w('">')
    var ob = w("</math>")
    var pb = w('<table hidden id="')
    var qb = w('">')
    var rb = w("</table>")
    var sb = w('<table hidden><tbody id="')
    var tb = w('">')
    var ub = w("</tbody></table>")
    var vb = w('<table hidden><tr id="')
    var wb = w('">')
    var xb = w("</tr></table>")
    var yb = w('<table hidden><colgroup id="')
    var zb = w('">')
    var Ab = w("</colgroup></table>")
    function Bb(a, b, c, d) {
      switch (c.insertionMode) {
        case 0:
        case 1:
          return (
            p(a, gb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, hb)
          )
        case 2:
          return (
            p(a, jb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, kb)
          )
        case 3:
          return (
            p(a, mb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, nb)
          )
        case 4:
          return (
            p(a, pb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, qb)
          )
        case 5:
          return (
            p(a, sb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, tb)
          )
        case 6:
          return (
            p(a, vb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, wb)
          )
        case 7:
          return (
            p(a, yb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, zb)
          )
        default:
          throw Error(k(397))
      }
    }
    function Cb(a, b) {
      switch (b.insertionMode) {
        case 0:
        case 1:
          return t(a, ib)
        case 2:
          return t(a, lb)
        case 3:
          return t(a, ob)
        case 4:
          return t(a, rb)
        case 5:
          return t(a, ub)
        case 6:
          return t(a, xb)
        case 7:
          return t(a, Ab)
        default:
          throw Error(k(397))
      }
    }
    var Db = w(
      'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("',
    )
    var Eb = w('$RS("')
    var Gb = w('","')
    var Hb = w('")</script>')
    var Ib = w(
      'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("',
    )
    var Jb = w('$RC("')
    var Kb = w('","')
    var Lb = w('")</script>')
    var Mb = w(
      'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("',
    )
    var Nb = w('$RX("')
    var Ob = w('"')
    var Pb = w(")</script>")
    var Qb = w(",")
    var Rb = /[<\u2028\u2029]/g
    function Sb(a) {
      return JSON.stringify(a).replace(Rb, function (a2) {
        switch (a2) {
          case "<":
            return "\\u003c"
          case "\u2028":
            return "\\u2028"
          case "\u2029":
            return "\\u2029"
          default:
            throw Error(
              "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React",
            )
        }
      })
    }
    var N = Object.assign
    var Tb = Symbol.for("react.element")
    var Ub = Symbol.for("react.portal")
    var Vb = Symbol.for("react.fragment")
    var Wb = Symbol.for("react.strict_mode")
    var Xb = Symbol.for("react.profiler")
    var Yb = Symbol.for("react.provider")
    var Zb = Symbol.for("react.context")
    var $b = Symbol.for("react.forward_ref")
    var ac = Symbol.for("react.suspense")
    var bc = Symbol.for("react.suspense_list")
    var cc = Symbol.for("react.memo")
    var dc = Symbol.for("react.lazy")
    var ec = Symbol.for("react.scope")
    var fc = Symbol.for("react.debug_trace_mode")
    var gc = Symbol.for("react.legacy_hidden")
    var hc = Symbol.for("react.default_value")
    var ic = Symbol.iterator
    function jc(a) {
      if (null == a) return null
      if ("function" === typeof a) return a.displayName || a.name || null
      if ("string" === typeof a) return a
      switch (a) {
        case Vb:
          return "Fragment"
        case Ub:
          return "Portal"
        case Xb:
          return "Profiler"
        case Wb:
          return "StrictMode"
        case ac:
          return "Suspense"
        case bc:
          return "SuspenseList"
      }
      if ("object" === typeof a)
        switch (a.$$typeof) {
          case Zb:
            return (a.displayName || "Context") + ".Consumer"
          case Yb:
            return (a._context.displayName || "Context") + ".Provider"
          case $b:
            var b = a.render
            a = a.displayName
            a ||
              ((a = b.displayName || b.name || ""),
              (a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef"))
            return a
          case cc:
            return (
              (b = a.displayName || null), null !== b ? b : jc(a.type) || "Memo"
            )
          case dc:
            b = a._payload
            a = a._init
            try {
              return jc(a(b))
            } catch (c) {}
        }
      return null
    }
    var kc = {}
    function lc(a, b) {
      a = a.contextTypes
      if (!a) return kc
      var c = {},
        d
      for (d in a) c[d] = b[d]
      return c
    }
    var O = null
    function P(a, b) {
      if (a !== b) {
        a.context._currentValue = a.parentValue
        a = a.parent
        var c = b.parent
        if (null === a) {
          if (null !== c) throw Error(k(401))
        } else {
          if (null === c) throw Error(k(401))
          P(a, c)
        }
        b.context._currentValue = b.value
      }
    }
    function mc(a) {
      a.context._currentValue = a.parentValue
      a = a.parent
      null !== a && mc(a)
    }
    function nc(a) {
      var b = a.parent
      null !== b && nc(b)
      a.context._currentValue = a.value
    }
    function oc(a, b) {
      a.context._currentValue = a.parentValue
      a = a.parent
      if (null === a) throw Error(k(402))
      a.depth === b.depth ? P(a, b) : oc(a, b)
    }
    function pc(a, b) {
      var c = b.parent
      if (null === c) throw Error(k(402))
      a.depth === c.depth ? P(a, c) : pc(a, c)
      b.context._currentValue = b.value
    }
    function Q(a) {
      var b = O
      b !== a &&
        (null === b
          ? nc(a)
          : null === a
          ? mc(b)
          : b.depth === a.depth
          ? P(b, a)
          : b.depth > a.depth
          ? oc(b, a)
          : pc(b, a),
        (O = a))
    }
    var qc = {
      isMounted: function () {
        return false
      },
      enqueueSetState: function (a, b) {
        a = a._reactInternals
        null !== a.queue && a.queue.push(b)
      },
      enqueueReplaceState: function (a, b) {
        a = a._reactInternals
        a.replace = true
        a.queue = [b]
      },
      enqueueForceUpdate: function () {},
    }
    function rc(a, b, c, d) {
      var f = void 0 !== a.state ? a.state : null
      a.updater = qc
      a.props = c
      a.state = f
      var e = { queue: [], replace: false }
      a._reactInternals = e
      var g = b.contextType
      a.context = "object" === typeof g && null !== g ? g._currentValue : d
      g = b.getDerivedStateFromProps
      "function" === typeof g &&
        ((g = g(c, f)),
        (f = null === g || void 0 === g ? f : N({}, f, g)),
        (a.state = f))
      if (
        "function" !== typeof b.getDerivedStateFromProps &&
        "function" !== typeof a.getSnapshotBeforeUpdate &&
        ("function" === typeof a.UNSAFE_componentWillMount ||
          "function" === typeof a.componentWillMount)
      )
        if (
          ((b = a.state),
          "function" === typeof a.componentWillMount && a.componentWillMount(),
          "function" === typeof a.UNSAFE_componentWillMount &&
            a.UNSAFE_componentWillMount(),
          b !== a.state && qc.enqueueReplaceState(a, a.state, null),
          null !== e.queue && 0 < e.queue.length)
        )
          if (
            ((b = e.queue),
            (g = e.replace),
            (e.queue = null),
            (e.replace = false),
            g && 1 === b.length)
          )
            a.state = b[0]
          else {
            e = g ? b[0] : a.state
            f = true
            for (g = g ? 1 : 0; g < b.length; g++) {
              var h = b[g]
              h = "function" === typeof h ? h.call(a, e, c, d) : h
              null != h && (f ? ((f = false), (e = N({}, e, h))) : N(e, h))
            }
            a.state = e
          }
        else e.queue = null
    }
    var sc = { id: 1, overflow: "" }
    function tc(a, b, c) {
      var d = a.id
      a = a.overflow
      var f = 32 - uc(d) - 1
      d &= ~(1 << f)
      c += 1
      var e = 32 - uc(b) + f
      if (30 < e) {
        var g = f - (f % 5)
        e = (d & ((1 << g) - 1)).toString(32)
        d >>= g
        f -= g
        return { id: (1 << (32 - uc(b) + f)) | (c << f) | d, overflow: e + a }
      }
      return { id: (1 << e) | (c << f) | d, overflow: a }
    }
    var uc = Math.clz32 ? Math.clz32 : vc
    var wc = Math.log
    var xc = Math.LN2
    function vc(a) {
      a >>>= 0
      return 0 === a ? 32 : (31 - ((wc(a) / xc) | 0)) | 0
    }
    function yc(a, b) {
      return (a === b && (0 !== a || 1 / a === 1 / b)) || (a !== a && b !== b)
    }
    var zc = "function" === typeof Object.is ? Object.is : yc
    var R = null
    var Ac = null
    var Bc = null
    var S = null
    var T = false
    var Cc = false
    var U = 0
    var V = null
    var Dc = 0
    function W() {
      if (null === R) throw Error(k(321))
      return R
    }
    function Ec() {
      if (0 < Dc) throw Error(k(312))
      return { memoizedState: null, queue: null, next: null }
    }
    function Fc() {
      null === S
        ? null === Bc
          ? ((T = false), (Bc = S = Ec()))
          : ((T = true), (S = Bc))
        : null === S.next
        ? ((T = false), (S = S.next = Ec()))
        : ((T = true), (S = S.next))
      return S
    }
    function Gc() {
      Ac = R = null
      Cc = false
      Bc = null
      Dc = 0
      S = V = null
    }
    function Hc(a, b) {
      return "function" === typeof b ? b(a) : b
    }
    function Ic(a, b, c) {
      R = W()
      S = Fc()
      if (T) {
        var d = S.queue
        b = d.dispatch
        if (null !== V && ((c = V.get(d)), void 0 !== c)) {
          V.delete(d)
          d = S.memoizedState
          do (d = a(d, c.action)), (c = c.next)
          while (null !== c)
          S.memoizedState = d
          return [d, b]
        }
        return [S.memoizedState, b]
      }
      a =
        a === Hc ? ("function" === typeof b ? b() : b) : void 0 !== c ? c(b) : b
      S.memoizedState = a
      a = S.queue = { last: null, dispatch: null }
      a = a.dispatch = Jc.bind(null, R, a)
      return [S.memoizedState, a]
    }
    function Kc(a, b) {
      R = W()
      S = Fc()
      b = void 0 === b ? null : b
      if (null !== S) {
        var c = S.memoizedState
        if (null !== c && null !== b) {
          var d = c[1]
          a: if (null === d) d = false
          else {
            for (var f = 0; f < d.length && f < b.length; f++)
              if (!zc(b[f], d[f])) {
                d = false
                break a
              }
            d = true
          }
          if (d) return c[0]
        }
      }
      a = a()
      S.memoizedState = [a, b]
      return a
    }
    function Jc(a, b, c) {
      if (25 <= Dc) throw Error(k(301))
      if (a === R)
        if (
          ((Cc = true),
          (a = { action: c, next: null }),
          null === V && (V = /* @__PURE__ */ new Map()),
          (c = V.get(b)),
          void 0 === c)
        )
          V.set(b, a)
        else {
          for (b = c; null !== b.next; ) b = b.next
          b.next = a
        }
    }
    function Lc() {
      throw Error(k(394))
    }
    function Mc() {}
    var Oc = {
      readContext: function (a) {
        return a._currentValue
      },
      useContext: function (a) {
        W()
        return a._currentValue
      },
      useMemo: Kc,
      useReducer: Ic,
      useRef: function (a) {
        R = W()
        S = Fc()
        var b = S.memoizedState
        return null === b ? ((a = { current: a }), (S.memoizedState = a)) : b
      },
      useState: function (a) {
        return Ic(Hc, a)
      },
      useInsertionEffect: Mc,
      useLayoutEffect: function () {},
      useCallback: function (a, b) {
        return Kc(function () {
          return a
        }, b)
      },
      useImperativeHandle: Mc,
      useEffect: Mc,
      useDebugValue: Mc,
      useDeferredValue: function (a) {
        W()
        return a
      },
      useTransition: function () {
        W()
        return [false, Lc]
      },
      useId: function () {
        var a = Ac.treeContext
        var b = a.overflow
        a = a.id
        a = (a & ~(1 << (32 - uc(a) - 1))).toString(32) + b
        var c = Nc
        if (null === c) throw Error(k(404))
        b = U++
        a = ":" + c.idPrefix + "R" + a
        0 < b && (a += "H" + b.toString(32))
        return a + ":"
      },
      useMutableSource: function (a, b) {
        W()
        return b(a._source)
      },
      useSyncExternalStore: function (a, b, c) {
        if (void 0 === c) throw Error(k(407))
        return c()
      },
    }
    var Nc = null
    var Pc =
      aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentDispatcher
    function Qc(a) {
      console.error(a)
      return null
    }
    function X() {}
    function Rc(a, b, c, d, f, e, g, h, m) {
      var q = [],
        r = /* @__PURE__ */ new Set()
      b = {
        destination: null,
        responseState: b,
        progressiveChunkSize: void 0 === d ? 12800 : d,
        status: 0,
        fatalError: null,
        nextSegmentId: 0,
        allPendingTasks: 0,
        pendingRootTasks: 0,
        completedRootSegment: null,
        abortableTasks: r,
        pingedTasks: q,
        clientRenderedBoundaries: [],
        completedBoundaries: [],
        partialBoundaries: [],
        onError: void 0 === f ? Qc : f,
        onAllReady: void 0 === e ? X : e,
        onShellReady: void 0 === g ? X : g,
        onShellError: void 0 === h ? X : h,
        onFatalError: void 0 === m ? X : m,
      }
      c = Sc(b, 0, null, c, false, false)
      c.parentFlushed = true
      a = Tc(b, a, null, c, r, kc, null, sc)
      q.push(a)
      return b
    }
    function Tc(a, b, c, d, f, e, g, h) {
      a.allPendingTasks++
      null === c ? a.pendingRootTasks++ : c.pendingTasks++
      var m = {
        node: b,
        ping: function () {
          var b2 = a.pingedTasks
          b2.push(m)
          1 === b2.length && Uc(a)
        },
        blockedBoundary: c,
        blockedSegment: d,
        abortSet: f,
        legacyContext: e,
        context: g,
        treeContext: h,
      }
      f.add(m)
      return m
    }
    function Sc(a, b, c, d, f, e) {
      return {
        status: 0,
        id: -1,
        index: b,
        parentFlushed: false,
        chunks: [],
        children: [],
        formatContext: d,
        boundary: c,
        lastPushedText: f,
        textEmbedded: e,
      }
    }
    function Y(a, b) {
      a = a.onError(b)
      if (null != a && "string" !== typeof a)
        throw Error(
          'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
            typeof a +
            '" instead',
        )
      return a
    }
    function Vc(a, b) {
      var c = a.onShellError
      c(b)
      c = a.onFatalError
      c(b)
      null !== a.destination
        ? ((a.status = 2), da(a.destination, b))
        : ((a.status = 1), (a.fatalError = b))
    }
    function Wc(a, b, c, d, f) {
      R = {}
      Ac = b
      U = 0
      for (a = c(d, f); Cc; )
        (Cc = false), (U = 0), (Dc += 1), (S = null), (a = c(d, f))
      Gc()
      return a
    }
    function Xc(a, b, c, d) {
      var f = c.render(),
        e = d.childContextTypes
      if (null !== e && void 0 !== e) {
        var g = b.legacyContext
        if ("function" !== typeof c.getChildContext) d = g
        else {
          c = c.getChildContext()
          for (var h in c)
            if (!(h in e)) throw Error(k(108, jc(d) || "Unknown", h))
          d = N({}, g, c)
        }
        b.legacyContext = d
        Z(a, b, f)
        b.legacyContext = g
      } else Z(a, b, f)
    }
    function Yc(a, b) {
      if (a && a.defaultProps) {
        b = N({}, b)
        a = a.defaultProps
        for (var c in a) void 0 === b[c] && (b[c] = a[c])
        return b
      }
      return b
    }
    function Zc(a, b, c, d, f) {
      if ("function" === typeof c)
        if (c.prototype && c.prototype.isReactComponent) {
          f = lc(c, b.legacyContext)
          var e = c.contextType
          e = new c(
            d,
            "object" === typeof e && null !== e ? e._currentValue : f,
          )
          rc(e, c, d, f)
          Xc(a, b, e, c)
        } else {
          e = lc(c, b.legacyContext)
          f = Wc(a, b, c, d, e)
          var g = 0 !== U
          if (
            "object" === typeof f &&
            null !== f &&
            "function" === typeof f.render &&
            void 0 === f.$$typeof
          )
            rc(f, c, d, e), Xc(a, b, f, c)
          else if (g) {
            d = b.treeContext
            b.treeContext = tc(d, 1, 0)
            try {
              Z(a, b, f)
            } finally {
              b.treeContext = d
            }
          } else Z(a, b, f)
        }
      else if ("string" === typeof c) {
        f = b.blockedSegment
        e = Sa(f.chunks, c, d, a.responseState, f.formatContext)
        f.lastPushedText = false
        g = f.formatContext
        f.formatContext = Ba(g, c, d)
        $c(a, b, e)
        f.formatContext = g
        switch (c) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break
          default:
            f.chunks.push(Ta, u(c), Ua)
        }
        f.lastPushedText = false
      } else {
        switch (c) {
          case gc:
          case fc:
          case Wb:
          case Xb:
          case Vb:
            Z(a, b, d.children)
            return
          case bc:
            Z(a, b, d.children)
            return
          case ec:
            throw Error(k(343))
          case ac:
            a: {
              c = b.blockedBoundary
              f = b.blockedSegment
              e = d.fallback
              d = d.children
              g = /* @__PURE__ */ new Set()
              var h = {
                  id: null,
                  rootSegmentID: -1,
                  parentFlushed: false,
                  pendingTasks: 0,
                  forceClientRender: false,
                  completedSegments: [],
                  byteSize: 0,
                  fallbackAbortableTasks: g,
                  errorDigest: null,
                },
                m = Sc(a, f.chunks.length, h, f.formatContext, false, false)
              f.children.push(m)
              f.lastPushedText = false
              var q = Sc(a, 0, null, f.formatContext, false, false)
              q.parentFlushed = true
              b.blockedBoundary = h
              b.blockedSegment = q
              try {
                if (
                  ($c(a, b, d),
                  q.lastPushedText && q.textEmbedded && q.chunks.push(Ca),
                  (q.status = 1),
                  ad(h, q),
                  0 === h.pendingTasks)
                )
                  break a
              } catch (r) {
                ;(q.status = 4),
                  (h.forceClientRender = true),
                  (h.errorDigest = Y(a, r))
              } finally {
                ;(b.blockedBoundary = c), (b.blockedSegment = f)
              }
              b = Tc(a, e, c, m, g, b.legacyContext, b.context, b.treeContext)
              a.pingedTasks.push(b)
            }
            return
        }
        if ("object" === typeof c && null !== c)
          switch (c.$$typeof) {
            case $b:
              d = Wc(a, b, c.render, d, f)
              if (0 !== U) {
                c = b.treeContext
                b.treeContext = tc(c, 1, 0)
                try {
                  Z(a, b, d)
                } finally {
                  b.treeContext = c
                }
              } else Z(a, b, d)
              return
            case cc:
              c = c.type
              d = Yc(c, d)
              Zc(a, b, c, d, f)
              return
            case Yb:
              f = d.children
              c = c._context
              d = d.value
              e = c._currentValue
              c._currentValue = d
              g = O
              O = d = {
                parent: g,
                depth: null === g ? 0 : g.depth + 1,
                context: c,
                parentValue: e,
                value: d,
              }
              b.context = d
              Z(a, b, f)
              a = O
              if (null === a) throw Error(k(403))
              d = a.parentValue
              a.context._currentValue = d === hc ? a.context._defaultValue : d
              a = O = a.parent
              b.context = a
              return
            case Zb:
              d = d.children
              d = d(c._currentValue)
              Z(a, b, d)
              return
            case dc:
              f = c._init
              c = f(c._payload)
              d = Yc(c, d)
              Zc(a, b, c, d, void 0)
              return
          }
        throw Error(k(130, null == c ? c : typeof c, ""))
      }
    }
    function Z(a, b, c) {
      b.node = c
      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case Tb:
            Zc(a, b, c.type, c.props, c.ref)
            return
          case Ub:
            throw Error(k(257))
          case dc:
            var d = c._init
            c = d(c._payload)
            Z(a, b, c)
            return
        }
        if (ra(c)) {
          bd(a, b, c)
          return
        }
        null === c || "object" !== typeof c
          ? (d = null)
          : ((d = (ic && c[ic]) || c["@@iterator"]),
            (d = "function" === typeof d ? d : null))
        if (d && (d = d.call(c))) {
          c = d.next()
          if (!c.done) {
            var f = []
            do f.push(c.value), (c = d.next())
            while (!c.done)
            bd(a, b, f)
          }
          return
        }
        a = Object.prototype.toString.call(c)
        throw Error(
          k(
            31,
            "[object Object]" === a
              ? "object with keys {" + Object.keys(c).join(", ") + "}"
              : a,
          ),
        )
      }
      "string" === typeof c
        ? ((d = b.blockedSegment),
          (d.lastPushedText = Da(
            b.blockedSegment.chunks,
            c,
            a.responseState,
            d.lastPushedText,
          )))
        : "number" === typeof c &&
          ((d = b.blockedSegment),
          (d.lastPushedText = Da(
            b.blockedSegment.chunks,
            "" + c,
            a.responseState,
            d.lastPushedText,
          )))
    }
    function bd(a, b, c) {
      for (var d = c.length, f = 0; f < d; f++) {
        var e = b.treeContext
        b.treeContext = tc(e, d, f)
        try {
          $c(a, b, c[f])
        } finally {
          b.treeContext = e
        }
      }
    }
    function $c(a, b, c) {
      var d = b.blockedSegment.formatContext,
        f = b.legacyContext,
        e = b.context
      try {
        return Z(a, b, c)
      } catch (m) {
        if (
          (Gc(),
          "object" === typeof m && null !== m && "function" === typeof m.then)
        ) {
          c = m
          var g = b.blockedSegment,
            h = Sc(
              a,
              g.chunks.length,
              null,
              g.formatContext,
              g.lastPushedText,
              true,
            )
          g.children.push(h)
          g.lastPushedText = false
          a = Tc(
            a,
            b.node,
            b.blockedBoundary,
            h,
            b.abortSet,
            b.legacyContext,
            b.context,
            b.treeContext,
          ).ping
          c.then(a, a)
          b.blockedSegment.formatContext = d
          b.legacyContext = f
          b.context = e
          Q(e)
        } else
          throw (
            ((b.blockedSegment.formatContext = d),
            (b.legacyContext = f),
            (b.context = e),
            Q(e),
            m)
          )
      }
    }
    function cd(a) {
      var b = a.blockedBoundary
      a = a.blockedSegment
      a.status = 3
      dd(this, b, a)
    }
    function ed(a, b, c) {
      var d = a.blockedBoundary
      a.blockedSegment.status = 3
      null === d
        ? (b.allPendingTasks--,
          2 !== b.status &&
            ((b.status = 2), null !== b.destination && b.destination.close()))
        : (d.pendingTasks--,
          d.forceClientRender ||
            ((d.forceClientRender = true),
            (a = void 0 === c ? Error(k(432)) : c),
            (d.errorDigest = b.onError(a)),
            d.parentFlushed && b.clientRenderedBoundaries.push(d)),
          d.fallbackAbortableTasks.forEach(function (a2) {
            return ed(a2, b, c)
          }),
          d.fallbackAbortableTasks.clear(),
          b.allPendingTasks--,
          0 === b.allPendingTasks && ((d = b.onAllReady), d()))
    }
    function ad(a, b) {
      if (
        0 === b.chunks.length &&
        1 === b.children.length &&
        null === b.children[0].boundary
      ) {
        var c = b.children[0]
        c.id = b.id
        c.parentFlushed = true
        1 === c.status && ad(a, c)
      } else a.completedSegments.push(b)
    }
    function dd(a, b, c) {
      if (null === b) {
        if (c.parentFlushed) {
          if (null !== a.completedRootSegment) throw Error(k(389))
          a.completedRootSegment = c
        }
        a.pendingRootTasks--
        0 === a.pendingRootTasks &&
          ((a.onShellError = X), (b = a.onShellReady), b())
      } else
        b.pendingTasks--,
          b.forceClientRender ||
            (0 === b.pendingTasks
              ? (c.parentFlushed && 1 === c.status && ad(b, c),
                b.parentFlushed && a.completedBoundaries.push(b),
                b.fallbackAbortableTasks.forEach(cd, a),
                b.fallbackAbortableTasks.clear())
              : c.parentFlushed &&
                1 === c.status &&
                (ad(b, c),
                1 === b.completedSegments.length &&
                  b.parentFlushed &&
                  a.partialBoundaries.push(b)))
      a.allPendingTasks--
      0 === a.allPendingTasks && ((a = a.onAllReady), a())
    }
    function Uc(a) {
      if (2 !== a.status) {
        var b = O,
          c = Pc.current
        Pc.current = Oc
        var d = Nc
        Nc = a.responseState
        try {
          var f = a.pingedTasks,
            e
          for (e = 0; e < f.length; e++) {
            var g = f[e]
            var h = a,
              m = g.blockedSegment
            if (0 === m.status) {
              Q(g.context)
              try {
                Z(h, g, g.node),
                  m.lastPushedText && m.textEmbedded && m.chunks.push(Ca),
                  g.abortSet.delete(g),
                  (m.status = 1),
                  dd(h, g.blockedBoundary, m)
              } catch (G) {
                if (
                  (Gc(),
                  "object" === typeof G &&
                    null !== G &&
                    "function" === typeof G.then)
                ) {
                  var q = g.ping
                  G.then(q, q)
                } else {
                  g.abortSet.delete(g)
                  m.status = 4
                  var r = g.blockedBoundary,
                    v = G,
                    A = Y(h, v)
                  null === r
                    ? Vc(h, v)
                    : (r.pendingTasks--,
                      r.forceClientRender ||
                        ((r.forceClientRender = true),
                        (r.errorDigest = A),
                        r.parentFlushed && h.clientRenderedBoundaries.push(r)))
                  h.allPendingTasks--
                  if (0 === h.allPendingTasks) {
                    var F = h.onAllReady
                    F()
                  }
                }
              } finally {
              }
            }
          }
          f.splice(0, e)
          null !== a.destination && fd(a, a.destination)
        } catch (G) {
          Y(a, G), Vc(a, G)
        } finally {
          ;(Nc = d), (Pc.current = c), c === Oc && Q(b)
        }
      }
    }
    function gd(a, b, c) {
      c.parentFlushed = true
      switch (c.status) {
        case 0:
          var d = (c.id = a.nextSegmentId++)
          c.lastPushedText = false
          c.textEmbedded = false
          a = a.responseState
          p(b, Va)
          p(b, a.placeholderPrefix)
          a = u(d.toString(16))
          p(b, a)
          return t(b, Wa)
        case 1:
          c.status = 2
          var f = true
          d = c.chunks
          var e = 0
          c = c.children
          for (var g = 0; g < c.length; g++) {
            for (f = c[g]; e < f.index; e++) p(b, d[e])
            f = hd(a, b, f)
          }
          for (; e < d.length - 1; e++) p(b, d[e])
          e < d.length && (f = t(b, d[e]))
          return f
        default:
          throw Error(k(390))
      }
    }
    function hd(a, b, c) {
      var d = c.boundary
      if (null === d) return gd(a, b, c)
      d.parentFlushed = true
      if (d.forceClientRender)
        (d = d.errorDigest),
          t(b, $a),
          p(b, bb),
          d && (p(b, db), p(b, u(C(d))), p(b, cb)),
          t(b, eb),
          gd(a, b, c)
      else if (0 < d.pendingTasks) {
        d.rootSegmentID = a.nextSegmentId++
        0 < d.completedSegments.length && a.partialBoundaries.push(d)
        var f = a.responseState
        var e = f.nextSuspenseID++
        f = w(f.boundaryPrefix + e.toString(16))
        d = d.id = f
        fb(b, a.responseState, d)
        gd(a, b, c)
      } else if (d.byteSize > a.progressiveChunkSize)
        (d.rootSegmentID = a.nextSegmentId++),
          a.completedBoundaries.push(d),
          fb(b, a.responseState, d.id),
          gd(a, b, c)
      else {
        t(b, Xa)
        c = d.completedSegments
        if (1 !== c.length) throw Error(k(391))
        hd(a, b, c[0])
      }
      return t(b, ab)
    }
    function id(a, b, c) {
      Bb(b, a.responseState, c.formatContext, c.id)
      hd(a, b, c)
      return Cb(b, c.formatContext)
    }
    function jd(a, b, c) {
      for (var d = c.completedSegments, f = 0; f < d.length; f++)
        kd(a, b, c, d[f])
      d.length = 0
      a = a.responseState
      d = c.id
      c = c.rootSegmentID
      p(b, a.startInlineScript)
      a.sentCompleteBoundaryFunction
        ? p(b, Jb)
        : ((a.sentCompleteBoundaryFunction = true), p(b, Ib))
      if (null === d) throw Error(k(395))
      c = u(c.toString(16))
      p(b, d)
      p(b, Kb)
      p(b, a.segmentPrefix)
      p(b, c)
      return t(b, Lb)
    }
    function kd(a, b, c, d) {
      if (2 === d.status) return true
      var f = d.id
      if (-1 === f) {
        if (-1 === (d.id = c.rootSegmentID)) throw Error(k(392))
        return id(a, b, d)
      }
      id(a, b, d)
      a = a.responseState
      p(b, a.startInlineScript)
      a.sentCompleteSegmentFunction
        ? p(b, Eb)
        : ((a.sentCompleteSegmentFunction = true), p(b, Db))
      p(b, a.segmentPrefix)
      f = u(f.toString(16))
      p(b, f)
      p(b, Gb)
      p(b, a.placeholderPrefix)
      p(b, f)
      return t(b, Hb)
    }
    function fd(a, b) {
      l = new Uint8Array(512)
      n = 0
      try {
        var c = a.completedRootSegment
        if (null !== c && 0 === a.pendingRootTasks) {
          hd(a, b, c)
          a.completedRootSegment = null
          var d = a.responseState.bootstrapChunks
          for (c = 0; c < d.length - 1; c++) p(b, d[c])
          c < d.length && t(b, d[c])
        }
        var f = a.clientRenderedBoundaries,
          e
        for (e = 0; e < f.length; e++) {
          var g = f[e]
          d = b
          var h = a.responseState,
            m = g.id,
            q = g.errorDigest,
            r = g.errorMessage,
            v = g.errorComponentStack
          p(d, h.startInlineScript)
          h.sentClientRenderFunction
            ? p(d, Nb)
            : ((h.sentClientRenderFunction = true), p(d, Mb))
          if (null === m) throw Error(k(395))
          p(d, m)
          p(d, Ob)
          if (q || r || v) p(d, Qb), p(d, u(Sb(q || "")))
          if (r || v) p(d, Qb), p(d, u(Sb(r || "")))
          v && (p(d, Qb), p(d, u(Sb(v))))
          if (!t(d, Pb)) {
            a.destination = null
            e++
            f.splice(0, e)
            return
          }
        }
        f.splice(0, e)
        var A = a.completedBoundaries
        for (e = 0; e < A.length; e++)
          if (!jd(a, b, A[e])) {
            a.destination = null
            e++
            A.splice(0, e)
            return
          }
        A.splice(0, e)
        ba(b)
        l = new Uint8Array(512)
        n = 0
        var F = a.partialBoundaries
        for (e = 0; e < F.length; e++) {
          var G = F[e]
          a: {
            f = a
            g = b
            var ma = G.completedSegments
            for (h = 0; h < ma.length; h++)
              if (!kd(f, g, G, ma[h])) {
                h++
                ma.splice(0, h)
                var Fb = false
                break a
              }
            ma.splice(0, h)
            Fb = true
          }
          if (!Fb) {
            a.destination = null
            e++
            F.splice(0, e)
            return
          }
        }
        F.splice(0, e)
        var na = a.completedBoundaries
        for (e = 0; e < na.length; e++)
          if (!jd(a, b, na[e])) {
            a.destination = null
            e++
            na.splice(0, e)
            return
          }
        na.splice(0, e)
      } finally {
        ba(b),
          0 === a.allPendingTasks &&
            0 === a.pingedTasks.length &&
            0 === a.clientRenderedBoundaries.length &&
            0 === a.completedBoundaries.length &&
            b.close()
      }
    }
    function ld(a, b) {
      try {
        var c = a.abortableTasks
        c.forEach(function (c2) {
          return ed(c2, a, b)
        })
        c.clear()
        null !== a.destination && fd(a, a.destination)
      } catch (d) {
        Y(a, d), Vc(a, d)
      }
    }
    exports.renderToReadableStream = function (a, b) {
      return new Promise(function (c, d) {
        var f,
          e,
          g = new Promise(function (a2, b2) {
            e = a2
            f = b2
          }),
          h = Rc(
            a,
            za(
              b ? b.identifierPrefix : void 0,
              b ? b.nonce : void 0,
              b ? b.bootstrapScriptContent : void 0,
              b ? b.bootstrapScripts : void 0,
              b ? b.bootstrapModules : void 0,
            ),
            Aa(b ? b.namespaceURI : void 0),
            b ? b.progressiveChunkSize : void 0,
            b ? b.onError : void 0,
            e,
            function () {
              var a2 = new ReadableStream(
                {
                  type: "bytes",
                  pull: function (a3) {
                    if (1 === h.status) (h.status = 2), da(a3, h.fatalError)
                    else if (2 !== h.status && null === h.destination) {
                      h.destination = a3
                      try {
                        fd(h, a3)
                      } catch (A) {
                        Y(h, A), Vc(h, A)
                      }
                    }
                  },
                  cancel: function () {
                    ld(h)
                  },
                },
                { highWaterMark: 0 },
              )
              a2.allReady = g
              c(a2)
            },
            function (a2) {
              g.catch(function () {})
              d(a2)
            },
            f,
          )
        if (b && b.signal) {
          var m = b.signal,
            q = function () {
              ld(h, m.reason)
              m.removeEventListener("abort", q)
            }
          m.addEventListener("abort", q)
        }
        Uc(h)
      })
    }
    exports.version = "18.2.0"
  },
})

// node_modules/react-dom/server.browser.js
var require_server_browser = __commonJS({
  "node_modules/react-dom/server.browser.js"(exports) {
    "use strict"
    var l
    var s
    if (true) {
      l = require_react_dom_server_legacy_browser_production_min()
      s = require_react_dom_server_browser_production_min()
    } else {
      l = null
      s = null
    }
    exports.version = l.version
    exports.renderToString = l.renderToString
    exports.renderToStaticMarkup = l.renderToStaticMarkup
    exports.renderToNodeStream = l.renderToNodeStream
    exports.renderToStaticNodeStream = l.renderToStaticNodeStream
    exports.renderToReadableStream = s.renderToReadableStream
  },
})

// node_modules/react/cjs/react-jsx-runtime.production.min.js
var require_react_jsx_runtime_production_min = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
    "use strict"
    var f = require_react()
    var k = Symbol.for("react.element")
    var l = Symbol.for("react.fragment")
    var m = Object.prototype.hasOwnProperty
    var n =
      f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
    var p = { key: true, ref: true, __self: true, __source: true }
    function q(c, a, g) {
      var b,
        d = {},
        e = null,
        h = null
      void 0 !== g && (e = "" + g)
      void 0 !== a.key && (e = "" + a.key)
      void 0 !== a.ref && (h = a.ref)
      for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b])
      if (c && c.defaultProps)
        for (b in ((a = c.defaultProps), a)) void 0 === d[b] && (d[b] = a[b])
      return {
        $$typeof: k,
        type: c,
        key: e,
        ref: h,
        props: d,
        _owner: n.current,
      }
    }
    exports.Fragment = l
    exports.jsx = q
    exports.jsxs = q
  },
})

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict"
    if (true) {
      module.exports = require_react_jsx_runtime_production_min()
    } else {
      module.exports = null
    }
  },
})

// node_modules/@remix-run/cloudflare-pages/dist/esm/worker.js
var import_cloudflare = __toESM(require_dist())
function createRequestHandler2({ build, getLoadContext, mode }) {
  let handleRequest3 = (0, import_cloudflare.createRequestHandler)(build, mode)
  return (context) => {
    let loadContext =
      getLoadContext === null || getLoadContext === void 0
        ? void 0
        : getLoadContext(context)
    return handleRequest3(context.request, loadContext)
  }
}
function createPagesFunctionHandler({ build, getLoadContext, mode }) {
  let handleRequest3 = createRequestHandler2({
    build,
    getLoadContext,
    mode,
  })
  let handleFetch = async (context) => {
    let response
    context.request.headers.delete("if-none-match")
    try {
      response = await context.env.ASSETS.fetch(
        context.request.url,
        context.request.clone(),
      )
      response =
        response && response.status >= 200 && response.status < 400
          ? new Response(response.body, response)
          : void 0
    } catch {}
    if (!response) {
      response = await handleRequest3(context)
    }
    return response
  }
  return async (context) => {
    try {
      return await handleFetch(context)
    } catch (error) {
      if (false) {
        console.error(error)
        return new Response(error.message || error.toString(), {
          status: 500,
        })
      }
      return new Response("Internal Error", {
        status: 500,
      })
    }
  }
}

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {}
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes,
})

// app/entry.server.tsx
var entry_server_exports = {}
__export(entry_server_exports, {
  default: () => handleRequest,
})

// node_modules/@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js
function _extends2() {
  _extends2 = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i]
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
        return target
      }
  return _extends2.apply(this, arguments)
}

// node_modules/@remix-run/react/dist/esm/components.js
var React4 = __toESM(require_react())

// node_modules/react-router-dom/dist/index.js
var React2 = __toESM(require_react())

// node_modules/react-router/dist/index.js
init_router()
init_router()
var React = __toESM(require_react())
function _extends3() {
  _extends3 = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i]
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
        return target
      }
  return _extends3.apply(this, arguments)
}
function isPolyfill(x, y) {
  return (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)
}
var is = typeof Object.is === "function" ? Object.is : isPolyfill
var {
  useState: useState2,
  useEffect: useEffect2,
  useLayoutEffect: useLayoutEffect2,
  useDebugValue,
} = React
function useSyncExternalStore$2(subscribe, getSnapshot, getServerSnapshot) {
  if (false) {
    if (!didWarnOld18Alpha) {
      if ("startTransition" in React) {
        didWarnOld18Alpha = true
        console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.",
        )
      }
    }
  }
  const value = getSnapshot()
  if (false) {
    if (!didWarnUncachedGetSnapshot) {
      const cachedValue = getSnapshot()
      if (!is(value, cachedValue)) {
        console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop",
        )
        didWarnUncachedGetSnapshot = true
      }
    }
  }
  const [{ inst }, forceUpdate] = useState2({
    inst: {
      value,
      getSnapshot,
    },
  })
  useLayoutEffect2(() => {
    inst.value = value
    inst.getSnapshot = getSnapshot
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({
        inst,
      })
    }
  }, [subscribe, value, getSnapshot])
  useEffect2(() => {
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({
        inst,
      })
    }
    const handleStoreChange = () => {
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({
          inst,
        })
      }
    }
    return subscribe(handleStoreChange)
  }, [subscribe])
  useDebugValue(value)
  return value
}
function checkIfSnapshotChanged(inst) {
  const latestGetSnapshot = inst.getSnapshot
  const prevValue = inst.value
  try {
    const nextValue = latestGetSnapshot()
    return !is(prevValue, nextValue)
  } catch (error) {
    return true
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  return getSnapshot()
}
var canUseDOM = !!(
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
)
var isServerEnvironment = !canUseDOM
var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore$2
var useSyncExternalStore =
  "useSyncExternalStore" in React
    ? ((module) => module.useSyncExternalStore)(React)
    : shim
var DataStaticRouterContext = /* @__PURE__ */ React.createContext(null)
if (false) {
  DataStaticRouterContext.displayName = "DataStaticRouterContext"
}
if (false) {
  DataRouterContext.displayName = "DataRouter"
}
var DataRouterStateContext = /* @__PURE__ */ React.createContext(null)
if (false) {
  DataRouterStateContext.displayName = "DataRouterState"
}
if (false) {
  AwaitContext.displayName = "Await"
}
var NavigationContext = /* @__PURE__ */ React.createContext(null)
if (false) {
  NavigationContext.displayName = "Navigation"
}
var LocationContext = /* @__PURE__ */ React.createContext(null)
if (false) {
  LocationContext.displayName = "Location"
}
var RouteContext = /* @__PURE__ */ React.createContext({
  outlet: null,
  matches: [],
})
if (false) {
  RouteContext.displayName = "Route"
}
var RouteErrorContext = /* @__PURE__ */ React.createContext(null)
if (false) {
  RouteErrorContext.displayName = "RouteError"
}
function useHref(to, _temp) {
  let { relative } = _temp === void 0 ? {} : _temp
  !useInRouterContext()
    ? false
      ? invariant(
          false,
          "useHref() may be used only in the context of a <Router> component.",
        )
      : invariant(false)
    : void 0
  let { basename, navigator } = React.useContext(NavigationContext)
  let { hash, pathname, search } = useResolvedPath(to, {
    relative,
  })
  let joinedPathname = pathname
  if (basename !== "/") {
    joinedPathname =
      pathname === "/" ? basename : joinPaths([basename, pathname])
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash,
  })
}
function useInRouterContext() {
  return React.useContext(LocationContext) != null
}
function useLocation() {
  !useInRouterContext()
    ? false
      ? invariant(
          false,
          "useLocation() may be used only in the context of a <Router> component.",
        )
      : invariant(false)
    : void 0
  return React.useContext(LocationContext).location
}
function useNavigate() {
  !useInRouterContext()
    ? false
      ? invariant(
          false,
          "useNavigate() may be used only in the context of a <Router> component.",
        )
      : invariant(false)
    : void 0
  let { basename, navigator } = React.useContext(NavigationContext)
  let { matches } = React.useContext(RouteContext)
  let { pathname: locationPathname } = useLocation()
  let routePathnamesJson = JSON.stringify(
    getPathContributingMatches(matches).map((match) => match.pathnameBase),
  )
  let activeRef = React.useRef(false)
  React.useEffect(() => {
    activeRef.current = true
  })
  let navigate = React.useCallback(
    function (to, options) {
      if (options === void 0) {
        options = {}
      }
      false
        ? warning(
            activeRef.current,
            "You should call navigate() in a React.useEffect(), not when your component is first rendered.",
          )
        : void 0
      if (!activeRef.current) return
      if (typeof to === "number") {
        navigator.go(to)
        return
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path",
      )
      if (basename !== "/") {
        path.pathname =
          path.pathname === "/"
            ? basename
            : joinPaths([basename, path.pathname])
      }
      ;(options.replace ? navigator.replace : navigator.push)(
        path,
        options.state,
        options,
      )
    },
    [basename, navigator, routePathnamesJson, locationPathname],
  )
  return navigate
}
var OutletContext = /* @__PURE__ */ React.createContext(null)
function useOutlet(context) {
  let outlet = React.useContext(RouteContext).outlet
  if (outlet) {
    return /* @__PURE__ */ React.createElement(
      OutletContext.Provider,
      {
        value: context,
      },
      outlet,
    )
  }
  return outlet
}
function useResolvedPath(to, _temp2) {
  let { relative } = _temp2 === void 0 ? {} : _temp2
  let { matches } = React.useContext(RouteContext)
  let { pathname: locationPathname } = useLocation()
  let routePathnamesJson = JSON.stringify(
    getPathContributingMatches(matches).map((match) => match.pathnameBase),
  )
  return React.useMemo(
    () =>
      resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        relative === "path",
      ),
    [to, routePathnamesJson, locationPathname, relative],
  )
}
function useRoutes(routes2, locationArg) {
  !useInRouterContext()
    ? false
      ? invariant(
          false,
          "useRoutes() may be used only in the context of a <Router> component.",
        )
      : invariant(false)
    : void 0
  let { navigator } = React.useContext(NavigationContext)
  let dataRouterStateContext = React.useContext(DataRouterStateContext)
  let { matches: parentMatches } = React.useContext(RouteContext)
  let routeMatch = parentMatches[parentMatches.length - 1]
  let parentParams = routeMatch ? routeMatch.params : {}
  let parentPathname = routeMatch ? routeMatch.pathname : "/"
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/"
  let parentRoute = routeMatch && routeMatch.route
  if (false) {
    let parentPath = (parentRoute && parentRoute.path) || ""
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*"),
      "You rendered descendant <Routes> (or called `useRoutes()`) at " +
        ('"' +
          parentPathname +
          '" (under <Route path="' +
          parentPath +
          '">) but the ') +
        `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` +
        ('Please change the parent <Route path="' +
          parentPath +
          '"> to <Route ') +
        ('path="' + (parentPath === "/" ? "*" : parentPath + "/*") + '">.'),
    )
  }
  let locationFromContext = useLocation()
  let location
  if (locationArg) {
    var _parsedLocationArg$pa
    let parsedLocationArg =
      typeof locationArg === "string" ? parsePath(locationArg) : locationArg
    !(
      parentPathnameBase === "/" ||
      ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null
        ? void 0
        : _parsedLocationArg$pa.startsWith(parentPathnameBase))
    )
      ? false
        ? invariant(
            false,
            "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " +
              ('matched by all parent routes. The current pathname base is "' +
                parentPathnameBase +
                '" ') +
              ('but pathname "' +
                parsedLocationArg.pathname +
                '" was given in the `location` prop.'),
          )
        : invariant(false)
      : void 0
    location = parsedLocationArg
  } else {
    location = locationFromContext
  }
  let pathname = location.pathname || "/"
  let remainingPathname =
    parentPathnameBase === "/"
      ? pathname
      : pathname.slice(parentPathnameBase.length) || "/"
  let matches = matchRoutes(routes2, {
    pathname: remainingPathname,
  })
  if (false) {
    false
      ? warning(
          parentRoute || matches != null,
          'No routes matched location "' +
            location.pathname +
            location.search +
            location.hash +
            '" ',
        )
      : void 0
    false
      ? warning(
          matches == null ||
            matches[matches.length - 1].route.element !== void 0,
          'Matched leaf route at location "' +
            location.pathname +
            location.search +
            location.hash +
            '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.',
        )
      : void 0
  }
  let renderedMatches = _renderMatches(
    matches &&
      matches.map((match) =>
        Object.assign({}, match, {
          params: Object.assign({}, parentParams, match.params),
          pathname: joinPaths([
            parentPathnameBase,
            navigator.encodeLocation
              ? navigator.encodeLocation(match.pathname).pathname
              : match.pathname,
          ]),
          pathnameBase:
            match.pathnameBase === "/"
              ? parentPathnameBase
              : joinPaths([
                  parentPathnameBase,
                  navigator.encodeLocation
                    ? navigator.encodeLocation(match.pathnameBase).pathname
                    : match.pathnameBase,
                ]),
        }),
      ),
    parentMatches,
    dataRouterStateContext || void 0,
  )
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ React.createElement(
      LocationContext.Provider,
      {
        value: {
          location: _extends3(
            {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
            },
            location,
          ),
          navigationType: Action.Pop,
        },
      },
      renderedMatches,
    )
  }
  return renderedMatches
}
function DefaultErrorElement() {
  let error = useRouteError()
  let message = isRouteErrorResponse(error)
    ? error.status + " " + error.statusText
    : error instanceof Error
    ? error.message
    : JSON.stringify(error)
  let stack = error instanceof Error ? error.stack : null
  let lightgrey = "rgba(200,200,200, 0.5)"
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey,
  }
  let codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey,
  }
  return /* @__PURE__ */ React.createElement(
    React.Fragment,
    null,
    /* @__PURE__ */ React.createElement("h2", null, "Unhandled Thrown Error!"),
    /* @__PURE__ */ React.createElement(
      "h3",
      {
        style: {
          fontStyle: "italic",
        },
      },
      message,
    ),
    stack
      ? /* @__PURE__ */ React.createElement(
          "pre",
          {
            style: preStyles,
          },
          stack,
        )
      : null,
    /* @__PURE__ */ React.createElement(
      "p",
      null,
      "\u{1F4BF} Hey developer \u{1F44B}",
    ),
    /* @__PURE__ */ React.createElement(
      "p",
      null,
      "You can provide a way better UX than this when your app throws errors by providing your own\xA0",
      /* @__PURE__ */ React.createElement(
        "code",
        {
          style: codeStyles,
        },
        "errorElement",
      ),
      " props on\xA0",
      /* @__PURE__ */ React.createElement(
        "code",
        {
          style: codeStyles,
        },
        "<Route>",
      ),
    ),
  )
}
var RenderErrorBoundary = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: props.location,
      error: props.error,
    }
  }
  static getDerivedStateFromError(error) {
    return {
      error,
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return {
        error: props.error,
        location: props.location,
      }
    }
    return {
      error: props.error || state.error,
      location: state.location,
    }
  }
  componentDidCatch(error, errorInfo) {
    console.error(
      "React Router caught the following error during render",
      error,
      errorInfo,
    )
  }
  render() {
    return this.state.error
      ? /* @__PURE__ */ React.createElement(RouteErrorContext.Provider, {
          value: this.state.error,
          children: this.props.component,
        })
      : this.props.children
  }
}
function RenderedRoute(_ref) {
  let { routeContext, match, children } = _ref
  let dataStaticRouterContext = React.useContext(DataStaticRouterContext)
  if (dataStaticRouterContext && match.route.errorElement) {
    dataStaticRouterContext._deepestRenderedBoundaryId = match.route.id
  }
  return /* @__PURE__ */ React.createElement(
    RouteContext.Provider,
    {
      value: routeContext,
    },
    children,
  )
}
function _renderMatches(matches, parentMatches, dataRouterState) {
  if (parentMatches === void 0) {
    parentMatches = []
  }
  if (matches == null) {
    if (dataRouterState != null && dataRouterState.errors) {
      matches = dataRouterState.matches
    } else {
      return null
    }
  }
  let renderedMatches = matches
  let errors = dataRouterState == null ? void 0 : dataRouterState.errors
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]),
    )
    !(errorIndex >= 0)
      ? false
        ? invariant(
            false,
            "Could not find a matching route for the current errors: " + errors,
          )
        : invariant(false)
      : void 0
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1),
    )
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error = match.route.id
      ? errors == null
        ? void 0
        : errors[match.route.id]
      : null
    let errorElement = dataRouterState
      ? match.route.errorElement ||
        /* @__PURE__ */ React.createElement(DefaultErrorElement, null)
      : null
    let getChildren = () =>
      /* @__PURE__ */ React.createElement(
        RenderedRoute,
        {
          match,
          routeContext: {
            outlet,
            matches: parentMatches.concat(renderedMatches.slice(0, index + 1)),
          },
        },
        error
          ? errorElement
          : match.route.element !== void 0
          ? match.route.element
          : outlet,
      )
    return dataRouterState && (match.route.errorElement || index === 0)
      ? /* @__PURE__ */ React.createElement(RenderErrorBoundary, {
          location: dataRouterState.location,
          component: errorElement,
          error,
          children: getChildren(),
        })
      : getChildren()
  }, null)
}
var DataRouterHook
;(function (DataRouterHook3) {
  DataRouterHook3["UseRevalidator"] = "useRevalidator"
})(DataRouterHook || (DataRouterHook = {}))
var DataRouterStateHook
;(function (DataRouterStateHook3) {
  DataRouterStateHook3["UseLoaderData"] = "useLoaderData"
  DataRouterStateHook3["UseActionData"] = "useActionData"
  DataRouterStateHook3["UseRouteError"] = "useRouteError"
  DataRouterStateHook3["UseNavigation"] = "useNavigation"
  DataRouterStateHook3["UseRouteLoaderData"] = "useRouteLoaderData"
  DataRouterStateHook3["UseMatches"] = "useMatches"
  DataRouterStateHook3["UseRevalidator"] = "useRevalidator"
})(DataRouterStateHook || (DataRouterStateHook = {}))
function useDataRouterState(hookName) {
  let state = React.useContext(DataRouterStateContext)
  !state
    ? false
      ? invariant(false, getDataRouterConsoleError(hookName))
      : invariant(false)
    : void 0
  return state
}
function useRouteError() {
  var _state$errors
  let error = React.useContext(RouteErrorContext)
  let state = useDataRouterState(DataRouterStateHook.UseRouteError)
  let route = React.useContext(RouteContext)
  let thisRoute = route.matches[route.matches.length - 1]
  if (error) {
    return error
  }
  !route
    ? false
      ? invariant(false, "useRouteError must be used inside a RouteContext")
      : invariant(false)
    : void 0
  !thisRoute.route.id
    ? false
      ? invariant(
          false,
          'useRouteError can only be used on routes that contain a unique "id"',
        )
      : invariant(false)
    : void 0
  return (_state$errors = state.errors) == null
    ? void 0
    : _state$errors[thisRoute.route.id]
}
function Outlet(props) {
  return useOutlet(props.context)
}
function Router(_ref4) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator,
    static: staticProp = false,
  } = _ref4
  useInRouterContext()
    ? false
      ? invariant(
          false,
          "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
        )
      : invariant(false)
    : void 0
  let basename = basenameProp.replace(/^\/*/, "/")
  let navigationContext = React.useMemo(
    () => ({
      basename,
      navigator,
      static: staticProp,
    }),
    [basename, navigator, staticProp],
  )
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp)
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default",
  } = locationProp
  let location = React.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename)
    if (trailingPathname == null) {
      return null
    }
    return {
      pathname: trailingPathname,
      search,
      hash,
      state,
      key,
    }
  }, [basename, pathname, search, hash, state, key])
  false
    ? warning(
        location != null,
        '<Router basename="' +
          basename +
          '"> is not able to match the URL ' +
          ('"' +
            pathname +
            search +
            hash +
            '" because it does not start with the ') +
          "basename, so the <Router> won't render anything.",
      )
    : void 0
  if (location == null) {
    return null
  }
  return /* @__PURE__ */ React.createElement(
    NavigationContext.Provider,
    {
      value: navigationContext,
    },
    /* @__PURE__ */ React.createElement(LocationContext.Provider, {
      children,
      value: {
        location,
        navigationType,
      },
    }),
  )
}
var AwaitRenderStatus
;(function (AwaitRenderStatus2) {
  AwaitRenderStatus2[(AwaitRenderStatus2["pending"] = 0)] = "pending"
  AwaitRenderStatus2[(AwaitRenderStatus2["success"] = 1)] = "success"
  AwaitRenderStatus2[(AwaitRenderStatus2["error"] = 2)] = "error"
})(AwaitRenderStatus || (AwaitRenderStatus = {}))
var neverSettledPromise = new Promise(() => {})

// node_modules/react-router-dom/dist/index.js
function _extends4() {
  _extends4 = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i]
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
        return target
      }
  return _extends4.apply(this, arguments)
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {}
  var target = {}
  var sourceKeys = Object.keys(source)
  var key, i
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i]
    if (excluded.indexOf(key) >= 0) continue
    target[key] = source[key]
  }
  return target
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}
function shouldProcessLinkClick(event, target) {
  return (
    event.button === 0 &&
    (!target || target === "_self") &&
    !isModifiedEvent(event)
  )
}
var _excluded = [
  "onClick",
  "relative",
  "reloadDocument",
  "replace",
  "state",
  "target",
  "to",
  "preventScrollReset",
]
var _excluded2 = [
  "aria-current",
  "caseSensitive",
  "className",
  "end",
  "style",
  "to",
  "children",
]
if (false) {
  HistoryRouter.displayName = "unstable_HistoryRouter"
}
var Link = /* @__PURE__ */ React2.forwardRef(function LinkWithRef(_ref4, ref) {
  let {
      onClick,
      relative,
      reloadDocument,
      replace,
      state,
      target,
      to,
      preventScrollReset,
    } = _ref4,
    rest = _objectWithoutPropertiesLoose(_ref4, _excluded)
  let href = useHref(to, {
    relative,
  })
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative,
  })
  function handleClick(event) {
    if (onClick) onClick(event)
    if (!event.defaultPrevented) {
      internalOnClick(event)
    }
  }
  return /* @__PURE__ */ React2.createElement(
    "a",
    _extends4({}, rest, {
      href,
      onClick: reloadDocument ? onClick : handleClick,
      ref,
      target,
    }),
  )
})
if (false) {
  Link.displayName = "Link"
}
var NavLink = /* @__PURE__ */ React2.forwardRef(function NavLinkWithRef(
  _ref5,
  ref,
) {
  let {
      "aria-current": ariaCurrentProp = "page",
      caseSensitive = false,
      className: classNameProp = "",
      end = false,
      style: styleProp,
      to,
      children,
    } = _ref5,
    rest = _objectWithoutPropertiesLoose(_ref5, _excluded2)
  let path = useResolvedPath(to, {
    relative: rest.relative,
  })
  let location = useLocation()
  let routerState = React2.useContext(DataRouterStateContext)
  let { navigator } = React2.useContext(NavigationContext)
  let toPathname = navigator.encodeLocation
    ? navigator.encodeLocation(path).pathname
    : path.pathname
  let locationPathname = location.pathname
  let nextLocationPathname =
    routerState && routerState.navigation && routerState.navigation.location
      ? routerState.navigation.location.pathname
      : null
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase()
    nextLocationPathname = nextLocationPathname
      ? nextLocationPathname.toLowerCase()
      : null
    toPathname = toPathname.toLowerCase()
  }
  let isActive =
    locationPathname === toPathname ||
    (!end &&
      locationPathname.startsWith(toPathname) &&
      locationPathname.charAt(toPathname.length) === "/")
  let isPending =
    nextLocationPathname != null &&
    (nextLocationPathname === toPathname ||
      (!end &&
        nextLocationPathname.startsWith(toPathname) &&
        nextLocationPathname.charAt(toPathname.length) === "/"))
  let ariaCurrent = isActive ? ariaCurrentProp : void 0
  let className
  if (typeof classNameProp === "function") {
    className = classNameProp({
      isActive,
      isPending,
    })
  } else {
    className = [
      classNameProp,
      isActive ? "active" : null,
      isPending ? "pending" : null,
    ]
      .filter(Boolean)
      .join(" ")
  }
  let style =
    typeof styleProp === "function"
      ? styleProp({
          isActive,
          isPending,
        })
      : styleProp
  return /* @__PURE__ */ React2.createElement(
    Link,
    _extends4({}, rest, {
      "aria-current": ariaCurrent,
      className,
      ref,
      style,
      to,
    }),
    typeof children === "function"
      ? children({
          isActive,
          isPending,
        })
      : children,
  )
})
if (false) {
  NavLink.displayName = "NavLink"
}
if (false) {
  Form.displayName = "Form"
}
if (false) {
  FormImpl.displayName = "FormImpl"
}
if (false) {
  ScrollRestoration.displayName = "ScrollRestoration"
}
var DataRouterHook2
;(function (DataRouterHook3) {
  DataRouterHook3["UseScrollRestoration"] = "useScrollRestoration"
  DataRouterHook3["UseSubmitImpl"] = "useSubmitImpl"
  DataRouterHook3["UseFetcher"] = "useFetcher"
})(DataRouterHook2 || (DataRouterHook2 = {}))
var DataRouterStateHook2
;(function (DataRouterStateHook3) {
  DataRouterStateHook3["UseFetchers"] = "useFetchers"
  DataRouterStateHook3["UseScrollRestoration"] = "useScrollRestoration"
})(DataRouterStateHook2 || (DataRouterStateHook2 = {}))
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
  } = _temp === void 0 ? {} : _temp
  let navigate = useNavigate()
  let location = useLocation()
  let path = useResolvedPath(to, {
    relative,
  })
  return React2.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault()
        let replace =
          replaceProp !== void 0
            ? replaceProp
            : createPath(location) === createPath(path)
        navigate(to, {
          replace,
          state,
          preventScrollReset,
          relative,
        })
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      state,
      target,
      to,
      preventScrollReset,
      relative,
    ],
  )
}

// node_modules/@remix-run/react/dist/esm/errorBoundaries.js
var import_react = __toESM(require_react())
var RemixErrorBoundary = class extends import_react.default.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: props.error || null,
      location: props.location,
    }
  }
  static getDerivedStateFromError(error) {
    return {
      error,
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return {
        error: props.error || null,
        location: props.location,
      }
    }
    return {
      error: props.error || state.error,
      location: state.location,
    }
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ import_react.default.createElement(
        this.props.component,
        {
          error: this.state.error,
        },
      )
    } else {
      return this.props.children
    }
  }
}
function RemixRootDefaultErrorBoundary({ error }) {
  console.error(error)
  return /* @__PURE__ */ import_react.default.createElement(
    "html",
    {
      lang: "en",
    },
    /* @__PURE__ */ import_react.default.createElement(
      "head",
      null,
      /* @__PURE__ */ import_react.default.createElement("meta", {
        charSet: "utf-8",
      }),
      /* @__PURE__ */ import_react.default.createElement("meta", {
        name: "viewport",
        content: "width=device-width,initial-scale=1,viewport-fit=cover",
      }),
      /* @__PURE__ */ import_react.default.createElement(
        "title",
        null,
        "Application Error!",
      ),
    ),
    /* @__PURE__ */ import_react.default.createElement(
      "body",
      null,
      /* @__PURE__ */ import_react.default.createElement(
        "main",
        {
          style: {
            fontFamily: "system-ui, sans-serif",
            padding: "2rem",
          },
        },
        /* @__PURE__ */ import_react.default.createElement(
          "h1",
          {
            style: {
              fontSize: "24px",
            },
          },
          "Application Error",
        ),
        /* @__PURE__ */ import_react.default.createElement(
          "pre",
          {
            style: {
              padding: "2rem",
              background: "hsla(10, 50%, 50%, 0.1)",
              color: "red",
              overflow: "auto",
            },
          },
          error.stack,
        ),
      ),
      /* @__PURE__ */ import_react.default.createElement("script", {
        dangerouslySetInnerHTML: {
          __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            `,
        },
      }),
    ),
  )
}
var RemixCatchContext = /* @__PURE__ */ import_react.default.createContext(
  void 0,
)
function useCatch() {
  return (0, import_react.useContext)(RemixCatchContext)
}
function RemixCatchBoundary({
  catch: catchVal,
  component: Component2,
  children,
}) {
  if (catchVal) {
    return /* @__PURE__ */ import_react.default.createElement(
      RemixCatchContext.Provider,
      {
        value: catchVal,
      },
      /* @__PURE__ */ import_react.default.createElement(Component2, null),
    )
  }
  return /* @__PURE__ */ import_react.default.createElement(
    import_react.default.Fragment,
    null,
    children,
  )
}
function RemixRootDefaultCatchBoundary() {
  let caught = useCatch()
  return /* @__PURE__ */ import_react.default.createElement(
    "html",
    {
      lang: "en",
    },
    /* @__PURE__ */ import_react.default.createElement(
      "head",
      null,
      /* @__PURE__ */ import_react.default.createElement("meta", {
        charSet: "utf-8",
      }),
      /* @__PURE__ */ import_react.default.createElement("meta", {
        name: "viewport",
        content: "width=device-width,initial-scale=1,viewport-fit=cover",
      }),
      /* @__PURE__ */ import_react.default.createElement(
        "title",
        null,
        "Unhandled Thrown Response!",
      ),
    ),
    /* @__PURE__ */ import_react.default.createElement(
      "body",
      null,
      /* @__PURE__ */ import_react.default.createElement(
        "h1",
        {
          style: {
            fontFamily: "system-ui, sans-serif",
            padding: "2rem",
          },
        },
        caught.status,
        " ",
        caught.statusText,
      ),
      /* @__PURE__ */ import_react.default.createElement("script", {
        dangerouslySetInnerHTML: {
          __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws 404s (and other responses). Check out https://remix.run/guides/not-found for more information."
              );
            `,
        },
      }),
    ),
  )
}

// node_modules/@remix-run/react/dist/esm/invariant.js
function invariant3(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message)
  }
}

// node_modules/@remix-run/react/dist/esm/routeModules.js
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id]
  }
  try {
    let routeModule = await import(
      /* webpackIgnore: true */
      route.module
    )
    routeModulesCache[route.id] = routeModule
    return routeModule
  } catch (error) {
    window.location.reload()
    return new Promise(() => {})
  }
}

// node_modules/@remix-run/react/dist/esm/links.js
function getLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches
    .map((match) => {
      var _module$links
      let module = routeModules[match.route.id]
      return (
        ((_module$links = module.links) === null || _module$links === void 0
          ? void 0
          : _module$links.call(module)) || []
      )
    })
    .flat(1)
  let preloads = getCurrentPageModulePreloadHrefs(matches, manifest)
  return dedupe(descriptors, preloads)
}
async function prefetchStyleLinks(routeModule) {
  if (!routeModule.links) return
  let descriptors = routeModule.links()
  if (!descriptors) return
  let styleLinks = []
  for (let descriptor of descriptors) {
    if (!isPageLinkDescriptor(descriptor) && descriptor.rel === "stylesheet") {
      styleLinks.push({
        ...descriptor,
        rel: "preload",
        as: "style",
      })
    }
  }
  let matchingLinks = styleLinks.filter(
    (link) => !link.media || window.matchMedia(link.media).matches,
  )
  await Promise.all(matchingLinks.map(prefetchStyleLink))
}
async function prefetchStyleLink(descriptor) {
  return new Promise((resolve) => {
    let link = document.createElement("link")
    Object.assign(link, descriptor)
    function removeLink() {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
    link.onload = () => {
      removeLink()
      resolve()
    }
    link.onerror = () => {
      removeLink()
      resolve()
    }
    document.head.appendChild(link)
  })
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === "string"
}
function isHtmlLinkDescriptor(object) {
  if (object == null) return false
  if (object.href == null) {
    return (
      object.rel === "preload" &&
      (typeof object.imageSrcSet === "string" ||
        typeof object.imagesrcset === "string") &&
      (typeof object.imageSizes === "string" ||
        typeof object.imagesizes === "string")
    )
  }
  return typeof object.rel === "string" && typeof object.href === "string"
}
async function getStylesheetPrefetchLinks(matches, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let mod = await loadRouteModule(match.route, routeModules)
      return mod.links ? mod.links() : []
    }),
  )
  return links
    .flat(1)
    .filter(isHtmlLinkDescriptor)
    .filter((link) => link.rel === "stylesheet" || link.rel === "preload")
    .map((link) =>
      link.rel === "preload"
        ? {
            ...link,
            rel: "prefetch",
          }
        : {
            ...link,
            rel: "prefetch",
            as: "style",
          },
    )
}
function getNewMatchesForLinks(
  page,
  nextMatches,
  currentMatches,
  location,
  mode,
) {
  let path = parsePathPatch(page)
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true
    return match.route.id !== currentMatches[index].route.id
  }
  let matchPathChanged = (match, index) => {
    var _currentMatches$index
    return (
      currentMatches[index].pathname !== match.pathname ||
      (((_currentMatches$index = currentMatches[index].route.path) === null ||
      _currentMatches$index === void 0
        ? void 0
        : _currentMatches$index.endsWith("*")) &&
        currentMatches[index].params["*"] !== match.params["*"])
    )
  }
  let newMatches =
    mode === "data" && location.search !== path.search
      ? nextMatches.filter((match, index) => {
          if (!match.route.hasLoader) {
            return false
          }
          if (isNew(match, index) || matchPathChanged(match, index)) {
            return true
          }
          if (match.route.shouldReload) {
            return match.route.shouldReload({
              params: match.params,
              prevUrl: new URL(
                location.pathname + location.search + location.hash,
                window.origin,
              ),
              url: new URL(page, window.origin),
            })
          }
          return true
        })
      : nextMatches.filter((match, index) => {
          return (
            (mode === "assets" || match.route.hasLoader) &&
            (isNew(match, index) || matchPathChanged(match, index))
          )
        })
  return newMatches
}
function getDataLinkHrefs(page, matches, manifest) {
  let path = parsePathPatch(page)
  return dedupeHrefs(
    matches
      .filter((match) => manifest.routes[match.route.id].hasLoader)
      .map((match) => {
        let { pathname, search } = path
        let searchParams = new URLSearchParams(search)
        searchParams.set("_data", match.route.id)
        return `${pathname}?${searchParams}`
      }),
  )
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(
    matches
      .map((match) => {
        let route = manifestPatch.routes[match.route.id]
        let hrefs = [route.module]
        if (route.imports) {
          hrefs = hrefs.concat(route.imports)
        }
        return hrefs
      })
      .flat(1),
  )
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return dedupeHrefs(
    matches
      .map((match) => {
        let route = manifest.routes[match.route.id]
        let hrefs = [route.module]
        if (route.imports) {
          hrefs = hrefs.concat(route.imports)
        }
        return hrefs
      })
      .flat(1),
  )
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)]
}
function dedupe(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set()
  let preloadsSet = new Set(preloads)
  return descriptors.reduce((deduped, descriptor) => {
    let alreadyModulePreload =
      !isPageLinkDescriptor(descriptor) &&
      descriptor.as === "script" &&
      descriptor.href &&
      preloadsSet.has(descriptor.href)
    if (alreadyModulePreload) {
      return deduped
    }
    let str = JSON.stringify(descriptor)
    if (!set.has(str)) {
      set.add(str)
      deduped.push(descriptor)
    }
    return deduped
  }, [])
}
function parsePathPatch(href) {
  let path = parsePath(href)
  if (path.search === void 0) path.search = ""
  return path
}

// node_modules/@remix-run/react/dist/esm/markup.js
function createHtml(html) {
  return {
    __html: html,
  }
}

// node_modules/@remix-run/react/dist/esm/routes.js
var React3 = __toESM(require_react())

// node_modules/@remix-run/react/dist/esm/data.js
function isCatchResponse(response) {
  return (
    response instanceof Response &&
    response.headers.get("X-Remix-Catch") != null
  )
}
function isErrorResponse(response) {
  return (
    response instanceof Response &&
    response.headers.get("X-Remix-Error") != null
  )
}
function isRedirectResponse3(response) {
  return (
    response instanceof Response &&
    response.headers.get("X-Remix-Redirect") != null
  )
}
async function fetchData(url, routeId, signal, submission) {
  url.searchParams.set("_data", routeId)
  let init = submission
    ? getActionInit(submission, signal)
    : {
        credentials: "same-origin",
        signal,
      }
  let response = await fetch(url.href, init)
  if (isErrorResponse(response)) {
    let data = await response.json()
    let error = new Error(data.message)
    error.stack = data.stack
    return error
  }
  return response
}
async function extractData(response) {
  let contentType = response.headers.get("Content-Type")
  if (contentType && /\bapplication\/json\b/.test(contentType)) {
    return response.json()
  }
  return response.text()
}
function getActionInit(submission, signal) {
  let { encType, method, formData } = submission
  let headers = void 0
  let body = formData
  if (encType === "application/x-www-form-urlencoded") {
    body = new URLSearchParams()
    for (let [key, value] of formData) {
      invariant3(
        typeof value === "string",
        `File inputs are not supported with encType "application/x-www-form-urlencoded", please use "multipart/form-data" instead.`,
      )
      body.append(key, value)
    }
    headers = {
      "Content-Type": encType,
    }
  }
  return {
    method,
    body,
    signal,
    credentials: "same-origin",
    headers,
  }
}

// node_modules/@remix-run/react/dist/esm/routeMatching.js
function matchClientRoutes(routes2, location) {
  let matches = matchRoutes(routes2, location)
  if (!matches) return null
  return matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route,
  }))
}

// node_modules/@remix-run/react/dist/esm/transition.js
var CatchValue = class {
  constructor(status, statusText, data) {
    this.status = status
    this.statusText = statusText
    this.data = data
  }
}
function isActionSubmission(submission) {
  return ["POST", "PUT", "PATCH", "DELETE"].includes(submission.method)
}
function isLoaderSubmission(submission) {
  return submission.method === "GET"
}
function isRedirectLocation(location) {
  return Boolean(location.state) && location.state.isRedirect
}
function isLoaderRedirectLocation(location) {
  return isRedirectLocation(location) && location.state.type === "loader"
}
function isActionRedirectLocation(location) {
  return isRedirectLocation(location) && location.state.type === "action"
}
function isFetchActionRedirect(location) {
  return isRedirectLocation(location) && location.state.type === "fetchAction"
}
function isLoaderSubmissionRedirectLocation(location) {
  return (
    isRedirectLocation(location) && location.state.type === "loaderSubmission"
  )
}
var TransitionRedirect = class {
  constructor(location, setCookie) {
    this.setCookie = setCookie
    this.location =
      typeof location === "string"
        ? location
        : location.pathname + location.search
  }
}
var IDLE_TRANSITION = {
  state: "idle",
  submission: void 0,
  location: void 0,
  type: "idle",
}
var IDLE_FETCHER = {
  state: "idle",
  type: "init",
  data: void 0,
  submission: void 0,
}
var isBrowser2 =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
var isServer = !isBrowser2
function createTransitionManager(init) {
  let { routes: routes2 } = init
  let pendingNavigationController
  let fetchControllers = /* @__PURE__ */ new Map()
  let incrementingLoadId = 0
  let navigationLoadId = -1
  let fetchReloadIds = /* @__PURE__ */ new Map()
  let fetchRedirectIds = /* @__PURE__ */ new Set()
  let subscribers = /* @__PURE__ */ new Set()
  let matches = matchClientRoutes(routes2, init.location)
  if (!matches) {
    matches = [
      {
        params: {},
        pathname: "",
        route: routes2[0],
      },
    ]
  }
  let state = {
    location: init.location,
    loaderData: init.loaderData || {},
    actionData: init.actionData,
    catch: init.catch,
    error: init.error,
    catchBoundaryId: init.catchBoundaryId || null,
    errorBoundaryId: init.errorBoundaryId || null,
    matches,
    nextMatches: void 0,
    transition: IDLE_TRANSITION,
    fetchers: /* @__PURE__ */ new Map(),
  }
  function update(updates) {
    if (updates.transition) {
      if (updates.transition === IDLE_TRANSITION) {
        pendingNavigationController = void 0
      }
    }
    state = Object.assign({}, state, updates)
    for (let subscriber of subscribers.values()) {
      subscriber(state)
    }
  }
  function getState() {
    return state
  }
  function getFetcher(key) {
    return state.fetchers.get(key) || IDLE_FETCHER
  }
  function setFetcher(key, fetcher) {
    state.fetchers.set(key, fetcher)
  }
  function deleteFetcher(key) {
    if (fetchControllers.has(key)) abortFetcher(key)
    fetchReloadIds.delete(key)
    fetchRedirectIds.delete(key)
    state.fetchers.delete(key)
  }
  async function send(event) {
    switch (event.type) {
      case "navigation": {
        let { action, location, submission } = event
        let matches2 = matchClientRoutes(routes2, location)
        if (!matches2) {
          matches2 = [
            {
              params: {},
              pathname: "",
              route: routes2[0],
            },
          ]
          await handleNotFoundNavigation(location, matches2)
        } else if (!submission && isHashChangeOnly(location)) {
          await handleHashChange(location, matches2)
        } else if (action === Action.Pop) {
          await handleLoad(location, matches2)
        } else if (submission && isActionSubmission(submission)) {
          await handleActionSubmissionNavigation(location, submission, matches2)
        } else if (submission && isLoaderSubmission(submission)) {
          await handleLoaderSubmissionNavigation(location, submission, matches2)
        } else if (isActionRedirectLocation(location)) {
          await handleActionRedirect(location, matches2)
        } else if (isLoaderSubmissionRedirectLocation(location)) {
          await handleLoaderSubmissionRedirect(location, matches2)
        } else if (isLoaderRedirectLocation(location)) {
          await handleLoaderRedirect(location, matches2)
        } else if (isFetchActionRedirect(location)) {
          await handleFetchActionRedirect(location, matches2)
        } else {
          await handleLoad(location, matches2)
        }
        navigationLoadId = -1
        break
      }
      case "fetcher": {
        if (isServer) {
          throw new Error(
            "a fetcher was called during the server render, but it shouldn't be. You are likely calling useFetcher.load() or useFetcher.submit() in the body of your component. Try moving it to a useEffect or a callback.",
          )
        }
        let { key, submission, href } = event
        let matches2 = matchClientRoutes(routes2, href)
        invariant3(matches2, "No matches found")
        if (fetchControllers.has(key)) abortFetcher(key)
        let match = getRequestMatch(
          new URL(href, window.location.href),
          matches2,
        )
        if (submission && isActionSubmission(submission)) {
          await handleActionFetchSubmission(key, submission, match)
        } else if (submission && isLoaderSubmission(submission)) {
          await handleLoaderFetchSubmission(href, key, submission, match)
        } else {
          await handleLoaderFetch(href, key, match)
        }
        break
      }
      default: {
        throw new Error(`Unknown data event type: ${event.type}`)
      }
    }
  }
  function dispose() {
    abortNormalNavigation()
    for (let [, controller] of fetchControllers) {
      controller.abort()
    }
  }
  function isIndexRequestUrl(url) {
    for (let param of url.searchParams.getAll("index")) {
      if (param === "") {
        return true
      }
    }
    return false
  }
  function getRequestMatch(url, matches2) {
    let match = matches2.slice(-1)[0]
    if (isIndexRequestUrl(url) && match.route.index) {
      return match
    }
    return getPathContributingMatches2(matches2).slice(-1)[0]
  }
  function getPathContributingMatches2(matches2) {
    return matches2.filter(
      (match, index) =>
        index === 0 ||
        (!match.route.index && match.route.path && match.route.path.length > 0),
    )
  }
  async function handleActionFetchSubmission(key, submission, match) {
    let currentFetcher = state.fetchers.get(key)
    let fetcher = {
      state: "submitting",
      type: "actionSubmission",
      submission,
      data:
        (currentFetcher === null || currentFetcher === void 0
          ? void 0
          : currentFetcher.data) || void 0,
    }
    setFetcher(key, fetcher)
    update({
      fetchers: new Map(state.fetchers),
    })
    let controller = new AbortController()
    fetchControllers.set(key, controller)
    let result = await callAction(submission, match, controller.signal)
    if (controller.signal.aborted) {
      return
    }
    if (isRedirectResult2(result)) {
      let locationState = {
        isRedirect: true,
        type: "fetchAction",
        setCookie: result.value.setCookie,
      }
      fetchRedirectIds.add(key)
      init.onRedirect(result.value.location, locationState)
      let loadingFetcher = {
        state: "loading",
        type: "actionRedirect",
        submission,
        data: void 0,
      }
      setFetcher(key, loadingFetcher)
      update({
        fetchers: new Map(state.fetchers),
      })
      return
    }
    if (maybeBailOnError(match, key, result)) {
      return
    }
    if (await maybeBailOnCatch(match, key, result)) {
      return
    }
    let loadFetcher = {
      state: "loading",
      type: "actionReload",
      data: result.value,
      submission,
    }
    setFetcher(key, loadFetcher)
    update({
      fetchers: new Map(state.fetchers),
    })
    let maybeActionErrorResult = isErrorResult2(result) ? result : void 0
    let maybeActionCatchResult = isCatchResult(result) ? result : void 0
    let loadId = ++incrementingLoadId
    fetchReloadIds.set(key, loadId)
    let matchesToLoad = state.nextMatches || state.matches
    let results = await callLoaders(
      state,
      state.transition.location || state.location,
      matchesToLoad,
      controller.signal,
      maybeActionErrorResult,
      maybeActionCatchResult,
      submission,
      match.route.id,
      loadFetcher,
    )
    if (controller.signal.aborted) {
      return
    }
    fetchReloadIds.delete(key)
    fetchControllers.delete(key)
    let redirect3 = findRedirect(results)
    if (redirect3) {
      let locationState = {
        isRedirect: true,
        type: "loader",
        setCookie: redirect3.setCookie,
      }
      init.onRedirect(redirect3.location, locationState)
      return
    }
    let [error, errorBoundaryId] = findErrorAndBoundaryId(
      results,
      state.matches,
      maybeActionErrorResult,
    )
    let [catchVal, catchBoundaryId] =
      (await findCatchAndBoundaryId(
        results,
        state.matches,
        maybeActionCatchResult,
      )) || []
    let doneFetcher = {
      state: "idle",
      type: "done",
      data: result.value,
      submission: void 0,
    }
    setFetcher(key, doneFetcher)
    let abortedKeys = abortStaleFetchLoads(loadId)
    if (abortedKeys) {
      markFetchersDone(abortedKeys)
    }
    let yeetedNavigation = yeetStaleNavigationLoad(loadId)
    if (yeetedNavigation) {
      let { transition } = state
      invariant3(transition.state === "loading", "Expected loading transition")
      update({
        location: transition.location,
        matches: state.nextMatches,
        error,
        errorBoundaryId,
        catch: catchVal,
        catchBoundaryId,
        loaderData: makeLoaderData(state, results, matchesToLoad),
        actionData:
          transition.type === "actionReload" ? state.actionData : void 0,
        transition: IDLE_TRANSITION,
        fetchers: new Map(state.fetchers),
      })
    } else {
      update({
        fetchers: new Map(state.fetchers),
        error,
        errorBoundaryId,
        loaderData: makeLoaderData(state, results, matchesToLoad),
      })
    }
  }
  function yeetStaleNavigationLoad(landedId) {
    let isLoadingNavigation = state.transition.state === "loading"
    if (isLoadingNavigation && navigationLoadId < landedId) {
      abortNormalNavigation()
      return true
    }
    return false
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key)
      let doneFetcher = {
        state: "idle",
        type: "done",
        data: fetcher.data,
        submission: void 0,
      }
      setFetcher(key, doneFetcher)
    }
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = []
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key)
        invariant3(fetcher, `Expected fetcher: ${key}`)
        if (fetcher.state === "loading") {
          abortFetcher(key)
          fetchReloadIds.delete(key)
          yeetedKeys.push(key)
        }
      }
    }
    return yeetedKeys.length ? yeetedKeys : false
  }
  async function handleLoaderFetchSubmission(href, key, submission, match) {
    let currentFetcher = state.fetchers.get(key)
    let fetcher = {
      state: "submitting",
      type: "loaderSubmission",
      submission,
      data:
        (currentFetcher === null || currentFetcher === void 0
          ? void 0
          : currentFetcher.data) || void 0,
    }
    setFetcher(key, fetcher)
    update({
      fetchers: new Map(state.fetchers),
    })
    let controller = new AbortController()
    fetchControllers.set(key, controller)
    let result = await callLoader(match, createUrl(href), controller.signal)
    fetchControllers.delete(key)
    if (controller.signal.aborted) {
      return
    }
    if (isRedirectResult2(result)) {
      let locationState = {
        isRedirect: true,
        type: "loader",
        setCookie: result.value.setCookie,
      }
      init.onRedirect(result.value.location, locationState)
      return
    }
    if (maybeBailOnError(match, key, result)) {
      return
    }
    if (await maybeBailOnCatch(match, key, result)) {
      return
    }
    let doneFetcher = {
      state: "idle",
      type: "done",
      data: result.value,
      submission: void 0,
    }
    setFetcher(key, doneFetcher)
    update({
      fetchers: new Map(state.fetchers),
    })
  }
  async function handleLoaderFetch(href, key, match) {
    let currentFetcher = state.fetchers.get(key)
    let fetcher = {
      state: "loading",
      type: "normalLoad",
      submission: void 0,
      data:
        (currentFetcher === null || currentFetcher === void 0
          ? void 0
          : currentFetcher.data) || void 0,
    }
    setFetcher(key, fetcher)
    update({
      fetchers: new Map(state.fetchers),
    })
    let controller = new AbortController()
    fetchControllers.set(key, controller)
    let result = await callLoader(match, createUrl(href), controller.signal)
    if (controller.signal.aborted) return
    fetchControllers.delete(key)
    if (isRedirectResult2(result)) {
      let locationState = {
        isRedirect: true,
        type: "loader",
        setCookie: result.value.setCookie,
      }
      init.onRedirect(result.value.location, locationState)
      return
    }
    if (maybeBailOnError(match, key, result)) {
      return
    }
    if (await maybeBailOnCatch(match, key, result)) {
      return
    }
    let doneFetcher = {
      state: "idle",
      type: "done",
      data: result.value,
      submission: void 0,
    }
    setFetcher(key, doneFetcher)
    update({
      fetchers: new Map(state.fetchers),
    })
  }
  async function maybeBailOnCatch(match, key, result) {
    if (isCatchResult(result)) {
      let catchBoundaryId = findNearestCatchBoundary(match, state.matches)
      state.fetchers.delete(key)
      update({
        transition: IDLE_TRANSITION,
        fetchers: new Map(state.fetchers),
        catch: {
          data: result.value.data,
          status: result.value.status,
          statusText: result.value.statusText,
        },
        catchBoundaryId,
      })
      return true
    }
    return false
  }
  function maybeBailOnError(match, key, result) {
    if (isErrorResult2(result)) {
      let errorBoundaryId = findNearestBoundary2(match, state.matches)
      state.fetchers.delete(key)
      update({
        fetchers: new Map(state.fetchers),
        error: result.value,
        errorBoundaryId,
      })
      return true
    }
    return false
  }
  async function handleNotFoundNavigation(location, matches2) {
    abortNormalNavigation()
    let transition = {
      state: "loading",
      type: "normalLoad",
      submission: void 0,
      location,
    }
    update({
      transition,
      nextMatches: matches2,
    })
    await Promise.resolve()
    let catchBoundaryId = findNearestCatchBoundary(matches2[0], matches2)
    update({
      location,
      matches: matches2,
      catch: {
        data: null,
        status: 404,
        statusText: "Not Found",
      },
      catchBoundaryId,
      transition: IDLE_TRANSITION,
    })
  }
  async function handleActionSubmissionNavigation(
    location,
    submission,
    matches2,
  ) {
    abortNormalNavigation()
    let transition = {
      state: "submitting",
      type: "actionSubmission",
      submission,
      location,
    }
    update({
      transition,
      nextMatches: matches2,
    })
    let controller = new AbortController()
    pendingNavigationController = controller
    let actionMatches = matches2
    let leafMatch = getRequestMatch(createUrl(submission.action), actionMatches)
    let result = await callAction(submission, leafMatch, controller.signal)
    if (controller.signal.aborted) {
      return
    }
    if (isRedirectResult2(result)) {
      let locationState = {
        isRedirect: true,
        type: "action",
        setCookie: result.value.setCookie,
      }
      init.onRedirect(result.value.location, locationState)
      return
    }
    let catchVal, catchBoundaryId
    if (isCatchResult(result)) {
      ;[catchVal, catchBoundaryId] =
        (await findCatchAndBoundaryId([result], actionMatches, result)) || []
    }
    let loadTransition = {
      state: "loading",
      type: "actionReload",
      submission,
      location,
    }
    update({
      transition: loadTransition,
      actionData: {
        [leafMatch.route.id]: result.value,
      },
    })
    await loadPageData(
      location,
      matches2,
      submission,
      leafMatch.route.id,
      result,
      catchVal,
      catchBoundaryId,
    )
  }
  async function handleLoaderSubmissionNavigation(
    location,
    submission,
    matches2,
  ) {
    abortNormalNavigation()
    let transition = {
      state: "submitting",
      type: "loaderSubmission",
      submission,
      location,
    }
    update({
      transition,
      nextMatches: matches2,
    })
    await loadPageData(location, matches2, submission)
  }
  async function handleHashChange(location, matches2) {
    abortNormalNavigation()
    let transition = {
      state: "loading",
      type: "normalLoad",
      submission: void 0,
      location,
    }
    update({
      transition,
      nextMatches: matches2,
    })
    await Promise.resolve()
    update({
      location,
      matches: matches2,
      transition: IDLE_TRANSITION,
    })
  }
  async function handleLoad(location, matches2) {
    abortNormalNavigation()
    let transition = {
      state: "loading",
      type: "normalLoad",
      submission: void 0,
      location,
    }
    update({
      transition,
      nextMatches: matches2,
    })
    await loadPageData(location, matches2)
  }
  async function handleLoaderRedirect(location, matches2) {
    abortNormalNavigation()
    let transition = {
      state: "loading",
      type: "normalRedirect",
      submission: void 0,
      location,
    }
    update({
      transition,
      nextMatches: matches2,
    })
    await loadPageData(location, matches2)
  }
  async function handleLoaderSubmissionRedirect(location, matches2) {
    abortNormalNavigation()
    invariant3(
      state.transition.type === "loaderSubmission",
      `Unexpected transition: ${JSON.stringify(state.transition)}`,
    )
    let { submission } = state.transition
    let transition = {
      state: "loading",
      type: "loaderSubmissionRedirect",
      submission,
      location,
    }
    update({
      transition,
      nextMatches: matches2,
    })
    await loadPageData(location, matches2, submission)
  }
  async function handleFetchActionRedirect(location, matches2) {
    abortNormalNavigation()
    let transition = {
      state: "loading",
      type: "fetchActionRedirect",
      submission: void 0,
      location,
    }
    update({
      transition,
      nextMatches: matches2,
    })
    await loadPageData(location, matches2)
  }
  async function handleActionRedirect(location, matches2) {
    abortNormalNavigation()
    invariant3(
      state.transition.type === "actionSubmission" ||
        state.transition.type === "actionReload" ||
        state.transition.type === "actionRedirect",
      `Unexpected transition: ${JSON.stringify(state.transition)}`,
    )
    let { submission } = state.transition
    let transition = {
      state: "loading",
      type: "actionRedirect",
      submission,
      location,
    }
    update({
      transition,
      nextMatches: matches2,
    })
    await loadPageData(location, matches2, submission)
  }
  function isHashChangeOnly(location) {
    return (
      createHref(state.location) === createHref(location) &&
      state.location.hash !== location.hash
    )
  }
  async function loadPageData(
    location,
    matches2,
    submission,
    submissionRouteId,
    actionResult,
    catchVal,
    catchBoundaryId,
  ) {
    let maybeActionErrorResult =
      actionResult && isErrorResult2(actionResult) ? actionResult : void 0
    let maybeActionCatchResult =
      actionResult && isCatchResult(actionResult) ? actionResult : void 0
    let controller = new AbortController()
    pendingNavigationController = controller
    navigationLoadId = ++incrementingLoadId
    let results = await callLoaders(
      state,
      location,
      matches2,
      controller.signal,
      maybeActionErrorResult,
      maybeActionCatchResult,
      submission,
      submissionRouteId,
      void 0,
      catchBoundaryId,
    )
    if (controller.signal.aborted) {
      return
    }
    let redirect3 = findRedirect(results)
    if (redirect3) {
      if (
        state.transition.type === "actionReload" ||
        isActionRedirectLocation(location)
      ) {
        let locationState = {
          isRedirect: true,
          type: "action",
          setCookie: redirect3.setCookie,
        }
        init.onRedirect(redirect3.location, locationState)
      } else if (state.transition.type === "loaderSubmission") {
        let locationState = {
          isRedirect: true,
          type: "loaderSubmission",
          setCookie: redirect3.setCookie,
        }
        init.onRedirect(redirect3.location, locationState)
      } else {
        var _location$state
        let locationState = {
          isRedirect: true,
          type: "loader",
          setCookie:
            redirect3.setCookie ||
            ((_location$state = location.state) === null ||
            _location$state === void 0
              ? void 0
              : _location$state.setCookie) === true,
        }
        init.onRedirect(redirect3.location, locationState)
      }
      return
    }
    let [error, errorBoundaryId] = findErrorAndBoundaryId(
      results,
      matches2,
      maybeActionErrorResult,
    )
    ;[catchVal, catchBoundaryId] = (await findCatchAndBoundaryId(
      results,
      matches2,
      maybeActionErrorResult,
    )) || [catchVal, catchBoundaryId]
    markFetchRedirectsDone()
    let abortedIds = abortStaleFetchLoads(navigationLoadId)
    if (abortedIds) {
      markFetchersDone(abortedIds)
    }
    update({
      location,
      matches: matches2,
      error,
      errorBoundaryId,
      catch: catchVal,
      catchBoundaryId,
      loaderData: makeLoaderData(state, results, matches2),
      actionData:
        state.transition.type === "actionReload" ? state.actionData : void 0,
      transition: IDLE_TRANSITION,
      fetchers: abortedIds ? new Map(state.fetchers) : state.fetchers,
    })
  }
  function abortNormalNavigation() {
    if (pendingNavigationController) {
      pendingNavigationController.abort()
    }
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key)
    invariant3(controller, `Expected fetch controller: ${key}`)
    controller.abort()
    fetchControllers.delete(key)
  }
  function markFetchRedirectsDone() {
    let doneKeys = []
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key)
      invariant3(fetcher, `Expected fetcher: ${key}`)
      if (fetcher.type === "actionRedirect") {
        fetchRedirectIds.delete(key)
        doneKeys.push(key)
      }
    }
    markFetchersDone(doneKeys)
  }
  function subscribe(subscriber) {
    subscribers.add(subscriber)
    return () => {
      subscribers.delete(subscriber)
    }
  }
  return {
    subscribe,
    send,
    getState,
    getFetcher,
    deleteFetcher,
    dispose,
    get _internalFetchControllers() {
      return fetchControllers
    },
  }
}
async function callLoaders(
  state,
  location,
  matches,
  signal,
  actionErrorResult,
  actionCatchResult,
  submission,
  submissionRouteId,
  fetcher,
  catchBoundaryId,
) {
  let url = createUrl(createHref(location))
  let matchesToLoad = filterMatchesToLoad(
    state,
    location,
    matches,
    actionErrorResult,
    actionCatchResult,
    submission,
    submissionRouteId,
    fetcher,
    catchBoundaryId,
  )
  return Promise.all(
    matchesToLoad.map((match) => callLoader(match, url, signal)),
  )
}
async function callLoader(match, url, signal) {
  invariant3(match.route.loader, `Expected loader for ${match.route.id}`)
  try {
    let { params } = match
    let value = await match.route.loader({
      params,
      url,
      signal,
    })
    return {
      match,
      value,
    }
  } catch (error) {
    return {
      match,
      value: error,
    }
  }
}
async function callAction(submission, match, signal) {
  try {
    let value = await match.route.action({
      url: createUrl(submission.action),
      params: match.params,
      submission,
      signal,
    })
    return {
      match,
      value,
    }
  } catch (error) {
    return {
      match,
      value: error,
    }
  }
}
function filterMatchesToLoad(
  state,
  location,
  matches,
  actionErrorResult,
  actionCatchResult,
  submission,
  submissionRouteId,
  fetcher,
  catchBoundaryId,
) {
  var _location$state2
  if (
    catchBoundaryId ||
    (submissionRouteId && (actionCatchResult || actionErrorResult))
  ) {
    let foundProblematicRoute = false
    matches = matches.filter((match) => {
      if (foundProblematicRoute) {
        return false
      }
      if (
        match.route.id === submissionRouteId ||
        match.route.id === catchBoundaryId
      ) {
        foundProblematicRoute = true
        return false
      }
      return true
    })
  }
  let isNew = (match, index) => {
    if (!state.matches[index]) return true
    return match.route.id !== state.matches[index].route.id
  }
  let matchPathChanged = (match, index) => {
    var _state$matches$index$
    return (
      state.matches[index].pathname !== match.pathname ||
      (((_state$matches$index$ = state.matches[index].route.path) === null ||
      _state$matches$index$ === void 0
        ? void 0
        : _state$matches$index$.endsWith("*")) &&
        state.matches[index].params["*"] !== match.params["*"])
    )
  }
  let url = createUrl(createHref(location))
  let filterByRouteProps = (match, index) => {
    if (!match.route.loader) {
      return false
    }
    if (isNew(match, index) || matchPathChanged(match, index)) {
      return true
    }
    if (match.route.shouldReload) {
      let prevUrl = createUrl(createHref(state.location))
      return match.route.shouldReload({
        prevUrl,
        url,
        submission,
        params: match.params,
      })
    }
    return true
  }
  let isInRootCatchBoundary = state.matches.length === 1
  if (isInRootCatchBoundary) {
    return matches.filter((match) => !!match.route.loader)
  }
  if (
    (fetcher === null || fetcher === void 0 ? void 0 : fetcher.type) ===
    "actionReload"
  ) {
    return matches.filter(filterByRouteProps)
  } else if (
    state.transition.type === "actionReload" ||
    state.transition.type === "actionRedirect" ||
    state.transition.type === "fetchActionRedirect" ||
    createHref(url) === createHref(state.location) ||
    url.searchParams.toString() !== state.location.search.substring(1) ||
    ((_location$state2 = location.state) !== null &&
      _location$state2 !== void 0 &&
      _location$state2.setCookie)
  ) {
    return matches.filter(filterByRouteProps)
  }
  return matches.filter((match, index, arr) => {
    var _location$state3
    if ((actionErrorResult || actionCatchResult) && arr.length - 1 === index) {
      return false
    }
    return (
      match.route.loader &&
      (isNew(match, index) ||
        matchPathChanged(match, index) ||
        ((_location$state3 = location.state) === null ||
        _location$state3 === void 0
          ? void 0
          : _location$state3.setCookie))
    )
  })
}
function isRedirectResult2(result) {
  return result.value instanceof TransitionRedirect
}
function createHref(location) {
  return location.pathname + location.search
}
function findRedirect(results) {
  for (let result of results) {
    if (isRedirectResult2(result)) {
      return result.value
    }
  }
  return null
}
async function findCatchAndBoundaryId(results, matches, actionCatchResult) {
  let loaderCatchResult
  for (let result of results) {
    if (isCatchResult(result)) {
      loaderCatchResult = result
      break
    }
  }
  let extractCatchData = async (res) => ({
    status: res.status,
    statusText: res.statusText,
    data: res.data,
  })
  if (actionCatchResult && loaderCatchResult) {
    let boundaryId = findNearestCatchBoundary(loaderCatchResult.match, matches)
    return [await extractCatchData(actionCatchResult.value), boundaryId]
  }
  if (loaderCatchResult) {
    let boundaryId = findNearestCatchBoundary(loaderCatchResult.match, matches)
    return [await extractCatchData(loaderCatchResult.value), boundaryId]
  }
  return null
}
function findErrorAndBoundaryId(results, matches, actionErrorResult) {
  let loaderErrorResult
  for (let result of results) {
    if (isErrorResult2(result)) {
      loaderErrorResult = result
      break
    }
  }
  if (actionErrorResult && loaderErrorResult) {
    let boundaryId = findNearestBoundary2(loaderErrorResult.match, matches)
    return [actionErrorResult.value, boundaryId]
  }
  if (actionErrorResult) {
    let boundaryId = findNearestBoundary2(actionErrorResult.match, matches)
    return [actionErrorResult.value, boundaryId]
  }
  if (loaderErrorResult) {
    let boundaryId = findNearestBoundary2(loaderErrorResult.match, matches)
    return [loaderErrorResult.value, boundaryId]
  }
  return [void 0, void 0]
}
function findNearestCatchBoundary(matchWithError, matches) {
  let nearestBoundaryId = null
  for (let match of matches) {
    if (match.route.CatchBoundary) {
      nearestBoundaryId = match.route.id
    }
    if (match === matchWithError) {
      break
    }
  }
  return nearestBoundaryId
}
function findNearestBoundary2(matchWithError, matches) {
  let nearestBoundaryId = null
  for (let match of matches) {
    if (match.route.ErrorBoundary) {
      nearestBoundaryId = match.route.id
    }
    if (match === matchWithError) {
      break
    }
  }
  return nearestBoundaryId
}
function makeLoaderData(state, results, matches) {
  let newData = {}
  for (let { match, value } of results) {
    newData[match.route.id] = value
  }
  let loaderData = {}
  for (let { route } of matches) {
    let value =
      newData[route.id] !== void 0
        ? newData[route.id]
        : state.loaderData[route.id]
    if (value !== void 0) {
      loaderData[route.id] = value
    }
  }
  return loaderData
}
function isCatchResult(result) {
  return result.value instanceof CatchValue
}
function isErrorResult2(result) {
  return result.value instanceof Error
}
function createUrl(href) {
  return new URL(href, window.location.origin)
}

// node_modules/@remix-run/react/dist/esm/routes.js
function createClientRoute(entryRoute, routeModulesCache, Component2) {
  return {
    caseSensitive: !!entryRoute.caseSensitive,
    element: /* @__PURE__ */ React3.createElement(Component2, {
      id: entryRoute.id,
    }),
    id: entryRoute.id,
    path: entryRoute.path,
    index: entryRoute.index,
    module: entryRoute.module,
    loader: createLoader(entryRoute, routeModulesCache),
    action: createAction(entryRoute, routeModulesCache),
    shouldReload: createShouldReload(entryRoute, routeModulesCache),
    ErrorBoundary: entryRoute.hasErrorBoundary,
    CatchBoundary: entryRoute.hasCatchBoundary,
    hasLoader: entryRoute.hasLoader,
  }
}
function createClientRoutes(
  routeManifest,
  routeModulesCache,
  Component2,
  parentId,
) {
  return Object.keys(routeManifest)
    .filter((key) => routeManifest[key].parentId === parentId)
    .map((key) => {
      let route = createClientRoute(
        routeManifest[key],
        routeModulesCache,
        Component2,
      )
      let children = createClientRoutes(
        routeManifest,
        routeModulesCache,
        Component2,
        route.id,
      )
      if (children.length > 0) route.children = children
      return route
    })
}
function createShouldReload(route, routeModules) {
  let shouldReload = (arg) => {
    let module = routeModules[route.id]
    invariant3(module, `Expected route module to be loaded for ${route.id}`)
    if (module.unstable_shouldReload) {
      return module.unstable_shouldReload(arg)
    }
    return true
  }
  return shouldReload
}
async function loadRouteModuleWithBlockingLinks(route, routeModules) {
  let routeModule = await loadRouteModule(route, routeModules)
  await prefetchStyleLinks(routeModule)
  return routeModule
}
function createLoader(route, routeModules) {
  let loader = async ({ url, signal, submission }) => {
    if (route.hasLoader) {
      let routeModulePromise = loadRouteModuleWithBlockingLinks(
        route,
        routeModules,
      )
      try {
        let result = await fetchData(url, route.id, signal, submission)
        if (result instanceof Error) throw result
        let redirect3 = await checkRedirect(result)
        if (redirect3) return redirect3
        if (isCatchResponse(result)) {
          throw new CatchValue(
            result.status,
            result.statusText,
            await extractData(result),
          )
        }
        return extractData(result)
      } finally {
        await routeModulePromise
      }
    } else {
      await loadRouteModuleWithBlockingLinks(route, routeModules)
    }
  }
  return loader
}
function createAction(route, routeModules) {
  let action = async ({ url, signal, submission }) => {
    let routeModulePromise = await loadRouteModuleWithBlockingLinks(
      route,
      routeModules,
    )
    try {
      if (!route.hasAction) {
        console.error(
          `Route "${route.id}" does not have an action, but you are trying to submit to it. To fix this, please add an \`action\` function to the route`,
        )
      }
      let result = await fetchData(url, route.id, signal, submission)
      if (result instanceof Error) {
        throw result
      }
      let redirect3 = await checkRedirect(result)
      if (redirect3) return redirect3
      if (isCatchResponse(result)) {
        throw new CatchValue(
          result.status,
          result.statusText,
          await extractData(result),
        )
      }
      return extractData(result)
    } finally {
      await routeModulePromise
    }
  }
  return action
}
async function checkRedirect(response) {
  if (isRedirectResponse3(response)) {
    let url = new URL(
      response.headers.get("X-Remix-Redirect"),
      window.location.origin,
    )
    if (url.origin !== window.location.origin) {
      await new Promise(() => {
        window.location.replace(url.href)
      })
    } else {
      return new TransitionRedirect(
        url.pathname + url.search + url.hash,
        response.headers.get("X-Remix-Revalidate") !== null,
      )
    }
  }
  return null
}

// node_modules/@remix-run/react/dist/esm/components.js
var RemixEntryContext = /* @__PURE__ */ React4.createContext(void 0)
function useRemixEntryContext() {
  let context = React4.useContext(RemixEntryContext)
  invariant3(context, "You must render this element inside a <Remix> element")
  return context
}
function RemixEntry({
  context: entryContext,
  action,
  location: historyLocation,
  navigator: _navigator,
  static: staticProp = false,
}) {
  let {
    manifest,
    routeData: documentLoaderData,
    actionData: documentActionData,
    routeModules,
    serverHandoffString,
    appState: entryComponentDidCatchEmulator,
  } = entryContext
  let clientRoutes = React4.useMemo(
    () => createClientRoutes(manifest.routes, routeModules, RemixRoute),
    [manifest, routeModules],
  )
  let [clientState, setClientState] = React4.useState(
    entryComponentDidCatchEmulator,
  )
  let [transitionManager] = React4.useState(() => {
    return createTransitionManager({
      routes: clientRoutes,
      actionData: documentActionData,
      loaderData: documentLoaderData,
      location: historyLocation,
      catch: entryComponentDidCatchEmulator.catch,
      catchBoundaryId: entryComponentDidCatchEmulator.catchBoundaryRouteId,
      onRedirect: _navigator.replace,
    })
  })
  React4.useEffect(() => {
    let subscriber = (state) => {
      setClientState({
        catch: state.catch,
        error: state.error,
        catchBoundaryRouteId: state.catchBoundaryId,
        loaderBoundaryRouteId: state.errorBoundaryId,
        renderBoundaryRouteId: null,
        trackBoundaries: false,
        trackCatchBoundaries: false,
      })
    }
    return transitionManager.subscribe(subscriber)
  }, [transitionManager])
  let navigator = React4.useMemo(() => {
    let push = (to, state) => {
      return transitionManager.getState().transition.state !== "idle"
        ? _navigator.replace(to, state)
        : _navigator.push(to, state)
    }
    return {
      ..._navigator,
      push,
    }
  }, [_navigator, transitionManager])
  let { location, matches, loaderData, actionData } =
    transitionManager.getState()
  React4.useEffect(() => {
    let { location: location2 } = transitionManager.getState()
    if (historyLocation === location2) return
    transitionManager.send({
      type: "navigation",
      location: historyLocation,
      submission: consumeNextNavigationSubmission(),
      action,
    })
  }, [transitionManager, historyLocation, action])
  let ssrErrorBeforeRoutesRendered =
    clientState.error &&
    clientState.renderBoundaryRouteId === null &&
    clientState.loaderBoundaryRouteId === null
      ? deserializeError(clientState.error)
      : void 0
  let ssrCatchBeforeRoutesRendered =
    clientState.catch && clientState.catchBoundaryRouteId === null
      ? clientState.catch
      : void 0
  return /* @__PURE__ */ React4.createElement(
    RemixEntryContext.Provider,
    {
      value: {
        matches,
        manifest,
        appState: clientState,
        routeModules,
        serverHandoffString,
        clientRoutes,
        routeData: loaderData,
        actionData,
        transitionManager,
        future: entryContext.future,
      },
    },
    /* @__PURE__ */ React4.createElement(
      RemixErrorBoundary,
      {
        location,
        component: RemixRootDefaultErrorBoundary,
        error: ssrErrorBeforeRoutesRendered,
      },
      /* @__PURE__ */ React4.createElement(
        RemixCatchBoundary,
        {
          location,
          component: RemixRootDefaultCatchBoundary,
          catch: ssrCatchBeforeRoutesRendered,
        },
        /* @__PURE__ */ React4.createElement(
          Router,
          {
            navigationType: action,
            location,
            navigator,
            static: staticProp,
          },
          /* @__PURE__ */ React4.createElement(Routes2, null),
        ),
      ),
    ),
  )
}
function deserializeError(data) {
  let error = new Error(data.message)
  error.stack = data.stack
  return error
}
function Routes2() {
  let { clientRoutes } = useRemixEntryContext()
  let element = useRoutes(clientRoutes) || clientRoutes[0].element
  return element
}
var RemixRouteContext = /* @__PURE__ */ React4.createContext(void 0)
function useRemixRouteContext() {
  let context = React4.useContext(RemixRouteContext)
  invariant3(context, "You must render this element in a remix route element")
  return context
}
function DefaultRouteComponent({ id }) {
  throw new Error(`Route "${id}" has no component! Please go add a \`default\` export in the route module file.
If you were trying to navigate or submit to a resource route, use \`<a>\` instead of \`<Link>\` or \`<Form reloadDocument>\`.`)
}
function RemixRoute({ id }) {
  let location = useLocation()
  let { routeData, routeModules, appState } = useRemixEntryContext()
  invariant3(
    routeData,
    "Cannot initialize 'routeData'. This normally occurs when you have server code in your client modules.\nCheck this link for more details:\nhttps://remix.run/pages/gotchas#server-code-in-client-bundles",
  )
  invariant3(
    routeModules,
    "Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.\nCheck this link for more details:\nhttps://remix.run/pages/gotchas#server-code-in-client-bundles",
  )
  let data = routeData[id]
  let { default: Component2, CatchBoundary, ErrorBoundary } = routeModules[id]
  let element = Component2
    ? /* @__PURE__ */ React4.createElement(Component2, null)
    : /* @__PURE__ */ React4.createElement(DefaultRouteComponent, {
        id,
      })
  let context = {
    data,
    id,
  }
  if (CatchBoundary) {
    let maybeServerCaught =
      appState.catch && appState.catchBoundaryRouteId === id
        ? appState.catch
        : void 0
    if (appState.trackCatchBoundaries) {
      appState.catchBoundaryRouteId = id
    }
    context = maybeServerCaught
      ? {
          id,
          get data() {
            console.error("You cannot `useLoaderData` in a catch boundary.")
            return void 0
          },
        }
      : {
          id,
          data,
        }
    element = /* @__PURE__ */ React4.createElement(
      RemixCatchBoundary,
      {
        location,
        component: CatchBoundary,
        catch: maybeServerCaught,
      },
      element,
    )
  }
  if (ErrorBoundary) {
    let maybeServerRenderError =
      appState.error &&
      (appState.renderBoundaryRouteId === id ||
        appState.loaderBoundaryRouteId === id)
        ? deserializeError(appState.error)
        : void 0
    if (appState.trackBoundaries) {
      appState.renderBoundaryRouteId = id
    }
    context = maybeServerRenderError
      ? {
          id,
          get data() {
            console.error("You cannot `useLoaderData` in an error boundary.")
            return void 0
          },
        }
      : {
          id,
          data,
        }
    element = /* @__PURE__ */ React4.createElement(
      RemixErrorBoundary,
      {
        location,
        component: ErrorBoundary,
        error: maybeServerRenderError,
      },
      element,
    )
  }
  return /* @__PURE__ */ React4.createElement(
    RemixRouteContext.Provider,
    {
      value: context,
    },
    element,
  )
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let [maybePrefetch, setMaybePrefetch] = React4.useState(false)
  let [shouldPrefetch, setShouldPrefetch] = React4.useState(false)
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } =
    theirElementProps
  React4.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true)
    }
  }, [prefetch])
  let setIntent = () => {
    if (prefetch === "intent") {
      setMaybePrefetch(true)
    }
  }
  let cancelIntent = () => {
    if (prefetch === "intent") {
      setMaybePrefetch(false)
      setShouldPrefetch(false)
    }
  }
  React4.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true)
      }, 100)
      return () => {
        clearTimeout(id)
      }
    }
  }, [maybePrefetch])
  return [
    shouldPrefetch,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent),
    },
  ]
}
var NavLink2 = /* @__PURE__ */ React4.forwardRef(
  ({ to, prefetch = "none", ...props }, forwardedRef) => {
    let href = useHref(to)
    let [shouldPrefetch, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      props,
    )
    return /* @__PURE__ */ React4.createElement(
      React4.Fragment,
      null,
      /* @__PURE__ */ React4.createElement(
        NavLink,
        _extends2(
          {
            ref: forwardedRef,
            to,
          },
          props,
          prefetchHandlers,
        ),
      ),
      shouldPrefetch
        ? /* @__PURE__ */ React4.createElement(PrefetchPageLinks, {
            page: href,
          })
        : null,
    )
  },
)
NavLink2.displayName = "NavLink"
var Link2 = /* @__PURE__ */ React4.forwardRef(
  ({ to, prefetch = "none", ...props }, forwardedRef) => {
    let href = useHref(to)
    let [shouldPrefetch, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      props,
    )
    return /* @__PURE__ */ React4.createElement(
      React4.Fragment,
      null,
      /* @__PURE__ */ React4.createElement(
        Link,
        _extends2(
          {
            ref: forwardedRef,
            to,
          },
          props,
          prefetchHandlers,
        ),
      ),
      shouldPrefetch
        ? /* @__PURE__ */ React4.createElement(PrefetchPageLinks, {
            page: href,
          })
        : null,
    )
  },
)
Link2.displayName = "Link"
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event)
    if (!event.defaultPrevented) {
      ourHandler(event)
    }
  }
}
function Links() {
  let { matches, routeModules, manifest } = useRemixEntryContext()
  let links = React4.useMemo(
    () => getLinksForMatches(matches, routeModules, manifest),
    [matches, routeModules, manifest],
  )
  return /* @__PURE__ */ React4.createElement(
    React4.Fragment,
    null,
    links.map((link) => {
      if (isPageLinkDescriptor(link)) {
        return /* @__PURE__ */ React4.createElement(
          PrefetchPageLinks,
          _extends2(
            {
              key: link.page,
            },
            link,
          ),
        )
      }
      let imageSrcSet = null
      if ("useId" in React4) {
        if (link.imagesrcset) {
          link.imageSrcSet = imageSrcSet = link.imagesrcset
          delete link.imagesrcset
        }
        if (link.imagesizes) {
          link.imageSizes = link.imagesizes
          delete link.imagesizes
        }
      } else {
        if (link.imageSrcSet) {
          link.imagesrcset = imageSrcSet = link.imageSrcSet
          delete link.imageSrcSet
        }
        if (link.imageSizes) {
          link.imagesizes = link.imageSizes
          delete link.imageSizes
        }
      }
      return /* @__PURE__ */ React4.createElement(
        "link",
        _extends2(
          {
            key: link.rel + (link.href || "") + (imageSrcSet || ""),
          },
          link,
        ),
      )
    }),
  )
}
function PrefetchPageLinks({ page, ...dataLinkProps }) {
  let { clientRoutes } = useRemixEntryContext()
  let matches = React4.useMemo(
    () => matchClientRoutes(clientRoutes, page),
    [clientRoutes, page],
  )
  if (!matches) {
    console.warn(`Tried to prefetch ${page} but no routes matched.`)
    return null
  }
  return /* @__PURE__ */ React4.createElement(
    PrefetchPageLinksImpl,
    _extends2(
      {
        page,
        matches,
      },
      dataLinkProps,
    ),
  )
}
function usePrefetchedStylesheets(matches) {
  let { routeModules } = useRemixEntryContext()
  let [styleLinks, setStyleLinks] = React4.useState([])
  React4.useEffect(() => {
    let interrupted = false
    getStylesheetPrefetchLinks(matches, routeModules).then((links) => {
      if (!interrupted) setStyleLinks(links)
    })
    return () => {
      interrupted = true
    }
  }, [matches, routeModules])
  return styleLinks
}
function PrefetchPageLinksImpl({ page, matches: nextMatches, ...linkProps }) {
  let location = useLocation()
  let { matches, manifest } = useRemixEntryContext()
  let newMatchesForData = React4.useMemo(
    () => getNewMatchesForLinks(page, nextMatches, matches, location, "data"),
    [page, nextMatches, matches, location],
  )
  let newMatchesForAssets = React4.useMemo(
    () => getNewMatchesForLinks(page, nextMatches, matches, location, "assets"),
    [page, nextMatches, matches, location],
  )
  let dataHrefs = React4.useMemo(
    () => getDataLinkHrefs(page, newMatchesForData, manifest),
    [newMatchesForData, page, manifest],
  )
  let moduleHrefs = React4.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest],
  )
  let styleLinks = usePrefetchedStylesheets(newMatchesForAssets)
  return /* @__PURE__ */ React4.createElement(
    React4.Fragment,
    null,
    dataHrefs.map((href) =>
      /* @__PURE__ */ React4.createElement(
        "link",
        _extends2(
          {
            key: href,
            rel: "prefetch",
            as: "fetch",
            href,
          },
          linkProps,
        ),
      ),
    ),
    moduleHrefs.map((href) =>
      /* @__PURE__ */ React4.createElement(
        "link",
        _extends2(
          {
            key: href,
            rel: "modulepreload",
            href,
          },
          linkProps,
        ),
      ),
    ),
    styleLinks.map((link) =>
      /* @__PURE__ */ React4.createElement(
        "link",
        _extends2(
          {
            key: link.href,
          },
          link,
        ),
      ),
    ),
  )
}
function V1Meta() {
  let { matches, routeData, routeModules } = useRemixEntryContext()
  let location = useLocation()
  let meta2 = {}
  let parentsData = {}
  for (let match of matches) {
    let routeId = match.route.id
    let data = routeData[routeId]
    let params = match.params
    let routeModule = routeModules[routeId]
    if (routeModule.meta) {
      let routeMeta =
        typeof routeModule.meta === "function"
          ? routeModule.meta({
              data,
              parentsData,
              params,
              location,
              matches: void 0,
            })
          : routeModule.meta
      if (routeMeta && Array.isArray(routeMeta)) {
        throw new Error(
          "The route at " +
            match.route.path +
            " returns an array. This is only supported with the `v2_meta` future flag in the Remix config. Either set the flag to `true` or update the route's meta function to return an object.\n\nTo reference the v1 meta function API, see https://remix.run/api/conventions#meta",
        )
      }
      Object.assign(meta2, routeMeta)
    }
    parentsData[routeId] = data
  }
  return /* @__PURE__ */ React4.createElement(
    React4.Fragment,
    null,
    Object.entries(meta2).map(([name, value]) => {
      if (!value) {
        return null
      }
      if (["charset", "charSet"].includes(name)) {
        return /* @__PURE__ */ React4.createElement("meta", {
          key: "charset",
          charSet: value,
        })
      }
      if (name === "title") {
        return /* @__PURE__ */ React4.createElement(
          "title",
          {
            key: "title",
          },
          String(value),
        )
      }
      let isOpenGraphTag = /^(og|music|video|article|book|profile|fb):.+$/.test(
        name,
      )
      return [value].flat().map((content) => {
        if (isOpenGraphTag) {
          return /* @__PURE__ */ React4.createElement("meta", {
            property: name,
            content,
            key: name + content,
          })
        }
        if (typeof content === "string") {
          return /* @__PURE__ */ React4.createElement("meta", {
            name,
            content,
            key: name + content,
          })
        }
        return /* @__PURE__ */ React4.createElement(
          "meta",
          _extends2(
            {
              key: name + JSON.stringify(content),
            },
            content,
          ),
        )
      })
    }),
  )
}
function V2Meta() {
  let { matches, routeData, routeModules } = useRemixEntryContext()
  let location = useLocation()
  let meta2 = []
  let parentsData = {}
  let matchesWithMeta = matches.map((match) => ({
    ...match,
    meta: [],
  }))
  let index = -1
  for (let match of matches) {
    index++
    let routeId = match.route.id
    let data = routeData[routeId]
    let params = match.params
    let routeModule = routeModules[routeId]
    let routeMeta = []
    if (routeModule !== null && routeModule !== void 0 && routeModule.meta) {
      routeMeta =
        typeof routeModule.meta === "function"
          ? routeModule.meta({
              data,
              parentsData,
              params,
              location,
              matches: matchesWithMeta,
            })
          : routeModule.meta
    }
    routeMeta = routeMeta || []
    if (!Array.isArray(routeMeta)) {
      throw new Error(
        "The `v2_meta` API is enabled in the Remix config, but the route at " +
          match.route.path +
          " returns an invalid value. In v2, all route meta functions must return an array of meta objects.\n\nTo reference the v1 meta function API, see https://remix.run/api/conventions#meta",
      )
    }
    matchesWithMeta[index].meta = routeMeta
    meta2 = routeMeta
    parentsData[routeId] = data
  }
  return /* @__PURE__ */ React4.createElement(
    React4.Fragment,
    null,
    meta2.flat().map((metaProps) => {
      if (!metaProps) {
        return null
      }
      if ("title" in metaProps) {
        return /* @__PURE__ */ React4.createElement(
          "title",
          {
            key: "title",
          },
          String(metaProps.title),
        )
      }
      if ("charSet" in metaProps || "charset" in metaProps) {
        return /* @__PURE__ */ React4.createElement("meta", {
          key: "charset",
          charSet: metaProps.charSet || metaProps.charset,
        })
      }
      return /* @__PURE__ */ React4.createElement(
        "meta",
        _extends2(
          {
            key: JSON.stringify(metaProps),
          },
          metaProps,
        ),
      )
    }),
  )
}
function Meta() {
  let { future: future2 } = useRemixEntryContext()
  return future2.v2_meta
    ? /* @__PURE__ */ React4.createElement(V2Meta, null)
    : /* @__PURE__ */ React4.createElement(V1Meta, null)
}
var isHydrated = false
function Scripts(props) {
  let {
    manifest,
    matches,
    pendingLocation,
    clientRoutes,
    serverHandoffString,
  } = useRemixEntryContext()
  React4.useEffect(() => {
    isHydrated = true
  }, [])
  let initialScripts = React4.useMemo(() => {
    let contextScript = serverHandoffString
      ? `window.__remixContext = ${serverHandoffString};`
      : ""
    let routeModulesScript = `${matches
      .map(
        (match, index) => `import ${JSON.stringify(manifest.url)};
import * as route${index} from ${JSON.stringify(
          manifest.routes[match.route.id].module,
        )};`,
      )
      .join("\n")}
window.__remixRouteModules = {${matches
      .map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`)
      .join(",")}};

import(${JSON.stringify(manifest.entry.module)});`
    return /* @__PURE__ */ React4.createElement(
      React4.Fragment,
      null,
      /* @__PURE__ */ React4.createElement(
        "script",
        _extends2({}, props, {
          suppressHydrationWarning: true,
          dangerouslySetInnerHTML: createHtml(contextScript),
          type: void 0,
        }),
      ),
      /* @__PURE__ */ React4.createElement(
        "script",
        _extends2({}, props, {
          dangerouslySetInnerHTML: createHtml(routeModulesScript),
          type: "module",
          async: true,
        }),
      ),
    )
  }, [])
  let nextMatches = React4.useMemo(() => {
    if (pendingLocation) {
      let matches2 = matchClientRoutes(clientRoutes, pendingLocation)
      invariant3(matches2, `No routes match path "${pendingLocation.pathname}"`)
      return matches2
    }
    return []
  }, [pendingLocation, clientRoutes])
  let routePreloads = matches
    .concat(nextMatches)
    .map((match) => {
      let route = manifest.routes[match.route.id]
      return (route.imports || []).concat([route.module])
    })
    .flat(1)
  let preloads = manifest.entry.imports.concat(routePreloads)
  return /* @__PURE__ */ React4.createElement(
    React4.Fragment,
    null,
    /* @__PURE__ */ React4.createElement("link", {
      rel: "modulepreload",
      href: manifest.url,
      crossOrigin: props.crossOrigin,
    }),
    /* @__PURE__ */ React4.createElement("link", {
      rel: "modulepreload",
      href: manifest.entry.module,
      crossOrigin: props.crossOrigin,
    }),
    dedupe2(preloads).map((path) =>
      /* @__PURE__ */ React4.createElement("link", {
        key: path,
        rel: "modulepreload",
        href: path,
        crossOrigin: props.crossOrigin,
      }),
    ),
    isHydrated ? null : initialScripts,
  )
}
function dedupe2(array) {
  return [...new Set(array)]
}
var Form = /* @__PURE__ */ React4.forwardRef((props, ref) => {
  return /* @__PURE__ */ React4.createElement(
    FormImpl,
    _extends2({}, props, {
      ref,
    }),
  )
})
Form.displayName = "Form"
var FormImpl = /* @__PURE__ */ React4.forwardRef(
  (
    {
      reloadDocument = false,
      replace = false,
      method = "get",
      action,
      encType = "application/x-www-form-urlencoded",
      fetchKey,
      onSubmit,
      ...props
    },
    forwardedRef,
  ) => {
    let submit = useSubmitImpl(fetchKey)
    let formMethod = method.toLowerCase() === "get" ? "get" : "post"
    let formAction = useFormAction(action)
    return /* @__PURE__ */ React4.createElement(
      "form",
      _extends2(
        {
          ref: forwardedRef,
          method: formMethod,
          action: formAction,
          encType,
          onSubmit: reloadDocument
            ? void 0
            : (event) => {
                onSubmit && onSubmit(event)
                if (event.defaultPrevented) return
                event.preventDefault()
                let submitter = event.nativeEvent.submitter
                let submitMethod =
                  (submitter === null || submitter === void 0
                    ? void 0
                    : submitter.formMethod) || method
                submit(submitter || event.currentTarget, {
                  method: submitMethod,
                  replace,
                })
              },
        },
        props,
      ),
    )
  },
)
FormImpl.displayName = "FormImpl"
function useFormAction(action, method = "get") {
  let { id } = useRemixRouteContext()
  let resolvedPath = useResolvedPath(action ? action : ".")
  let location = useLocation()
  let { search, hash } = resolvedPath
  let isIndexRoute2 = id.endsWith("/index")
  if (action == null) {
    search = location.search
    hash = location.hash
    if (isIndexRoute2) {
      let params = new URLSearchParams(search)
      params.delete("index")
      search = params.toString() ? `?${params.toString()}` : ""
    }
  }
  if ((action == null || action === ".") && isIndexRoute2) {
    search = search ? search.replace(/^\?/, "?index&") : "?index"
  }
  return createPath({
    pathname: resolvedPath.pathname,
    search,
    hash,
  })
}
var defaultMethod = "get"
var defaultEncType = "application/x-www-form-urlencoded"
function useSubmitImpl(key) {
  let navigate = useNavigate()
  let defaultAction = useFormAction()
  let { transitionManager } = useRemixEntryContext()
  return React4.useCallback(
    (target, options = {}) => {
      let method
      let action
      let encType
      let formData
      if (isFormElement(target)) {
        let submissionTrigger = options.submissionTrigger
        method =
          options.method || target.getAttribute("method") || defaultMethod
        action =
          options.action || target.getAttribute("action") || defaultAction
        encType =
          options.encType || target.getAttribute("enctype") || defaultEncType
        formData = new FormData(target)
        if (submissionTrigger && submissionTrigger.name) {
          formData.append(submissionTrigger.name, submissionTrigger.value)
        }
      } else if (
        isButtonElement(target) ||
        (isInputElement(target) &&
          (target.type === "submit" || target.type === "image"))
      ) {
        let form = target.form
        if (form == null) {
          throw new Error(`Cannot submit a <button> without a <form>`)
        }
        method =
          options.method ||
          target.getAttribute("formmethod") ||
          form.getAttribute("method") ||
          defaultMethod
        action =
          options.action ||
          target.getAttribute("formaction") ||
          form.getAttribute("action") ||
          defaultAction
        encType =
          options.encType ||
          target.getAttribute("formenctype") ||
          form.getAttribute("enctype") ||
          defaultEncType
        formData = new FormData(form)
        if (target.name) {
          formData.append(target.name, target.value)
        }
      } else {
        if (isHtmlElement(target)) {
          throw new Error(
            `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`,
          )
        }
        method = options.method || "get"
        action = options.action || defaultAction
        encType = options.encType || "application/x-www-form-urlencoded"
        if (target instanceof FormData) {
          formData = target
        } else {
          formData = new FormData()
          if (target instanceof URLSearchParams) {
            for (let [name, value] of target) {
              formData.append(name, value)
            }
          } else if (target != null) {
            for (let name of Object.keys(target)) {
              formData.append(name, target[name])
            }
          }
        }
      }
      if (typeof document === "undefined") {
        throw new Error(
          "You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.",
        )
      }
      let { protocol, host } = window.location
      let url = new URL(action, `${protocol}//${host}`)
      if (method.toLowerCase() === "get") {
        let params = new URLSearchParams()
        let hasParams = false
        for (let [name, value] of formData) {
          if (typeof value === "string") {
            hasParams = true
            params.append(name, value)
          } else {
            throw new Error(`Cannot submit binary form data using GET`)
          }
        }
        let isIndexAction = new URLSearchParams(url.search)
          .getAll("index")
          .some((v) => v === "")
        if (key != null && isIndexAction) {
          hasParams = true
          params.append("index", "")
        }
        url.search = hasParams ? `?${params.toString()}` : ""
      }
      let submission = {
        formData,
        action: url.pathname + url.search,
        method: method.toUpperCase(),
        encType,
        key: Math.random().toString(36).substr(2, 8),
      }
      if (key) {
        transitionManager.send({
          type: "fetcher",
          href: submission.action,
          submission,
          key,
        })
      } else {
        setNextNavigationSubmission(submission)
        navigate(url.pathname + url.search, {
          replace: options.replace,
        })
      }
    },
    [defaultAction, key, navigate, transitionManager],
  )
}
var nextNavigationSubmission
function setNextNavigationSubmission(submission) {
  nextNavigationSubmission = submission
}
function consumeNextNavigationSubmission() {
  let submission = nextNavigationSubmission
  nextNavigationSubmission = void 0
  return submission
}
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string"
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button"
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form"
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input"
}
function useBeforeUnload(callback) {
  React4.useEffect(() => {
    window.addEventListener("beforeunload", callback)
    return () => {
      window.removeEventListener("beforeunload", callback)
    }
  }, [callback])
}
function useTransition() {
  let { transitionManager } = useRemixEntryContext()
  return transitionManager.getState().transition
}
var LiveReload = true
  ? () => null
  : function LiveReload2({ port = Number(8002), nonce = void 0 }) {
      let js = String.raw
      return /* @__PURE__ */ React4.createElement("script", {
        nonce,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: js`
                function remixLiveReloadConnect(config) {
                  let protocol = location.protocol === "https:" ? "wss:" : "ws:";
                  let host = location.hostname;
                  let socketPath = protocol + "//" + host + ":" + ${String(
                    port,
                  )} + "/socket";
                  let ws = new WebSocket(socketPath);
                  ws.onmessage = (message) => {
                    let event = JSON.parse(message.data);
                    if (event.type === "LOG") {
                      console.log(event.message);
                    }
                    if (event.type === "RELOAD") {
                      console.log("💿 Reloading window ...");
                      window.location.reload();
                    }
                  };
                  ws.onopen = () => {
                    if (config && typeof config.onOpen === "function") {
                      config.onOpen();
                    }
                  };
                  ws.onclose = (event) => {
                    if (event.code === 1006) {
                      console.log("Remix dev asset server web socket closed. Reconnecting...");
                      setTimeout(
                        () =>
                          remixLiveReloadConnect({
                            onOpen: () => window.location.reload(),
                          }),
                        1000
                      );
                    }
                  };
                  ws.onerror = (error) => {
                    console.log("Remix dev asset server web socket error:");
                    console.error(error);
                  };
                }
                remixLiveReloadConnect();
              `,
        },
      })
    }

// node_modules/@remix-run/react/dist/esm/scroll-restoration.js
var React5 = __toESM(require_react())
var STORAGE_KEY = "positions"
var positions = {}
if (typeof document !== "undefined") {
  let sessionPositions = sessionStorage.getItem(STORAGE_KEY)
  if (sessionPositions) {
    positions = JSON.parse(sessionPositions)
  }
}
function ScrollRestoration(props) {
  useScrollRestoration()
  React5.useEffect(() => {
    window.history.scrollRestoration = "manual"
  }, [])
  useBeforeUnload(
    React5.useCallback(() => {
      window.history.scrollRestoration = "auto"
    }, []),
  )
  let restoreScroll = ((STORAGE_KEY2) => {
    if (!window.history.state || !window.history.state.key) {
      let key = Math.random().toString(32).slice(2)
      window.history.replaceState(
        {
          key,
        },
        "",
      )
    }
    try {
      let positions2 = JSON.parse(sessionStorage.getItem(STORAGE_KEY2) || "{}")
      let storedY = positions2[window.history.state.key]
      if (typeof storedY === "number") {
        window.scrollTo(0, storedY)
      }
    } catch (error) {
      console.error(error)
      sessionStorage.removeItem(STORAGE_KEY2)
    }
  }).toString()
  return /* @__PURE__ */ React5.createElement(
    "script",
    _extends2({}, props, {
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: `(${restoreScroll})(${JSON.stringify(STORAGE_KEY)})`,
      },
    }),
  )
}
var hydrated = false
function useScrollRestoration() {
  let location = useLocation()
  let transition = useTransition()
  let wasSubmissionRef = React5.useRef(false)
  React5.useEffect(() => {
    if (transition.submission) {
      wasSubmissionRef.current = true
    }
  }, [transition])
  React5.useEffect(() => {
    if (transition.location) {
      positions[location.key] = window.scrollY
    }
  }, [transition, location])
  useBeforeUnload(
    React5.useCallback(() => {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
    }, []),
  )
  if (typeof document !== "undefined") {
    React5.useLayoutEffect(() => {
      if (!hydrated) {
        hydrated = true
        return
      }
      let y = positions[location.key]
      if (y != void 0) {
        window.scrollTo(0, y)
        return
      }
      if (location.hash) {
        let el = document.getElementById(location.hash.slice(1))
        if (el) {
          el.scrollIntoView()
          return
        }
      }
      if (wasSubmissionRef.current === true) {
        wasSubmissionRef.current = false
        return
      }
      window.scrollTo(0, 0)
    }, [location])
  }
  React5.useEffect(() => {
    if (transition.submission) {
      wasSubmissionRef.current = true
    }
  }, [transition])
}

// node_modules/@remix-run/react/dist/esm/server.js
var React6 = __toESM(require_react())
function RemixServer({ context, url }) {
  if (typeof url === "string") {
    url = new URL(url)
  }
  let location = {
    pathname: url.pathname,
    search: url.search,
    hash: "",
    state: null,
    key: "default",
  }
  let staticNavigator = {
    createHref(to) {
      return typeof to === "string" ? to : createPath(to)
    },
    push(to) {
      throw new Error(
        `You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(
          to,
        )})\` somewhere in your app.`,
      )
    },
    replace(to) {
      throw new Error(
        `You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(
          to,
        )}, { replace: true })\` somewhere in your app.`,
      )
    },
    go(delta) {
      throw new Error(
        `You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`,
      )
    },
    back() {
      throw new Error(
        `You cannot use navigator.back() on the server because it is a stateless environment.`,
      )
    },
    forward() {
      throw new Error(
        `You cannot use navigator.forward() on the server because it is a stateless environment.`,
      )
    },
    block() {
      throw new Error(
        `You cannot use navigator.block() on the server because it is a stateless environment.`,
      )
    },
  }
  return /* @__PURE__ */ React6.createElement(RemixEntry, {
    context,
    action: Action.Pop,
    location,
    navigator: staticNavigator,
    static: true,
  })
}

// app/entry.server.tsx
var import_server3 = __toESM(require_server_browser())
var import_jsx_runtime = __toESM(require_jsx_runtime())
function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  const markup = (0, import_server3.renderToString)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemixServer, {
      context: remixContext,
      url: request.url,
    }),
  )
  responseHeaders.set("Content-Type", "text/html")
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}

// app/root.tsx
var root_exports = {}
__export(root_exports, {
  default: () => App,
  meta: () => meta,
})
var import_jsx_runtime2 = __toESM(require_jsx_runtime())
var meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", {
    lang: "en",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Meta, {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Links, {}),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Outlet, {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ScrollRestoration, {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Scripts, {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LiveReload, {}),
        ],
      }),
    ],
  })
}

// app/routes/index.tsx
var routes_exports = {}
__export(routes_exports, {
  default: () => Index,
})
var import_jsx_runtime3 = __toESM(require_jsx_runtime())
function Index() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", {
    style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.4" },
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", {
        children: "Welcome to Remix",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("ul", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", {
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", {
              target: "_blank",
              href: "https://remix.run/tutorials/blog",
              rel: "noreferrer",
              children: "15m Quickstart Blog Tutorial",
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", {
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", {
              target: "_blank",
              href: "https://remix.run/tutorials/jokes",
              rel: "noreferrer",
              children: "Deep Dive Jokes App Tutorial",
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", {
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", {
              target: "_blank",
              href: "https://remix.run/docs",
              rel: "noreferrer",
              children: "Remix Docs",
            }),
          }),
        ],
      }),
    ],
  })
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = {
  version: "60e00851",
  entry: {
    module: "/build/entry.client-KPOOBG5E.js",
    imports: [
      "/build/_shared/chunk-3LPGR5PY.js",
      "/build/_shared/chunk-JKCUYFIB.js",
    ],
  },
  routes: {
    root: {
      id: "root",
      parentId: void 0,
      path: "",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/root-D7FU7CQM.js",
      imports: void 0,
      hasAction: false,
      hasLoader: false,
      hasCatchBoundary: false,
      hasErrorBoundary: false,
    },
    "routes/index": {
      id: "routes/index",
      parentId: "root",
      path: void 0,
      index: true,
      caseSensitive: void 0,
      module: "/build/routes/index-SQIXOQPE.js",
      imports: void 0,
      hasAction: false,
      hasLoader: false,
      hasCatchBoundary: false,
      hasErrorBoundary: false,
    },
  },
  url: "/build/manifest-60E00851.js",
}

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build"
var future = { v2_meta: false }
var publicPath = "/build/"
var entry = { module: entry_server_exports }
var routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports,
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports,
  },
}

// server.js
var handleRequest2 = createPagesFunctionHandler({
  build: server_build_exports,
  mode: "production",
  getLoadContext: (context) => context.env,
})

export function onRequest(context) {
  return handleRequest2(context)
}

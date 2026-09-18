# chi HTTP routing reference

Studio One publishes this independent reference for developers building HTTP
services. It is generated from the actual source of
[go-chi/chi](https://github.com/go-chi/chi), a third-party MIT-licensed Go library.
Studio One does not maintain chi; upstream remains the authority for releases,
support and security advisories.

**[Browse the reference](https://www.thestudioone.xyz/docs/chi/)** ·
**[Pinned source](https://github.com/go-chi/chi/tree/b1c9ab47626cc46b34393ad4d35779c4363c4e1e)**

## Choose an API

| Need | API | Important behavior |
| --- | --- | --- |
| Create a standard HTTP handler | `chi.NewRouter`, `Mux.ServeHTTP` | Compatible with `net/http`. |
| Register methods | `Mux.Get`, `Post`, `Put`, `Patch`, `Delete`, `Head`, `Options` | Method-specific routing. |
| Mount another handler | `Mux.Mount` | Mount a handler or subrouter below a path. |
| Add middleware to a router | `Mux.Use` | Register middleware before adding routes. |
| Add middleware to one endpoint | `Mux.With` | Returns an inline router sharing the route tree. |
| Group related routes | `Mux.Group`, `Mux.Route` | Group middleware or introduce a path prefix. |
| Read route parameters | `chi.URLParam`, `chi.URLParamFromCtx` | Parameters live in the routing context. |
| Customize failures | `Mux.NotFound`, `Mux.MethodNotAllowed` | Set routing failure handlers. |
| Enumerate routes | `chi.Walk`, `Mux.Routes` | Useful for route inventories. |
| Identify requests | `middleware.RequestID`, `middleware.GetReqID` | Access the ID through the request context. |
| Recover panics | `middleware.Recoverer` | Keep panic handling inside the HTTP middleware chain. |
| Bound work duration | `middleware.Timeout` | The handler must observe context cancellation. |
| Bound request body reads | `middleware.RequestSize` | Wraps `http.MaxBytesReader`; the handler must handle read errors. |
| Compress responses | `middleware.Compress` | Compression depends on accepted encoding and content type. |
| Limit concurrency | `middleware.Throttle`, `middleware.ThrottleBacklog` | Bound concurrent handlers and optionally queue pending work. |
| Resolve client IPs | `middleware.ClientIPFromRemoteAddr`, `ClientIPFromXFFTrustedProxies` | Choose the resolver for the actual proxy boundary. |

These entries are a navigation aid. Full declarations, comments and source
positions are extracted by Sourcey's native `godoc` adapter rather than
recreated in this table.

## Start with upstream examples

The pinned repository includes examples in
[`_examples`](https://github.com/go-chi/chi/tree/b1c9ab47626cc46b34393ad4d35779c4363c4e1e/_examples).
The [README](https://github.com/go-chi/chi/blob/b1c9ab47626cc46b34393ad4d35779c4363c4e1e/README.md)
shows a minimal server and a REST API with middleware and subrouters.

For a new service, begin with the minimal router, add request identification
and recovery, then add one route group at a time. Test routing with
`net/http/httptest` before attaching storage or external services.

Two behaviors deserve explicit integration tests:

* `Timeout` cancels the request context. It does not interrupt an arbitrary
  blocking function. Pass that context to database and outbound HTTP calls.
* `RequestSize` limits reads. Check body decoding errors and map an oversized
  body to an appropriate response; merely installing the middleware does not
  implement that error handling.

## Rebuild the static site

```sh
npm ci
npm run docs:build
npm run build
```

The committed `godoc.json` snapshot keeps regular builds independent of a Go
installation or a live upstream checkout. Generated HTML goes to
`public/docs/chi/` and is copied into Vite's production output.

To regenerate the snapshot, install Go 1.24 or newer, then:

```sh
git clone https://github.com/go-chi/chi.git ../chi-source
git -C ../chi-source checkout b1c9ab47626cc46b34393ad4d35779c4363c4e1e
npx --no-install sourcey godoc --module ../chi-source --out docs/chi/godoc.json
```

When updating upstream, update the source commit in the config, this guide and
the evidence together. Review API differences, regenerate the snapshot, run
the build checks and verify source links before publishing.

## Coverage and maintainer-facing gaps

The snapshot covers both public packages: `chi` and `middleware`. It contains
56 package functions, 20 types and 45 methods across 35 source files, exceeding
20 distinct public APIs without counting prose headings as APIs.

- **Example coverage is incomplete.** The snapshot contains zero extracted
   `Example*` entries. Upstream's standalone `_examples` programs are outside
   the ordinary `go list ./...` package traversal. The reference therefore
   links to those examples and does not claim that Sourcey rendered them.
- **Middleware composition needs narrative guidance.** Generated signatures
   do not communicate ordering or the difference between a router-wide stack
   and an inline route stack. The API map above points readers to `Use`,
   `With`, `Group` and `Route`, plus upstream's working REST example.
- **Cancellation and body limits need integration tests.** A generated
   `Timeout` or `RequestSize` entry cannot prove how a particular application
   reacts. Their contracts are called out above to avoid treating them as
   automatic request termination or automatic error responses.
- **The reference is a fixed revision.** It is not a claim that this commit
   is a tagged release or the latest upstream state. Source links pin the
   same revision as the extraction. Updating this snapshot requires review.
- **Go package navigation currently requires HTML URLs.** Sourcey 3.6.5
   generated sibling package links ending in `.html` even with
   `prettyUrls: "slash"`, which produced broken links. This site uses the
   default HTML URL mode and checks local links after generation.
- **Legacy APIs need migration guidance.** Upstream explicitly deprecates
   [`RealIP`](https://github.com/go-chi/chi/blob/b1c9ab47626cc46b34393ad4d35779c4363c4e1e/middleware/realip.go#L20)
   because it trusts spoofable headers. Preserve that warning in the
   generated entry, and direct new integrations to the client-IP resolvers
   appropriate for their trusted proxy configuration.

The documentation retains upstream's copyright and MIT license in
`public/LICENSE.txt`. Sourcey 3.6.5 generates the HTML, search index, navigation
and machine-readable context exports.

The [production readback](./verify/receipts/README.md) supplies signed runx
receipts, the public verification key, and observed HTTP response digests.

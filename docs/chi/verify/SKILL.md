---
name: chi-docs-readback
description: Capture public Studio One chi documentation and its pinned upstream source through runx's bounded HTTP reader.
---

# Verify the chi documentation publication

Run only after the production documentation is deployed.

```sh
runx skill docs/chi/verify --json
runx verify --receipt <generated-receipt.json> --json
```

This graph makes public GET requests to two fixed hosts. It reads the docs
landing page, both package references, the build evidence, the retained license
and the pinned upstream module declaration. It does not deploy, authenticate,
spend money or mutate a provider.

Inspect the response status of every request. A successful transport receipt
alone is not proof that every page is correct. Run `npm run docs:check` for
local link, coverage and source-revision validation, then compare the published
evidence to the same build. Preserve the root and child receipts together.

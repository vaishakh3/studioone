# Production readback

On 18 September 2026, runx-cli 0.9.0 executed the parent `X.yaml` graph against
the live Studio One documentation and the pinned upstream module declaration.
All six public requests returned HTTP 200 with complete response bodies.
`readback-summary.json` records the observed statuses, byte counts and body
digests.

The executed graph came from Studio One commit
`db284f75c26083d2951c895d155b32f9a80fe6ef`.

Receipt reference:

```text
runx:receipt:sha256:89e0ef0470bf00356a7b00a78ada464a2d701f88bffc6b102445aa9f2f104ab1
```

The root and child receipt JSON files are unmodified runx output. They were
signed by this project's automated readback operator using a private Ed25519
key. The public key is provided here; the private signing seed is not
published. This signature does not imply verification or endorsement by
upstream chi, Sourcey, runx's hosted notary, or a bounty reviewer.

## Independently verify

From this directory, with runx 0.9.0 or newer:

```sh
export RUNX_RECEIPT_VERIFY_KID=studioone-chi-readback-20260918
export RUNX_RECEIPT_VERIFY_ED25519_PUBLIC_KEY_BASE64="$(cat public-key.base64)"
runx verify \
  sha256:89e0ef0470bf00356a7b00a78ada464a2d701f88bffc6b102445aa9f2f104ab1 \
  --receipt-dir . --json
```

The result must report `valid: true`, `signature_mode: "production"`, two
receipts, and no findings. `verification.json` preserves the observed result
with the local storage path omitted.

The receipts attest to the governed execution and its completion. Check the
HTTP results and live content separately: a valid signature alone does not
establish documentation quality, a payment, or acceptance of a submission.
See the [maintainer gap report](../../README.md) for coverage and limitations.

## Reproduce the readback

Configure your own signing identity as described in the parent `SKILL.md`,
then run from the repository root:

```sh
runx --version
runx skill docs/chi/verify --json -R <receipt-directory>
runx verify <new-receipt-id> --receipt-dir <receipt-directory> --json
```

The published receipts record one execution. A new execution creates new
receipt IDs; changing the graph or the published site can change its results.

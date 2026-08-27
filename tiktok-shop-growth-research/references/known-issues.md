# Known Issues and Retest Ledger

This is a dated operational ledger, not a permanent description of the MCP contract. Read only after a matching error, suspiciously repeated result set, or schema mismatch affects the current task.

## Operating rules

- The live tool schema, current response, and current official documentation take precedence over this ledger.
- A historical observation is inactive until reproduced. Do not pre-emptively remove a requested filter or claim that an endpoint is broken because it appears here.
- Capture the current tool, arguments excluding secrets, response/error class, page, and access time before applying a fallback.
- Make at most one safe retry that preserves the user's intent, such as removing an optional unverified sort. Disclose the changed argument.
- Stop on authentication, insufficient-points/entitlement, rate-limit errors, or repeated server failure. Keep completed evidence and mark the affected collection incomplete.
- When a workaround succeeds or the issue no longer reproduces, update the status and last-retested date. Remove obsolete runtime guidance after the fix is confirmed across representative calls.

## Ledger

### KSI-001 — Optional sales sorting reported to cause server errors

- **Affected tools:** `product_search`, `shop_search`
- **Observed:** 2026-08-18 in a WorkBuddy partner field run.
- **Status:** Historical observation; not verified as current by this repository.
- **Trigger:** A current call fails with a server error only when an optional sales-related sort is supplied.
- **Action:** Record the failed sort, retry once without that optional sort when the unsorted result still answers the task, and sort locally only inside the disclosed collected sample. If the retry fails, stop the affected chain and mark it incomplete.
- **Do not infer:** That every sales field, filter, or current server-side sort is broken.
- **Retest:** Verify against the live schema and representative product/shop calls before changing status or encoding a permanent rule.

### KSI-002 — Narrow creator keyword searches reported to repeat or lose category relevance

- **Affected tool:** `creator_search`
- **Observed:** 2026-08-18 in a WorkBuddy partner field run using a category keyword plus a narrow follower band.
- **Status:** Historical observation; not verified as current by this repository.
- **Trigger:** Different relevant keywords return the same stable creator IDs/pages, or the returned creators are materially unrelated to the requested category after one precise query and one disclosed synonym.
- **Action:** Preserve the direct-query evidence, label it degraded, and use the conditional video-first creator discovery path in [creator-partnership.md](creator-partnership.md) when creator discovery remains necessary.
- **Do not infer:** That keyword search always targets only nickname/biography, or that a repeated page proves the full creator market is unavailable.
- **Retest:** Compare stable IDs and category relevance across representative markets, follower bands, pages, and current schema-supported category inputs.

### KSI-003 — Creator category inputs reported to return empty results

- **Affected tool:** `creator_search`
- **Observed:** 2026-08-18 in a WorkBuddy partner field run using an English category label.
- **Status:** Historical observation; not verified as current by this repository.
- **Trigger:** A schema-valid category input returns no rows while adjacent product/video evidence shows that the normalized category exists.
- **Action:** Check category normalization and live accepted values, try one close synonym or verified category ID when supported, then report the empty direct result. Use video-first discovery only as a bounded alternative sample, not proof of all category creators.
- **Do not infer:** That zero returned rows means no creators exist in the market.
- **Retest:** Test normalized names, verified IDs, market combinations, and at least one next page where the live schema supports them.

### KSI-004 — TikTok caption URL variants have client- and time-dependent compatibility

- **Affected tool:** `caption_extract_url`
- **Observed:** 2026-08-18 in a WorkBuddy partner field run; both public long and TikTok-owned short links reportedly succeeded in that environment.
- **Status:** Historical compatibility observation; not a guarantee for every current client or video.
- **Trigger:** A current public TikTok video URL is rejected or returns no caption.
- **Action:** Preserve the original URL and error, distinguish unsupported URL from unavailable caption/permission, and ask for a TikTok App share link only when a different public URL form is the smallest useful retry. Never reconstruct missing speech.
- **Do not infer:** That failure proves the video has no speech, or that every long/short URL is supported.
- **Retest:** Check representative public long and TikTok-owned short URLs in the current client without bypassing access controls.

## Maintenance record

When changing an entry, record the new access date, client, market/object class, arguments relevant to reproduction, observed result, and whether the fallback remains necessary. Never record credentials or private customer data.

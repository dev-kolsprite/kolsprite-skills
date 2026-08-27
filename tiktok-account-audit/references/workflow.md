# Public TikTok Account Audit Workflow

## 1. Validate and normalize the target

1. Preserve the original URL. Accept only `tiktok.com` or a subdomain, case-insensitively.
2. A canonical profile path must be exactly `/@handle` or `/@handle/`, with one non-empty Handle segment containing letters, digits, `.`, `_`, or `-`. Remove the trailing slash, query, and fragment to form `https://www.tiktok.com/@handle`.
3. Resolve a TikTok-owned public short link only through a capable browser. Accept it only if the final public URL is still TikTok-owned and resolves to the canonical profile path.
4. Reject video/post, shop, search, hashtag, login, and non-TikTok URLs. Do not infer the target from link text or a neighboring nickname.
5. If link text and the normalized URL disagree, use the normalized URL target and disclose the conflict.

## 2. Plan the evidence scope

Record optional market, date window, requested video cap, goal, and benchmark accounts. Without a video cap, target up to 50 recently accessible public videos but stop earlier when a smaller varied sample supports the bounded conclusion. Always disclose the requested/default cap and actual sample.

Validate every benchmark URL independently. When no comparison scope is specified, use at most three benchmark accounts. If the requested scope cannot be collected comparably, ask for the single decision-changing reduction.

## 3. Collect public profile and video evidence

When a capable browser exists, read only visible public fields and record each page URL, access time/timezone, visible fields, sample, and restriction. Do not bypass login, CAPTCHA, anti-bot, regional, age, or access controls.

Record only visible profile identity, biography, links, follower/following/like/video counters, verification, visible shop/product associations, and public videos. For videos, preserve ID/URL, description, publish time, duration, views, likes, comments, shares, pinned state, and visible product/shop signals when available.

Pinned videos may explain profile packaging, historical winners, or proof, but do not automatically represent recent performance. Exclude pinned videos from a recent distribution unless their verified publish time falls inside an explicit user window; keep the pinned flag visible either way.

## 4. Enrich with current public KOLSprite MCP

### `creator_search`

Use the normalized Handle as the nickname search entry point. Accept a record only when its returned Handle exactly matches the normalized Handle, or when a verified video creator ID exactly matches the returned creator ID. Otherwise mark identity/association unconfirmed and do not use its metrics.

Use actual returned fields such as category, product category, followers, average views, engagement, growth, sales, GPM, recent activity, and product/video counts. Preserve the live schema's metric windows; unspecified selling periods remain “period not specified.” Do not include contact fields unless the user has a legitimate explicit need and they are necessary for the answer.

### `video_search`

Use only as a supplementary discovery source. A keyword or Handle query is not a complete account-video endpoint. Keep a result only when the nested creator ID or Handle matches the verified target. Record filters, pages, rows, deduplication, and completeness.

### `caption_extract_url`

Use on verified representative video URLs. Record success, failure, and not-executed counts. When caption extraction fails, analyze only visible text and label the spoken Hook/structure unavailable.

## 5. Maintain a source ledger and confidence

| Source | Tool/page | Access time | Scope/sample | Field coverage | Limitation/error |
|---|---|---|---|---|---|

Use confidence per material conclusion:

- **A**: identity, relevant window/sample, and key fields are complete enough for the conclusion and supported by compatible repeated evidence.
- **B**: identity is confirmed and evidence is useful, but collection is page-bounded, mixed-source, or missing a disclosed dimension.
- **C**: identity, sample, or a decision-changing field is limited; provide only a preliminary observation or conditional recommendation.

No client/browser capability is itself an evidence grade; grade the support for the specific conclusion.

## 6. Build comparable account evidence

For benchmarks, use the same date window and collection rule. If actual samples differ, compare the most recent common sample size among non-empty accounts rather than selecting each account's best videos. Do not compare metrics when source, window, unit, formula, or field coverage is incompatible.

Calculate interaction rate only when views are positive and likes, comments, and shares are all present: `(likes + comments + shares) / views`. Otherwise show the available components without calling a partial numerator an interaction rate.

Never combine cumulative plays with recent units/GMV to estimate conversion.

## 7. Diagnose the account

Classify from repeated visible evidence:

- **Content-led**: knowledge, entertainment, lifestyle, or creator expression dominates without persistent commerce/brand signals.
- **Commerce-led**: product demonstrations, product links, price/purchase prompts, or observed selling evidence dominate.
- **Brand-led**: official brand identity, products, assets, and consistent brand CTA dominate.
- **Mixed**: two or more signal types persist across the usable sample.

Analyze content pillars and cadence; representative recent/high/low/pinned/commerce videos; Hook, structure, persona, proof, selling points, objections, and CTA; visible product/commerce evidence; repeated operating patterns and their counterexamples.

An account-level operating pattern needs at least two traceable supporting examples. A single viral video remains a case, not an account formula.

## 8. Stop and handle missing evidence

Stop when the requested cap/window is reached, no next page remains, results repeat, insufficient-points/rate-limit/authentication/server errors block collection, public access is restricted, or a sufficient varied sample supports the bounded diagnosis.

If a missing field would change the account type, main opportunity, or first action, ask for one focused public input such as a canonical profile URL, specific screenshot, or export. If the user cannot provide it but wants to continue, deliver a C-confidence partial report with the affected conclusions marked unresolved.

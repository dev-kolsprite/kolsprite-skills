# Account Evidence Method

Use this method when the growth-plan request does not already include a compatible, traceable account audit. Its output is the account side of the account-category gap matrix, not a standalone long-form audit.

## 1. Validate the target and scope

1. Preserve the original URL. Accept only a public TikTok-owned URL that resolves to a canonical profile path of `/@handle`.
2. Normalize it to `https://www.tiktok.com/@handle`, removing query parameters, fragments, and a trailing slash.
3. Reject video, shop, search, hashtag, login, and non-TikTok URLs. Resolve a TikTok short link only with a capable browser and only when the final URL remains TikTok-owned.
4. Record the requested market, date window, video cap, business goal, and benchmark accounts. Unknown values remain unknown.

Without a requested video cap, target up to 50 recently accessible public videos, but stop earlier when a smaller varied sample supports the bounded growth-plan decision. Disclose the actual sample and stop reason.

## 2. Collect public evidence

When a capable browser exists, read only visible public profile and video fields. Record the page URL, access time and timezone, sample, visible fields, and restrictions. Do not bypass login, CAPTCHA, anti-bot, regional, age, or access controls.

Preserve visible identity, biography, links, follower/following/like/video counters, verification, shop/product associations, and public video fields. For videos, retain the ID or URL, description, publish time, duration, views, likes, comments, shares, pinned state, and visible commerce signals when available.

Keep pinned, recent, high-performing, low-performing, and commerce videos distinct. Do not treat pinned videos as recent unless their verified publish time falls inside the selected window.

## 3. Enrich through the public KOLSprite MCP

- Use `creator_search` with the normalized Handle. Accept a record only when the returned Handle matches exactly or a verified video creator ID confirms the identity.
- Use `video_search` only as supplementary discovery. A Handle or keyword query is not a complete account-video endpoint. Retain a result only when its creator identity matches the verified target.
- Use `caption_extract_url` on a small set of verified representative videos when spoken Hook, proof, objection handling, or CTA affects the growth plan.

Preserve filters, page range, raw and deduplicated rows, field periods, caption requested/success/failed/not-executed counts, and actual point usage only when returned. Stop the affected enrichment chain on authentication, insufficient points, rate limits, repeated server failure, or a missing required tool.

## 4. Build comparable account evidence

For benchmark accounts, use the same window and collection rule. When usable samples differ, compare the most recent common non-empty sample rather than selecting each account's best videos.

Calculate interaction rate only when views are positive and likes, comments, and shares are all present: `(likes + comments + shares) / views`. Otherwise show available components without naming the partial calculation an interaction rate. Never combine cumulative plays with recent units or GMV to estimate conversion.

Classify the account from repeated evidence:

- **Content-led**: knowledge, entertainment, lifestyle, or creator expression dominates without persistent commerce or brand signals.
- **Commerce-led**: demonstrations, product links, purchase prompts, or observed selling evidence dominate.
- **Brand-led**: official brand identity, products, assets, and consistent brand CTA dominate.
- **Mixed**: two or more signal types persist across the usable sample.

An operating pattern needs at least two traceable supporting examples. A single viral video is a case, not an account formula.

## 5. Return the account-stage record

Return a compact record containing:

- normalized profile identity and confirmation state;
- requested/default and actual sample, window, pages, completeness, and stop reason;
- source ledger and A/B/C confidence for material conclusions;
- account type, content pillars, sample cadence, and representative video roles;
- reusable positioning, Hook, proof, CTA, creator/persona, and commerce assets;
- main capability gaps, counterevidence, and unavailable fields;
- user-supplied capacity, inventory, fulfillment, budget, or content constraints kept separate from observed evidence.

Use A confidence only when identity and the relevant sample/fields support the conclusion with compatible repeated evidence; B for useful but page-bounded or mixed-source evidence; C for a preliminary result with a material gap. If a missing field would change positioning or the first action, request the single smallest public input or carry the decision forward as unresolved.

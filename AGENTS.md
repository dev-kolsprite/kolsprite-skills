# AGENTS.md

## Repository purpose

This repository contains the official Skills for KOLSprite's public unified MCP service. It should make tool selection automatic while keeping business conclusions traceable to current MCP evidence.

## Skill ownership

- `kolsprite-search`: one-step creator, product, video, or shop lookup and filtering.
- `kolsprite-caption`: extraction or analysis of a supplied TikTok video's subtitles, speech, script, hook, selling points, or CTA.
- `amazon-tiktok-signal`: Amazon ASIN-specific TikTok head-signal, recent-direction, commerce, and bounded multi-ASIN comparison using `asin_video_search`.
- `tiktok-shop-growth-research`: multi-step TikTok Shop decisions involving opportunity evaluation, cold start, winning content, creator selection, or competitor/growth research.
- `tiktok-account-audit`: diagnosis of one or more verified public TikTok profile URLs, their visible content patterns, commerce signals, and reusable operating logic.
- `tiktok-growth-plan`: orchestration of a completed account audit and category/opportunity study into account-category fit and a 30-day roadmap.

Keep these trigger boundaries discriminating. Do not add a second Skill that claims the same primary decision intent without documenting precedence.

`amazon-tiktok-signal` owns the ASIN-specific evidence and comparison decision. `tiktok-shop-growth-research` owns a broader follow-up about cold start, content strategy, creator programs, or category entry; it may use an already completed ASIN signal as one input without relabelling generic keyword results as ASIN-specific evidence.

## Public capability boundary

All Skills depend on one Streamable HTTP MCP service at `https://mcp.kolsprite.com/mcp`. Functional routing among search, caption, account, and growth tasks must not be represented as separate MCP endpoints or separate service installations.

Only document and route to KOLSprite tools that exist in the repository's release validation allowlist. Before publishing a package, verify every listed tool against the unified MCP `tools/list`. A Skill must still stop cleanly when a required tool is absent at runtime. Do not present internal or private capabilities as public.

Tools required by the `0.4.0` release contract are:

- `creator_search`
- `product_search`
- `video_search`
- `shop_search`
- `caption_extract_url`
- `asin_video_search`

MCP uses KOLSprite points, and different executed tools/operations may consume different amounts. Route to the smallest useful call plan, reuse collected evidence, and do not hardcode point prices unless a current official contract is intentionally versioned in this repository. Skill selection alone is not a charge record; report point usage only from an actual MCP/host usage result.

When a requested conclusion requires unavailable detail, attribution, cost, margin, inventory, conversion, or audience data, state the boundary and narrow the answer instead of inventing a proxy. `amazon-tiktok-signal` may calculate a clearly labelled rough recent direction from the representative top-play sample returned by `asin_video_search`; it must preserve the sample, sort, period, relevance, and client-calculation boundary.

Account Skills may use a capable browser for public TikTok pages, but browser observations must remain separate from MCP evidence and stop at login, CAPTCHA, anti-bot, regional, or access restrictions. Do not promise unpublished `creator_profile` or `creator_videos` tools.

## Skill authoring rules

- Use hyphen-case for Skill folder names and frontmatter `name` values.
- Keep `SKILL.md` focused on discovery, routing, essential constraints, and reference selection.
- Put substantial scenario logic and maintained judgment definitions in `references/`.
- Separate MCP observations, client calculations, external facts, and business judgments.
- Preserve metric definitions, periods, page boundaries, filters, and sort order.
- Empty results mean no records were retrieved under the query, not proof that no market activity exists.
- Ask only for missing inputs that materially change scope or conclusion.
- Never ask whether KOLSprite MCP should be used when the Skill already applies.

## Links, preference memory, and product hand-offs

- Use an object URL only when it is returned by MCP or follows a verified public KOLSprite URL contract. Never fabricate a KOLSprite detail URL.
- Treat preference memory as optional client capability. Ask before saving a durable preference; do not store secrets, private business data, or one-off task details.
- Solve the current request before mentioning another KOLSprite workflow or product surface. A hand-off must be directly relevant, optional, accurate, and limited to one concise next step.

The growth-research Skill's shared conventions are authoritative for detailed behavior.

## Upstream attribution

Work adapted from external contributors must be recorded in `ATTRIBUTIONS.md`, retain the applicable upstream license under `third_party/`, and be described in README contributor material. Do not repeat attribution in every runtime result. When updating an adapted workflow, preserve the upstream source/commit record and distinguish KOLSprite-specific changes.

## Repository maintenance

When adding or changing a Skill:

1. Preserve the ownership boundaries above.
2. Update `README.md`, this file, and the routing fixtures when the public contract changes.
3. Add or update references only when they materially change decisions.
4. Run `npm test` and the available Skill frontmatter validator.
5. Keep `agents/openai.yaml` display text, default prompt, dependencies, and invocation policy consistent with the Skill.
6. Keep the MCP dependency at the approved unified URL and never include or modify a real secret. Change the URL or authentication contract only after explicit product direction and official-document verification.

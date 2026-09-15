---
name: tiktok-shop-growth-research
description: Conduct an evidence-backed TikTok Shop business study with current KOLSprite product, creator, video, shop, and caption data. Use for opportunity evaluation, cold-start planning, winning-content research, creator selection, competitor comparison, growth diagnosis, and questions such as whether and how a direction is worth testing. Do not use for a single direct lookup or caption-only request.
---

# TikTok Shop Growth Research

Turn a seller's decision into a bounded recommendation by combining data-search and caption tools exposed through one active connection with the compatible KOLSprite tool contract. Use MCP automatically; do not ask whether to use it.

## Compatible MCP routing

- Prefer the SellerSpace Yunya unified MCP when it is available and authenticated.
- Support direct business tools plus current and legacy Yunya facade entrypoints.
- In direct mode, resolve each required research tool by its semantic business name.
- In Yunya facade mode, when a required business tool is not visible at the host's top level, make at most one host-level discovery attempt and prefer the product-specific `yunya_search_kolsprite_tools`. Query the smallest tool set needed for the selected workflow; use the exact internal tool names and complete input schemas returned, then invoke them through `call_read_tool`.
- If the product-specific entrypoint is unavailable but the legacy generic `yunya__search_tools` is discoverable, use it with provider `kolsprite`, operation `read`, and the same query. Do not prefer the generic entrypoint when the product-specific one is available.
- Do not guess a facade namespace, internal tool name, wrapper, category value, or arguments. Reuse discovered names, schemas, IDs, and evidence throughout the run.
- A host-level miss for a business tool does not prove internal absence. Only report a missing business dependency after direct exposure and the available current or legacy facade lookup fail. If neither facade entrypoint can be discovered, report a connector-discovery failure and continue only with evidence that supports a clearly bounded partial answer, not an unrelated substitute.
- A standalone KOLSprite MCP remains compatible only when it exposes the same required semantic tool names, input schemas, and response shapes.
- If both connections are enabled, use Yunya for all MCP evidence in the run and never duplicate a paid call across both services.
- If a required tool is absent or schema-incompatible, report the dependency gap and continue only when the remaining evidence supports a clearly bounded partial answer.

## Required shared references

Read [principles.md](references/principles.md) first. It defines evidence labels, query transparency, links, preference memory, product hand-offs, and stopping rules.

Read [judgment-guide.md](references/judgment-guide.md) when interpreting product stages, opportunity, creator fit, content patterns, shop concentration, or time windows. These definitions are calibrated to fields currently returned by the public KOLSprite MCP and must not be replaced with unavailable FastMoss-style trend or attribution fields.

For a substantial study, reusable workflow run, or partner-facing example, read [evidence-display.md](references/evidence-display.md) before delivery. Read [known-issues.md](references/known-issues.md) only after a matching current error, suspiciously repeated result set, or schema mismatch; historical observations are not active tool rules until reproduced.

## Select one primary workflow

- New product launch, go/no-go, first content tests, and initial creators: read [cold-start.md](references/cold-start.md).
- Reference videos, hooks, selling points, scripts, CTA patterns, and creator-ready shooting briefs: read [winning-content.md](references/winning-content.md).
- Category opportunity, proven demand, product candidates, and entry hypotheses: read [opportunity-scan.md](references/opportunity-scan.md).
- Creator shortlist, seeding, collaboration fit, or outreach cohort: read [creator-partnership.md](references/creator-partnership.md).
- Competitor shop/product comparison or growth-bottleneck diagnosis: read [competitor-growth.md](references/competitor-growth.md).

Choose one primary workflow even when several references contribute. A cold-start study may use opportunity, content, and creator methods, but it should still deliver one cold-start decision rather than three disconnected reports.

## Public MCP capability boundary

- Use `creator_category_list` and `product_category_list` only to resolve live accepted category values when a category-filtered call is needed and the current run lacks a verified mapping.
- Use `product_search`, `shop_search`, `video_search`, and `creator_search` for current structured evidence.
- Use `caption_extract_url` only for a small, decision-relevant video sample when spoken content matters.
- Reuse returned `product_id` and `shop_id` in supported downstream filters.
- Do not assume public detail, historical time-series, advertising, SKU, review-list, livestream, audience-demographic, channel-attribution, or exact product-to-creator relationship tools.

For creator-content categories, match the user's Chinese or English label and pass the returned `creator_category_list.value` to `creator_search.category_list`. For commerce categories, recursively traverse `product_category_list`, match `categoryCn`/`categoryEn`, and pass the full returned `category` value to the relevant product, shop, video, or creator product-category filter. Interpret content niche or account positioning as a creator category, and selling, promoted-product, or collaboration direction as a product category. Do not set both category filters merely to hedge an ambiguous phrase such as “beauty creator”; use context, state a material assumption, or ask once only when the choice would materially change the result. Current schemas accept arrays but support one category value per call. Reuse a mapping within the run, never hardcode the catalogue, and fall back to a disclosed keyword-bounded sample when no safe mapping is available. Refer to semantic tool names because MCP hosts may expose different callable prefixes across agents.

If no compatible MCP service is available and authenticated, identify the missing dependency. Continue only with a clearly bounded partial answer when the remaining evidence can still support it.

## Research control

1. State the decision, target market, product/category, constraints, and evidence needed.
2. Ask only for missing inputs that materially change scope or conclusion. A broad category request may proceed as a labelled preliminary scan.
3. Query only the tools needed for the decision. Reuse IDs, remove obvious contamination, and broaden an empty query once when appropriate.
4. Stop when the evidence supports the requested decision or when a missing capability prevents a reliable conclusion.
5. Deliver a recommendation, supporting evidence, interpretation, smallest next test, and material unknowns.

Point usage follows the actual tools executed, and different operations may consume different amounts. Use the smallest decision-sufficient call plan, reuse IDs and collected evidence, and stop when additional calls are unlikely to change the decision. Read the point controls in [principles.md](references/principles.md); do not hardcode prices or describe Skill selection itself as a deduction.

Prefer a defensible shortlist and explicit validation criteria over a long raw export.

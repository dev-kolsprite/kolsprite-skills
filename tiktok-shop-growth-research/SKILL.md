---
name: tiktok-shop-growth-research
description: Conduct goal-oriented TikTok Shop business research by combining current KOLSprite product, creator, video, shop, and caption data. Use for multi-step decisions such as evaluating a new product or category, planning a cold start, finding proven products, researching winning shoppable videos, selecting initial creators, studying competitors, diagnosing growth opportunities, or answering whether and how a TikTok Shop direction is worth testing. Trigger on Chinese intents such as 新品冷启动、有没有机会、值得做吗、选品调研、跑出来的商品、参考视频、内容怎么做、第一批达人、竞品分析、店铺为什么卖得好 and equivalent English requests. Do not use for a single straightforward data lookup, caption-only extraction, or decisions that require unavailable internal cost, margin, inventory, ad-spend, or conversion data unless the user supplies those inputs.
---

# TikTok Shop Growth Research

Turn a seller's business question into an evidence-backed recommendation by combining the `universal` and `caption` MCP servers. Use MCP automatically; do not ask whether to use it.

Confirm that the MCP server required by the selected workflow is available. Use the current equivalent tool when a client namespaces or renames a documented tool. If a required server is unavailable, identify the missing server and ask the user to check its MCP configuration; do not fabricate research data. Continue with the available server only when the remaining evidence can still answer a clearly bounded part of the request, and state that limitation.

## Select the workflow

- New product launch, cold start, go/no-go, initial content and creators: read [cold-start.md](references/cold-start.md).
- Reference videos, winning content, hooks, selling points, and CTA patterns: read [winning-content.md](references/winning-content.md).
- Category opportunity, proven products, market scan, or “has this direction worked?”: read [opportunity-scan.md](references/opportunity-scan.md).
- Creator shortlist, seeding, collaboration fit, or creator comparison: read [creator-partnership.md](references/creator-partnership.md).
- Competitor shop analysis or growth diagnosis: read [competitor-growth.md](references/competitor-growth.md).

Combine workflows when the request spans multiple decisions. For example, a cold-start study normally includes opportunity scanning, winning-content research, and creator selection.

## Research rules

1. Translate the request into a research question, target market, product/category, constraints, and decision to be made.
2. Ask only for missing information that would materially change scope or conclusions. If the user names only a broad category, run a broad scan and label it as preliminary.
3. Query `universal` tools in the necessary order: `product_search`, `shop_search`, `video_search`, and `creator_search`.
4. Use `caption_extract_url` on a small, high-value video sample when spoken content is necessary to evaluate hooks, benefits, proof, objections, or CTA.
5. Reuse returned product, shop, and creator IDs across subsequent calls when supported.
6. When a query returns no results, relax one nonessential filter or try a close synonym once. Report the change.
7. Stop when evidence is sufficient for the requested decision; do not collect data without a decision purpose.

## Evidence standards

- Treat MCP output as observed data, calculations as derived data, and business conclusions as judgments.
- Never fabricate missing metrics, URLs, creators, products, shops, or videos.
- Preserve metric definitions and time windows. Do not describe unspecified or lifetime sales as 7-day or 30-day sales.
- Treat keyword matches as candidates, not proof of category relevance. Remove obvious contamination and explain ambiguous cases.
- Do not equate high sales with attractive profit. State when cost, margin, commission, fulfillment, inventory, ad spend, or conversion data is missing.
- Avoid universal conclusions from a single product, creator, shop, or video.

## Deliver the answer

Lead with:

1. **Recommendation** — pursue, test cautiously, narrow the direction, or deprioritize.
2. **Evidence** — concise tables or ranked examples with relevant MCP fields.
3. **Interpretation** — why the evidence supports the recommendation.
4. **Action plan** — the smallest next tests, content angles, creators, or products to validate.
5. **Risks and unknowns** — missing internal data, ambiguous fields, sample bias, or assumptions.

Prefer a shortlist with clear selection logic over a long raw export.

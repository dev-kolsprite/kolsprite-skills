# Category and Opportunity Evidence Method

Use this method when the growth-plan request lacks compatible, traceable research for the target market and category or product. Collect only the evidence that can change positioning, path priority, or the first 30-day test.

## 1. Frame the decision

Record the target market, original category or product phrase, primary business goal, user-supplied constraints, evidence needed, and stopping condition. Treat an unspecified market as material unless reliable conversation context already supplies it.

Keep price band, margin, commission, fulfillment, inventory, budget, team capacity, language, and excluded subcategories as unknown unless supplied. Do not infer profitability from GMV or units.

## 2. Map the category and product set

1. When a category filter is needed, call `product_category_list`, recursively match the user's Chinese or English phrase to the returned tree, and preserve the full returned `category` path. Reuse an already verified current-run mapping instead of calling the resolver again.
2. Confirm the candidate mapping with a small `product_search` using the user's phrase. Adopt the category ID only when the catalogue label and returned products support it; otherwise omit the category filter and call the result a keyword-bounded sample.
3. Expand into a small disclosed set of precise synonyms and exclusions. Classify results as true matches, adjacent alternatives, accessories/tools, or contamination.
4. Compare true matches using explicit 7-day/30-day fields when returned, total proof, listing maturity, price, rating/reviews, creator count, and video count. Keep each metric's period and unit visible.

Do not use result count as market size or silently narrow a broad category to a favorable subcategory.

## 3. Test demand, repeatability, and competition

- Use returned shop IDs with `shop_search` or `product_search(shop_id)` when seller concentration or repeatability affects the decision.
- Use returned product or shop IDs with `video_search` when content supply matters. Cross-confirm embedded stable IDs before joining records.
- Treat concentration calculated from collected records as “Top N share within returned sample,” never as the full market.

A firm entry recommendation needs at least two independent, compatible signals across products, shops, ID-linked videos, confirmed creators, or a same-market official source. A single record, keyword sample, or isolated winner remains a signal to validate.

## 4. Build content evidence when it changes the plan

Use `video_search` to select a varied set across product relevance, sales, views, engagement, recency, creator scale, and creative approach. Remove obvious contamination and disclose the sample boundary.

Use `caption_extract_url` only for a small decision-relevant sample. Compare spoken Hook, problem/desire, benefit, proof, objection handling, offer, and CTA. Keep visuals, on-screen text, edit rhythm, music, and product demonstration marked for visual review when caption evidence cannot verify them.

Repeated patterns across several relevant videos are transferable hypotheses. Produce original test briefs rather than copied scripts, and never attribute performance causally to a transcript element without supporting evidence.

## 5. Build creator evidence when it changes the plan

Use `creator_search` with category relevance and the smallest useful performance, scale, activity, and contactability constraints. Resolve creator-content categories through `creator_category_list` and pass its returned `value`; resolve creator commerce categories through the recursive `product_category_list` tree and pass the full returned `category` value. Current schemas support one category value per call. Never guess from display labels or hardcode the catalogue. Evaluate category fit, current performance, selling evidence, creator scale, content supply, and concentration risk separately rather than hiding them in one score.

When direct creator results remain empty, off-category, or suspiciously repeated after one precise query and one disclosed normalization, use a bounded `video_search` fallback:

1. preserve the failed direct-query scope;
2. deduplicate returned creators by stable creator ID;
3. use the returned Handle/name for exact `creator_search` enrichment;
4. accept enrichment only when the returned creator ID matches;
5. label the result a video-index-derived creator sample, not the complete creator universe.

Do not claim that a category-matched creator promoted the target product without an ID-confirmed relationship.

## 6. Apply decision and compliance gates

Use these labels consistently:

- **Prioritize validation**: at least two compatible signals support a defined sub-direction, while economics or execution still needs a bounded test.
- **Conditional entry**: evidence supports proceeding only if named supply, compliance, margin, fulfillment, or operating conditions are met.
- **Not recommended now**: compatible evidence shows weak or reversing demand, severe concentration, unrepeatable content, or an unresolved blocker.
- **Unable to determine**: the evidence is single-source, incompatible, inaccessible, or too incomplete. This is not a negative market judgment.

Before recommending entry, verify current official requirements when the product may involve restricted categories, safety or label claims, intellectual property, commercial disclosure, music/material rights, or cross-border fulfillment. Keep verified external rules separate from KOLSprite MCP evidence; otherwise mark the requirement for confirmation.

## 7. Return the opportunity-stage record

Return a compact record containing:

- normalized market, category mapping, queries, filters, sort, pages, sample, and completeness;
- representative true-match products, shops, videos, and verified creators with stable IDs or returned links;
- demand, momentum, maturity, competition, content-repeatability, and creator-supply observations;
- opportunity label, supporting evidence, counterevidence, conditions, and A/B/C confidence;
- product, content, and creator hypotheses suitable for the gap matrix;
- compliance/economic/operating gaps and the smallest validation test;
- executed tool counts and actual point usage only when returned.

Stop when the evidence supports the requested decision, additional pages are unlikely to change it, one reasonable broadening has failed, or a required capability or private input blocks a reliable conclusion. Preserve useful completed evidence and mark unfinished stages explicitly.

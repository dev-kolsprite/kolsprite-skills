# Competitor and Growth Diagnosis

Use this workflow to compare competitor products/shops or rank plausible growth bottlenecks. Keep conclusions within the current public search-data boundary.

## Competitor workflow

1. Use `shop_search` or `product_search` to resolve the correct objects and market. Disambiguate only when multiple plausible matches would change the result.
2. Call `product_search` with `shop_id` for representative products and visible price, maturity, sales, growth, rating/review, creator, and video fields.
3. Call `video_search` with `shop_id` or selected `product_id` values to inspect visible content supply and performance.
4. Use `caption_extract_url` on a small reference set to identify recurring positioning, proof, offers, objections, and CTA.
5. Call `creator_search` only when a category-level creator benchmark is material. Do not describe it as the competitor's exact creator roster.
6. Compare competitors on compatible sources, metrics, periods, filters, units, and sample-selection rules. When sample sizes differ, use the same date window and a disclosed common sample size selected by recency rather than performance; otherwise keep the datasets separate.

## Growth-diagnosis workflow

1. Separate internal facts supplied by the user from current external MCP observations.
2. Test plausible bottlenecks across demand, positioning, price, content supply, creator fit, creator coverage, competition, social proof, and shop assortment.
3. Rank bottlenecks by evidence strength and business impact.
4. Propose the smallest diagnostic experiment for each leading bottleneck and name the internal metric needed to evaluate it.

## Safe calculations

You may calculate a Top-N share or mix from returned records when useful, but label:

- numerator and denominator metric;
- returned page/sample;
- “within returned sample,” not the full shop/market;
- missing records or nulls.

Do not infer paid/organic attribution, short-video/live/product-card channel share, ad spend, ROAS, full creator concentration, private conversion, inventory, or margin.

Do not compare partial interaction-rate numerators, different currencies, lifetime versus recent sales, or unequal performance-selected samples. State the excluded comparison and why it is incompatible.

## Deliverable

- what the competitor appears to do well;
- what is repeatable versus dependent on brand, price, creator, content, or scale;
- like-for-like comparison table;
- ranked growth bottlenecks with evidence level;
- smallest next experiments and required internal metrics;
- capability and sample limitations.

Use “snapshot,” “visible pattern,” or “growth clue” when evidence is page-bounded. Do not call the result a full-funnel or full-shop diagnosis.

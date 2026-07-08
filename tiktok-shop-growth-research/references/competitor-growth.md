# Competitor and Growth Diagnosis

Use this workflow to understand a competitor shop or diagnose why a product direction may be underperforming.

## Competitor workflow

1. Call `shop_search` to identify the correct shop and available performance fields.
2. Call `product_search` with the shop ID to identify representative and leading products.
3. Call `video_search` with shop or product IDs to inspect content supply and performance.
4. Use `caption_extract_url` on a small reference set to identify recurring positioning, proof, offers, and CTA.
5. Call `creator_search` when creator strategy is material and supported by the available filters.

## Growth-diagnosis workflow

1. Separate internal facts supplied by the user from external market evidence.
2. Test plausible bottlenecks across demand, product positioning, price, content, creator fit, creator coverage, competition, and shop conversion.
3. Use MCP data to compare the user's direction with market examples, but do not infer private conversion, margin, inventory, or ad performance.
4. Rank bottlenecks by evidence and propose the smallest diagnostic experiment for each.

## Deliverable

- What the competitor appears to do well
- What is repeatable versus dependent on brand, creator, price, or scale
- Ranked growth bottlenecks with evidence
- Recommended next experiments and required internal metrics


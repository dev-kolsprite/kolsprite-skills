# Category Opportunity Scan

Use this workflow to determine whether a category or product direction has proven demand and where a seller might enter.

## Workflow

1. Expand the user phrase into a small set of precise synonyms and adjacent terms. Keep the original intent visible.
2. Call `product_search` for each useful term with region and relevant sales, growth, price, rating, listing-date, or category filters.
3. Classify results into true matches, adjacent products, accessories/tools, and irrelevant contamination.
4. Compare proven products using available 7-day/30-day signals, growth, price, reviews, listing age, creator count, and video count.
5. Call `shop_search` and `video_search` to assess concentration, content supply, and whether success appears repeatable across sellers and creators.
6. Use `caption_extract_url` when the buying reason or differentiation cannot be inferred from structured fields.

## Deliverable

- Whether proven products exist and what counts as “proven” in this analysis
- Representative products, price bands, growth signals, and listing maturity
- Demand, competition, concentration, and content-supply assessment
- Meaningful sub-directions and obvious false positives
- Entry hypotheses and the smallest validation test
- Clear limitations where profitability or conversion cannot be established

Do not treat search-result volume alone as market demand.


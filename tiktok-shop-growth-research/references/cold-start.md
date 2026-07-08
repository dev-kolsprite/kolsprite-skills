# New Product Cold Start

Use this workflow to evaluate a new TikTok Shop product direction and recommend an initial market, content, and creator plan.

## Workflow

1. Confirm or infer the target region and specific product. If the request names only a broad category, state that the scan is category-level and preliminary.
2. Call `product_search` for the product and close synonyms. Compare representative products using available sales, recent sales, growth, listing date, price, rating, reviews, creator count, and video count.
3. Call `shop_search` to estimate competitive structure and identify representative shops.
4. Call `video_search` for strong and recent shoppable videos linked to the category or representative product IDs.
5. Call `caption_extract_url` for a small set of accessible, decision-relevant videos. Extract recurring hooks, use cases, benefits, proof, objections, offers, and CTA patterns.
6. Call `creator_search` for category-relevant creators under any stated follower, engagement, sales, or region constraints.
7. Cross-check whether product demand, content repeatability, and creator supply point in the same direction.

## Deliverable

- Preliminary opportunity verdict and confidence level
- Representative products and competitors
- Demand, growth, competition, content, and creator-supply signals
- Three to five content hypotheses
- A prioritized first creator cohort with selection reasons
- A minimum viable cold-start test: sample size, content variants, primary metrics, and stop/continue criteria
- Missing profit inputs such as cost, margin, commission, fulfillment, and inventory

Do not claim that a market opportunity guarantees profitability.


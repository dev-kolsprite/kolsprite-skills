# New Product Cold Start

Use this workflow for a go/no-go decision and the first product, content, and creator test—not a full launch plan.

## Frame the decision

Establish or infer:

- target market and specific product/use case;
- target buyer and price positioning when available;
- seller constraints supplied by the user;
- decision horizon and what would count as a successful first test.

If the user names only a broad category, run a preliminary category-level scan and say that SKU-level validation remains open.

## Research flow

1. Use the method in [opportunity-scan.md](opportunity-scan.md) to identify true-match products, close substitutes, price bands, and evidence of repeatable demand.
2. Call `shop_search` and `product_search` with relevant shop IDs to identify representative competitors and whether results appear distributed or concentrated.
3. Call `video_search` for the best representative product IDs. Select a varied reference sample across sales, views, engagement, recency, and creator scale.
4. Apply [winning-content.md](winning-content.md) to a small, high-value caption sample. Separate spoken patterns from visuals requiring manual review.
5. Call `creator_search` using product-category relevance plus the user's follower, engagement, sales, GPM, region, or contactability constraints.
6. Apply [creator-partnership.md](creator-partnership.md) to define the first cohort by testing role rather than follower count alone.
7. Check whether product demand, content repeatability, and creator supply point in the same direction.
8. Complete any decision-relevant current platform checks for category access, restricted products, product/safety claims, intellectual property, material/music rights, creator commercial disclosure, or fulfillment. Keep verified rules separate from unverified compliance questions.

## Decision gates

- **Demand gate**: more than one relevant product/shop signal when possible.
- **Content gate**: at least two meaningfully different, reproducible content hypotheses grounded in source videos/captions.
- **Creator gate**: enough relevant, active, contactable candidates for a bounded first cohort.
- **Economics gate**: label as unresolved unless the user supplies cost, margin, commission, fulfillment, and inventory constraints.
- **Cross-evidence gate**: a go/conditional-entry decision needs at least two compatible signals from different objects or layers; otherwise recommend validation rather than entry.

## Deliverable

- go, test cautiously, narrow, or stop;
- confidence and failed/unresolved gates;
- representative products, shops, videos, and creators with selection logic;
- three to five content hypotheses;
- first creator cohort grouped by role;
- minimum test: SKU/sample scope, content variants, creator count range, primary metrics, review point, and stop/continue criteria;
- phased test rhythm when a 30-day plan is requested: Day 1–7 evidence/preparation, Day 8–14 first test, Day 15–21 repeat or revise, Day 22–30 focus or stop. Treat quantities as proposed test volume unless supported by the user's team capacity;
- material unknowns and the smallest data needed next.

Do not claim a demand signal guarantees profitable cold-start performance.

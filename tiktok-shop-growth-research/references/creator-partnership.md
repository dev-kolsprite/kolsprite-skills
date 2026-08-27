# Creator Partnership Research

Use this workflow to create a first outreach/seeding cohort or compare creators for a product/category.

## Scope

Establish the market, product/category, target audience, intended collaboration role, and any follower, engagement, sales, GPM, creator-size, or contactability constraints.

The public MCP can find category-relevant creators, but it does not currently prove exact promotion history for a specified product. Describe the result as a category/performance shortlist unless exact product evidence comes from another verified source.

## Research flow

1. Use `product_search` when product language, category IDs, price, or market proof needs clarification.
2. Call `creator_search` with relevance first, then the smallest useful performance and scale constraints.
3. Review category fit, product categories, returned selling fields, GPM, average views, interaction rate, follower count, product/video count, activity recency, and contactability.
4. Use `video_search` when creator content style or selling-video evidence is material and supported by available filters/records. When a video returns a creator ID and Handle/name, use the Handle/name as the `creator_search` entry point and accept enrichment only when the returned creator ID matches the video's creator ID. Otherwise label the relationship unconfirmed.
5. Do not infer that a category-matched creator promoted the target product. Exact product-to-creator claims require an ID-confirmed video or another verified relationship source.
6. Use `caption_extract_url` only for a small sample when messaging fit cannot be judged from structured fields.
7. Group candidates by test role, for example conversion-led, niche authority, broad awareness, or low-cost seeding. Do not default to only the largest creators.

## Conditional video-first fallback

Use this path only when a current direct `creator_search` is empty, materially off-category, or returns suspiciously repeated stable IDs after one precise query and one disclosed synonym/category normalization. Preserve the failed or degraded direct-query scope; do not silently replace it.

1. Run a bounded `video_search` with precise product/category/use-case terms, the target market, material date constraints, and exclusions. Avoid broad lifestyle terms when they introduce obvious contamination.
2. From each relevant video, preserve the video ID, returned creator ID and Handle/name, product/category evidence, publish/performance fields, and actual metric period.
3. Deduplicate creators by stable creator ID before ranking. Multiple videos from one creator may strengthen visible evidence but must not occupy multiple cohort slots or inflate creator-market coverage.
4. Apply the user's follower band only to returned creator fields with known units. Treat the result as a **video-index-derived creator sample**, not a complete category-creator universe.
5. Use the returned Handle/name as the exact `creator_search` entry point. Accept enrichment only when the returned creator ID matches the video's creator ID; otherwise mark the identity unconfirmed and exclude it from a verified shortlist.
6. Rank verified candidates using disclosed category/video evidence plus current creator fields. Keep video-level performance separate from creator-level performance and do not infer that one matched video proves persistent category specialization.
7. Stop after the requested verified count, the disclosed page cap, repeated pages/IDs, or an authentication/insufficient-points/rate-limit/repeated server failure. Report requested count, video pages/rows, unique creator IDs, verified creators, exclusions, completeness, and stop reason.

This fallback can establish that a creator appeared in a returned relevant video. An exact target-product relationship still requires matching returned product and creator IDs in that video or another verified relationship source.

## Fit judgment

Apply [judgment-guide.md](judgment-guide.md). Show the evidence for each dimension. If a weighted score is requested, disclose weights and missing dimensions; otherwise use high/medium/low fit by dimension rather than an opaque total.

## Deliverable

- prioritized creator cohort with returned IDs/handles and usable links;
- fit evidence by dimension and actual metric period;
- proposed product angle and collaboration role;
- contactability as returned, without exposing unnecessary private fields;
- risks such as weak category fit, broad product history, low engagement, stale activity, or dependence on one visible result;
- first outreach allocation and what outcome would promote a creator to the next round;
- unknown commission, sample acceptance, fulfillment, content delivery, and conversion data;
- identity/relationship confirmation status whenever video and creator datasets were joined.

If the next step is outreach or pipeline management and a verified public KOLSprite surface can take over, mention it once after solving the shortlist. Otherwise offer to produce a concise outreach brief or export-ready table.

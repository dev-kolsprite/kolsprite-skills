# Winning Content and Shooting Brief

Use this workflow to find decision-relevant shoppable videos and turn repeated evidence into new creator-ready test briefs.

## Research flow

1. Use `product_search` when needed to establish correct product language, category boundaries, and representative product IDs.
2. Call `video_search` with the keyword, `product_id`, or `shop_id`. Build a balanced candidate set across sales, views, engagement, recency, creator scale, and product relevance.
3. Remove irrelevant or weakly related videos. State the page/sample boundary.
4. Select a small set that covers distinct creative approaches, not only the top-ranked records.
5. Call `caption_extract_url` for accessible videos whose spoken content affects the decision.
   For a batch, record requested, successful, failed, and not-executed counts. Stop remaining calls on authentication, insufficient-points/entitlement, or rate-limit failure and keep each video's caption status visible.
6. Compare evidence across:
   - opening hook;
   - problem or desire;
   - product/use-case demonstration mentioned in speech;
   - benefit and proof;
   - objection handling;
   - offer and CTA;
   - creator persona and audience assumption;
   - elements that require visual review.
7. Separate repeated patterns from one-off creative choices and propose new test variants rather than copied scripts.

## Deliverable

### Reference set

- video/product/creator;
- returned performance fields with their actual period;
- selection reason;
- usable link when returned;
- caption available or unavailable.
- for batch work, caption extraction progress and stop reason.

### Pattern synthesis

- repeated spoken hooks, benefits, proof, objections, offers, and CTAs;
- patterns limited to one creator or execution;
- visual factors that caption data cannot verify;
- hypotheses about performance clearly labelled as hypotheses.

### Creator-ready briefs

For each of three to five test briefs, give:

- target viewer and situation;
- hook direction;
- problem/desire;
- product demonstration requirement;
- two or three prioritized selling points;
- proof requirement;
- CTA;
- creator profile/style;
- variable being tested and primary metric;
- elements that must remain original rather than copied.

Do not attribute performance causally to a transcript element without supporting evidence. When the video is visually driven, say that a visual review is required before finalizing the brief.

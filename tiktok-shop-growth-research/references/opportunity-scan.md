# Category and Product Opportunity Scan

Use this workflow to decide whether a product/category direction has observed demand, where the evidence is concentrated, and which smallest sub-direction deserves validation.

## Inputs and scope

Required: target market plus a product/category phrase. Treat an unspecified market as material unless reliable conversation context already supplies it.

Useful constraints when volunteered: price band, fulfillment mode, target customer, seller role, budget, margin floor, and excluded subcategories. Do not block a preliminary scan on unavailable internal inputs.

## Research flow

1. Preserve the user's original category phrase, target market, synonyms, exclusions, and optional price band. Do not silently replace a broad category with one subcategory.
2. Run a small `product_search` mapping query. Use returned product titles plus `catId`, `catName`, and localized category names to establish candidate mappings. Adopt a category ID only when both classification and returned products support it; otherwise label later results a keyword sample.
3. Expand into a small set of precise synonyms and adjacent terms. Keep adopted/excluded mappings and unresolved ambiguity visible.
4. Call `product_search` for the useful terms or confirmed category IDs with material price, rating, sales, growth, listing-date, fulfillment, or logistics filters.
5. Classify returned products as true matches, adjacent alternatives, accessories/tools, or irrelevant contamination.
6. Compare true matches using explicit recent sales/growth fields, total proof, listing maturity, price, rating/reviews, creator count, and video count.
7. Use returned shop IDs with `shop_search` or `product_search(shop_id)` when seller concentration or repeatability matters. Use returned product/shop IDs with `video_search` when content supply matters; cross-confirm embedded object IDs before joining records.
8. Use `creator_search` for a category-level creator map when creator supply affects entry. Do not call it an exact roster for a product unless an ID-confirmed video supports the relationship.
9. Use `caption_extract_url` on a small video sample only when the buying reason or differentiation cannot be established from structured fields.
10. When a capable browser is available and current trend evidence materially affects the decision, optionally read the same-market, same-category public TikTok Creative Center. Record its URL, filters, access time, visible fields, and limitations as an external official source; never present it as KOLSprite MCP data. Stop on login, CAPTCHA, regional, or access restrictions.

## Decision logic

Apply [judgment-guide.md](judgment-guide.md). Distinguish:

- proven demand versus a single outlier;
- current momentum versus historical scale;
- mature competition versus early weak validation;
- broad category demand versus an actionable sub-direction;
- observed selling activity versus unknown profitability.

A firm entry recommendation requires at least two independent, compatible signals across products, shops, ID-linked videos, confirmed creators, or same-market official trend evidence. A single source remains a signal to validate. Conflicts must be disclosed rather than resolved by selecting the favorable sample.

Before recommending entry, check currently applicable public TikTok/TikTok Shop requirements when the product may involve restricted categories, safety/label claims, intellectual property, promotional claims, commercial disclosure, music/material rights, or cross-border fulfillment. Record only requirements actually verified from current official pages; otherwise mark them for confirmation.

## Deliverable

- pursue, test cautiously, narrow, or deprioritize;
- an explicit label of **prioritize validation**, **conditional entry**, or **not recommended now**, with the supporting signals and conditions;
- confidence and evidence boundary;
- representative true-match products and material fields;
- price/use-case segments and false positives;
- demand, momentum, competition, and content-supply interpretation;
- one or two entry hypotheses;
- smallest validation test with success and stop criteria;
- missing cost, margin, commission, fulfillment, inventory, and conversion inputs.

Stop after enough varied evidence supports the direction decision. Do not use search-result count alone as market size or demand, and do not describe a keyword-bounded sample as the whole category.

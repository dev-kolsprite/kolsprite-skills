# Statistics and judgment

Use these rules to turn a collected `asin_video_search` sample into simple, explainable client calculations and business judgments. The initial release deliberately avoids precise scores, fixed weights, and overfitted thresholds.

## 1. Product relationship

Compare the Amazon Listing context with the video title, TikTok product title, product category, core function, product form, use method, and other returned evidence. Record one class and a short reason for every video.

### `same_product_family` — 同款商品

Treat products as the same product family when an ordinary buyer would regard them as the same kind of item with the same core form, function, use method, and purchase purpose.

The following differences are acceptable and must not prevent same-product classification:

- different Amazon or TikTok SKU;
- color, pattern, finish, or cosmetic styling;
- ordinary size, capacity, quantity, pack-count, or bundle variation;
- brand, seller, Listing, or model-name variation when the underlying product remains the same;
- minor material, accessory, packaging, or configuration differences that do not change the core product.

Examples include the same tumbler in different colors or capacities, the same storage box in different pack counts, and the same product sold under different private-label brands.

Do not require exact SKU, color, brand, model number, package count, or visual identity. Do not place an accessory, replacement part, or materially different product mechanism into the same product family merely because the title shares keywords.

### `highly_similar` — 高度相似商品

Use this class more broadly than exact alternatives. Products may differ in design, structure details, material, appearance, configuration, secondary functions, or selling proposition while still qualifying when they:

- belong to the same product archetype or a directly substitutable subcategory;
- solve the same core user problem;
- have a comparable use method and purchase motivation;
- would reasonably be compared by a shopper deciding which version of the product to buy.

Examples include different styles of pet-hair-removal tools using a comparable manual mechanism, different portable blender designs serving the same personal-blending use, or different shower-caddy structures bought for the same installation and storage job.

### `related_scene` and `noise`

- `related_scene`: The content serves the same broad need or usage scene but promotes a different product type or mechanism. It can inspire research but does not enter heat calculations.
- `noise`: The record is irrelevant, keyword-stuffed, generic entertainment, contradictory, or too weakly evidenced to support a product relationship.

`same_product_family` and `highly_similar` are equally valid. Do not give one class extra statistical weight. When evidence is ambiguous between highly similar and related scene, use the weaker class and state why.

## 2. Sample ledger

For each ASIN retain:

- ASIN, market, region, run time, mode, requested pages, and observed sort/window behavior;
- MCP `total`, returned rows, deduplicated rows, and pages collected;
- counts of same-product-family, highly similar, related-scene, and noise records;
- valid count = same-product-family + highly similar;
- relevance rate = valid count / deduplicated returned rows;
- stop reason and any failed page.

Call `total` the MCP candidate total. Call calculations from retrieved records current-sample or representative-head-sample calculations.

## 3. Core statistics

Calculate only on valid same-product-family and highly-similar records.

### Content activity

- valid video count;
- total and median `playCnt`;
- median `interactionRate` when present;
- representative high-play and recent videos.

### Creator spread

- distinct creators by `creator.id`;
- creator-video ratio = distinct creators / valid videos;
- Top 1 and Top 3 play concentration within valid videos.

High reach with most plays coming from one video or creator means a single-hit pattern, not broad diffusion.

### Commerce

- shoppable valid-video count and rate;
- current rolling-30-day video sales from `salesVolumeLst30d`;
- distinct TikTok products by `product.id`;
- deduplicated current product sales: count each `product.id` once and do not sum the same product once per video;
- sales-field coverage, treating null as unknown rather than automatically as zero.

Video `salesVolumeLst30d` and product `salesVolumeLst30d` answer different questions and must not be merged into one sales total.

## 4. Rough latest-month direction

Use the run timestamp in the target region.

- `M0`: videos published in the latest 30 days.
- `M1`: videos published during days 31–60 before the run.
- age days = at least 1 day.
- play velocity = `playCnt / age days`.

For each cohort show:

- valid video count;
- distinct creator count;
- median play velocity;
- shoppable video count and current rolling-30-day video sales as supporting context.

Judge the rough direction from three primary signals:

1. Are more or fewer valid videos from the latest month appearing in the representative top-play sample?
2. Are more or fewer distinct creators appearing?
3. Is the median age-adjusted play velocity visibly higher or lower?

Use a simple qualitative rule:

- **Rising:** at least two primary signals clearly improve and the remaining signal does not materially contradict them.
- **Declining:** at least two primary signals clearly weaken and the remaining signal does not materially contradict them.
- **Stable or mixed:** changes are small, split in different directions, or dominated by one exceptional video.
- **Unavailable:** the two cohorts together contain fewer than three valid videos.

Do not turn trivial one-record differences into a strong direction when the sample is small. A one-sided or sparse cohort may support only “the sample leans upward/downward” with low confidence. Always show the three underlying values so the user can inspect the judgment.

The result may be described as an overall rough latest-month versus prior-month judgment because the MCP sample intentionally represents top-play content. Also state that it is based on the collected representative head sample rather than full-population measurement.

## 5. Simple heat judgment

Do not calculate a 0–100 score or apply fixed weights during private testing. Judge overall heat from the visible combination of four dimensions:

- **Content presence:** Are there several valid videos with meaningful reach, rather than one weak match?
- **Creator spread:** Is the signal distributed across multiple creators rather than concentrated in one account or video?
- **Recent activity:** Does the latest-month sample lean upward, remain active, or appear older and weaker?
- **Commerce evidence:** Are valid videos shoppable, and do any have current sales evidence across more than one video, product, or creator?

Return one of:

- **High:** multiple mutually reinforcing signals are clearly visible, normally including meaningful content reach plus either broad creator spread, recent upward activity, or commerce evidence.
- **Medium:** relevant content is clearly present, but diffusion, recency, or commercial evidence is limited or mixed.
- **Low:** valid content exists but is sparse, weak, old, highly concentrated, or commercially unproven.
- **Insufficient:** fewer than three valid videos or relevance is too uncertain to support a heat judgment.

Explain the classification in one or two sentences using the actual values. Do not claim that the difference between High and Medium is mathematically precise.

## 6. Heat structure

Use descriptive labels when they help the decision:

- `single-hit`: most reach comes from one exceptional video or creator;
- `multi-creator-diffusion`: several independent creators contribute meaningful evidence;
- `content-hot-commerce-weak`: content reach is visible but shoppable/sales evidence is weak;
- `commercial-signal-visible`: current sales evidence appears across valid content;
- `insufficient-signal`: fewer than three valid videos.

Select one primary label and at most one supporting label. Use the structure to recommend the next action rather than adding more scores.

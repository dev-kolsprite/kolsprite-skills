# Decision rubric

Keep business decision and evidence confidence independent. Use explainable rules, not a weighted 0–100 score.

## Evidence classes

### Observed

Values returned by SellerSprite, KOLSprite, or explicitly supplied by the user. Preserve source, market, period, query, and sample scope.

### Calculated

Values calculated from retained records, such as relevance rate, median play velocity, creator count, or Top 3 concentration. Show the formula or plain-language method.

### Judged

Qualitative interpretation such as rising, concentrated, replicable, or creator-constrained. Tie it to observed and calculated evidence.

### Recommended

The minimum action, success condition, and stop condition. Never present it as observed fact.

## Relevance classes

- `same_product_family`: same core form, function, use method, and purchase purpose. Brand, color, size, pack count, or minor styling may differ.
- `highly_similar`: a directly substitutable product archetype solving the same core problem through a comparable use method.
- `related_scene`: same broad need or context but a materially different product or mechanism.
- `noise`: irrelevant, keyword-stuffed, contradictory, or insufficiently evidenced.

Only `same_product_family` and `highly_similar` are valid for heat, momentum, concentration, creator, and commerce calculations. When uncertain, choose the weaker class.

## Sample ledger

For every query chain retain:

- ASIN, Amazon marketplace, TikTok region, run time, and selected depth;
- capability/tool, query, filters, requested pages, and returned rows;
- candidate total when returned;
- deduplicated rows;
- counts by relevance class;
- valid count and relevance rate;
- time-window coverage;
- stop reason and failed calls.

`candidate total` is never renamed to valid results or market size.

## D1. Amazon demand validity

Question: Is the product or category supported by current, continuing Amazon demand?

Evidence:

- current product state, price, rating, and review activity;
- recent sales/BSR direction and lifecycle;
- multiple competitor evidence rather than one historical winner;
- important keyword demand when retrieved.

Judge:

- **High:** recent demand is stable or improving and more than one product/keyword supports the need.
- **Medium:** demand remains visible but is declining, volatile, concentrated, or dependent on one ASIN.
- **Low:** sustained decline with no supporting category or keyword evidence.
- **Unverified:** current trend or comparable demand evidence is missing.

## D2. TikTok current commercial signal

Question: Are valid same/similar products and shoppable content producing current commercial evidence?

Calculate where fields permit:

- valid product and video counts;
- shoppable valid-video rate;
- distinct TikTok products and shops;
- deduplicated current product sales, counting each product ID once;
- coverage of current sales fields.

Judge:

- **High:** current commercial evidence appears across multiple independent products, shops, creators, or videos.
- **Medium:** valid commercial evidence exists but is sparse or concentrated.
- **Low:** high-quality queries find valid content/products but little or no commercial evidence.
- **Unverified:** relevance or current commercial fields are insufficient.

Do not merge video-level and product-level sales into one total.

## D3. Latest-30-day momentum

Question: Does the representative valid-content sample lean upward, remain mixed, or weaken versus days 31–60?

Create publication cohorts using the run time in the target market:

- `M0`: latest 30 days;
- `M1`: days 31–60;
- age days: at least 1;
- play velocity: `playCnt / age days`.

Compare:

1. valid video count;
2. distinct creator count;
3. median age-adjusted play velocity.

Judge:

- **Rising:** at least two primary signals clearly improve and the remaining signal does not materially contradict them.
- **Declining:** at least two clearly weaken without material contradiction.
- **Stable or mixed:** changes are small, split, or dominated by one exceptional record.
- **Unavailable:** fewer than three valid cohort videos or dates are inadequate.

Current rolling-30-day sales may be supporting context only; it is not historical cohort sales.

## D4. Content fit and competition structure

Question: Can the product be demonstrated clearly and replicated beyond one exceptional post?

Assess:

- observable demonstration actions;
- number and distinctness of viable content angles;
- related videos across independent creators;
- Top 1 and Top 3 play concentration;
- mid-sized or smaller creators achieving meaningful results;
- dependence on expensive production, celebrity reach, or risky claims.

Judge:

- **High:** clear demonstration, several viable angles, and replication across independent creators.
- **Medium:** demonstrable but repetitive, concentrated, or dependent on a narrow production pattern.
- **Low:** difficult to demonstrate or supported mainly by one non-replicable outlier.
- **Unverified:** valid content evidence is inadequate.

Concentration is an entry barrier, not automatic proof that demand is weak.

## D5. Creator diffusion and executability

Question: Is there a realistic first group of relevant creators?

Assess:

- distinct creators attached to valid evidence;
- distribution across follower tiers;
- non-top creator contribution;
- related-product/category fit;
- recent activity and average performance;
- contactability and contact-data coverage.

Judge:

- **High:** relevant evidence is distributed across multiple creators and more than one size tier, including non-head performers.
- **Medium:** relevant creators exist but supply, vertical fit, or contactability is limited.
- **Low:** evidence depends on very few large creators or no credible first group can be formed.
- **Unverified:** creator identity, performance, or fit evidence is inadequate.

Contactability affects execution feasibility but does not improve content or commercial quality.

## Decision statuses

### `worth_testing`

Use when:

- D1 is not Low;
- D2 and D4 are at least Medium;
- D3 is Rising/active or D5 is at least Medium;
- no hard compliance/market blocker exists;
- evidence confidence is at least Medium.

Meaning: enter a bounded test, not a full launch.

### `conditional_test`

Use when a credible opportunity exists but one material bottleneck requires a constrained experiment, for example:

- content fit is strong but commercial evidence is weak;
- demand exists but creator diffusion is limited;
- recent activity is rising but reach is highly concentrated;
- the input ASIN is declining while the TikTok product family remains active;
- only one clearly testable content hypothesis is supported.

Always state the condition that must hold and what would falsify it.

### `not_recommended`

Use only after adequate evidence, normally when:

- D1 and D2 are both Low;
- D2 and D4 are both Low;
- the product lacks a credible demonstration path and no validated alternative content structure exists;
- concentration is extreme and no differentiated content or creator entry path is supported;
- a hard platform, market, or compliance blocker applies.

Tool failure, missing entitlement, poor recall, or incomplete evidence must not produce this status.

### `evidence_incomplete`

This is an evidence state, not a fourth business decision. When core dimensions cannot be judged, explain the missing evidence and the smallest next retrieval needed. Do not force one of the three decision statuses.

## Confidence

- **High:** five dimensions covered, relevance reliable, periods comparable, and core conclusions supported by multiple evidence types.
- **Medium:** at least four dimensions covered with one small-sample or degraded component; the conclusion remains directionally consistent.
- **Low:** a core dimension is missing, recall is unreliable, periods are not comparable, or evidence materially conflicts.

## Test archetypes

### Content-validation test

Use when demonstrability is promising but commercial evidence is limited. Test a small set of content angles and versions before broad creator seeding.

### Creator-validation test

Use when content patterns are validated but creator fit or diffusion is uncertain. Hold the content frame relatively stable and vary creator profiles.

### Differentiation test

Use when demand is visible but competition is concentrated or content is homogeneous. Test one or two evidence-backed differentiated angles.

Prefer the user's own baseline for success thresholds, then current valid-sample medians/percentiles, then maintained category baselines. If none exist, label thresholds provisional and require first-round calibration.


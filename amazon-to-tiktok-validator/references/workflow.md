# Workflow

Use this sequence for one Amazon product. The flow is continuous within the selected depth; phase summaries are evidence checkpoints, not mandatory user interruptions.

## 1. Normalize identity and scope

Capture:

- ASIN and source Listing or supplied text;
- Amazon marketplace;
- target TikTok market;
- normalized product type, product form, core function, use method, and buyer purpose;
- brand, price, currency, material attributes, variants, and known competitors when available;
- user constraints that affect the test.

Map platform codes without destroying the original values. In particular, SellerSprite uses `UK` while TikTok/KOLSprite commonly uses `GB`.

Hard-stop only when:

- the ASIN or product identity is ambiguous enough to change relevant-product classification;
- the target market cannot be inferred and would materially change evidence;
- the product appears prohibited or the requested claims create a material compliance risk.

## 2. Build the Amazon evidence brief

Use the smallest SellerSprite tool chain that covers the user's intent.

This stage precedes every KOLSprite business-data call. Start with `asin_detail` unless a complete, source-labelled Amazon evidence brief already exists in the conversation. If the SellerSprite stage cannot be completed, apply the degradation rule in `SKILL.md` before deciding whether any TikTok retrieval is allowed.

### Quick validation

1. Product identity/details with `asin_detail`.
2. Recent lifecycle or sales/BSR trend.
3. Direct competitor seeds.
4. A bounded recent review sample only when Listing text does not already provide sufficient customer language.

### Full test plan

Add only when useful:

- recent positive and negative review samples;
- traffic-keyword overview, then keyword details if the overview supports deeper retrieval;
- keyword trend for one or a few important terms;
- competitor detail expansion;
- category-level statistics when the user asks for a category entry decision, not merely one product test.

Produce an internal Amazon brief:

```text
Product identity
Current demand and lifecycle
Price and competitor context
Customer purchase reasons
Customer pain points and objections
Usage scenes and unexpected uses
Potential demonstration actions
Assumptions and missing evidence
```

Label SellerSprite forecast or estimated sales as predictions/estimates. A declining ASIN may still yield a valid category hypothesis; do not conflate ASIN health with category potential.

## 3. Translate Amazon evidence into TikTok hypotheses

Create five query groups:

1. `exact_product_terms`: normalized product form and direct synonyms;
2. `scenario_terms`: user situations and use occasions;
3. `pain_terms`: customer problem language and objections;
4. `demo_terms`: observable actions, transformations, tests, and before/after moments;
5. `competitor_terms`: brands and direct competitors.

For each group record:

- source Amazon fact or review pattern;
- target-market expression;
- what the query is intended to validate;
- product shapes or meanings to exclude.

Do not copy Amazon SEO titles into TikTok unchanged. Keep the exact product form as the relevance anchor while translating the expression into local, conversational content language.

## 4. Validate TikTok evidence

### 4.1 Direct ASIN candidate retrieval

Use the ASIN analysis capability first when available. Treat its output as candidates generated from ASIN-related keywords, not as confirmed cross-platform identity.

Deduplicate by video ID. Classify every candidate before calculations:

- `same_product_family`
- `highly_similar`
- `related_scene`
- `noise`

### 4.2 Product evidence

Use exact-product terms to search products and validate:

- same-form product presence;
- price and currency;
- current 7/30-day commercial fields when returned;
- number of independent products and shops;
- product-level creator and video participation;
- whether commercial evidence is broad or isolated.

Use category filters only after retrieving valid category values. When filters are unavailable, post-filter the returned records.

### 4.3 Video evidence

Use exact-product, scenario, pain, and demo terms with a shared relevance policy. Collect the minimum representative sample needed for:

- content presence and reach;
- latest 30 days versus days 31–60 publication cohorts;
- content-angle diversity;
- Top 1/Top 3 concentration;
- distinct creator spread;
- shoppable/current commercial coverage.

Do not merge separate query groups without deduplicating video IDs. Preserve the query source for every retained record.

### 4.4 Creator evidence

Start with creators attached to valid videos and products. Only then expand with creator search when the sample is insufficient or the user asks for a first creator group.

Judge creators on:

- actual related content;
- product/category fit;
- average content performance and activity;
- sales evidence when returned;
- fit with the proposed content angle;
- contactability as an execution factor, not a quality score.

### 4.5 Shop evidence

Use shop search only to supplement seller/shop concentration, operating model, and service evidence. It does not replace video concentration or creator diffusion.

### 4.6 Caption evidence

Use captions only in full mode when the user asked for script-level guidance. Select a small, contrasting set that explains the decision, such as:

- one high-reach valid video;
- one high-commerce valid video;
- one recent or mid-sized-creator breakout.

Analyze hook, pain, demonstration, proof, objection handling, and CTA. A failed caption extraction is a video-level failure until repeated evidence indicates otherwise.

## 5. Judge and design the experiment

Read `decision-rubric.md`. Return:

- one test decision;
- evidence confidence;
- the five dimensions;
- the primary bottleneck or opportunity type;
- up to three content hypotheses;
- creator criteria and a bounded seed group when supported;
- a 7–14 day minimum test, adapted to user constraints;
- success, modify, and stop conditions;
- material unknowns.

Do not invent a 0–100 score. Do not turn an analysis recommendation into a promise of sales.

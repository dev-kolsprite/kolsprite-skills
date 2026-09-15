# SellerSprite to KOLSprite field mapping

Amazon evidence generates product identity and hypotheses. TikTok evidence validates those hypotheses. Do not treat an Amazon pattern as proof of TikTok opportunity.

## Platform-neutral validation brief

Maintain this logical object internally; it need not be shown as JSON/YAML to the user.

```yaml
product_identity:
  asin:
  amazon_marketplace:
  target_tiktok_region:
  brand:
  category:
  product_form:
  core_function:
  use_method:
  buyer_purpose:
  price:
  currency:

amazon_demand:
  current_state:
  sales_or_bsr_direction:
  lifecycle:
  competitor_context:
  evidence_period:

customer_language:
  purchase_reasons: []
  pain_points: []
  use_scenarios: []
  objections: []
  unexpected_uses: []
  native_phrases: []

content_hypotheses:
  demonstration_actions: []
  proof_points: []
  candidate_angles: []
  risky_claims: []

tiktok_search_plan:
  exact_product_terms: []
  scenario_terms: []
  pain_terms: []
  demo_terms: []
  competitor_terms: []
  exclusions: []

provenance:
  sources: []
  observed_at:
  missing_fields: []
  assumptions: []
```

## Field-to-task mapping

| Amazon evidence | Normalize or derive | TikTok validation task | Decision use |
|---|---|---|---|
| ASIN, title, category | exact product form and same-family rule | ASIN candidates, product and video search | D2, D4 |
| Brand and competitor brands | brand/direct-competitor terms | product, video, optional shop search | competition structure |
| Bullets and features | function terms versus promotional claims | demo and feature queries | D4 |
| Price and currency | preserve source currency; compare only after valid conversion | TikTok price-band comparison | price friction |
| Sales/BSR history | current direction and lifecycle | no direct TikTok query | D1 |
| Competitor list | same-form seeds and exclusions | competitor and product-family retrieval | D1, D2 |
| Positive reviews | purchase reasons, proof, real scenarios | scenario and proof queries | content hypotheses |
| Negative reviews | objections, unmet needs, risky promises | pain and objection queries | differentiation |
| Variants | meaningful form, size, color, use differences | variant-specific product/video checks | first test variant |
| Buyer cues | target user and use context | creator/content-fit filters | D5 |
| Traffic keywords | high-intent Amazon language | translate, do not copy blindly | query generation |

## Search-term construction

### Exact-product terms

Start from product form, mechanism, use method, and directly substitutable names. Remove Amazon SEO modifiers, pack-count clutter, compatibility strings, and unsupported claims.

### Scenario terms

Use repeated recent review situations and Listing use occasions. A scenario must describe when, where, or by whom the product is used.

### Pain terms

Use customer problem language and purchase objections. Avoid translating medical or efficacy claims into stronger wording.

### Demonstration terms

Describe observable actions or transformations: before/after, assembly, cleaning, stress test, comparison, texture, sound, fit, or time saving.

### Competitor terms

Use verified Amazon direct competitors and brands. Keep brand evidence separate from generic product-family evidence.

## Relevance filtering order

Apply in order:

1. Is product form consistent?
2. Is the core function consistent?
3. Is the use method comparable?
4. Is the buyer purpose directly substitutable?
5. Are differences only brand, color, size, ordinary material, or pack count?

If the mechanism or purchase purpose differs materially, classify as `related_scene`, even when titles share keywords.

For each query retain:

```text
query and query group
validation purpose
candidate count
valid count
excluded count
main pollution pattern
retry decision
```

Allow at most two meaningfully different query revisions. If relevance remains poor, lower confidence and stop expanding the same query family.

## Creator derivation order

1. Extract creators from valid related videos.
2. Extract creators/creator counts from valid related products when available.
3. Qualify those creators for content and product fit.
4. Use creator search only to expand an insufficient first group.
5. Use category filters only with values returned by category-list capabilities.

Do not start from globally top-selling creators and infer product fit from follower count or contact availability.

## Market normalization

Store both source and target market codes.

- SellerSprite Amazon UK: `UK`
- KOLSprite/TikTok UK region: commonly `GB`

Do not assume every Amazon marketplace has a supported TikTok Shop region. If current MCP metadata does not enumerate region values, validate through returned status/error rather than inventing support.

Compare prices only when currency is the same or a dated conversion source is available. Otherwise report both prices without calculating a gap percentage.


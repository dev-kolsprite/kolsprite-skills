# MCP capability map

This is a routing snapshot, not a permanent protocol specification. The standalone and SellerSpace Yunya contracts were verified against authenticated MCP metadata on 2026-09-04. Always prefer current MCP metadata when it differs.

## Cross-host rules

- Match the declared business tool name; hosts may add names such as server prefixes.
- Some hosts expose tools lazily or filter discovery. Absence from an initial UI list is not proof that the server lacks the tool; use the host's supported MCP discovery path when available.
- Do not put endpoints or authentication secrets into business outputs.
- The preferred unified server is `yunyamcp` at `https://www.sellerspace.com/yunya_mcp/` and uses the custom `x-api-key` request header managed outside the Skill.
- The compatible standalone route can use the SellerSprite server at `https://mcp.sellersprite.com/mcp` for the Amazon stage and the KOLSprite server at `https://mcp.kolsprite.com/mcp` for TikTok validation; both use a custom `secret-key` request header managed outside the Skill.
- Never put any real key in this Skill, repository, logs, or business output.
- When Yunya and standalone services are all available, prefer Yunya and do not repeat a paid call against another server.
- Neither standalone snapshot declared machine-readable `outputSchema`; parse outputs defensively and do not invent absent fields.

## KOLSprite

Verified unified route: SellerSpace Yunya. Compatible standalone snapshot: `kolsprite-merged` version `1.27.2`, protocol `2025-03-26`, 8 tools.

| Capability | Business tool | Required input | Use |
|---|---|---|---|
| ASIN-related TikTok videos | `asin_analysis_video` | `market`, `asin` | first candidate retrieval |
| TikTok products | `product_search` | schema has no required field; supply query/ID and region | commercial/product evidence |
| TikTok videos | `video_search` | schema has no required field; supply query/ID/product/shop and region | content and time-window evidence |
| TikTok creators | `creator_search` | schema has no required field; supply query/category and region | creator expansion |
| TikTok shops | `shop_search` | schema has no required field; supply query/category and region | shop concentration supplement |
| Caption | `caption_extract_url` | `url` | optional script-level evidence |
| Product categories | `product_category_list` | none | valid category values |
| Creator categories | `creator_category_list` | none | valid category values |

Important parameter notes:

- Search pagination uses `page_num` and `page_size`; described maximum page size is 100.
- `asin_analysis_video` also accepts optional `region`, `page_num`, and `page_size`.
- Product and video searches support recent commercial fields and filters; `video_search.pub_date_from/to` filters publication date.
- `creator_search.category_list` and `product_category_list` are each described as accepting only one value; obtain it from the corresponding list tool.
- `caption_extract_url.is_southeast_asia` defaults to `false`.

Do not treat `asin_analysis_video` as exact ASIN attribution. Do not use current rolling-30-day sales as prior-cohort sales.

## SellerSprite

Verified unified route: SellerSpace Yunya for the required SellerSprite-first stage. Compatible standalone snapshot: `sellersprite-mcp-server` version `1.0.0`, protocol `2025-03-26`, 45 tools. The validator's minimal set is intentionally smaller.

### Core

| Capability | Business tool | Request shape | Required input |
|---|---|---|---|
| ASIN detail | `asin_detail` | direct | `marketplace`, `asin` |
| ASIN 14-month prediction/trend | `asin_prediction` | direct | `marketplace`, `asin` |
| Reviews | `review` | direct | `marketplace`, `asin` |
| Direct competitor seeds | `asin_competitor` | direct | `marketplace`, `asin` |

### Recommended enhancement

| Capability | Business tool | Request shape | Required input |
|---|---|---|---|
| Traffic-keyword overview | `traffic_keyword_stat` | direct | `marketplace`, `asin` |
| Traffic-keyword detail | `traffic_keyword` | nested `request` | `request.marketplace`, `request.asin` |
| Keyword demand trend | `keyword_research_trends` | direct | `marketplace`, `keyword` |

### Full-mode optional

| Capability | Business tool | Request shape | Required input |
|---|---|---|---|
| Competitor detail expansion | `competitor_lookup` | nested `request` | `request.marketplace` |
| Category statistics | `market_research_statistics` | nested `request` | `request.marketplace`, `request.nodeIdPath` |
| Parent/child sales trend | `asin_sales_trend` | direct | `marketplace`, `asin` |

Supported SellerSprite marketplace enum observed on core tools:

`US`, `JP`, `UK`, `DE`, `FR`, `IT`, `ES`, `CA`, `IN`, `MX`, `BR`, `AU`, `AE`.

Important parameter notes:

- Direct tools and nested-`request` tools are not interchangeable.
- `returnFields` is optional, but do not guess valid field names. Omit it unless a field set has been verified.
- `review` supports star/type filters, pagination, and millisecond start/end timestamps.
- `asin_prediction` values are predictions/estimates.
- `competitor_lookup.asins` supports up to 40 according to the observed schema.

## Required-capability check

Check capabilities in this order; do not start with KOLSprite discovery:

```text
Seller product identity available?
Seller lifecycle/trend available?
Seller customer or Listing language available?
Seller stage complete or explicitly degraded?
KOL direct ASIN candidates available?
KOL product and video search available?
```

If any item is absent, follow the degradation rules in `SKILL.md` and disclose the missing dimension. Do not silently substitute unrelated web data.

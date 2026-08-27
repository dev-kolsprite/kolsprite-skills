# KOLSprite Judgment Guide

Use these definitions when a user asks for judgments rather than raw records. They are explainable heuristics calibrated to the current public KOLSprite search fields, not platform truths or hidden model scores.

## Product opportunity and maturity

Evaluate a product candidate across separate signals:

| Signal | Current evidence | What it can support |
|---|---|---|
| Demand | 7-day/30-day units or GMV when returned; total sales | Whether the search found products with observed selling activity |
| Momentum | 7-day/30-day growth fields when returned | Recent acceleration or decline on the field's stated basis |
| Maturity | listing date, total sales, reviews | Whether the candidate appears early, established, or mature |
| Competition/supply | creator and shoppable-video counts | Current cumulative content and creator participation, not their historical increment |
| Commercial position | price, rating, review count, fulfillment/logistics fields | Price band, social proof, and operational context |
| Repeatability | success across several products, shops, creators, and videos | Whether evidence extends beyond one isolated winner |

Working labels:

- **Early candidate**: recently listed with limited proof. Growth may be positive, but conversion and repeatability remain weakly validated.
- **Growth candidate**: recent growth plus meaningful sales proof, with more than one supporting content/shop signal when available.
- **Established bestseller**: substantial sales and social proof; attractiveness depends on current growth and competitive density.
- **Mature or slowing candidate**: high historical proof but weak or negative recent growth. Do not call the entry window closed without trend-series evidence.

Do not use FastMoss's creator/video-increment lifecycle method: current KOLSprite public fields expose cumulative creator/video counts rather than their historical increment.

## Category or direction opportunity

An opportunity judgment requires more than search-result volume. Look for:

- several true-match products with meaningful observed sales;
- evidence across more than one shop or creator when possible;
- a coherent price/use-case segment;
- recent growth that is not carried by only one outlier;
- content and creator supply that appears reproducible;
- a plausible differentiation or underserved sub-direction.

Use “preliminary opportunity” when the scan is keyword-bounded or page-bounded. Profitability always requires the user's cost, margin, commission, fulfillment, inventory, and conversion inputs.

Use decision labels consistently:

- **Prioritize validation**: at least two compatible signals support a defined sub-direction, but economics or execution still needs a bounded test.
- **Conditional entry**: demand and repeatability evidence are sufficient for a go decision only if named supply, compliance, margin, or operating conditions are met.
- **Not recommended now**: compatible evidence shows weak/reversing demand, severe concentration, unrepeatable content, or an unresolved blocking condition.
- **Unable to determine**: evidence is single-source, incompatible, inaccessible, or too incomplete. This is not a negative market judgment.

Do not create a hidden composite opportunity score or fixed industry threshold. Every label must name supporting evidence, counterevidence/gaps, and applicable conditions.

## Creator fit

Keep dimensions visible rather than hiding them in a single score:

- category/product relevance;
- current content performance: average views, engagement, recency, and video supply when returned;
- selling evidence: sales, GPM, product count, or related fields with their actual time basis;
- operating scale: follower band and expected test role;
- contactability: returned public/business contact fields;
- concentration risk: dependence on one apparent viral result when that evidence is observable.

If the user requests a score, show the dimensions and weights. Do not claim exact product-promotion history, audience demographic fit, fulfillment rate, collaboration cost, or recent GMV when the public fields do not provide them.

## Winning content

Select a varied sample rather than only the top-viewed video. Balance:

- sales and views;
- engagement;
- recency;
- creator scale;
- product relevance;
- access to caption evidence.

Caption evidence can support spoken hook, problem/desire, benefit, proof, objection, offer, and CTA patterns. It cannot by itself explain visuals, on-screen text, edit rhythm, product demonstration, music, or causality. Mark those elements as visual review needed.

Repeated patterns across several relevant videos are transferable hypotheses. A single creative choice is a reference, not a rule. Produce new test briefs rather than copied scripts.

## Shop and competitor diagnosis

Current public tools support a bounded snapshot:

- shop-level scale and rating fields;
- products filtered by `shop_id`;
- videos filtered by `shop_id` or `product_id`;
- visible creator/product fields nested in returned records.

Client-calculated concentration is limited to the retrieved sample. Label it “Top N share within returned sample,” state the metric used, and never describe it as the shop's full sales concentration.

Do not infer short-video/live/product-card channel shares, paid/organic attribution, ad spend, ROAS, SKU structure, creator fulfillment, or private conversion from these tools.

## Time language

- Map “7 days” and “30 days” only to explicitly returned 7-day and 30-day fields.
- “Recent” should use the most appropriate explicit field available and name its period; do not silently impose 28 days.
- Use listing/publication timestamps only after converting them on a stated market/time-zone basis when the exact date matters.
- Preserve null, lifetime, cumulative, and unspecified-period metrics as such.

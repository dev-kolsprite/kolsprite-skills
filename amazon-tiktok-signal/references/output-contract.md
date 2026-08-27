# Output contract

Lead with the decision. Keep raw MCP fields, client calculations, rough judgments, and actions visibly distinct.

## Quick check

```markdown
## ASIN TikTok signal

- Head-content heat: High / Medium / Low / Insufficient (rough)
- Evidence quality: valid X of Y sampled videos
- Heat structure: one or two concise labels

### Why

- Same-product-family: X; highly similar: X; excluded related/noise: X
- Valid plays: total X; median X
- Creators: X; Top 1 play concentration: X%
- Shoppable videos: X/Y; current rolling-30-day video sales: X with coverage Y/Z

### Representative evidence

Show 3–5 valid records with video ID/title, publication time, plays, interaction, current video sales, creator, TikTok product, match class, and match reason.

### Decision

Give one bounded next action and one material unknown.
```

Do not include a monthly trend in a quick check unless the user explicitly asks and the first-page cohorts meet the minimum evidence rule. If included, label it low-confidence unless both cohorts meet the medium-confidence rule.

## Full signal

```markdown
## Overall judgment

- Overall TikTok heat: High / Medium / Low / Insufficient (rough)
- Latest 30 days vs prior 30 days: Rising / Stable or mixed / Declining / Unavailable (rough)
- Trend confidence: Normal / Low / Unavailable
- Heat structure: labels

One sentence explaining what this means for an Amazon product decision.

## Evidence scope

- Market/region: X/X
- Window and order: latest six months, play-count descending, as supplied or observed
- Pages/rows: pages X–Y, returned X, deduplicated X, MCP candidate total X
- Valid same-product-family/highly-similar videos: X; related scene: X; noise: X
- Stop reason: exhausted / mode cap / error

## Heat dimensions

| Dimension | Result | Supporting calculations |
|---|---|---|
| Head-content heat | Strong/Medium/Weak | valid videos, total and median plays |
| Creator diffusion | Strong/Medium/Weak | creators, Top 1/Top 3 concentration |
| Recent direction | Rising/Stable or mixed/Declining/Unavailable | M0 vs M1 videos, creators, median play velocity |
| Commerce | Strong/Medium/Weak | shoppable rate, current video sales, distinct products |

## Latest 30 days vs prior 30 days

| Metric | Latest 30 days | Prior 30 days | Interpretation |
|---|---:|---:|---|
| Valid videos in sample | X | X | ... |
| Distinct creators | X | X | ... |
| Median daily play velocity | X | X | ... |
| Shoppable videos | X | X | current status, not historical monthly sales |

State: “Based on the collected top-play representative sample, overall heat appears to be X versus the prior 30 days. This is a rough directional judgment, not a full-population measurement.”

## Representative evidence

Show 3–5 records that explain the judgment, not merely the highest-play records.

## Decision

Give one recommendation, its evidence, a smallest validation action, and a stop/review condition.
```

## ASIN comparison

Use one common sample contract for every ASIN.

```markdown
## Recommendation

Prioritize ASIN X for the next TikTok validation step because ...

| ASIN | Heat | Recent momentum | Evidence | Valid/sample | Creators | Top 1 concentration | Shoppable rate | Current video sales |
|---|---|---|---|---:|---:|---:|---:|---:|
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

### Interpretation

- Explain whether each result is broad diffusion, a single hit, content-only interest, commercial validation, or insufficient evidence.
- Do not rank an ASIN with failed or materially incomparable collection as though its score were complete.

### Next test

Choose one ASIN and define the smallest content/creator validation action plus a metric and review condition.
```

## Language rules

Prefer:

- “与该ASIN商品相关的TikTok热度信号”;
- “同款商品和高度相似商品”;
- “基于头部播放代表性样本的粗略趋势判断”;
- “当前滚动30日视频销量”.

Avoid:

- “已确认该ASIN在TikTok的销量”;
- “TikTok带来了Amazon销量增长”;
- “全市场视频增长率”, unless the collected dataset is actually complete;
- “未来一定会爆”.

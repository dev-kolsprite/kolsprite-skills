# Evidence and output contract

Lead with the bounded decision. Keep the default response concise enough for a business user to act on without opening files.

## Default decision card

```markdown
## Decision

- Test decision: Worth testing / Conditional test / Not recommended / Not issued
- Evidence state: Sufficient / Partial / Incomplete
- Evidence confidence: High / Medium / Low
- Target: [ASIN] · Amazon [market] → TikTok [region]

[One sentence explaining what the evidence supports and the main constraint.]

## Evidence scope

- Run time and data periods:
- SellerSprite calls/data used:
- KOLSprite calls/data used:
- TikTok candidates / deduplicated / valid:
- Degraded or missing evidence:

## Five dimensions

| Dimension | Result | Evidence |
|---|---|---|
| Amazon demand validity | High/Medium/Low/Unverified | ... |
| TikTok commercial signal | High/Medium/Low/Unverified | ... |
| Latest-30-day momentum | Rising/Stable or mixed/Declining/Unavailable | ... |
| Content fit and competition | High/Medium/Low/Unverified | ... |
| Creator diffusion/executability | High/Medium/Low/Unverified | ... |

## What to test first

1. Content hypothesis and supporting evidence
2. Content hypothesis and supporting evidence
3. Optional third hypothesis

Creator criteria or a small supported seed group:

## Minimum test

- Setup: angles × versions/creators × 7–14 days
- Success condition:
- Modify condition:
- Stop condition:

## Boundary

- What remains unknown
- One smallest next action
```

## Quick-validation limits

- No caption analysis unless explicitly requested.
- No broad creator expansion.
- Representative evidence is enough; do not create a long market report.
- If the test decision cannot be supported, set the decision to `Not issued`, evidence state to `Incomplete`, and give the smallest missing retrieval.

## Full-test-plan additions

Add only when evidence supports them:

- content archetype and hook direction;
- representative valid videos with why each matters;
- content-reference creators versus first-test creators;
- creator fit rationale;
- script elements from a small caption sample;
- test instrumentation and review cadence.

Do not include full contact details by default. Report contactability and type; expose addresses only when the user explicitly requests an operational export and the host permits it.

## Evidence labels

Mark sections or sentences when ambiguity would otherwise arise:

- `Observed — SellerSprite`
- `Observed — KOLSprite`
- `Calculated from current sample`
- `Business judgment`
- `Recommendation`

Avoid excessive labelling when the table structure already makes the boundary clear.

## Calculations

### Relevance rate

`valid same/similar deduplicated records / all deduplicated returned records`

### Creator spread

- distinct creators by stable creator ID;
- creator-video ratio;
- Top 1 and Top 3 play concentration;
- non-head creator contribution.

### Commerce

- shoppable valid-video count/rate;
- current rolling-30-day video sales with non-null coverage;
- distinct TikTok products;
- deduplicated current product sales, counting each product ID once.

Never sum the same product's sales once per video. Never merge video sales and product sales into one number.

### Recent direction

Use publication cohorts and age-adjusted play velocity from `decision-rubric.md`. State that the result is a rough direction from the collected representative sample unless the dataset is truly exhaustive.

## Representative evidence

Select records that explain the decision, not merely the largest values. Prefer a contrast such as:

- one strong same-family commercial record;
- one recent independent creator record;
- one record that demonstrates concentration, weak commerce, or another bottleneck.

For each record show only useful fields: title/ID or link, publication date, creator, product, plays, interaction, current sales when covered, relevance class, and selection reason.

## File output

Do not create files by default. When the user asks for a saved or shareable report:

- keep the decision summary independently readable;
- preserve an evidence ledger with source, query, period, candidates, valid records, calculations, and exclusions;
- distinguish raw returned fields from Skill-derived fields;
- avoid storing credentials or unnecessary personal data;
- use a format supported by the current host rather than requiring Python, shell, or a spreadsheet library.

## Language

- Match the user's report language.
- Write content hooks, script examples, and creator-facing material in the target market's natural language, with a translation only when useful.
- Do not translate claims into stronger efficacy, medical, or compliance statements.

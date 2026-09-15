# Run Evidence Display

Use this pattern for a substantial growth-plan run, a reusable workflow example, or a partner-facing demonstration. It keeps execution evidence auditable without turning the answer into an implementation log.

## 1. Run scope

| Item | Required content |
|---|---|
| Decision | The account-category decision this run supports |
| Access time | Date, time, and timezone |
| Sources | KOLSprite MCP tools, public pages, and separate external sources actually used |
| Market and objects | Market, category/product/account, keywords, and stable IDs |
| Collection | Filters, sort, period, pages, raw/deduplicated rows, account-video sample, and caption requested/success/failed/not-executed counts |
| Usage | Executed calls by tool and actual point deduction/balance only when returned; otherwise “point usage not returned” when material |
| Completeness | Complete for requested scope / page-bounded / interrupted / partial |
| Stop reason | Decision supported, scope exhausted, repeated results, service limit, insufficient points, authentication/server error, access restriction, or missing capability |

Do not label a page-bounded sample as a full account history or the whole market.

## 2. Evidence labels

| Label | Meaning | Minimum disclosure |
|---|---|---|
| **MCP observation** | A field or relationship returned by the current KOLSprite MCP run | Tool/object, field period, and usable ID or returned link |
| **Public-page observation** | A field visibly read from an accessible public page | Page URL, access time, and access/sample limit |
| **Client calculation** | A rate, rank, grouping, concentration, or comparison calculated from collected records | Formula or method and sample boundary |
| **External fact** | Information from another identified source | Source and date, kept separate from MCP evidence |
| **Business judgment** | A recommendation or hypothesis based on preceding evidence | Supporting evidence IDs and material uncertainty |
| **Action proposal** | A next test or operating action | Owner/input, metric, review point, and continue/adjust/stop condition |

User-supplied values remain user inputs. Missing and null fields are unavailable, not zero.

## 3. Compact result pattern

Lead with the decision, then include only evidence that changes it:

### Recommendation

- Decision and confidence:
- Why this follows from the evidence:
- Decision-changing gap:

### Evidence

| Evidence ID | Label | Object/source | Observation or calculation | Period/sample | Limitation |
|---|---|---|---|---|---|

### Actions

| Priority | Action | Supporting evidence | Owner/input | Metric | Review/stop condition |
|---|---|---|---|---|---|

### Run note

- Query scope, pages/rows, completeness, and stop reason.
- Executed tool counts and returned point usage without estimating absent costs.
- Failed, skipped, unavailable, or incompatible fields affecting the result.

## 4. Workflow evidence versus business outcome

A successful run proves only that the workflow retrieved and processed the disclosed evidence. It does not prove saved time, improved creator response, higher conversion, or GMV growth.

Use **workflow run example** for query results, calculations, recommendations, and proposed test volumes. Use **customer outcome** only when authorized evidence establishes the customer context, baseline, comparison window, measurement method, and resulting metric. Remove credentials, private customer data, unnecessary contact fields, and internal identifiers from partner-facing examples.

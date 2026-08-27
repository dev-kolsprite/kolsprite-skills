# Run Evidence Display

Use this pattern for a substantial research run, a reusable workflow example, or a partner-facing demonstration. It makes the run auditable without turning the answer into an implementation log.

Do not add this full block to a simple lookup when the result and one compact source note are sufficient.

## 1. Run scope

Show the smallest scope block that lets a reader understand what actually ran:

| Item | Required content |
|---|---|
| Decision | The user decision this run supports |
| Access time | Date, time, and timezone |
| Sources | KOLSprite MCP tools, public pages, and any separate external source actually used |
| Market and objects | Market, category/product/account, keywords or stable IDs |
| Collection | Filters, sort, period, pages, raw rows, deduplicated rows, and caption requested/success/failed/not-executed counts when relevant |
| Usage | Executed call count by tool and actual point deduction/balance only when returned by MCP or the host; otherwise “point usage not returned” when material |
| Completeness | Complete for requested scope / page-bounded / interrupted / partial |
| Stop reason | Decision supported, requested scope exhausted, repeated results, service/rate limit, insufficient points, authentication/server error, access restriction, or missing capability |

Do not label a page-bounded sample as the full market. When several datasets share the same context, use one scope block plus a compact source ledger rather than repeating it under every table.

## 2. Evidence labels

Keep these labels visible whenever a result mixes data and interpretation:

| Label | Meaning | Minimum disclosure |
|---|---|---|
| **MCP observation** | A field or relationship returned by the current KOLSprite MCP run | Tool/object, field period, and usable ID or source link |
| **Public-page observation** | A field visibly read from an accessible public page | Page URL, access time, and access/sample limit |
| **Client calculation** | A rank, rate, grouping, concentration, or comparison calculated from collected records | Formula or plain-language method and sample boundary |
| **External fact** | Information from another identified source | Source and date; keep separate from MCP evidence |
| **Business judgment** | A recommendation or hypothesis based on preceding evidence | Supporting evidence IDs and material uncertainty |
| **Action proposal** | A next test or operating action | Owner/input, metric, review point, and continue/adjust/stop condition |

Missing and null fields are **unavailable**, not zero. A value supplied by the user is a **user input**, not an MCP observation.

## 3. Compact result pattern

Lead with the decision, then show only the evidence that changes it:

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
- Executed tool counts and returned point usage, without estimating absent cost data.
- Failed, skipped, unavailable, or incompatible fields that affect the result.

## 4. Workflow run versus business outcome

A successful MCP run proves only that the workflow retrieved and processed the disclosed evidence. It is not proof that a customer saved time, improved creator response, increased conversion, or grew GMV.

Use **workflow run example** when showing query results, calculations, recommendations, or proposed budgets/test volumes. Use **customer outcome** only when there is authorized evidence for the customer context, baseline, comparison window, measurement method, and resulting metric. Never describe a recommended budget, creator count, or forecast as a measured outcome.

For partner-facing examples, remove credentials, private customer data, unnecessary contact fields, and internal identifiers. Preserve enough query context for the example to be checked.

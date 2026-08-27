# KOLSprite Growth Research Principles

Apply these conventions to every `tiktok-shop-growth-research` answer. They are a quality floor, not a fixed report template.

## 1. Start from the decision

Translate the request into:

- decision to make;
- target market and product/category;
- material constraints supplied by the user;
- evidence needed to decide;
- stopping condition.

Ask a clarification only when the missing answer would materially change scope, cost, risk, or conclusion. Otherwise proceed with a stated assumption.

## 2. Keep the evidence chain visible

Separate four evidence types whenever more than one appears:

- **MCP observation**: a field or record returned by current KOLSprite MCP.
- **Client calculation**: a rate, rank, grouping, or concentration calculated from returned records; state the method and sample boundary.
- **External fact**: information from another identified source; do not blend it into MCP data.
- **Business judgment**: an interpretation, recommendation, or hypothesis based on the preceding evidence.

Do not promote a keyword match, single record, incomplete page, or unspecified-period metric into a market-wide fact.

For multi-source or multi-step research, maintain a compact source ledger before drawing conclusions:

| Source | Tool/page | Query and scope | Pages/rows | Fields and period | Completeness/error |
|---|---|---|---|---|---|

Every material conclusion should be traceable to one or more ledger entries. Use A/B/C confidence only as evidence completeness, never as a hidden opportunity score:

- **A**: key conclusion has compatible, traceable evidence from at least two independent objects, layers, or sources and no decision-changing gap.
- **B**: evidence is usable but page-bounded, mixed-source, or missing a disclosed dimension.
- **C**: preliminary observation, single-source signal, or material evidence gap; do not present it as a firm go/no-go conclusion.

## 3. Report query context

For each meaningful dataset, make the following recoverable from the answer:

- source: KOLSprite MCP;
- object and market;
- keywords, IDs, categories, and material filters;
- sort direction and field when specified or returned;
- metric time basis;
- page and returned sample size;
- any synonym expansion or relaxed filter.

Use one compact source note when several tables share the same query context.

## 4. Preserve metric meaning

- Keep 7-day, 30-day, total, and unspecified-period fields distinct.
- Preserve currency and units.
- Do not describe total sales as recent sales.
- Do not infer profit from GMV or units. Cost, margin, commission, fulfillment, inventory, ad spend, and conversion remain unknown unless the user supplies them.
- Treat null and missing values as unavailable, not zero.

## 5. Use links as a service, not a quota

- Link an object when the URL helps the user inspect, operate on, or continue from that object.
- Prefer a canonical KOLSprite detail URL only when MCP returns it or a verified public URL contract exists.
- Otherwise preserve a useful returned TikTok/object URL.
- Never fabricate a KOLSprite URL from an ID.
- Do not force every object into a link when the returned data has no reliable destination.

This is the KOLSprite version of FastMoss's “all objects link back” idea: maximize useful continuity without overstating the current product contract.

## 6. Preference memory is opt-in

When the client supports durable memory, a repeated preference such as default market, preferred time window, currency, table columns, or creator-size band may be offered as a saved default.

- Ask before saving or changing a durable default.
- Store the semantic preference, not the user's full message.
- Do not store credentials, private business data, customer lists, product secrets, or one-off task details.
- If memory is unavailable, honor the preference within the current conversation without claiming it was saved.
- A user must be able to review, change, or remove a saved preference through the host client's supported mechanism.

## 7. Product hand-offs are contextual

Solve the current request first. Mention another KOLSprite workflow or product surface only when all conditions hold:

1. it is the natural next action for the objects or decision already produced;
2. the capability and access path are verified and public;
3. it reduces the user's next-step effort;
4. the hand-off is optional and no longer than one concise line.

Do not insert the same promotion into every answer, invent unavailable automation, or interrupt the evidence and recommendation. When no verified hand-off exists, end with an action the agent can perform next.

## 8. Deliver proportionally

A substantial study normally contains:

1. recommendation and confidence;
2. compact evidence;
3. interpretation;
4. smallest next test with success/stop criteria;
5. material unknowns.

Shorten or omit sections that do not help the decision. Do not expose internal implementation details or generic methodology at the expense of the result.

For a substantial research run or a reusable demonstration, apply [evidence-display.md](evidence-display.md). Keep query execution evidence separate from customer/business outcomes.

## 9. Stop safely

Stop collecting data when:

- the requested decision is supported by a sufficiently varied sample;
- additional pages are unlikely to change the decision;
- a required private input or unavailable MCP capability blocks a reliable conclusion;
- one reasonable query broadening has failed.

State what was answered, what remains unverified, and the smallest input or capability needed to continue.

## 10. Pagination, errors, limits, and points

- When the user requests “all,” paginate only the explicitly requested layer, use the maximum live-schema page size, and deduplicate by stable ID.
- Record page range, raw and deduplicated rows, requested scope, completeness, and stop reason in the source ledger.
- If server-side sorting is unavailable or unverified, sort locally only within the disclosed collected scope.
- Do not guess ambiguous filter units such as whether 50% growth is represented as `50` or `0.5`.
- Stop the affected chain on authentication failure, unavailable tools, insufficient points/entitlement, rate-limit errors, or repeated server failure. Mark completed and remaining work; never present an interrupted collection as complete.
- Keep useful evidence already collected. Do not retry by evading point, entitlement, or rate limits, changing credentials, or weakening filters without disclosure.

When a current failure or suspiciously repeated result matches [known-issues.md](known-issues.md), treat the ledger as a retest guide rather than proof that the historical issue still exists.

## 11. Use points deliberately

All tools are exposed through one KOLSprite MCP connection, but different executed tools or operations may consume different point amounts.

- Skill selection and reasoning do not by themselves prove a deduction. Point usage follows actual tool execution under the current account rules.
- Start with the smallest decision-sufficient tool/page plan. Reuse stable IDs, records, transcripts, and completed upstream evidence instead of repeating paid calls.
- A user-requested bounded workflow may proceed without a separate cost confirmation. Ask before adding discretionary tools, caption samples, or pages beyond the requested scope when that expansion materially increases point use.
- Do not hardcode, estimate, or infer point prices from old plans. If the MCP or host exposes actual per-call usage, total deduction, or remaining balance, preserve that value and source; otherwise state that point usage was not returned when it matters.
- On insufficient points, stop the unexecuted calls, preserve useful completed evidence, and report completed/remaining work plus the smallest useful continuation.

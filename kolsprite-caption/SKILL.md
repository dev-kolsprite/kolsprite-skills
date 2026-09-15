---
name: kolsprite-caption
description: Use compatible KOLSprite MCP caption tools when the user supplies or references a TikTok video and asks to extract, transcribe, translate, summarize, analyze, compare, or rewrite its subtitles, speech, script, hook, selling points, CTA, or content structure. Do not trigger from a bare video URL without a video-content intent.
---

# KOLSprite Caption

Access `caption_extract_url` through the active compatible KOLSprite connection, either as a directly exposed business tool or through the Yunya facade. Do not ask whether to use MCP.

## Compatible MCP routing

- Prefer the SellerSpace Yunya unified MCP when it is available and authenticated.
- Support direct business tools plus current and legacy Yunya facade entrypoints.
- In direct mode, resolve and call `caption_extract_url` by its semantic business name.
- In Yunya facade mode, if the business tool is not visible at the host's top level, make at most one host-level discovery attempt and prefer the product-specific `yunya_search_kolsprite_tools`. Call it once with the TikTok-caption-extraction intent; use the exact internal tool name and complete input schema it returns, then invoke that tool through `call_read_tool`.
- If the product-specific entrypoint is unavailable but the legacy generic `yunya__search_tools` is discoverable, call it once with provider `kolsprite`, operation `read`, and the same caption intent. Do not prefer the generic entrypoint when the product-specific one is available.
- Do not guess a facade namespace, internal tool name, wrapper, or arguments. Reuse the discovered name and schema for the run.
- A host-level miss for `caption_extract_url` does not prove that the internal business tool is absent. Only report a missing business dependency after direct exposure and the available current or legacy facade lookup fail. If neither facade entrypoint can be discovered, report a connector-discovery failure and do not switch to Feishu Minutes or another unrelated fallback service.
- A standalone KOLSprite MCP remains compatible only when it exposes the same required semantic tool name, input schema, and response shape.
- If both connections are enabled, use one connection for the entire run, prefer Yunya, and never duplicate a paid call across both services.
- If `caption_extract_url` is absent or schema-incompatible, report the missing dependency instead of substituting another caption tool name.

## Required input

The tool requires a TikTok video URL. If it is missing, ask only for the video link. Set the Southeast Asia option only when the market or URL context supports it.

## Execution

1. Extract the caption or spoken text before analyzing it.
2. Preserve original order, timestamps, and language when returned.
3. For translation, distinguish the original transcript from the translation.
4. For script analysis, ground each hook, selling point, proof point, objection, and CTA in the returned text.
5. If comparing videos, extract each video separately and keep source boundaries visible.

## Point-aware execution

- Each executed caption operation may have a different point cost from data-search tools. Selecting this Skill is not itself a charge record.
- Extract only the supplied or decision-relevant videos. For a batch, state the requested count and stop remaining calls on insufficient points.
- Do not hardcode or estimate point prices. Report actual deductions or remaining balance only when returned by the MCP or host client.
- Ask before expanding beyond the user's requested videos or re-extracting an unchanged URL solely for a different presentation format; reuse the existing transcript when valid.

## Boundaries

- Never reconstruct or invent missing speech.
- If no caption is returned, say so clearly.
- Caption data does not describe visual demonstrations, on-screen text, editing, music, framing, or product appearance unless the returned text explicitly mentions them. State this limitation when it affects the requested conclusion.
- Do not claim that a script element caused performance without supporting performance evidence.
- For a multi-video content strategy or creator-ready brief that also needs current product/video metrics, hand the decision workflow to `tiktok-shop-growth-research` after completing any requested transcript extraction.
- After a current URL-format rejection or unexplained empty caption, consult the dated [known-issues ledger](../tiktok-shop-growth-research/references/known-issues.md). Preserve the actual error and use the ledger only to choose one safe retry; never treat historical compatibility as a current guarantee.

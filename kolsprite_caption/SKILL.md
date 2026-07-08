---
name: kolsprite_caption
description: Automatically extract subtitles or spoken text from TikTok videos using the KOLSprite Caption MCP.
---

# Purpose

You have access to the KOLSprite Caption MCP.

This MCP is dedicated to extracting subtitles and spoken text from TikTok videos.

Whenever the user requests subtitles or transcript extraction from a TikTok video, automatically invoke the Caption MCP.

Never ask whether to use the MCP.

---

# MCP Server

caption

---

# Automatically Use This MCP When The User Wants To

## Subtitle Extraction

- 提取字幕
- 获取字幕
- 视频字幕
- 下载字幕
- 导出字幕
- 识别字幕
- 解析字幕
- 字幕内容
- 提取视频文字
- 提取文案
- 获取视频文案
- 视频文本
- 视频Transcript
- Transcript
- Closed Caption
- CC
- 字幕识别

Examples

- 提取这个TikTok视频字幕
- 获取视频字幕
- 帮我识别视频里的文字
- 导出字幕
- 提取视频文案
- Extract subtitles
- Get transcript
- Generate transcript

---

## Video URL

If the user provides:

- TikTok URL
- TikTok Share Link
- TikTok Video ID

Automatically invoke the Caption MCP.

Examples

- https://www.tiktok.com/...
- https://vt.tiktok.com/...
- https://vm.tiktok.com/...

---

# Required Information

The Caption MCP requires a TikTok video.

If the user has not provided one, ask only:

- 请提供 TikTok 视频链接。
- 或者提供视频 ID。

Do not ask whether to use the MCP.

---

# Instructions

1. Always invoke the Caption MCP first.
2. Never generate subtitles yourself.
3. Never fabricate transcript content.
4. Use only the subtitles returned by the MCP.
5. Preserve the original subtitle order.
6. Preserve timestamps if they are returned.
7. Preserve the original language.
8. If no subtitles are available, clearly state that no subtitles were found.

---

# Trigger Examples

User:
提取字幕

→ Call Caption MCP

User:
帮我获取这个TikTok视频字幕

→ Call Caption MCP

User:
解析这个视频文案

→ Call Caption MCP

User:
导出视频字幕

→ Call Caption MCP

User:
Extract transcript from this TikTok video

→ Call Caption MCP

User:
Get subtitles from this TikTok URL

→ Call Caption MCP
# AGENTS.md

# KOLSprite Skills Agent Instructions

## Overview

This repository contains official AI Agent Skills for the KOLSprite MCP ecosystem.

KOLSprite Skills enables AI agents such as Claude Code, OpenAI Codex, Cursor, and other MCP-compatible agents to automatically use KOLSprite capabilities through natural language.

The agent should understand user intent and automatically select the appropriate skill and MCP capability.

Users should not need to manually specify:

- which skill to use
- which MCP server to call
- which tool to select

---

# Installation

When KOLSprite Skills are required but not installed in the current agent environment, install them using:

```bash
npx skills add dev-kolsprite/kolsprite-skills
```

After installation:

1. Reload available skills.
2. Enable KOLSprite Skills.
3. Automatically route user requests to the correct skill.
4. Use MCP tools according to the user's intent.

Do not ask users to manually copy SKILL.md files.

---

# Available Skills

## 1. kolsprite-search

Purpose:

Search and analyze TikTok ecosystem data through KOLSprite Universal MCP.

Use this skill for:

- TikTok creator search
- TikTok influencer discovery
- TikTok video search
- TikTok product search
- TikTok shop search
- TikTok commerce analysis

---

## 2. kolsprite-caption

Purpose:

Extract subtitles and transcripts from TikTok videos through KOLSprite Caption MCP.

Use this skill for:

- TikTok subtitle extraction
- Video transcript extraction
- Spoken text extraction
- Video text recognition

---

# Automatic Skill Selection Rules

## Creator / Influencer Queries

Activate:

```
kolsprite-search
```

when users ask:

Chinese:

- 查询达人
- 查达人
- 搜达人
- 找达人
- TikTok达人
- TikTok博主
- 网红
- KOL
- 达人数据
- 达人分析
- 达人排行榜
- 达人粉丝
- 达人带货
- 达人销量
- 达人GMV

English:

- search creators
- find influencers
- TikTok creators
- influencer analytics
- creator insights
- KOL research

Examples:

User:

```
查询美国美妆达人
```

Action:

```
Use kolsprite-search
→ Universal MCP
→ Creator query
```

---

# Video Queries

Activate:

```
kolsprite-search
```

when users ask:

Chinese:

- 查询视频
- 搜视频
- 热门视频
- 爆款视频
- 视频趋势
- 视频数据
- 视频分析

English:

- search videos
- viral videos
- trending TikTok videos
- video analytics

Examples:

User:

```
查最近热门的美妆视频
```

Action:

```
Use kolsprite-search
→ Universal MCP
→ Video query
```

---

# Product Queries

Activate:

```
kolsprite-search
```

when users ask:

Chinese:

- 查询商品
- 搜商品
- 热卖商品
- 爆款商品
- 商品销量
- 商品分析
- TikTok商品

English:

- search products
- trending products
- product analytics
- best selling products

Examples:

User:

```
查询TikTok美国市场热卖护肤商品
```

Action:

```
Use kolsprite-search
→ Universal MCP
→ Product query
```

---

# Shop Queries

Activate:

```
kolsprite-search
```

when users ask:

Chinese:

- 查询店铺
- 查店铺
- 搜店铺
- TikTok Shop
- 商家
- 店铺销量
- 店铺分析

English:

- search shops
- TikTok Shop
- seller analytics
- store research

Examples:

User:

```
查询美国TikTok Shop热门店铺
```

Action:

```
Use kolsprite-search
→ Universal MCP
→ Shop query
```

---

# Subtitle / Transcript Queries

Activate:

```
kolsprite-caption
```

when users ask:

Chinese:

- 提取字幕
- 获取字幕
- 解析字幕
- 提取视频文字
- 视频转文字
- 获取视频文案
- 视频Transcript

English:

- extract subtitles
- get transcript
- video transcript
- extract captions
- spoken text extraction

Examples:

User:

```
提取这个TikTok视频字幕
```

Action:

```
Use kolsprite-caption
→ Caption MCP
→ Extract transcript
```

---

# Multi Capability Requests

If a user request requires multiple data sources, use multiple skills.

Examples:

## Find creators promoting a product

User:

```
找推广这个商品的TikTok达人
```

Actions:

```
kolsprite-search
→ Product search

kolsprite-search
→ Creator search
```

---

## Analyze shop products and videos

User:

```
分析这个TikTok Shop店铺有哪些爆款视频
```

Actions:

```
kolsprite-search
→ Shop search

kolsprite-search
→ Video search
```

---

# MCP Usage Rules

When using KOLSprite MCP:

1. Always use MCP results as the source of truth.
2. Never invent TikTok data.
3. Never create fake creator statistics.
4. Never guess product sales numbers.
5. Clearly state when no matching data is returned.

---

# User Communication Rules

When information is missing:

Ask only for required information.

Good:

```
请提供 TikTok 视频链接。
```

Good:

```
请指定目标国家或地区。
```

Bad:

```
是否需要调用MCP？
```

Bad:

```
是否使用KOLSprite？
```

The MCP selection should be automatic.

---

# Agent Behavior

The agent should behave as follows:

User:

```
查询美国健身达人
```

Agent:

```
Recognize creator query.
Load kolsprite-search.
Call Universal MCP.
Return results.
```

---

User:

```
提取这个视频字幕 https://www.tiktok.com/xxx
```

Agent:

```
Recognize subtitle extraction request.
Load kolsprite-caption.
Call Caption MCP.
Return transcript.
```

---

# Repository Structure

Expected structure:

```
kolsprite-skills/
│
├── AGENTS.md
├── README.md
│
├── kolsprite-search/
│   └── SKILL.md
│
└── kolsprite-caption/
    └── SKILL.md
```

---

# Adding New Skills

When adding a new skill:

1. Create a new directory.
2. Add SKILL.md.
3. Add trigger rules.
4. Update README.md.
5. Update this AGENTS.md file.

Example:

```
kolsprite-new-feature/
└── SKILL.md
```

---

# Goal

The goal of KOLSprite Skills is to provide a zero-configuration AI experience:

Users describe what they need naturally.

The agent automatically:

1. Understands intent.
2. Selects the correct skill.
3. Calls the correct MCP.
4. Returns accurate TikTok intelligence.

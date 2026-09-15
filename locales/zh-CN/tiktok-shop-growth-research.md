---
name: tiktok-shop-growth-research
description: 使用当前 KOLSprite 商品、达人、视频、店铺和字幕数据，开展有证据支持的 TikTok Shop 经营研究。适用于机会评估、冷启动规划、优胜内容研究、达人选择、竞品对比、增长诊断，以及判断某个方向是否值得测试、应该如何测试。不适用于单次直接查询或仅处理字幕的请求。
---

# TikTok Shop 增长研究

通过一个有效连接提供的数据搜索和字幕工具，把卖家的决策问题转化为有边界的建议。工具需符合 KOLSprite 契约；自动使用 MCP，无需询问用户是否调用。

## 兼容 MCP 路由

- SellerSpace 云雅统一 MCP 可用且已鉴权时，优先使用云雅。
- 支持业务工具直接调用，以及云雅当前版和旧版两种门面入口。
- 直接模式下，按语义业务名称识别所需研究工具。
- 云雅门面模式下，如果宿主顶层看不到业务工具，最多进行一次宿主级发现，并优先使用产品专属入口 `yunya_search_kolsprite_tools`。查询所选工作流需要的最小工具集合；使用返回的真实内部工具名及完整输入 Schema，再通过 `call_read_tool` 调用。
- 如果产品专属入口不可用、但可发现旧版通用入口 `yunya__search_tools`，则使用 provider `kolsprite`、operation `read` 和相同查询调用。产品专属入口可用时，不应优先使用通用入口。
- 不得猜测门面命名空间、内部工具名、包装结构、类目值或参数；整个任务复用已发现的名称、Schema、ID 和证据。
- 宿主顶层没有命中业务工具，不代表内部工具不存在。只有直接模式以及可用的当前版或旧版门面查询都失败后，才能报告业务依赖缺失。两个门面入口都无法发现时，应明确报告连接器发现失败，并且只能利用足以支持边界清晰部分答案的剩余证据，不能使用无关替代品。
- 独立 KOLSprite MCP 仅在所需语义工具名、输入结构和返回结构一致时兼容。
- 如果两种连接同时启用，本次任务的全部 MCP 证据都使用云雅，不得跨服务重复执行付费调用。
- 缺少必要工具或工具结构不兼容时，应报告依赖缺口；只有剩余证据仍能支持边界清晰的部分回答时才能继续。

## 必读共享参考文件

首先阅读 [principles.md](references/principles.md)，其中定义证据标签、查询透明度、链接、偏好记忆、产品交接和停止规则。

解释商品阶段、机会、达人适配、内容模式、店铺集中度或时间窗口时，阅读 [judgment-guide.md](references/judgment-guide.md)。这些定义根据当前公开 KOLSprite MCP 返回字段校准，不得替换成当前不可用的 FastMoss 式趋势或归因字段。

开展较完整研究、可复用工作流或面向合作方的示例时，交付前阅读 [evidence-display.md](references/evidence-display.md)。只有当前出现匹配错误、结果疑似重复或结构不一致时才阅读 [known-issues.md](references/known-issues.md)；历史记录在当前复现前不能视为有效工具规则。

## 选择一个主要工作流

- 新品启动、是否进入、首批内容测试和初始达人：阅读 [cold-start.md](references/cold-start.md)。
- 参考视频、Hook、卖点、脚本、CTA 模式和达人拍摄 Brief：阅读 [winning-content.md](references/winning-content.md)。
- 类目机会、已验证需求、商品候选和进入假设：阅读 [opportunity-scan.md](references/opportunity-scan.md)。
- 达人候选名单、寄样、合作适配或触达分组：阅读 [creator-partnership.md](references/creator-partnership.md)。
- 竞品店铺或商品对比，以及增长瓶颈诊断：阅读 [competitor-growth.md](references/competitor-growth.md)。

即使需要多个参考文件，也只选择一个主要工作流。冷启动研究可以使用机会、内容和达人方法，但最终仍应交付一个冷启动决策，而不是三份相互割裂的报告。

## 公开 MCP 能力边界

- 只有需要按类目筛选且本次任务没有已验证映射时，才使用 `creator_category_list` 和 `product_category_list` 解析实时接受值。
- 使用 `product_search`、`shop_search`、`video_search` 和 `creator_search` 获取当前结构化证据。
- 只有口播内容影响决策时，才对少量相关视频使用 `caption_extract_url`。
- 下游筛选支持时，复用已返回的 `product_id` 和 `shop_id`。
- 不得假设存在公开详情、历史时间序列、广告、SKU、评论列表、直播、受众人口属性、渠道归因或精确商品—达人关系工具。

达人内容类目应匹配用户的中英文标签，并将返回的 `creator_category_list.value` 传给 `creator_search.category_list`。商业类目应递归遍历 `product_category_list`，匹配 `categoryCn` 或 `categoryEn`，并把返回的完整 `category` 值传给相应商品、店铺、视频或达人商品类目筛选。内容赛道或账号定位解释为达人类目；销售、推广商品或合作方向解释为商品类目。不得仅为回避“美妆达人”之类的歧义而同时设置两种类目筛选；应根据上下文判断、说明重要假设，或仅在选择会实质改变结果时询问一次。当前结构接受数组，但每次调用只支持一个类目值。本次任务中应复用映射，不能固化类目表；找不到安全映射时，退回到明确披露范围的关键词样本。使用语义工具名，因为不同 Agent 的 MCP 宿主可能暴露不同的可调用前缀。

如果没有可用且已鉴权的兼容 MCP 服务，应指出缺失依赖。只有剩余证据仍能支持边界明确的部分答案时才能继续。

## 研究控制

1. 明确决策问题、目标市场、商品或类目、约束和所需证据。
2. 只询问会实质改变范围或结论的缺失输入。宽泛类目请求可以作为明确标注的初步扫描继续。
3. 只查询决策所需工具。复用 ID、清理明显污染，并在合适时对空查询放宽一次。
4. 证据足以支持请求的决策时停止；缺失能力使可靠结论无法形成时也应停止。
5. 交付建议、支持证据、解释、最小下一步测试和重要未知项。

点数以实际执行的工具为准，不同操作可能消耗不同点数。使用决策所需的最小调用计划，复用 ID 和已采集证据；新增调用大概率不会改变决策时停止。阅读 [principles.md](references/principles.md) 中的点数控制；不得写死价格，也不得把选择 Skill 本身描述成扣费。

优先提供有依据的候选名单和明确验证标准，而不是冗长的原始数据导出。

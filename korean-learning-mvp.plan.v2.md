# Korean Learning MVP Implementation Plan

## Goal

基于 Figma 设计稿，使用 `Vite + React + TypeScript` 从零搭建一个移动端优先的韩语学习 MVP，包含启动页、学习页、分类页 3 个页面，并完成“查看词条 -> 点击下一个 -> 查看下一词条”的核心链路。

## Scope

- 新建前端工程骨架并接入基础构建链路。
- 实现 3 个页面：
  - 启动页
  - 学习页
  - 分类页
- 使用前端静态数据承载词条内容与分类内容。
- 实现启动页到学习页、学习页到分类页的基础跳转。
- 实现学习页中的“下一个”按钮，按顺序切换词条。
- 为 K-Pop 词条提供 YouTube 官方播放器时间点跳转能力。
- 保持页面在移动端宽度下尽量贴合 Figma 视觉。

不在本计划范围内：

- 后端服务、数据库、鉴权、登录。
- 收藏、学习记录、个性化推荐。
- Spotify 接入、完整歌词库、完整字幕库、完整台词库。
- CMS 或运营后台。

## Architecture

- 技术栈：`Vite + React + TypeScript`
- 路由：`react-router-dom`
- 测试：`Vitest + Testing Library + jsdom`
- 样式：项目内原生 CSS，使用 CSS 变量统一颜色、圆角、阴影、间距，避免无约束内联样式散落。
- 数据层：`src/data/` 下的本地静态 `ts` 文件。
- 前端媒体集成：使用 YouTube IFrame Player API 在客户端嵌入官方播放器；不引入自建后端 API。
- 媒体策略：前端只保存来源元数据、视频 ID、时间戳、极短引用片段，不保存完整媒体或长文本。
- 组件组织：
  - `src/pages/` 放 3 个页面级组件
  - `src/components/` 放按钮、品牌头部、分类卡片、学习卡片等复用组件
  - `src/assets/` 放 Figma 导出的图片资源
  - `src/styles/` 放全局样式与 token

建议文件清单：

- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `vitest.config.ts` 或在 `vite.config.ts` 中内联测试配置
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/assets/`
- `src/data/lessonItems.ts`
- `src/data/categories.ts`
- `src/components/AppShell.tsx`
- `src/components/PrimaryButton.tsx`
- `src/components/SourcePreviewButton.tsx`
- `src/components/BrandMark.tsx`
- `src/components/LearningCard.tsx`
- `src/components/CategoryCard.tsx`
- `src/components/YouTubeEmbedModal.tsx`
- `src/pages/SplashPage.tsx`
- `src/pages/LearningPage.tsx`
- `src/pages/CategoriesPage.tsx`
- `src/lib/routes.ts`
- `src/test/setup.ts`
- `src/__tests__/LearningPage.test.tsx`

## Backend Changes

无。

## Frontend Design

### Information architecture

- `/`：启动页，展示品牌、引导文案和“开始学习”按钮。
- `/learn`：学习页，展示当前韩语词条、中文翻译、出处信息和“下一个”按钮。
- `/learn` 页面可选展示“查看出处”，打开 YouTube 嵌入播放器并跳转到指定时间点。
- `/categories`：分类页，展示 `K-Pop`、`K-Drama` 和趋势入口，作为内容入口页和视觉闭环页面。

### States and interactions

- 启动页
  - 初始展示品牌封面图、标题、文案、主按钮。
  - 点击“开始学习”跳转到学习页。
- 学习页
  - 初始展示第一条词条。
  - 点击“下一个”切换到下一条词条。
  - 词条切换达到数组末尾后，循环到第一条，避免死路。
  - 页面顶部品牌区和底部主按钮保持可见。
  - 若词条带有 `youtubeVideoId` 和 `startSeconds`，用户可点击“查看出处”打开嵌入播放器。
  - 若词条没有可嵌入视频，只展示来源信息与极短片段，不渲染播放器入口。
  - 卡片中的文本引用严格控制为极短片段，仅辅助理解，不承载完整上下文。
- 分类页
  - 展示与 Figma 一致的分类卡片。
  - 首版卡片可跳回学习页并按分类切换首条展示内容，或者先只做可点击视觉状态。
  - 推荐实现轻量分类联动：点击 `K-Pop` 或 `K-Drama` 时跳到学习页并加载该分类第一条内容。

### Responsive behavior

- 以 `390px` 左右宽度为主要设计基准。
- 桌面端保持移动端内容居中展示，不强行做大屏重排。
- 页面容器设置最大宽度，背景与卡片层次在大屏下仍保持视觉完整。

### Accessibility

- 所有主要按钮使用原生 `button`。
- 学习页词条切换后，确保文本内容可被屏幕阅读器读取。
- 图片装饰资源使用空 `alt`，品牌或承载信息的图片使用有效 `alt`。
- 颜色对比尽量贴近设计稿同时保证正文可读。

### Validation screenshot points

- 启动页：
  - 品牌图标与标题垂直居中关系
  - 主按钮尺寸、圆角、绿色饱和度
  - 背景图覆盖方式与底部淡出效果
- 学习页：
  - 大卡片留白、渐变、韩文和中文层级
  - 当前词条信息行布局
  - “查看出处”入口与播放器弹层层级
  - “下一个”按钮位置和宽度
- 分类页：
  - 标题与副标题排版
  - 两张主分类卡的颜色、圆角、内边距
  - 底部趋势卡片的弱对比视觉

## Data and API Changes

- 无后端 API。
- 前端集成：
  - YouTube IFrame Player API，用于嵌入官方播放器和控制时间点播放。
- 使用本地静态数据：
  - `lessonItems.ts`
    - `id`
    - `termKo`
    - `termZh`
    - `romanization`（可选）
    - `sourceType` (`kpop` | `kdrama`)
    - `sourceTitle`
    - `sourceContext`
    - `sourceLineShort`
    - `sourceEpisodeOrArtist`
    - `youtubeVideoId`（可选）
    - `startSeconds`（可选）
    - `endSeconds`（可选）
    - `sourceUrl`（可选，用于非嵌入跳转）
    - `isEmbeddable`（可选，标记该来源是否确认可嵌入）
  - `categories.ts`
    - 分类标题、副标题、说明文案、视觉主题色、默认跳转目标

## Task Breakdown

1. 初始化前端工程
   - 创建 `Vite + React + TypeScript` 项目基础文件
   - 安装最小依赖：`react-router-dom`
   - 安装测试依赖：`vitest`、`@testing-library/react`、`@testing-library/jest-dom`、`jsdom`
   - 配置基础脚本：`dev`、`build`、`preview`
   - 配置 `test` 脚本和测试环境初始化文件

2. 建立样式基础
   - 提取颜色、圆角、阴影、页面宽度等 CSS 变量
   - 创建全局 reset、字体、背景和页面壳层样式

3. 导入 Figma 资源
   - 下载并落地需要的背景图或图标资源
   - 为 3 个页面准备视觉素材映射

4. 准备示例内容与来源元数据
   - 创建本地词条数据
   - 为 K-Pop 词条补充 `youtubeVideoId + startSeconds`
   - 为每个 K-Pop 示例手工验证视频是否允许嵌入和时间点是否准确
   - 为韩剧词条补充来源标题和极短引用片段
   - 为没有可嵌入视频的词条标记回退展示策略

5. 搭建页面与路由
   - 实现 `SplashPage`
   - 实现 `LearningPage`
   - 实现 `CategoriesPage`
   - 用路由串起页面跳转

6. 实现学习交互与出处预览
   - 在学习页中实现当前索引状态
   - 完成“下一个”循环切换逻辑
   - 实现“查看出处”按钮和 YouTube 播放弹层
   - 确保无视频元数据的词条不会渲染错误的播放器入口
   - 如采用分类联动，支持按来源类型过滤与切换初始词条

7. 补测试与验收
   - 增加学习页关键交互测试
   - 跑构建与类型检查
   - 对照 Figma 截图做视觉校验
   - 手工验证嵌入视频的打开与时间点跳转行为

## Test Strategy

- 单元/组件测试
  - `LearningPage` 初次渲染显示第一条词条
  - 点击“下一个”后展示下一条词条
  - 到达最后一条后点击“下一个”会回到第一条
  - 带 `youtubeVideoId` 的词条会显示“查看出处”入口
  - 不带视频元数据的词条不会错误渲染播放器入口
  - 如实现分类联动，分类参数会影响首条数据

- 构建验证
  - `npm run test -- --run`
  - `npm run build`

- 交互验证
  - 手动检查 3 个页面的路由跳转
  - 手动检查移动端视口下的按钮可点击区域与文案可读性
  - 对照 Figma 截图核对关键布局点
  - 手动检查 K-Pop 词条的 YouTube 弹层能从接近目标时间点开始播放

## Rollback Plan

- 若页面实现偏离设计过大，先回退单个页面组件和对应样式文件，不回退整个工程骨架。
- 若分类联动复杂度超出预期，可回退为静态分类页，仅保留视觉展示和基础跳转。
- 若导入的视觉资源导致构建或体积问题，可先回退资源替换，保留布局和内容逻辑。
- 若 YouTube 嵌入在目标环境下不稳定，可回退为外链跳转到官方页面并带时间参数，不阻塞整体 MVP 上线。

## Risks and Mitigations

- 风险：空仓起步，工程骨架与页面实现耦合在同一批改动中。
  - 缓解：先提交工程骨架，再提交页面与数据逻辑，保持小步提交。

- 风险：Figma 只返回整屏截图，细节尺寸和间距需要人工还原。
  - 缓解：先实现结构和层级，再用截图逐项微调关键视觉点。

- 风险：MVP 同时保留 3 个页面，但真正核心交互只集中在学习页，容易造成分类页目标模糊。
  - 缓解：将分类页定义为内容入口页，并提供轻量跳转或分类切换行为。

- 风险：词条数据不足会让“下一个”交互显得单薄。
  - 缓解：首版至少准备覆盖 `K-Pop` 与 `K-Drama` 的多条示例数据，保证演示完整性。

- 风险：影视与歌词文本引用如果过长，会提高内容合规风险。
  - 缓解：只保存极短片段，并以官方播放器和时间戳为主承载方式。

- 风险：YouTube 嵌入播放在不同浏览器中的自动播放和跳转行为不完全一致。
  - 缓解：首版只保证用户主动点击后打开播放器并跳转到指定时间点，不依赖静默自动播放。

- 风险：公开视频后续可能被下架、禁嵌入或时间点失效。
  - 缓解：将“可嵌入验证”纳入内容准备任务，并为每条内容保留外链回退路径。

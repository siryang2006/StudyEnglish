# 开发文档 - KidsEnglish Fun

## 项目概述

KidsEnglish Fun 是一个专为儿童设计的互动英语学习网站，采用纯前端技术实现，可静态部署到GitHub Pages。

## 开发环境准备

### 必需工具
- 任意现代浏览器（Chrome/Firefox/Safari/Edge）
- 文本编辑器（VS Code推荐）
- Git

### 推荐VS Code插件
- Live Server: 本地预览
- Prettier: 代码格式化
- ESLint: JavaScript代码检查

## 项目架构

### 核心模块

#### 1. App模块 (app.js)
主应用逻辑，管理：
- 页面导航
- 全局状态
- 动画效果
- 用户交互

#### 2. Audio模块 (audio.js)
音频处理，提供：
- 语音合成（TTS）
- 音效播放
- 发音示范

#### 3. Storage模块 (storage.js)
数据持久化，处理：
- 学习进度
- 星星积分
- 徽章系统
- 连续学习天数

#### 4. Data模块 (data.js)
数据配置，包含：
- 音标数据（48个国际音标）
- 字母数据（26个字母）
- 单词分类数据
- 游戏题库

#### 5. Phonetics模块 (phonetics.js)
音标学习功能，实现：
- 音标展示
- 发音播放
- 互动游戏
- 进度追踪

### 样式架构

#### CSS文件组织
- `main.css`: 全局样式、布局、组件
- `animations.css`: 动画效果、过渡
- `games.css`: 游戏专用样式
- `phonetics.css`: 音标学习样式

#### CSS变量（主题）
```css
:root {
    --primary-color: #4A90E2;
    --secondary-color: #FF6B6B;
    --accent-color: #FFD93D;
    --success-color: #6BCB77;
    /* ... */
}
```

## 功能开发指南

### 添加新页面

1. 在 `pages/` 目录创建HTML文件
2. 引入必要的CSS和JS文件
3. 在 `index.html` 添加导航入口
4. 实现页面逻辑

示例：
```html
<!-- pages/example.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/animations.css">
</head>
<body>
    <!-- 页面内容 -->
    <script src="../js/app.js"></script>
</body>
</html>
```

### 添加新游戏

1. 在 `js/games.js` 添加游戏逻辑
2. 在 `css/games.css` 添加样式
3. 在 `pages/games.html` 添加游戏入口

游戏模板：
```javascript
class NewGame {
    constructor() {
        this.score = 0;
        this.init();
    }

    init() {
        // 初始化游戏
    }

    start() {
        // 开始游戏
    }

    checkAnswer(answer) {
        // 检查答案
    }
}
```

### 添加新音标

编辑 `js/data.js` 中的 `vowelPhonetics` 或 `consonantPhonetics`：

```javascript
{
    symbol: 'i:',
    name: '长元音',
    example: ['sheep', 'sea', 'see']
}
```

## 本地存储数据结构

```javascript
{
    stars: 100,                    // 星星数量
    completedLetters: ['A', 'B'],  // 已学字母
    completedPhonetics: ['i:'],    // 已学音标
    learnedWords: ['cat', 'dog'],  // 已学单词
    badges: ['first_letter'],      // 徽章
    gamesPlayed: {                 // 游戏记录
        'balloon': [{score: 80, date: '...'}]
    },
    dailyGoal: 50,                 // 每日目标
    lastVisit: '2026-04-30',      // 上次访问
    streak: 3                      // 连续天数
}
```

## 调试技巧

### 查看本地存储
```javascript
// 浏览器控制台
console.log(localStorage.getItem('kidsEnglishData'));
```

### 重置数据
```javascript
localStorage.removeItem('kidsEnglishData');
```

### 测试语音功能
```javascript
// 测试发音
audioManager.speak('Hello');
audioManager.speakPhonetic('i:');
```

## 部署流程

### 1. 本地测试
```bash
# 使用Python启动本地服务器
python -m http.server 8000

# 或使用Node.js
npx serve
```

访问 `http://localhost:8000`

### 2. 推送到GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/用户名/StudyEnglish.git
git push -u origin main
```

### 3. 启用GitHub Pages
1. 进入仓库 Settings
2. 找到 Pages 选项
3. Source 选择 `main` 分支
4. 保存，等待几分钟
5. 访问 `https://用户名.github.io/StudyEnglish/`

## 性能优化建议

1. **图片优化**: 使用WebP格式，压缩图片
2. **懒加载**: 图片和音频按需加载
3. **代码分割**: 按模块拆分JS文件
4. **缓存策略**: 使用Service Worker实现离线访问

## 常见问题

### 语音合成不工作？
- 确保使用HTTPS或localhost
- 检查浏览器是否支持SpeechSynthesis API
- 某些浏览器需要用户交互才能播放语音

### 动画卡顿？
- 减少同时运行的动画数量
- 使用 `transform` 和 `opacity` 代替 `top/left`
- 使用 `will-change` 优化

### 本地存储满了？
- localStorage 限制约5MB
- 定期清理旧数据
- 只存储必要信息

## 下一步开发计划

### 短期（1-2周）
- [ ] 完善字母学习页面
- [ ] 实现单词卡片功能
- [ ] 开发3个互动游戏

### 中期（1个月）
- [ ] 完成所有游戏
- [ ] 添加进度可视化
- [ ] 实现PWA支持

### 长期
- [ ] 多语言支持
- [ ] 家长控制面板
- [ ] 云端同步（需要后端）

## 贡献指南

欢迎贡献代码、报告问题、提出建议！

1. Fork项目
2. 创建功能分支
3. 提交代码
4. 发起Pull Request

## 联系方式

- 项目地址: https://github.com/你的用户名/StudyEnglish
- Issue追踪: https://github.com/你的用户名/StudyEnglish/issues

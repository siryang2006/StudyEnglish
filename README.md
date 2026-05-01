# KidsEnglish Fun - 儿童英语学习H5项目

一个专为儿童设计的互动英语学习网站，支持静态部署到GitHub Pages。

## 项目特色

- 🎯 **互动丰富**: 点击、拖拽、滑动、动画等多种互动方式
- 📱 **响应式设计**: 完美适配手机、平板、电脑
- 🎨 **童趣界面**: 色彩鲜艳、大按钮、友好动画
- 🔊 **语音功能**: 单词发音、跟读评分（Web Speech API）
- 🏆 **激励系统**: 积分、徽章、进度追踪
- 📖 **学习资源**: 单词书、字母书写练习
- 📱 **PWA支持**: 可安装、离线访问
- 📱 **移动优化**: 触摸友好、44px最小目标

## 功能模块

### 1. 字母乐园 (Alphabet World)
- 26个字母互动学习
- 字母书写练习（Canvas绘图）
- 字母发音跟读
- 字母卡片学习

### 2. 音标学习 (Phonetics)
- 48个国际音标分类展示
- 音标发音示范
- 口型动画演示
- 音标识别游戏
- 单词中音标定位

### 3. 单词卡片 (Word Cards)
- 7大分类词库（动物15/食物10/颜色10/家庭11/身体6/学校5）
- 点击翻转查看释义
- 收藏难点单词
- 滑动切换卡片

### 4. 单词书 (Word Book) 🆕
- 所有单词查询
- 按分类浏览
- 搜索功能
- 点击发音

### 5. 语法学习 (Grammar)
- Be动词口诀+练习
- 4种时态学习（一般现在/进行/过去/将来）

### 6. 互动游戏 (Games) - 8个游戏！
- 🎈 **气球单词** - 点击正确单词气球（炫酷爆炸效果）
- 🧩 **拼图单词** - 点击字母拼单词（难度分级）
- 👂 **听力选择** - 听发音选单词（难度分级）
- ✨ **单词消消乐** - 匹配单词和图片（难度分级）
- 📝 **句子组合** - 拖拽单词组成句子（难度分级）
- 🎤 **跟读练习** - 真实语音识别评分（Web Speech API）
- 📖 **单词书** - 查询所有单词
- ✏️ **字母书写** - Canvas练习写字母

### 7. 学习进度 (Progress)
- 每日学习目标
- 积分系统
- 徽章收集
- 学习统计图表

## 技术栈

- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **动画**: CSS3 Animations + Transitions
- **存储**: localStorage API
- **语音**: Web Speech API（合成+识别）
- **PWA**: Service Worker + Manifest
- **部署**: GitHub Pages (静态托管)

## 项目结构

```
StudyEnglish/
├── index.html              ✅ 首页（超级炫酷版）
├── manifest.json          ✅ PWA清单
├── sw.js                 ✅ Service Worker
├── generate-icons.html     🆕 图标生成器
├── README.md               ✅ 项目文档（本文件）
├── GUIDE.md               ✅ 使用指南
├── DEPLOYMENT.md          ✅ 部署指南
├── css/
│   ├── main.css           ✅ 主样式（渐变/霓虹/闪光）
│   ├── animations.css     ✅ 动画效果（20+种）
│   ├── games.css          ✅ 游戏样式（含难度选择器）
│   ├── phonetics.css      ✅ 音标学习样式
│   ├── celebration.css     ✅ 庆祝效果（烟花/星星雨）
│   ├── effects.css         ✅ 高级效果（3D/彩虹）
│   └── mobile.css          ✅ 移动端优化
├── js/
│   ├── app.js             ✅ 主应用逻辑
│   ├── audio.js           ✅ 音频处理（语音合成+识别）
│   ├── data.js            ✅ 词库和音标数据（已扩展）
│   ├── games.js           ✅ 游戏引擎（8个游戏）
│   ├── celebration.js      ✅ 庆祝效果管理
│   ├── imageLoader.js     ✅ 图片加载器
│   ├── phonetics.js        ✅ 音标学习模块
│   └── storage.js         ✅ 本地存储管理
├── pages/
│   ├── alphabet.html      ✅ 字母乐园
│   ├── phonetics.html     ✅ 音标学习
│   ├── words.html         ✅ 单词卡片
│   ├── grammar.html        ✅ 语法学习
│   ├── games.html         ✅ 互动游戏（8个游戏）
│   ├── wordbook.html      ✅ 单词书
│   ├── letter-tracing.html ✅ 字母书写
│   ├── sentences.html     ✅ 句子练习
│   └── progress.html      ✅ 学习进度
└── assets/
    └── images/          ⚠️ 需添加真实图片
        ├── letters/      （A.png, B.png ...）
        ├── animals/      （cat.png, dog.png ...）
        ├── food/         （apple.png, banana.png ...）
        ├── colors/       （red.png, blue.png ...）
        ├── family/       （father.png, mother.png ...）
        ├── body/         （head.png, eye.png ...）
        └── school/       （book.png, pen.png ...）
```

## 快速开始

### 本地运行
1. 克隆项目到本地
```bash
git clone https://github.com/siryang2006/StudyEnglish.git
cd StudyEnglish
```

2. 直接用浏览器打开 `index.html` 或使用本地服务器
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve
```

3. 访问 `http://localhost:8000`

### 部署到GitHub Pages
1. 项目已部署到：https://siryang2006.github.io/StudyEnglish/
2. 如需重新部署：
```bash
git add .
git commit -m "描述你的更新"
git push
```
GitHub Pages 会自动重新部署。

## 浏览器支持

- ✅ Chrome 60+ （推荐，语音识别最佳）
- ✅ Firefox 55+
- ✅ Safari 12+ （需设置启用SpeechSynthesis）
- ✅ Edge 79+
- ✅ 移动端浏览器（iOS Safari、Chrome Mobile）

注意：语音识别功能需要HTTPS环境或localhost。PWA安装需要HTTPS。

## 开发计划

- [x] 项目基础框架
- [x] 音标学习模块
- [x] 字母学习完整功能
- [x] 单词卡片完整功能
- [x] 所有互动游戏（8个）
- [x] 进度追踪系统
- [x] 更多动画效果
- [x] PWA支持（离线访问）
- [x] 真实语音识别（跟读练习）
- [x] 难度分级系统
- [x] 扩展学习内容（更多单词/句子）
- [ ] 优化移动端体验
- [ ] 添加真实图片资源
- [ ] 更多游戏（单词接龙、看图识词）

## 下一步建议

1. **生成PWA图标** - 打开 `generate-icons.html` 下载图标到 `assets/icons/`
2. **测试所有游戏** - 验证8个游戏功能正常
3. **添加真实图片** - 下载儿童友好的图片替换emoji
4. **测试PWA** - 在Chrome中安装应用到桌面
5. **优化体验** - 根据反馈继续改进

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎提Issue！

---

**祝学习愉快！** 📚✨

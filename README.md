# KidsEnglish Fun - 儿童英语学习H5项目

一个专为儿童设计的互动英语学习网站，支持静态部署到GitHub Pages。

## 项目特色

- 🎯 **互动丰富**: 点击、拖拽、滑动、动画等多种互动方式
- 📱 **响应式设计**: 完美适配手机、平板、电脑
- 🎨 **童趣界面**: 色彩鲜艳、大按钮、友好动画
- 🔊 **语音功能**: 单词发音、跟读评分
- 🏆 **激励系统**: 积分、徽章、进度追踪
- 📖 **音标学习**: 国际音标互动学习模块
- 💾 **本地存储**: 进度自动保存，无需后端

## 功能模块

### 1. 字母乐园 (Alphabet World)
- 26个字母互动学习
- 字母书写动画
- 字母发音跟读
- 字母找茬游戏

### 2. 音标学习 (Phonetics)
- 48个国际音标分类展示
- 音标发音示范
- 口型动画演示
- 音标识别游戏
- 单词中音标定位

### 3. 单词卡片 (Word Cards)
- 分类词库（动物、食物、颜色等）
- 点击翻转查看释义
- 收藏难点单词
- 滑动切换卡片

### 4. 互动游戏 (Games)
- 🎈 气球单词：点击正确单词气球
- 🧩 单词配对：拖拽图片和单词连线
- 📝 拼图单词：拼出正确单词
- 👂 听力选择：听发音选图片
- 🎤 跟读评分：录音对比发音
- ✨ 消消乐：匹配单词和图片

### 5. 学习进度 (Progress)
- 每日学习目标
- 积分系统
- 徽章收集
- 学习统计图表

## 技术栈

- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **动画**: CSS3 Animations + CSS Transitions
- **存储**: localStorage API
- **语音**: Web Speech API + Audio API
- **部署**: GitHub Pages (静态托管)

## 项目结构

```
StudyEnglish/
├── index.html              # 主入口页面
├── README.md               # 项目文档
├── css/
│   ├── main.css           # 主样式文件
│   ├── animations.css     # 动画效果
│   ├── games.css          # 游戏样式
│   └── phonetics.css      # 音标学习样式
├── js/
│   ├── app.js             # 主应用逻辑
│   ├── games.js           # 游戏引擎
│   ├── phonetics.js       # 音标学习模块
│   ├── data.js            # 词库和音标数据
│   ├── audio.js           # 音频处理
│   └── storage.js         # 本地存储管理
├── assets/
│   ├── images/            # 图片资源
│   │   ├── letters/      # 字母图片
│   │   ├── words/        # 单词图片
│   │   └── phonetics/    # 音标口型图
│   └── sounds/            # 音效文件
├── pages/
│   ├── alphabet.html      # 字母学习页
│   ├── phonetics.html     # 音标学习页
│   ├── words.html         # 单词卡片页
│   ├── games.html         # 游戏大厅
│   └── progress.html      # 进度追踪页
└── docs/
    └── DEVELOPMENT.md     # 开发文档
```

## 快速开始

### 本地运行
1. 克隆项目到本地
```bash
git clone https://github.com/你的用户名/StudyEnglish.git
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
1. 在GitHub创建仓库 `StudyEnglish`
2. 推送代码到 `main` 分支
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/StudyEnglish.git
git push -u origin main
```

3. 开启GitHub Pages
   - 进入仓库 Settings → Pages
   - Source 选择 `main` 分支
   - 访问 `https://你的用户名.github.io/StudyEnglish/`

## 音标学习功能详解

### 音标分类
- **元音 (20个)**: 单元音、双元音
- **辅音 (28个)**: 清辅音、浊辅音

### 学习模式
1. **浏览模式**: 查看所有音标，点击播放发音
2. **学习模式**: 逐个学习，观看口型动画
3. **测试模式**: 听音选音标、看音标选单词
4. **对比模式**: 相似音标对比练习

### 互动元素
- 点击音标卡片播放发音
- 拖拽音标到对应单词
- 滑动切换不同音标
- 完成练习获得音标徽章

## 浏览器支持

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 移动端浏览器

注意：语音识别功能需要HTTPS环境或localhost。

## 开发计划

- [x] 项目基础框架
- [x] 音标学习模块
- [ ] 字母学习完整功能
- [ ] 单词卡片完整功能
- [ ] 所有互动游戏
- [ ] 进度追踪系统
- [ ] 更多动画效果
- [ ] PWA支持（离线访问）

## 贡献指南

欢迎提交Issue和Pull Request！

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎提Issue。

---

**祝你的儿子学习英语愉快！** 🎓✨

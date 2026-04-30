# 图片资源说明

本目录存放项目使用的所有图片资源。

## 目录结构
```
assets/images/
├── letters/       # 字母相关图片（A.png, B.png等）
├── words/         # 单词通用图片
├── animals/       # 动物图片（cat.png, dog.png等）
├── food/          # 食物图片
├── colors/        # 颜色图片
└── icons/         # 图标资源
```

## 图片来源建议

### 免费图库
1. **Unsplash** - https://unsplash.com (免费商用)
2. **Pexels** - https://www.pexels.com (免费商用)
3. **Pixabay** - https://pixabay.com (免费商用)

### 儿童友好图库
1. **OpenClipart** - https://openclipart.org (矢量图)
2. **Flaticon** - https://www.flaticon.com (图标，需署名)
3. **Storyset** - https://storyset.com (场景插画)

## 临时解决方案

在项目初期，可以使用以下免费CDN服务：

### 字母图片（使用占位服务）
```
https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=A
https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=B
...
```

### 单词图片（使用Unsplash源）
```
https://source.unsplash.com/200x200/?cat
https://source.unsplash.com/200x200/?dog
...
```

## 推荐做法

1. **下载图片到本地**：从免费图库下载PNG格式（透明背景）
2. **压缩图片**：使用 https://tinypng.com 压缩
3. **统一命名**：使用小写字母+下划线，如 `red_apple.png`
4. **尺寸建议**：200x200px 或 300x300px

## 当前使用方式

在data.js中，可以配置图片路径：
```javascript
{ 
    word: 'cat', 
    chinese: '猫', 
    image: 'assets/images/animals/cat.png',  // 真实图片
    emoji: '🐱'  // 备用emoji
}
```

## 快速开始

由于无法自动下载，建议手动下载以下必须图片：
- alphabet/: A.png 到 Z.png (26张)
- animals/: cat.png, dog.png, elephant.png, lion.png, bird.png, fish.png
- food/: apple.png, banana.png, bread.png, milk.png, egg.png, rice.png
- colors/: red.png, blue.png, green.png, yellow.png, black.png, white.png

或使用emoji作为临时方案（已在项目中配置）。

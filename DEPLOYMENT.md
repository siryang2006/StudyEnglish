# GitHub Pages 部署指南

## 快速部署步骤

### 1. 创建GitHub仓库
1. 登录 https://github.com
2. 点击右上角 "+" → "New repository"
3. 仓库名称填写：`StudyEnglish`（或你喜欢的名称）
4. 选择 "Public"
5. 不要勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

### 2. 推送代码到GitHub
在本地项目目录打开终端（PowerShell 或 Git Bash）：

```bash
# 初始化git（如果还没初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: KidsEnglish Fun - 儿童英语学习H5项目"

# 添加远程仓库（替换 USERNAME 为你的GitHub用户名）
git remote add origin https://github.com/USERNAME/StudyEnglish.git

# 推送到main分支
git branch -M main
git push -u origin main
```

### 3. 启用GitHub Pages
1. 进入你的GitHub仓库页面
2. 点击顶部 "Settings" 标签
3. 左侧菜单找到 "Pages"（在 "Code and automation" 下）
4. 在 "Build and deployment" → "Branch" 选择：
   - Source: `Deploy from a branch`
   - Branch: `main` / `/root`
5. 点击 "Save"
6. 等待1-2分钟，页面会显示访问链接：
   ```
   Your site is live at https://USERNAME.github.io/StudyEnglish/
   ```

### 4. 访问网站
在浏览器访问：`https://你的用户名.github.io/StudyEnglish/`

## 更新网站
每次修改代码后，推送更新：
```bash
git add .
git commit -m "描述你的更新"
git push
```
GitHub Pages 会自动重新部署。

## 自定义域名（可选）
如果想使用自己的域名：
1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容填写你的域名，例如：`english.yourdomain.com`
3. 在你的域名DNS设置中添加 CNAME 记录指向 `你的用户名.github.io`

## 常见问题

### Q: 页面显示404
A: 检查仓库是否为Public，确认GitHub Pages已启用，等待2-3分钟。

### Q: 样式或图片加载失败
A: 确保使用相对路径（如 `css/main.css` 而不是 `/css/main.css`）

### Q: 如何查看部署日志
A: 在仓库 "Settings" → "Pages" 页面可以看到部署状态。

## 项目结构说明
```
StudyEnglish/
├── index.html          # 首页（必需）
├── css/              # 样式文件
├── js/               # JavaScript文件
├── pages/            # 子页面
├── assets/           # 图片、音频等资源
└── README.md         # 项目说明
```

## 提示
- GitHub Pages 只支持静态文件（HTML/CSS/JS）
- 不支持服务器端语言（PHP、Python等）
- 所有链接要使用相对路径
- 建议使用 Chrome DevTools 检查部署后的错误

祝部署成功！🎉

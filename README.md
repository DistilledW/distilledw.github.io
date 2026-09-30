# DistilledW 的个人主页

中英双语静态网站，用于展示个人介绍、教育履历、科研与实习经历。无需安装依赖或执行构建。

个人主页：**https://distilledw.github.io/** · [English](https://distilledw.github.io/?lang=en)

源码仓库：[DistilledW/distilledw.github.io](https://github.com/DistilledW/distilledw.github.io)。GitHub Pages 使用 `main` 分支根目录发布，并已开启 HTTPS；推送更新后会自动重新构建。

## 本地预览

可以直接双击 `index.html`。也可以在 `personal-homepage` 文件夹中打开终端，运行：

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

然后访问 http://127.0.0.1:4173 。在终端按 `Ctrl+C` 停止预览。

## 修改内容

个人资料统一保存在 `profile.js` 的 `window.PROFILE` 中；修改对应的中文和英文内容即可更新页面。缺失的外部链接会自动隐藏，补充真实链接后再展示。

`index.html` 是页面入口，`styles.css` 管理样式，`app.js` 管理交互，`assets/` 存放公开展示的资源。

切换到希望导出的语言后，使用网站的打印功能或浏览器 `Ctrl+P`，选择“另存为 PDF”，即可导出网站履历。无需将私人原始简历放入公开仓库。

## 内容依据

经历根据本地署名简历整理，网页未包含手机号。科研按钮链接到三篇论文的公开版本：[StreamGrid](https://arxiv.org/abs/2503.05197)、[Nebula](https://arxiv.org/abs/2512.20495)、[Deltoris](https://arxiv.org/abs/2608.04428)。Nebula 采用 ASPLOS 2026 正式标题，并提供项目和代码入口。

Deltoris 按公开 PDF 标为“第一作者（共同第一）”。Nebula 的本地简历写有“共一”，但公开版本未找到对应标注，因此网页暂不显示其作者身份标签；确认后可在 `profile.js` 的 `role` 中补充。

## 发布到 GitHub Pages

1. 使用 **DistilledW** 登录 GitHub，新建 **Public** 仓库，名称填写 **`distilledw.github.io`**。仓库名称不区分大小写，建议统一使用小写。
2. 将本文件夹中的网站文件上传到仓库根目录，让 `index.html` 直接位于仓库顶层。也可解压外层的 `personal-homepage.zip`，上传解压后的内容。**只上传网站文件，不要上传整个“秋招”工作区，也不要额外套一层 `personal-homepage` 文件夹。** `.preview/` 是本地检查文件，不应上传，发布压缩包已排除该目录。
3. 在仓库打开 **Settings → Pages**，将 **Source** 设为 **Deploy from a branch**，选择 **main** 分支和 **/ (root)**，然后保存。无需配置自定义 Actions 工作流。
4. 等待 GitHub 完成发布，再访问 **https://distilledw.github.io/**。首次发布或后续更新可能需要几分钟。

如果使用 Git 推送，新建仓库时不要勾选初始化 README、`.gitignore` 或许可证，然后在本文件夹内运行：

```powershell
git init
git branch -M main
git add .
git commit -m "Create bilingual personal homepage"
git remote add origin git@github.com:DistilledW/distilledw.github.io.git
git push -u origin main
```

此处使用本机 SSH 密钥推送；可以先执行 `ssh -T git@github.com` 验证身份。如果目录已经初始化并配置了 `origin`，无需重复初始化，直接提交更新并推送即可。SSH 负责仓库读写，仓库创建和 Pages 设置仍需要 GitHub 网页或已登录的 GitHub CLI。

推送成功后，继续完成上面的 Pages 设置。以后修改网站文件，提交并推送到 `main` 即可更新网站。

官方步骤：[GitHub Pages 快速入门](https://docs.github.com/en/pages/quickstart)。

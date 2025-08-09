# Fei Lin - 美妝作品集網站

這是一個簡化的純 HTML/CSS/JavaScript 網站，無需任何構建工具或依賴項。

## 檔案結構

```
feimakeup/
├── index.html              # 主頁面
├── assets/
│   ├── css/
│   │   ├── main.css        # 主要樣式檔（從 SASS 編譯而來）
│   │   ├── fontawesome-all.min.css
│   │   ├── accessibility.css
│   │   └── noscript.css
│   ├── js/
│   │   ├── main.js         # 主要 JavaScript 檔
│   │   ├── jquery.min.js
│   │   ├── jquery.poptrox.min.js
│   │   └── 其他 JS 檔案...
│   └── webfonts/           # 字體檔案
├── images/                 # 圖片資源
└── other/                  # 其他資源（favicon, logo 等）
```

## 如何使用

1. **本地開發**：直接用瀏覽器開啟 `index.html` 即可
2. **部署**：將整個資料夾上傳到任何靜態網站託管服務

## 功能特色

- ✅ 響應式設計
- ✅ Lightbox 圖片展示
- ✅ 無障礙支援
- ✅ SEO 優化
- ✅ 無需構建工具
- ✅ 簡單維護

## 技術架構

- **HTML5**: 語義化標記，SEO 友好
- **CSS3**: 現代 CSS 特性，無需預處理器
- **JavaScript**: 純 JS + jQuery，無需打包工具
- **圖片**: 已優化的 WebP/AVIF 格式

## 修改指南

- **樣式修改**: 直接編輯 `assets/css/main.css`
- **功能修改**: 直接編輯 `assets/js/main.js`
- **內容修改**: 直接編輯 `index.html`
- **圖片更新**: 替換 `images/` 資料夾中的檔案

## 瀏覽器支援

支援所有現代瀏覽器：
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

---

**簡化完成！** 🎉 這個網站現在更容易維護和部署了。

Single-page responsive portfolio & contact site built from the HTML5 UP "Big Picture" template, refactored for performance, accessibility, and maintainability.

## Key Features
## Key Features
- Fast initial load (deferred JS, image lazy loading, font + hero preloads)
- Mobile-first responsive layout with persistent top navigation
- Lightbox gallery powered by Poptrox
- Scroll-triggered reveal animations via Scrollex (About section stays visible after first reveal)
- Accessible semantic HTML (landmarks, descriptive alt text, placeholder labels)
- Contact form integrated with Formspree

## Tech Stack
- HTML5, CSS3 + Sass (`assets/sass` sources compiled to `assets/css/main.css` & `main.min.css`)
- jQuery + lightweight plugins (Poptrox, Scrollex, Breakpoints, Browser utils)
- Font Awesome (self-hosted webfonts subset)

## Performance / Optimization Notes
- Removed unused smooth scrolling plugin (`jquery.scrolly`) for immediate anchor navigation
- Images use `loading="lazy"` & `decoding="async"`; hero images preloaded for LCP
- Critical fonts & hero images preloaded; Google Fonts uses `display=swap`
- Minified production stylesheet `main.min.css` generated via Sass

## Structure Overview
```
index.html
assets/css/            # main.css (expanded), main.min.css (compressed build output)
assets/sass/           # Modular Sass source
assets/js/             # Core JS + plugins
images/                # Portfolio images (full + thumbs)
other/                 # Logo, favicon, about image
package.json           # Sass build scripts
```

## Build (Sass)
Install dependencies (first time):
```powershell
npm install
```
Develop with watch:
```powershell
npm run sass:watch
```
One-off dev build (expanded) + production minified CSS:
```powershell
npm run build
```
Outputs:
- `assets/css/main.css` (readable)
- `assets/css/main.min.css` (compressed, referenced by `index.html`)

## Local Development
You can open `index.html` directly, or run a static server:
```powershell
python -m http.server 8000
# or
npx serve .
```
Visit: http://localhost:8000

## Updating Gallery
Add full-size images to `images/fulls/` and matching thumbnails to `images/thumbs/` with identical filenames. Then append new `<a class="gallery-img ...">` items in the gallery markup.

## Accessibility Checklist
- Descriptive alt text
- Sufficient color contrast (verify after palette changes)
- Keyboard navigable gallery & form
- Focus styles retained via browser defaults

## Deployment
Upload all files (including `assets/css/main.min.css`). No server build step required if you commit compiled CSS.

## Maintenance Notes
- Images are already optimized with WebP/AVIF variants for modern browsers
- Font Awesome glyphs could be further subset to reduce bundle size
- Consider adding CI for HTML/CSS validation + Lighthouse performance budget

## Changelog (highlights)
- fix(mobile): remove global touch blockers; improve iOS viewport height handling
- feat(layout): stack About image above text on small screens (Safari friendly)
- chore(html): move inline CSS/JS into `assets/css/overrides.css` and `assets/js/mobile-fixes.js`
- fix(portfolio): normalize thumbnail sizing and remove overlay dimming
- style(about): match About heading font with service-item titles (Caveat)
- fix(edge): render social icons with <i> elements for reliable display

## License
Template: Creative Commons Attribution 3.0 (HTML5 UP). Custom modifications © 2025 Fei Lin.

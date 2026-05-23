# Developer Preparation Checklist (獨立開發者準備清單)

這是一份為 Solo Developer 準備的全方位檢核表，幫助你在正式 Coding 前理清依賴關係與架構。

## 1. 開發前置準備 (Pre-Coding Requirements)
- [ ] 取得 Boss/CEO 對產品方向與文案的初步 Confirm。
- [ ] 確認對應的診所王牌療程清單 (Treatments List) 供 Result Page 串接。
- [ ] 準備好開發環境與 Repo。
- [ ] 與美術確認好 Asset 的交付時間表。

## 2. 獨立開發進度拆分
### 可以先做 (無須等待最終美術資源)
- [ ] 搭建專案基礎架構與路由 (Next.js / Vite)。
- [ ] 建立 `questions.json` 與 `aura_profiles.json` 資料檔。
- [ ] 實作 Quiz Engine 核心邏輯（點擊、計分、結果計算）。
- [ ] 使用純 CSS 或 Placeholder 圖片搭建 Result Page 排版。
- [ ] 實作狀態管理 (State Management, 如 Zustand / React Context)。

### 必須等待美術資源才能完成
- [ ] 替換最終版 Aura 背景與動態效果。
- [ ] 調整最終版式的安全邊距與文字顏色對比度。
- [ ] IG Share Card 自動合成功能 (`html2canvas` 需根據最終圖檔微調)。

## 3. 建議技術棧 (Suggested Tech Stack)
*   **Framework:** Next.js (App Router) 或 Vite + React。若不需要複雜 SEO，Vite SPA 足矣；若希望每種 Aura 結果有獨立的分享連結以利行銷，建議 Next.js。
*   **Styling:** TailwindCSS 搭配原生 CSS Variables (用於柔和的漸層與發光特效)。
*   **Animation:** Framer Motion (非常適合處理平滑的過場與題目切換)。
*   **Image Generation:** `html2canvas` 或 Vercel `satori` (用於生成可分享的 IG Story 卡片)。
*   **State Management:** Zustand (輕量，適合管理答題進度與分數)。

## 4. 建議專案目錄結構 (Folder Structure)
```text
src/
├── app/                  # 或 pages/ (若用 Next.js)
│   ├── page.tsx          # Landing Page
│   ├── quiz/page.tsx     # 答題引擎
│   └── result/page.tsx   # 結果頁
├── components/
│   ├── layout/           # 容器、全域背景
│   ├── quiz/             # QuestionCard, ProgressBar, OptionButton
│   ├── result/           # AuraVisual, RadarChart, RitualCard
│   └── shared/           # Button, ShareModal
├── data/
│   ├── questions.json    # 15 題資料
│   └── aura_profiles.json# 8 種 Aura 定義
├── lib/
│   ├── quizLogic.ts      # 計分演算法與結果映射
│   └── utils.ts          # Tailwind merge 等工具
└── styles/
    └── globals.css       # 全域樣式與 CSS 動畫變數
```

## 5. 建議核心組件清單 (Component List)
- `AnimatedBackground` (全域負責渲染 Aura 流動感背景)
- `QuestionStep` (處理單題展示與點擊邏輯)
- `ProgressBar` (頂部細緻進度條)
- `LoadingOverlay` (答題完畢後的分析過場)
- `ResultHero` (結果頁頭部，包含大圖與分數)
- `TreatmentCard` (推薦療程的優雅卡片)
- `ShareCanvas` (隱藏的畫布，用於截圖生成分享圖)

## 6. 各項查核清單 (Checklists)

### 測試清單 (Testing Checklist)
- [ ] 15題全選 A 能否正確產出 Overworked Glow？
- [ ] 刻意製造同分，Tie-breaker 邏輯是否正常運作？
- [ ] 在中途刷新頁面，狀態是否重置或保留（視需求而定）？

### 內容清單 (Content Checklist)
- [ ] 8 種 Aura 的文案與字數長度是否適中，不會破壞版面？
- [ ] 療程推薦的連結或按鈕是否能正確導向？

### 響應式與體驗清單 (Responsive & UX Checklist)
- [ ] iPhone SE (小螢幕) 下，選項是否會被截斷？需要滾動嗎？
- [ ] 手機版 Safari 底部的導航列是否會遮擋按鈕 (注意 `100dvh` 問題)？
- [ ] 點擊按鈕時，是否有避免手機預設的 Double-tap zoom 放大問題 (`touch-action: manipulation`)？

### 效能清單 (Performance Checklist)
- [ ] 8 種大解析度 Aura 圖片是否已壓縮 (WebP 格式) 且預先載入 (Preload)？
- [ ] Lottie 動畫或影片是否會造成手機發燙？
- [ ] 切換題目時是否會有閃爍或佈局偏移 (CLS)？

### 部署清單 (Deployment Checklist)
- [ ] Vercel / Netlify 部署設定完成。
- [ ] 環境變數 (如 API endpoint) 設定正確。
- [ ] Open Graph (OG Tags) 設定，讓貼連結時有好看的預覽圖。

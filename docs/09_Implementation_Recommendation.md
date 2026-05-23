# Implementation Recommendation (專案執行建議書)

作為兼具產品思維與技術領導的角度，針對 "Skin Aura Test" 專案，為身為 Solo Developer 的你提供以下執行戰略與避坑指南。

---

## 1. 最優先確認事項 (What to Confirm First)
**「不要先寫 Code，先確定 Data Collection 的閘門 (Gate)。」**
你必須先問老闆：用戶看完測驗後，是否需要「強制留資料才能看結果」？
*   **影響：** 這直接影響你的系統架構。如果要留資料，你需要串接後端 (資料庫、API、或至少一個 Webhook 接到 Google Sheet)。如果不需要，你可以把它做成一個純前端的無伺服器 (Serverless/Static) Web App，開發時間將減少 50%。

## 2. 原型製作優先順序 (What to Prototype First)
**「先做邏輯骨架，再套視覺皮囊。」**
1.  **純文字問卷引擎：** 花 2 小時把 JSON 資料建好，用最醜的 HTML 按鈕把 15 題點完，並在 console 印出計算結果。確保你的計分邏輯和 Tie-breaker (同分處理) 完美運作。
2.  **生成圖片機制：** 在套用漂亮的 CSS 之前，先測試 `html2canvas` 截取 DOM 節點生成圖片在手機上的相容性。這是最容易翻車的技術點。

## 3. 切忌過度開發 (What NOT to Overbuild)
*   **不要寫自定義的超複雜動畫：** 不要嘗試用原生 WebGL 或 Three.js 去手刻 Aura 流動效果（除非你是大神）。請美術提供高品質的循環影片 (mp4) 或 Lottie，然後用 CSS Blend-mode 疊上去。
*   **不要建置龐大的會員系統：** Phase 1 不要搞什麼註冊登入、查看歷史紀錄。做一個一期一會的問卷，用 LocalStorage 暫存狀態即可。
*   **不要把 CMS 搞得太複雜：** 如果題目不常變，寫死在 JSON 裡就好。不要為老闆寫一個後台去修改題目，這對 Solo Dev 來說性價比極低。

## 4. 最大風險評估 (Biggest Risks)
1.  **行動端體驗災難：** 90% 的用戶用手機，包含 IG 內建瀏覽器 (In-App Browser)。IG Browser 對於 `100vh`、下載圖片、開啟新視窗有許多奇葩限制。
    *   *對策：* 盡早部署到 Vercel，用實機在 IG 裡開起來測試。
2.  **效能與載入速度：** 高級感的代價是大量的圖片與動效。如果進入頁面白畫面超過 3 秒，用戶就跑了。
    *   *對策：* 圖片必須強力壓縮 (WebP)，首屏不需要的圖片做 Lazy Loading，或在答題期間默默 Preload 結果頁的圖片。
3.  **分享卡截圖失敗：** iOS Safari 對於複雜 CSS（如 filter: blur, mix-blend-mode）在轉換成 canvas 時容易變成黑塊或破圖。
    *   *對策：* 分享卡應盡量用簡單疊圖，把毛玻璃效果直接壓在背景圖檔裡，而不要用 CSS `backdrop-filter`。

## 5. 最佳 MVP 策略 (Best MVP Approach)
**"Vogue on the outside, Excel on the inside." (外表像雜誌，內核像表格)**
*   **前端框架：** 選擇 Next.js (App Router) 搭配 TailwindCSS。
*   **部署：** Vercel (免費、快速、CI/CD 完善)。
*   **資料收集 (如果需要)：** 直接用 Formspree、Typeform API 或簡單的 Next.js Server Action 把資料送到 Slack / Email / Google Sheet，先不用建真實 Database。

## 6. 如何與設計師高效協作
*   **劃清界線：** 明確告訴設計師「這部分交給你畫，這部分我用程式寫」。例如：背景 Aura 交給設計師出圖，但「文字、按鈕、進度條」你用 CSS 寫。千萬不要讓設計師出一整張包著文字的圖。
*   **安全區 (Safe Area)：** 交接素材時，給設計師一張手機截圖，標註哪裡是你的按鈕區，請他的主要圖形避開。

## 7. 接下來的 7 個實戰步驟 (Next 7 Steps)
1.  **把 01 和 08 文件寄給老闆**，預約 30 分鐘確認會議。
2.  **把 05 文件發給設計師**，定好交圖期限 (Deadline)。
3.  **建立 GitHub Repo**，用 `npx create-next-app@latest` 起手。
4.  **把 03 和 04 文件轉成 `data.json`**，丟進專案裡。
5.  **寫出無樣式的問卷流程 (Phase 1 Backlog)**，測試計分演算法。
6.  **整合假美術資源**，調整 Tailwind 版面，測試響應式。
7.  **美術圖檔到位後，替換資源**，並進行手機實機測試 (重點測試 IG In-App Browser)。

祝好運，這將會是一個非常高質感的專案！

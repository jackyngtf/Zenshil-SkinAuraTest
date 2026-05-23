# MVP Backlog (最簡可行產品開發待辦清單)

以下將專案拆解為 5 個階段的敏捷開發 Backlog，幫助 Solo Developer 掌握節奏並逐步推進。

---

## Phase 1: Boss Confirmation Prototype (老闆確認用原型)
*目標：不需要設計師介入，快速用白板或純文字做出可運作的原型，讓管理層理解玩法與邏輯。*

*   **Task 1.1: 建立靜態專案架構**
    *   **Description:** 初始化 Next.js / Vite 專案，設定 TailwindCSS。
    *   **Priority:** High
    *   **Dependencies:** None
    *   **Acceptance Criteria:** 能在 Local 跑起 `npm run dev` 且無報錯。
*   **Task 1.2: 建立核心資料模型**
    *   **Description:** 撰寫 `questions.json` 和 `aura_profiles.json`。
    *   **Priority:** High
    *   **Dependencies:** Task 1.1
    *   **Acceptance Criteria:** 所有 15 題和 8 個結果檔準備就緒並匯入到 App 中。
*   **Task 1.3: 開發無樣式計分引擎**
    *   **Description:** 開發純文字版的問卷流程，能點擊選項並跳到下一題。
    *   **Priority:** High
    *   **Dependencies:** Task 1.2
    *   **Acceptance Criteria:** 答滿 15 題後，能 `console.log` 出正確的主副 Aura 結果與分數。

---

## Phase 2: Functional Quiz MVP (功能性問卷 MVP)
*目標：將基本 UI 放上去，開始有測驗的雛形。*

*   **Task 2.1: 開發基礎 UI 元件**
    *   **Description:** 實作 Question 卡片、ProgressBar、基礎按鈕 (無動畫)。
    *   **Priority:** High
    *   **Dependencies:** Task 1.3
    *   **Acceptance Criteria:** 畫面在手機與桌機上不會跑版，版面乾淨。
*   **Task 2.2: 開發結果頁架構 (Wireframe Level)**
    *   **Description:** 按照內容系統刻出 Result Page 排版，包含分數、描述、療程區塊。
    *   **Priority:** High
    *   **Dependencies:** Task 2.1
    *   **Acceptance Criteria:** 根據算出的結果，正確渲染出對應的文案與預留的圖片區塊。

---

## Phase 3: Visual Polish & Animation (視覺打磨與動畫)
*目標：匯入美術資源，加入 Framer Motion，使體驗達到「Vogue 雜誌」般的高級感。*

*   **Task 3.1: 整合美術靜態資產**
    *   **Description:** 將設計師交付的 Background、Aura Artworks 匯入替換 Placeholder。
    *   **Priority:** Medium (需等美術交付)
    *   **Dependencies:** Artist Assets
    *   **Acceptance Criteria:** 圖片無損且檔案大小最佳化 (WebP)，載入不卡頓。
*   **Task 3.2: 實作平滑過場動畫**
    *   **Description:** 使用 Framer Motion 實作題目的 Fade-in/out，以及結果頁的向下滾動 Reveal。
    *   **Priority:** Medium
    *   **Dependencies:** Task 2.1
    *   **Acceptance Criteria:** 動畫絲滑，不造成手機排版抖動。
*   **Task 3.3: 開發 Loading Analyzing 過場**
    *   **Description:** 實作答完 15 題後，模擬計算的 3-4 秒過場畫面。
    *   **Priority:** Low
    *   **Dependencies:** Task 3.2
    *   **Acceptance Criteria:** 字幕動態切換且倒數結束後精準進入結果頁。

---

## Phase 4: Share Card & Clinic Usage (分享機制與診所落地)
*目標：讓它具有擴散能力，並準備給真實用戶使用。*

*   **Task 4.1: 實作 IG Story 分享卡生成**
    *   **Description:** 使用 `html2canvas` 抓取特定區塊，生成一張 9:16 的圖片供使用者長按儲存。
    *   **Priority:** High
    *   **Dependencies:** Task 3.1
    *   **Acceptance Criteria:** 在 Safari 與 Chrome iOS 上皆能成功生成圖片，排版不跑位。
*   **Task 4.2: 實作 Call-To-Action 與預約引導**
    *   **Description:** 在結果頁最下方加入連結，引導至 WhatsApp 預約或留下資料。
    *   **Priority:** High
    *   **Dependencies:** Task 2.2
    *   **Acceptance Criteria:** 點擊可正確跳轉帶有 UTM 參數或預設文字的 WhatsApp 連結。

---

## Phase 5: Future Features (未來擴展)
*   **Task 5.1: 埋設數據分析與追蹤 (Analytics)**
    *   **Description:** 加入 Google Analytics / Facebook Pixel，追蹤各題目的跳出率與結果分佈。
*   **Task 5.2: Skin Aura Passport (登入系統)**
    *   **Description:** 允許使用者註冊/登入，保留歷史 Aura 紀錄，解鎖長期回頭客玩法。
*   **Task 5.3: 診所內部 iPad 模式**
    *   **Description:** 增加一個重新開始的快速捷徑，並在結尾自動清理資料，專供診所候診區使用。

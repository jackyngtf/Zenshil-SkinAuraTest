# UI/UX Flow & Board Spec (UI/UX 流程與視覺規格)

## 1. 視覺風格與調性 (Visual Style & Tone)
*   **關鍵詞：** Premium (高級)、Soft (柔和)、Elegant (優雅)、Editorial (雜誌感)、Aura (氣場/光暈)、Calm (平靜)。
*   **顏色方向：** 避免高飽和度、刺眼的顏色。大量使用柔和的漸變色 (Soft Gradients)、珍珠色澤、毛玻璃效果 (Glassmorphism)。背景應有緩慢流動的光暈或粒子動畫。
*   **排版 (Typography)：** 現代優雅的無襯線字體 (Modern Sans-serif，如 Inter, Helvetica 變體) 搭配具備設計感的有襯線標題 (Serif，如 Playfair Display)，營造 Vogue 雜誌般的排版質感。
*   **整體感受：** 不像一個廉價的心理測驗，而像是進入了一家頂級的 SPA 或高端皮膚管理中心的線上等候室。

## 2. 完整用戶旅程 (User Journey Flow)

### Screen 1: Landing Page (首頁)
*   **UI 佈局：** 全螢幕背景，緩慢流動的主題 Aura 漸變。中央是簡潔的標題 `SKIN AURA TEST` 與副標題 `Discover your skin's true energy.`
*   **互動：** 頁面載入時有輕柔的 Fade-in。主按鈕 (Start) 帶有微妙的發光或懸停擴大效果。
*   **情緒：** 期待、平靜、高端。

### Screen 2: Quiz Engine (答題介面 - 15題)
*   **UI 佈局：** 
    *   頂部：細緻的進度條 (Minimalist Progress Bar) 或頁碼 (e.g., 01 / 15)。
    *   中央：問題文字，字體偏大，居中或左對齊。
    *   下方：4 個選項 (A/B/C/D)，以卡片或簡潔的文字清單呈現。
*   **動畫/過場：** 點擊選項後，無需點擊「下一題」，當前問題流暢淡出 (Fade out / slide up)，下一題淡入。背景的 Aura 顏色可以隨著題目的情緒做非常細微的轉變。
*   **情緒：** 專注、探索自我、流暢不卡頓。

### Screen 3: Loading / Analyzing (分析過場)
*   **UI 佈局：** 屏幕中央顯示動態的 Aura 光球，或者逐漸清晰的圖案。文字顯示：「正在分析你的肌膚能量...」 -> 「讀取生活節奏...」 -> 「生成專屬 Aura...」 (文字隨時間替換)。
*   **動畫：** 必須有足夠的時間 (約 3-4 秒) 讓用戶感覺系統正在「認真計算」，增加結果的權威感。
*   **情緒：** 期待感達到最高。

### Screen 4: Main Result Dashboard (主結果頁)
*   **UI 佈局 (Scrollable Page)：**
    1.  **Hero Section:** 全螢幕專屬 Aura Artwork，上方疊加用戶的結果名稱 (e.g., OVERWORKED GLOW) 及一句點題的 Quote。
    2.  **Stats Section:** 類似遊戲能力值的「雷達圖」或「極簡進度條」，顯示 Energy, Glow, Stress, Recovery 指數。
    3.  **Personality & Skin:** 一小段文字描述性格特徵，下方列出「Your skin currently needs...」(關鍵字標籤)。
    4.  **Secondary Aura:** 揭示副人格 (如 Recovery Face - 62%)，增加測驗的立體感與準確度。
    5.  **Recommended Ritual:** 推薦的護膚理念與對應的診所療程，設計成一張優雅的 Ticket 或 Card。
*   **情緒：** 被理解、「好準」、被治癒的感覺。

### Screen 5: Share Card Modal (分享卡片)
*   **UI 佈局：** 點擊「Share to IG」後彈出。展示一張完美比例 (9:16) 的卡片，包含 Aura 視覺、結果名稱、關鍵數據以及 @診所IG 的標籤。
*   **互動：** 提供「Save Image」按鈕，長按保存或自動生成截圖供用戶分享。

## 3. 跨裝置響應式設計 (Responsive Notes)
*   **Mobile-First：** 90% 以上的用戶將通過 IG 廣告或限時動態連結進入，因此介面必須以手機 (iPhone/Android) 為絕對優先。按鈕區域要夠大，適合單手拇指操作。禁止出現需要 Zoom in 的佈局。
*   **Desktop / 4K：** 在大螢幕上，背景的流動光暈要展現出極致的解析度。問題與選項可以置中，左右留白，保持雜誌般的版面呼吸感。

## 4. 微交互與動畫 (Micro-interactions)
*   **Hover/Tap States：** 選項被點擊時，要有溫柔的反饋（如背景色微微加深或邊框亮起），而不是生硬的變色。
*   **Scroll Reveal：** 在結果頁往下滾動時，Stats 和文字區塊應該有流暢的 Fade-up 動畫，不要一次全部生硬地出現。

# Artist & Designer Asset Brief (設計師與美術資產需求表)

這份文件旨在指導視覺設計師如何為 "Skin Aura Test" 創建出符合「高端、療癒、Vogue 雜誌感」的視覺資產。

## 1. 整體藝術指導 (Art Direction & Moodboard Interpretation)
*   **核心調性：** Premium Beauty Clinic (頂級美容診所)、Wellness (身心靈健康)、Editorial (雜誌大片感)。
*   **拒絕：** 拒絕卡通感、廉價的漸層色塊、過度寫實的醫療圖片、複雜的 UI 裝飾。這**不是**一個醫學診斷表。
*   **視覺語言：** 
    *   **Aura (氣場光暈)：** 這是整個測驗的核心。Aura 應該呈現出「氣體流動、液態光澤、毛玻璃透視、珍珠反光、柔和霧化邊緣」的感覺，而非死板的實心圓球。
    *   **Typography (字體排列)：** 留白是關鍵。字體需要有呼吸感。

## 2. 必須交付的資產清單與規格 (Asset Delivery List)

### 2.1 介面背景 (UI Backgrounds)
1.  **Landing Hero Background (首頁背景)**
    *   內容：柔和、吸引人的混合 Aura 動態感（可以是靜態圖或短影片/Lottie）。
    *   尺寸：Mobile (1080x1920px), Desktop (1920x1080px)。
2.  **Quiz UI Background (答題頁背景)**
    *   內容：極度柔和、干擾極低的背景。可以是純色帶有非常輕微的顆粒感 (Noise texture) 或極淡的邊緣漸層。
    *   尺寸：Mobile (1080x1920px), Desktop (1920x1080px)。

### 2.2 核心結果圖樣 (8 Aura Artworks)
為 8 種 Skin Aura 設計專屬的視覺圖形。這些圖形必須是抽象的能量流動，而不是具體的人物或物品。
*   **交付格式：** 透明背景 PNG (高品質) 或是 Lottie 動畫，若為 PNG，邊緣需完美融合不可有硬邊。
*   **尺寸：** 建議至少 1200x1200px (以適應 Retina 螢幕)。
*   **8 種 Aura 對應視覺：**
    1.  **Overworked Glow:** 冷藍色與紫色的流動雲層。
    2.  **Stress Skin:** 橙色與紅紫色交織的爆裂能量感，邊緣有輕微電流或火花感。
    3.  **Hidden Aging:** 灰粉色與米白色的溫柔霧氣。
    4.  **Recovery Face:** 水藍色與淺綠色的水波紋或河流感。
    5.  **Preventive Beauty:** 奶白色與淡綠色的圓潤光暈，象徵平衡。
    6.  **Glow Seeker:** 珍珠粉色，帶有極高亮點的反光質感 (Iridescent/Holographic)。
    7.  **Burnout Beauty:** 深紫色與橙色的日落燃燒感，能量即將耗盡的張力。
    8.  **Late Night Face:** 午夜藍與點點星光的靜謐深邃感。

### 2.3 小圖示與徽章 (Icons & Thumbnails)
1.  **8 Aura Thumbnails (縮圖)**
    *   內容：將上述 8 款大圖縮小至適合放在結果頁「副人格」旁邊的小圓形或徽章。
    *   尺寸：400x400px, PNG。
2.  **Skin Needs Icons (肌膚需求圖示) - [可選]**
    *   內容：設計 4-6 個極簡線條圖示 (如：水滴代表補水、星星代表透亮、盾牌代表修復等)，用於結果頁搭配文字使用。
    *   尺寸：200x200px, SVG。

### 2.4 社交分享資產 (Social Share Cards)
1.  **IG Story Share Card Backgrounds (限動分享卡背景) x 8 款**
    *   內容：專為 IG Story 設計的底圖。上方需預留安全區 (Safe Area，避開 IG 頂部與底部 UI)，中央供程式疊加測驗結果與文字。帶有該 Aura 的專屬色調背景。
    *   尺寸：1080x1920px, JPG。
2.  **Square Social Post / Ad Background (方形廣告底圖) x 1 款**
    *   內容：供行銷團隊打廣告用的標準比例背景圖。
    *   尺寸：1080x1080px, JPG。

### 2.5 裝飾元素與品牌 (Decorative & Brand)
1.  **Grain/Noise Overlay (顆粒材質疊加層)**
    *   內容：一張半透明的雜訊圖，供工程師疊加在整個網頁上方，增加底片與真實雜誌感。
    *   尺寸：可無縫拼接的 1000x1000px 半透明 PNG，或用 CSS 實現。
2.  **Brand Logo Lockup (標誌組合)**
    *   內容：診所 Logo 的白色與深色高解析度版本。

## 3. 檔案命名規範 (Naming Convention)
請嚴格使用小寫英文與底線命名，以利工程師直接匯入程式碼：
*   `aura_overworked_main.png`
*   `aura_overworked_bg_story.jpg`
*   `aura_stress_main.png`
*   `icon_hydration.svg`
*   `bg_landing_mobile.jpg`

## 4. Do's & Don'ts (設計避雷針)
*   **DO:** 使用 Noise (顆粒感)、Blur (模糊)、Gradient Mesh (漸變網格)。
*   **DO:** 確保文字區域的背景有足夠的對比度，讓白字或黑字容易閱讀。
*   **DON'T:** 不要使用清晰的人臉照片作為測驗背景。
*   **DON'T:** 不要使用粗框線或漫畫感的 UI 元素。
*   **DON'T:** 不要讓 8 種 Aura 的圖案形狀完全一樣只是換顏色，每一種的情緒與流動方向應該有所不同。

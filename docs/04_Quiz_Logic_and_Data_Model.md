# Quiz Logic and Data Model (測驗邏輯與資料模型)

這份文件為開發者提供了精確的 JSON 結構建議，以及將 15 題問卷轉換為 8 種 Skin Aura 結果的計分演算法。

## 1. 測驗計分系統核心演算法

測驗共有 15 題，每題有 A, B, C, D 四個選項。每個選項都精確對應一個特定的 Aura Type（貢獻 1 分）。

### 8 種 Aura 定義
1. `overworked`: Overworked Glow
2. `stress`: Stress Skin
3. `hidden_aging`: Hidden Aging
4. `recovery`: Recovery Face
5. `preventive`: Preventive Beauty
6. `glow`: Glow Seeker
7. `burnout`: Burnout Beauty
8. `late_night`: Late Night Face

### 演算法步驟
1. 建立一個包含 8 個 Aura 分數的計分板，初始皆為 0。
2. 根據使用者的選擇，為對應的 Aura 加上 1 分。
3. 完成 15 題後，排序所有 Aura 分數。
4. **主 Aura (Primary Aura)** = 最高分的 Aura。
5. **副 Aura (Secondary Aura)** = 第二高分的 Aura。
6. **分數轉換百分比 (Percentage)** = `(該 Aura 分數 / 15) * 100`。
   * *開發者提示：為了增強 UX，可將顯示用的百分比進行美化。例如，最高分通常可能只有 4-6 分 (26%-40%)，這在視覺上不夠有衝擊力。建議將主 Aura 的顯示百分比 Map 到 70%-92% 之間，副 Aura Map 到 45%-68% 之間，並隨機加上小數點讓其看起來更具「精密運算感」。真實分數僅供邏輯判斷使用。*
7. **同分處理 (Tie-breaker)**：若最高分有兩個 Aura 同分，可預設一個優先權重，或隨機選擇一個作為主 Aura，另一個作為副 Aura。（建議優先權：Burnout > Stress > Overworked > Late Night > Hidden Aging > Recovery > Glow > Preventive，因為指出痛點的 Aura 往往更有衝擊力）。

---

## 2. 題目與選項映射表 (The Mapping)

| 題號 | 選項 A 貢獻 | 選項 B 貢獻 | 選項 C 貢獻 | 選項 D 貢獻 |
| :--- | :--- | :--- | :--- | :--- |
| Q1 | recovery | burnout | preventive | glow |
| Q2 | glow | stress | hidden_aging | preventive |
| Q3 | overworked | stress | hidden_aging | glow |
| Q4 | overworked | stress | recovery | preventive |
| Q5 | late_night | burnout | preventive | overworked |
| Q6 | glow | hidden_aging | stress | recovery |
| Q7 | overworked | glow | hidden_aging | preventive |
| Q8 | burnout | late_night | overworked | preventive |
| Q9 | overworked | hidden_aging | stress | glow |
| Q10| late_night | stress | burnout | recovery |
| Q11| recovery | burnout | glow | preventive |
| Q12| overworked | hidden_aging | recovery | glow |
| Q13| burnout | stress | hidden_aging | overworked |
| Q14| late_night | recovery | preventive | glow |
| Q15| glow | hidden_aging | recovery | overworked |

---

## 3. 建議的 JSON 資料模型 (Data Models)

### `questions.json` 結構
```json
[
  {
    "id": "q1",
    "questionText": "放假時，你最想去邊種地方？",
    "options": [
      {
        "id": "A",
        "text": "海邊／溫泉",
        "auraMapping": "recovery"
      },
      {
        "id": "B",
        "text": "山景Cafe",
        "auraMapping": "burnout"
      },
      {
        "id": "C",
        "text": "Staycation瞓覺",
        "auraMapping": "preventive"
      },
      {
        "id": "D",
        "text": "熱鬧城市",
        "auraMapping": "glow"
      }
    ]
  }
  // ... 包含全部 15 題
]
```

### `aura_profiles.json` 結構
```json
{
  "overworked": {
    "id": "overworked",
    "name": "OVERWORKED GLOW",
    "chineseName": "疲勞發光型",
    "colorTheme": "cool_blue_purple",
    "quote": "你需要的不是更多刺激，而是真正恢復皮膚能量。",
    "keywords": ["疲勞", "低電量", "缺水", "都市感"],
    "description": "外表看起來依然精緻，但其實正處於長期低能量狀態...",
    "skinNeeds": ["Deep Hydration", "Skin Recovery", "Nervous System Reset"],
    "statsModifiers": {
      "energy": 40,
      "glow": 55,
      "stress": 80,
      "recoveryNeeded": 85
    }
  }
  // ... 包含全部 8 種 Aura
}
```

### 測驗結果 Payload (前端傳給結果頁組件的資料)
```json
{
  "primaryAura": "overworked",
  "primaryPercentage": 78,
  "secondaryAura": "recovery",
  "secondaryPercentage": 62,
  "calculatedStats": {
    "energyLevel": 42,
    "skinStability": 58,
    "recoveryState": 65,
    "stressImpact": 82
  }
}
```

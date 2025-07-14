# 專案說明

## 如何執行此專案

### 安裝依賴
```bash
yarn install
```

### 啟動開發伺服器
```bash
yarn start
```
啟動後請至 [http://localhost:3000](http://localhost:3000) 查看專案畫面。

---

## 專案架構、邏輯說明

### 主要目錄結構
```
src/
  components/         # 所有 React 元件（頁面、區塊、UI 元件）
  hooks/              # 所有自訂 React hooks（資料查詢、UI 行為等）
  constants/          # 靜態資料（如 jobList、educationList、salaryList）
  images/             # 專案用到的圖片資源
  icons/              # 專案用到的 icon 資源
  App.js              # React 入口元件
  index.js            # 應用程式進入點
```

### 主要邏輯說明

- **資料查詢**：所有 API 查詢都透過自訂 hook（如 `useJobsQuery`, `useEducationListQuery` 等），底層共用 `useQuery`，具備快取機制，避免重複請求。
- **搜尋與分頁**：`SearchPanel` 元件負責搜尋條件、分頁狀態管理，並將查詢條件同步到 URL query string，方便分享與返回。
- **元件拆分**：表單、列表、Dialog、Carousel 等皆拆分為獨立元件，提升可維護性與重用性。
- **UI 框架**：全專案採用 Material UI（MUI）設計，並將顏色、字型等整合進 MUI theme。
- **動畫與互動**：HeroSection 的 logo 具備無限縮放動畫，眼球會根據滑鼠移動（桌機）追蹤，Carousel 支援拖曳、觸控、自動輪播等現代互動。

---

## 專案遇到的困難、問題及解決方法

### 1. **資料查詢快取與即時性平衡**
- **困難**：如何避免重複 API 請求、又能確保資料不會過舊？
- **解決**：自訂 useQuery hook，預設快取查詢結果，提升效能與體驗。若需即時資料，可手動刷新或調整快取策略。

### 2. **搜尋條件與 URL 同步**
- **困難**：搜尋條件、分頁如何與 URL query string 同步，並支援返回/分享？
- **解決**：自訂 useQueryParams hook，將搜尋條件與 URL 綁定，並於 SearchPanel 內部管理狀態，確保 UI 與網址同步。

### 3. **元件拆分與資料流設計**
- **困難**：如何避免 props drilling、又能讓元件易於維護與重用？
- **解決**：將狀態提升至容器元件（如 SearchPanel），共用元件（如 SearchForm、JobListSection）僅負責 UI，資料流清晰。

### 4. **Carousel 輪播圖互動**
- **困難**：需同時支援自動輪播、拖曳、觸控、吸附、指示點等複雜互動。
- **解決**：自訂 Carousel 元件，整合多種互動行為，並用 useRef/useEffect 管理拖曳與自動輪播。

### 5. **動畫與響應式設計**
- **困難**：HeroSection 動畫需兼顧桌機與手機體驗，眼球動畫需在手機靜止。
- **解決**：用 CSS keyframes 與 JS 判斷螢幕寬度，分別處理動畫與互動。

---

# 以下為原始考題說明與 API 文件

# Frontend Engineer Exam

這是一份 Yile 前端工程師的徵才專案，會需根據規則及設計檔完成頁面需求。

## ⭐️ 需求

### 框架

1. 語言：Javascript
2. Framework：React.js

### CSS

可以選擇以下其一或者搭配做為使用

1. [Material UI](https://mui.com/material-ui/)
2. [Sass](https://sass-lang.com/)

### Coding Style

採用 [Google Coding Style](https://google.github.io/styleguide/) 或 [Airbnb Style](https://github.com/airbnb/javascript)，我們將會審查你的程式碼是否符合風格規範

## 📝 實作描述

- 請 Fork 此專案做開發
- 根據 [Figma](https://www.figma.com/file/VcTqAK0x3JBi9nMvqN9YXJ/Web-Frontend-Developer-Exam?type=design&node-id=0%3A1&mode=design&t=EAnp3AAU1aqJ66e2-1) 實作頁面，請 `登入` 帳號才可看到實作細節
- 若有任何優化、更好方式請自由發揮，但確保基本功能皆有達成需求

## ✅ 提交說明

1. 請將專案上傳至 Github，提交 Repositories 連結給HR，我們將會閱讀你的程式碼
2. 請提供一份 README 文件說明
   1. 如何執行此專案
   2. 專案架構、邏輯說明
   3. 專案遇到的困難、問題及解決方法
3. 請回傳給HR，內容需包含 Github Repositories Link

## 🥇 加分項目

- 加載資料時的過渡表現
- 細節動畫表現
- 部署至任一平台以供成果檢視，例如：Heroku、AWS S3、GCS、Github Page …… 等

## ⚙️ API

### Job List [GET] `/api/v1/jobs`

工作列表

**Parameter**

| Name | Description |
| ---------------- | -------------- |
| pre_page         | 每頁顯示筆數     |
| page             | 指定頁面頁數     |
| company_name     | 公司名稱        |
| education_level  | 教育程度 id     |
| salary_level     | 薪資範圍 id     |

**Response**

```json
{
  "data": [
    {
      "id": "1",
      "companyName": "立刻科技",
      "jobTitle": "資深前端工程師",
      "educationId": 4,
      "salaryId": 3,
      "preview": "招募經驗豐富的前端工程師，共創卓越網頁體驗！",
    }
  ],
  "total": 1
}
```

---

### Education Level List [GET] `/api/v1/educationLevelList`

教育程度列表

**Response**

```json
[
  {
     "id": "1", "label": "國小"
  },
  {
     "id": "2", "label": "國中"
  },
  {
     "id": "3", "label": "高中"
  },
  {
     "id": "4", "label": "大學"
  },
  {
     "id": "5", "label": "碩士"
  },
  {
     "id": "6", "label": "博士"
  },
]
```

---

### Salary Level List [GET] `/api/v1/salaryLevelList`

薪資範圍列表

**Response**

```json
[
  {
    "id": "1", "label": "待遇面議"
  },
  {
    "id": "2", "label": "月薪 40,000 ~ 60,000 元"
  },
  {
    "id": "3", "label": "月薪 70,000 ~ 10,000 元"
  },
  {
    "id": "4", "label": "年薪 800,000 ~ 1,000,000 元"
  },
  {
    "id": "5", "label": "年薪 800,000 ~ 1,500,000 元"
  },
  {
    "id": "6", "label": "年薪 1,500,000 ~ 2,000,000 元"
  },
  {
    "id": "7", "label": "年薪 2,000,000 ~ 2,500,000 元"
  }
]
```

---

### Job [GET] `/api/v1/jobs/:id`

單一工作資訊

**Response**

```json
{
  "id": "6",
  "description": "<h1>貨運操作員</h1><h2>工作地點：公司總部 - 台北市</h2><h2>職責與要求</h2><ul><li>負責倉儲內的物品搬運、分裝、包裝及出貨作業，確保貨物的準確性和完整性。<br />遵循公司的作業流程和安全規範，保障倉庫內的工作環境。<br />與團隊成員合作，確保倉儲操作的順暢進行。<br />需具備基本的電腦操作能力，能使用相關SaaS系統進行庫存管理。<br />需要有良好的溝通協調能力，能有效地與其他部門合作，確保整體物流運作的協調性。<br />對倉儲物流行業有興趣，願意學習並接受公司提供的培訓。</li></ul><h2>資格</h2><ul><li>至少高中畢業，具備相關物流或倉儲操作經驗者優先考慮。<br />具有貨運相關證照者尤佳。<br />對工作積極負責，有良好的工作態度和團隊協作精神。<br />願意接受輪班工作，能夠適應倉儲作業的體力需求。</li></ul><h2>我們提供</h2><ul><li>充滿挑戰性的工作環境，與國際化的專業團隊一同合作。<br />完善的培訓體系，協助您提升相關技能和知識。<br />良好的晉升機會，公司快速發展將為您提供更多職涯發展空間。<br />公司福利包括勞健保、團體保險、員工餐飲補助等。</li></ul><p>如果您渴望挑戰自我，想要加入一個充滿活力和機會的團隊，請將您的履歷寄至 <a href=\"mailto:hr@jenjanlogistics.com\">hr@jenjanlogistics.com</a>，我們期待與您攜手共創物流行業的未來。<br /><br />【JenJan真站電商衛星倉儲物流】期待您的加入！</p>",
  "companyPhoto": [
    "https://picsum.photos/250/150",
    "https://picsum.photos/250/150",
    "https://picsum.photos/250/150",
    "https://picsum.photos/250/150",
    "https://picsum.photos/250/150"
  ],
  "jobTitle": "廚師助手",
  "companyName": "餐飲樂活"
}
```

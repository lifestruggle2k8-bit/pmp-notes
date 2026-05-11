---
title: "Course: PMP Certification Exam Prep Course 35 PDU Contact Hours/PDU | Udemy"
description: >-
  Get your PMP Certification with this course. Fully updated for the Current PMP
  Exam
author: Udemy
source: >-
  https://www.udemy.com/course/pmp-certification-exam-prep-course-pmbok-6th-edition/learn/lecture/39347288#overview
created: "2026-05-11"
tags:
  - hover-notes
  - udemy
---

### 開發時程表 (Develop Schedule)

- **規劃流程的回顧**
    - 在進入開發時程表階段之前，必須先完成以下規劃步驟：

        1. **收集需求** (Collect Requirements)
        2. **開發範圍說明書** (Develop Scope)
        3. **建立工作分解結構** (Create WBS)
        4. **定義活動** (Define Activities)
        5. **排序活動** (Sequence Activities)
        6. **估算活動工期** (Estimate Activity Durations)

- **核心目標**
    - 將所有已知的活動、順序、工期與資源資訊整合，建立一個完整的專案時程。
    - 具體呈現：從哪一天開始到哪一天結束，以及各個特定日期（如 3 月 5 日、4 月 2 日）應進行的任務。
- **時程模型 (Scheduling Model)**
    - 透過分析活動順序、工期、資源需求以及時程限制 (Schedule Constraints) 所產出的結果。
    - **[本質]**：時程模型即是專案的執行計畫，明確指出了「先做什麼」以及「何時做」。

### 開發時程表的 ITTO 細節 (Develop Schedule ITTOs)

- **輸出 (Outputs)**
    - **時程基準 (Schedule Baseline)**
    - **專案時程 (Project Schedule)**
    - **時程數據 (Schedule Data)**
    - **專案日曆 (Project Calendars)**

### 時程網路分析 (Schedule Network Analysis)

- 在建立時程時，必須分析不同的活動與建立時程的方法
- **[分析內容]**：
    - 分析活動本身
    - 分析不同的時程建立方法（例如：關鍵路徑法 Critical Path Method、關鍵鏈法 Critical Chain Method、What-if 分析等）
    - 分析資源最佳化技術 (Resource Optimization Technique)
    - 分析如何找出早開始 (Early Start)、早結束 (Early Finish)、晚開始 (Late Start) 與晚結束 (Late Finish) 的日期
- **關鍵路徑法 (Critical Path Method)**
    - 用於建立專案網路圖與時程網路圖的一種核心方法（後續會深入探討）

### 資源最佳化技術 (Resource Optimization Technique)

- 用於調整時程以符合資源限制的技術
- **資源平滑 (Resource Leveling)**
    - **[核心目的]**：當資源出現「過度分配」(Over-allocated) 的情況時，透過調整時程來「壓平」(Flatten) 時程表
    - 確保資源的使用在時間軸上更加平穩，避免在特定時段需求過高

### 資源平滑 (Resource Leveling) 的實務運作

- **[解決問題]** 處理「資源過度分配」(Over-allocation) 的情況
    - **情境範例**：若同一位 IT 人員（如 Andrew）被同時指派執行「安裝工作站」與「安裝伺服器」兩項活動，在時程表上會顯示該資源在同一時間點被過度使用。
    - **解決方法**：透過資源平滑技術，確保工作人員不會同時執行兩件任務。例如，要求 Andrew 先完成伺服器安裝，再進行工作站安裝（或反之）。
- **[副作用] 潛在的時程延後**
    - 因為資源無法同時處理多項任務，原本可以並行 (Parallel) 的活動被迫改為順序 (Sequential) 執行。
    - 這會導致原本的計畫時程被「推遲」(Push out) 或延長。

---

### 關鍵路徑法 (Critical Path Method, CPM)

- 建立專案網路圖與時程網路圖的核心方法（後續將深入探討）。

### 時程網路分析中的進階工具

- **關鍵鏈法 (Critical Chain Method)**
    - 一種用於規劃與管理專案的方法
    - **[核心重點]**：相較於傳統方法，更強調「資源」的限制與管理
- **What-if 情境分析 (What-if Scenarios)**
    - 透過模擬各種可能發生的變數來測試時程的韌性
    - 常見的模擬方式包含：**蒙地卡羅模擬 (Monte Carlo simulations)**
    - **[思考方向]**：在建立時程時應預設各種「萬一」發生的情況，並思考對應的時程調整方案
        - 例如：若某成員缺席會如何？
        - 例如：若物料延遲送達會如何？
        - 例如：若某項活動未能準時完成會如何？
- **時程調整技術：前置與滯後 (Leads and Lags)**
    - **前置 (Lead)**：指活動之間的「重疊」(Overlap)，允許後續活動在先前活動完成前就開始
    - **滯後 (Lag)**：指活動之間的「延遲」(Delay)，在某活動結束後需等待一段時間才能開始下一項活動

### 時程壓縮 (Schedule Compression)

- 當既有的時程計畫過長，無法滿足需求時（例如：老闆要求將 90 天的專案縮短至 70 天），必須使用時程壓縮技術來縮減工期。
- **[主要技術]**：
    - **趕工 (Crashing)**
        - **[定義]**：透過增加資源來縮短時程。
        - **[實務做法]**：例如增加額外的人力（多請一位油漆工），或改用更高效的設備（用噴漆槍代替手刷）。
        - **[關鍵影響]**：**趕工會增加成本 (Crashing adds costs)**。雖然縮短了時間，但投入更多資源必然導致專案預算上升。

### 時程壓縮 (Schedule Compression) 的另一種技術：快速跟進 (Fast Tracking)

- **[定義]**：在不增加資源的情況下，嘗試讓原本應該順序執行的活動改為「並行」(Parallel) 執行。
- **[實務做法]**：例如原本要漆完第一間房才漆第二間，現在改為兩間房同時進行。
- **[核心影響] 增加風險 (Increases Risk)**
    - 雖然快速跟進不一定會直接增加成本，但會提升專案風險。
    - **[風險範例]**：兩名油漆工同時在場，可能會互相干擾（例如聊天導致效率降低，或不小心撞翻對方的油漆桶）。

#### 時程壓縮技術對比總結

| 技術 | 做法 | 主要影響 | 備考 |
| --- | --- | --- | --- |
| 趕工 (Crashing) | 增加資源（如人力、設備） | 增加成本 (Adds Costs) | 透過投入更多資源來縮短時間 |
| 快速跟進 (Fast Tracking) | 活動改為並行執行 | 增加風險 (Increases Risk) | 可能不增加成本，但會提高出錯機率 |

---

### 專案管理資訊系統 (Project Management Information System, PMIS)

- **[定義]**：專案管理中使用的電腦系統或軟體工具。
- **[重要性]**：在現代專案管理中，幾乎無法在沒有 PMIS 的情況下建立複雜的時程表。
- **[功能]**：用於整合活動、工期與資源，並生成最終的時程模型。

### 敏捷發佈計畫 (Agile Release Planning)

- **[核心概念]** 在敏捷開發中，產品是透過「增量」(Increments) 來構建的，而發佈計畫的核心在於決定何時釋出這些增量。
- **[可用性原則]** 發佈的內容必須是「可使用的」(Usable)。
    - 單一功能（Feature）有時無法獨立提供價值。
    - **[範例]** 在開發會計系統時：
        - 僅具備「建立客戶」與「建立發票」的功能是不夠的。
        - 因為如果無法執行「接收付款」，該功能組合對使用者而言並不具備完整的使用價值。
- **[發佈 (Release) 的定義]** 指的是一組預先確定的功能集合，確保交付給客戶時具備完整的可用性。
- **[敏捷 vs. 傳統時程模式之對比]**

| 特性 | 敏捷開發 (Agile) | 傳統開發 (Traditional) |
| --- | --- | --- |
| 交付方式 | 將時程拆解為較小的「迭代」(Iterations) | 通常採取「一次性交付」(One shot at a time) |
| 交付內容 | 持續交付較小的增量 (Smaller increments) | 完整的專案成品 |
| 客戶參與 | 提供大量機會讓客戶提供回饋 (Feedback) | 回饋機會較集中在專案後期 |

### 開發時程表的產出與視覺化工具

- **專案時程 (Project Schedule)**
    - 包含每一項活動的「開始日期」與「結束日期」。
- **里程碑圖 (Milestone Chart)**
    - 用於標示特定的重要節點 (Milestones) 以及預計達成這些節點的日期。
- **時程的視覺化呈現方式**
    - **專案網路圖 (Project Network Diagram)**：顯示活動之間的邏輯關係與順序。
    - **甘特圖 (Gantt Chart / Bar Chart)**
        - 在專案管理軟體（如 Microsoft Project）中常見的條形圖。
        - **[原理]**：透過長條圖的「長度」來直觀呈現每項活動所需耗費的工期。

### 開發時程表的具體產出

- **專案時程 (Project Schedule)**
    - 可以是「高階」(High-level) 或「詳細」(Detailed) 的版本。
    - **[實務建議]**：時程應盡可能詳細，因為細節越多，團隊達成目標的可能性就越高。
- **時程基準 (Schedule Baseline)**
    - 指的是包含所有已核准變更後的「原始時程計畫」。
    - 其核心內容僅包含專案的**開始日期與結束日期**。
    - 與詳細時程不同，基準線通常不包含複雜的網路圖或所有活動的具體長條圖，而是作為衡量進度的參考基準。
- **時程數據 (Scheduling Data)**
    - 這是團隊用來計算時程時所使用的「模板」或「基礎資料」。
    - **[用途]**：當他人質疑時程的合理性（例如：「為什麼時程這麼短？」或「為什麼這麼長？」）時，時程數據可以提供解釋。
    - 包含的關鍵資訊：
        - 假設 (Assumptions)
        - 限制條件 (Constraints)
        - 資源分配 (Resources)
- **專案日曆 (Project Calendar)**
    - 定義了專案的「工作班次」(Working shifts)。
    - 決定了專案何時可以進行工作，何時必須暫停（例如：考慮到假日、輪班或非工作時間）。

### 從開發時程表轉向預算規劃

- **[流程銜接]**：一旦完成時程表的開發（包含活動順序、工期、資源與日曆的整合），下一步的核心任務即是開始建立**專案預算 (Budget)**。